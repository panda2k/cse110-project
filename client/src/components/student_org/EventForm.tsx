import React, { useState, useContext } from 'react';
import '../../styles/EventForm.css';
import { AuthContext } from '../../context/AuthContext';

interface Event {
    orgName: string;
    eventID?: string;
    eventName: string;
    eventStartTime: string;
    eventEndTime: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string | null;
    url?: string;
    orgID?: string;
}

interface EventFormProps {
    onAddEvent: (event: Event) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
    const { user } = useContext(AuthContext);
    const [orgName, setOrgName] = useState<string>('');
    const [eventName, setEventName] = useState<string>('');
    const [eventStartTime, setEventStartTime] = useState<string>('');
    const [eventEndTime, setEventEndTime] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>('');
    const [eventLocation, setEventLocation] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [url, setURL] = useState<string>('');

    // Handle file input for image
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string); // Store image as base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const eventData: Event = {
            orgName: orgName,
            eventName: eventName,
            eventStartTime: eventStartTime,
            eventEndTime: eventEndTime,
            eventDate: eventDate,
            description: description,
            eventLocation: eventLocation,
            image: image,
            url: url
        };

        const eventData_json = {
            orgName: orgName,
            title: eventName,
            startTime: eventStartTime,
            endTime: eventEndTime,
            location: eventLocation,
            description: description,
            date: eventDate,
            image: image,
            url: url,
            orgID: user.id
        }

        try {
            const response = await fetch("http://localhost:8080/events/", {
                method: "POST",  // Send POST request
                headers: {
                    "Content-Type": "application/json",  // Set the request content type
                },
                body: JSON.stringify(eventData_json),  // Send data as JSON
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message); // Show success message
                onAddEvent(eventData);
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert("Error: " + errorData.error); // Show error message
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
        }

        // Reset the form fields
        setEventName('');
        setEventDate('');
        setEventLocation('');
        setDescription('');
        setEventStartTime('');
        setEventEndTime('');
        setOrgName('');
        setImage(null);
    };

    return (
        <div className="event-form-card">
            <form onSubmit={handleSubmit}>
                <h2>Create Event</h2>
                <div>
                    <label htmlFor="orgName">Organization Name:</label>
                    <input
                        type="text"
                        id="orgName"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        type="text"
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="eventStartTime">Event Start Time:</label>
                    <input
                        type="time"
                        id="eventStartTime"
                        value={eventStartTime}
                        onChange={(e) => setEventStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="eventEmdTime">Event End Time:</label>
                    <input
                        type="time"
                        id="eventEndTime"
                        value={eventEndTime}
                        onChange={(e) => setEventEndTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="eventDate">Event Date:</label>
                    <input
                        type="date"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="eventLocation">Event Location:</label>
                    <input
                        type="text"
                        id="eventLocation"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="image">Upload Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <label htmlFor="url">URL:</label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(e) => setURL(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Publish Event</button>
            </form>
        </div>
    );
};

export default EventForm;