import React, { useState, useContext } from 'react';
import '../../styles/MyEventsList.css';
import EditEvent from './EditEvent';
import EventForm from './EventForm'; // Import the EventForm component
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

interface MyEventsListProps {
    events: Event[];
    onEditEvent: (index: number, updatedEvent: Event) => void;
    onDeleteEvent: (eventID: string) => void;
    onAddEvent: (event: Event) => void;
}

const MyEventsList: React.FC<MyEventsListProps> = ({ events, onEditEvent, onDeleteEvent, onAddEvent }) => {
    const { user } = useContext(AuthContext);
    const [isEditingIndex, setIsEditingIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

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

    const handleCardClick = () => {
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleDelete = async (eventID: string | undefined) => {
        if (!eventID) {
            alert('Event ID is missing. Cannot delete.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/events/${eventID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Event deleted successfully!');
                onDeleteEvent(eventID); // Remove the event locally
            } else {
                const errorData = await response.json();
                alert('Error deleting event: ' + errorData.error);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('An unexpected error occurred while deleting the event.');
        }
    };

    return (
        <div className="event-card-list">
            <div
                className="event-card"
                style={{
                    backgroundColor: '#333',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    borderRadius: '10px',
                }}
                onClick={handleCardClick} // Open modal on click
            >
                +
            </div>
            {events.map((event, index) => (
                <div className="event-card" key={event.eventID || index}>
                    {isEditingIndex === index ? (
                        <EditEvent
                            event={event}
                            onSave={(updatedEvent) => handleSave(index, updatedEvent)}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <>
                            {event.image && <img src={event.image} alt={`${event.eventName} image`} className="event-image" />}
                            <div className="card-content">
                                <h3>{event.orgName}</h3>
                                <h3>{event.eventName}</h3>
                                <p><strong>Start Time:</strong> {event.eventStartTime}</p>
                                <p><strong>End Time:</strong> {event.eventEndTime}</p>
                                <p><strong>Date:</strong> {event.eventDate}</p>
                                <p><strong>Location:</strong> {event.eventLocation}</p>
                                <p><strong>Description:</strong> {event.description}</p>
                                {event.url && (
                                    <p>
                                        <strong>URL:</strong>{' '}
                                        <a href={event.url} target="_blank" rel="noopener noreferrer">
                                            {event.url}
                                        </a>
                                    </p>
                                )}
                            </div>
                            <div className="card-actions">
                                <button className="edit-button" onClick={() => handleEditClick(index)}>
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(event.eventID)}>
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}

            {/* Modal for Event Form */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleCloseModal}>
                            X
                        </button>
                        <EventForm onAddEvent={onAddEvent} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyEventsList;
