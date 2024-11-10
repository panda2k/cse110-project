import React, { useState } from 'react';
import '../styles/MyEventsList.css';
import EditEvent from './EditEvent';

interface Event {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string;
}

interface MyEventsListProps {
    events: Event[];
    onEditEvent: (index: number, updatedEvent: Event) => void;
    onDeleteEvent: (index: number) => void;
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
        onDeleteEvent(index);
    };

    return (
        <div className="events-list">
            {events.map((event, index) => (
                <div className="event-card" key={index}>
                    <button className="edit-button" onClick={() => handleEditClick(index)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>

                    {isEditingIndex === index ? (
                        <EditEvent event={event} onSave={(updatedEvent) => handleSave(index, updatedEvent)} onCancel={handleCancel} />
                    ) : (
                        <div className="card-content">
                            {event.image && <img src={event.image} alt={`${event.eventName} image`} className="event-image" />}
                            <h3>{event.eventName}</h3>
                            <p><strong>Date:</strong> {event.eventDate}</p>
                            <p><strong>Location:</strong> {event.eventLocation}</p>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>RSVP Count: </strong></p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MyEventsList;
