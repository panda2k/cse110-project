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
        // Use the name of the input to update the correct property in the event object
        setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
    };

    // Handle the form submission to save changes
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload on form submission
        onSave(editedEvent); // Call onSave function with the edited event data
    };

    // Backend integration point: Save changes to the database
    // Here, you could make an API call to send `editedEvent` to the backend to update the event in the database.

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