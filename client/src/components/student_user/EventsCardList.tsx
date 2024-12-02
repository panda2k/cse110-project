import React, { useState, useContext, useEffect } from 'react';
import '../../styles/EventsCardList.css';
import { fetchEvents } from '../../utils/event-utils';
import { AuthContext } from '../../context/AuthContext';
import CompactEventCardContainer from './CompactEventCardContainer';

interface Event {
    orgName: string;
    eventID?: string;
    eventName: string;
    eventStartTime: string;
    eventEndTime: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string | undefined;
    url?: string;
    orgID?: string;
}

interface EventCardListProps {
    addEventToSidebar: (event: Event) => void;
    removeEventFromSidebar: (event: Event) => void;
    rsvpStatus: { [key: string]: boolean };  // Update type here
    selectedEvents: any[];
}

const EventCardList: React.FC<EventCardListProps> = ({ addEventToSidebar, removeEventFromSidebar, rsvpStatus, selectedEvents }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // For the selected event modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // To track the modal visibility

    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventsData = await fetchEvents();
                const transformedEvents: Event[] = eventsData.map((item: any) => ({
                    orgName: item.orgName,
                    eventID: item.id,
                    eventName: item.title,
                    eventStartTime: item.startTime,
                    eventEndTime: item.endTime,
                    eventDate: item.date,
                    eventLocation: item.location,
                    description: item.description,
                    url: item.url,
                    image: item.image
                }));
                setEvents(transformedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        getEvents();
    }, []);

    const { user } = useContext(AuthContext);

    const toggleRsvp = async (event: Event) => {
        try {
            const isRsvp = rsvpStatus[event.eventName];
            let response;

            if (!isRsvp) {
                response = await fetch('http://localhost:8080/rsvp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, eventId: event.eventID })
                });
            } else {
                response = await fetch('http://localhost:8080/rsvp', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.id, eventId: event.eventID })
                });
            }

            if (!response.ok) {
                throw new Error('Failed to update RSVP status');
            }

            const result = await response.json();
            console.log('RSVP status updated:', result);

            if (!isRsvp) {
                addEventToSidebar(event);
            } else {
                removeEventFromSidebar(event);
            }
        } catch (error) {
            console.error('Error toggling RSVP:', error);
        }
    };

    const openModal = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="event-card-list">
                <CompactEventCardContainer selectedEvents={selectedEvents} />
                {events.map((event) => (
                    <div
                        className="event-card"
                        key={event.eventName}
                        onClick={() => openModal(event)}
                    >
                        <img src={event.image} alt={event.eventName} className="event-image" />
                    </div>
                ))}
            </div>

            {isModalOpen && selectedEvent && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedEvent.eventName}</h2>
                        <p><strong>Organization:</strong> {selectedEvent.orgName}</p>
                        <p><strong>Start Time:</strong> {selectedEvent.eventStartTime}</p>
                        <p><strong>End Time:</strong> {selectedEvent.eventEndTime}</p>
                        <p><strong>Date:</strong> {selectedEvent.eventDate}</p>
                        <p><strong>Location:</strong> {selectedEvent.eventLocation}</p>
                        <p><strong>Description:</strong> {selectedEvent.description}</p>
                        <p><strong>URL:</strong> <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer">{selectedEvent.url}</a></p>

                        {/* RSVP button in modal */}
                        <button
                            className={`rsvp-button ${rsvpStatus[selectedEvent.eventName] ? 'rsvp-active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleRsvp(selectedEvent);
                            }}
                        >
                            {rsvpStatus[selectedEvent.eventName] ? 'Un-RSVP' : 'RSVP'}
                        </button>

                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCardList;