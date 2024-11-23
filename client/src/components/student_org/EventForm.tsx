import React, { useState } from 'react';
import '../../styles/EventForm.css';

interface Event {
    eventID?: string;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string | null;
}

interface EventFormProps {
    onAddEvent: (event: Event) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
    const [eventName, setEventName] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>('');
    const [eventLocation, setEventLocation] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);

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
            eventName: eventName,
            eventDate: eventDate,
            description: description,
            eventLocation: eventLocation,
        };

        const eventData_json = {
            title: eventName,
            location: eventLocation,
            description: description,
            date: eventDate,
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
        setImage(null);
    };

    return (
        <div className="event-form-card">
            <form onSubmit={handleSubmit}>
                <h2>Create Event</h2>
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
                <button type="submit">Publish Event</button>
            </form>
        </div>
    );
};

export default EventForm;