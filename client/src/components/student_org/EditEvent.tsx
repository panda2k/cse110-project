import React, { useState } from 'react';
import "../../styles/EditEvent.css";

// Define the structure of an Event object
interface Event {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string; // New property for the image URL
}

// Define the props that EditEvent component will receive
interface EditEventProps {
    event: Event;
    onSave: (updatedEvent: Event) => void;
    onCancel: () => void;
}

const EditEvent: React.FC<EditEventProps> = ({ event, onSave, onCancel }) => {
    // Local state to track changes made to the event during editing
    const [editedEvent, setEditedEvent] = useState<Event>(event);

    // Update the local state whenever a form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
    };

    // Handle the form submission to save changes
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload on form submission

        try {
            // Make PUT request to the backend to update the event
            const response = await fetch(`/api/events/${event.eventName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: editedEvent.eventName,
                    location: editedEvent.eventLocation,
                    description: editedEvent.description,
                    date: editedEvent.eventDate,
                }),
            });

            if (response.ok) {
                const updatedEvent = await response.json();
                onSave(updatedEvent); // Call onSave function with the updated event
            } else {
                console.error('Error updating event:', await response.json());
            }
        } catch (error) {
            console.error('Error making request to update event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <label>
                Event Name:
                <input
                    type="text"
                    name="eventName"
                    value={editedEvent.eventName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Event Date:
                <input
                    type="date"
                    name="eventDate"
                    value={editedEvent.eventDate}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Event Location:
                <input
                    type="text"
                    name="eventLocation"
                    value={editedEvent.eventLocation}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Description:
                <textarea
                    name="description"
                    value={editedEvent.description}
                    onChange={handleChange}
                    required
                ></textarea>
            </label>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditEvent;