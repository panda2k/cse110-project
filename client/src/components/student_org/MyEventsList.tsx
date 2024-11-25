import React, { useState } from 'react';
import '../../styles/MyEventsList.css';
import EditEvent from './EditEvent';

interface Event {
    eventID?: string;
    eventName: string;
    eventTime: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string | null;
}

interface MyEventsListProps {
    events: Event[];
    onEditEvent: (index: number, updatedEvent: Event) => void;
    onDeleteEvent: (eventID: string) => void;
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

    const handleDelete = async (eventID: string | undefined) => {
        if (!eventID) {
            alert("Event ID is missing. Cannot delete.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/events/${eventID}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Event deleted successfully!");
                // Call a function or setState to remove the event locally
                onDeleteEvent(eventID);
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert("Error deleting event: " + errorData.error);
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("An unexpected error occurred while deleting the event.");
        }
    };

    return (
        <div className="events-list">
            {events.map((event, index) => (
                <div className="event-card" key={index}>
                    {/* expect eventID for these methods */}
                    <button className="edit-button" onClick={() => handleEditClick(index)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(event.eventID)}>Delete</button>

                    {isEditingIndex === index ? (
                        <EditEvent event={event} onSave={(updatedEvent) => handleSave(index, updatedEvent)} onCancel={handleCancel} />
                    ) : (
                        <div className="card-content">
                            {event.image && <img src={event.image} alt={`${event.eventName} image`} className="event-image" />}
                            <h3>{event.eventName}</h3>
                            <p><strong>Event Time:</strong> {event.eventTime}</p>
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
