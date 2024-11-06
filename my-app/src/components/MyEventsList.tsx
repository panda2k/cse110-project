import React, { useState } from 'react';
import '../styles/MyEventsList.css';
import EditEvent from './EditEvent';

// Define the structure of an Event object
interface Event {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    description: string;
}

// Define props for the MyEventsList component, including an array of events and functions for editing and deleting events
interface MyEventsListProps {
    events: Event[];
    onEditEvent: (index: number, updatedEvent: Event) => void;
    onDeleteEvent: (index: number) => void; // New prop for deleting events
}

const MyEventsList: React.FC<MyEventsListProps> = ({ events, onEditEvent, onDeleteEvent }) => {
    const [isEditingIndex, setIsEditingIndex] = useState<number | null>(null);

    const handleEditClick = (index: number) => {
        setIsEditingIndex(index);
    };

    const handleSave = (index: number, updatedEvent: Event) => {
        onEditEvent(index, updatedEvent);
        setIsEditingIndex(null);
    };

    const handleCancel = () => {
        setIsEditingIndex(null);
    };

    const handleDelete = (index: number) => {
        onDeleteEvent(index); // Call the onDeleteEvent function from props
    };

    return (
        <div className="events-list">
            {events.map((event, index) => (
                <div className="event-card" key={index}>
                    <button className="edit-button" onClick={() => handleEditClick(index)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>

                    {isEditingIndex === index ? (
                        <EditEvent
                            event={event}
                            onSave={(updatedEvent) => handleSave(index, updatedEvent)}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <div className="card-content">
                            <h3>{event.eventName}</h3>
                            <p><strong>Date:</strong> {event.eventDate}</p>
                            <p><strong>Location:</strong> {event.eventLocation}</p>
                            <p><strong>Description:</strong> {event.description}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MyEventsList;