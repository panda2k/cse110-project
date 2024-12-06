import React, { useState, useContext, useEffect, SyntheticEvent } from 'react';
import '../../styles/EventsCardList.css';
import { fetchEvents } from '../../utils/event-utils';
import { AuthContext } from '../../context/AuthContext';
import CompactEventCardContainer from './CompactEventCardContainer';
import { sendMessage } from '../../utils';

export interface Event {
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
                    orgID: item.orgID,
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

    const onFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            content: { value: string }
        }
        const studentId = user.id;
        const organizationId = Number(selectedEvent?.orgID);
        console.log(selectedEvent)
        sendMessage(user.type, studentId, organizationId, formElements.content.value);
        formElements.content.value = "";
    }
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
                        <form className="send-message" onSubmit={onFormSubmit}>
                            <div>
                                <input id="content" type="text" placeholder="Send a question to the organizers!" />
                                <button type="submit" data-testid="send-message">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></svg>
                                </button>
                            </div>
                        </form>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCardList;
