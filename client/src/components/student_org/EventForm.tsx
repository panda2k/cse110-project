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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result as string;

                img.onload = () => {
                    // Create a canvas element
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Set the fixed width and height to 1200 x 1200
                    const fixedWidth = 1200;
                    const fixedHeight = 1200;
                    canvas.width = fixedWidth;
                    canvas.height = fixedHeight;

                    // Draw the image onto the canvas
                    if (ctx) {
                        ctx.drawImage(img, 0, 0, fixedWidth, fixedHeight);

                        // Convert the canvas to a Base64-encoded string without compression
                        const resizedBase64 = canvas.toDataURL("image/jpeg"); // Default quality

                        // Set the resized image string
                        setImage(resizedBase64);
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const eventData: Event = {
            orgName,
            eventName,
            eventStartTime,
            eventEndTime,
            eventDate,
            description,
            eventLocation,
            image,
            url,
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
            orgID: user.id,
        };
        const formData = new FormData();
        formData.append("orgName", orgName);
        formData.append("title", eventName);
        formData.append("startTime", eventStartTime);
        formData.append("endTime", eventEndTime);
        formData.append("date", eventDate);
        formData.append("location", eventLocation);
        formData.append("description", description);
        formData.append("url", url);
        formData.append("orgID", user.id);
        console.log(image);
        if (image) {
            const fileInput = document.querySelector<HTMLInputElement>("#image");
            console.log(fileInput?.files?.[0]);
            if (fileInput && fileInput.files?.[0]) {
                formData.append("image", fileInput.files[0]);
            }
        }

        console.log(formData);

        try {
            const response = await fetch("http://localhost:8080/events/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventData_json),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                onAddEvent(eventData);
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert("Error: " + errorData.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An unexpected error occurred.");
        }

        setOrgName('');
        setEventName('');
        setEventDate('');
        setEventLocation('');
        setDescription('');
        setEventStartTime('');
        setEventEndTime('');
        setImage(null);
        setURL('');
    };

    return (
        <form onSubmit={handleSubmit} className="event-form">
            <h2>Create Event</h2>
            <div className="form-row">
                <label htmlFor="orgName">Organization Name:</label>
                <input
                    type="text"
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                />
            </div>
            <div className="form-row">
                <label htmlFor="eventName">Event Name:</label>
                <input
                    type="text"
                    id="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                />
            </div>
            <div className="form-row-inline">
                <div>
                    <label htmlFor="eventDate">Date:</label>
                    <input
                        type="date"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="form-row-inline">
                <div>
                    <label htmlFor="eventStartTime">Start Time:</label>
                    <input
                        type="time"
                        id="eventStartTime"
                        value={eventStartTime}
                        onChange={(e) => setEventStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="eventEndTime">End Time:</label>
                    <input
                        type="time"
                        id="eventEndTime"
                        value={eventEndTime}
                        onChange={(e) => setEventEndTime(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="form-row">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="form-row-inline">
                <div>
                    <label htmlFor="eventLocation">Location:</label>
                    <input
                        type="text"
                        id="eventLocation"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        required
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
            </div>
            <div className="form-row">
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
    );
};

export default EventForm;
