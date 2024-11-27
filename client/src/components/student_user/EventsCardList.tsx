import React from 'react';
import '../../styles/EventsCardList.css';
import { useEffect, useState, useContext } from 'react';
import { fetchEvents } from '../../utils/event-utils';
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
    image?: string | undefined;
    url?: string;
    orgID?: string;
}

interface EventCardListProps {
    addEventToSidebar: (event: Event) => void;
    removeEventFromSidebar: (event: Event) => void;
    rsvpStatus: { [key: string]: boolean };  // Update type here
}

const EventCardList: React.FC<EventCardListProps> = ({ addEventToSidebar, removeEventFromSidebar, rsvpStatus }) => {
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventsData = await fetchEvents(); // Use the fetchEvents function
                console.log(eventsData);
                const transformedEvents: Event[] = eventsData.map((item: any) => ({
                    orgName: item.orgName,
                    eventID: item.id,               // Map `id` to `eventID`
                    eventName: item.title,          // Map `title` to `eventName`
                    eventStartTime: item.startTime,
                    eventEndTime: item.endTime,
                    eventDate: item.date,           // Map `date` to `eventDate`
                    eventLocation: item.location,   // Map `location` to `eventLocation`
                    description: item.description,  // Map `description`
                    url: item.url,
                    image: item.image
                }));
                setEvents(transformedEvents); // Set the fetched events in state
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        getEvents();
    }, []);

    const { user } = useContext(AuthContext);
    console.log(user);

    const toggleRsvp = async (event: Event) => {
        try {
            const isRsvp = rsvpStatus[event.eventName]; // Check the current RSVP status
            let response;

            if (!isRsvp) {
                response = await fetch('http://localhost:8080/rsvp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        eventId: event.eventID,
                    }),
                });
            } else {
                response = await fetch('http://localhost:8080/rsvp', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        eventId: event.eventID,
                    }),
                });
            }

            if (!response.ok) {
                throw new Error('Failed to update RSVP status');
            }

            const result = await response.json();
            console.log('RSVP status updated:', result);

            // Update the sidebar based on the new status
            if (!isRsvp) {
                addEventToSidebar(event);
            } else {
                removeEventFromSidebar(event);
                // window.location.reload();
            }
        } catch (error) {
            console.error('Error toggling RSVP:', error);
        }
    };

    return (
        <div className="event-card-list">
            {events.map((event) => (
                <div className="event-card" key={event.eventName}>
                    <img src={event.image} alt={event.eventName} className="event-image" />
                    <div className="card-content">
                        <h3>{event.orgName}</h3>
                        <h3>{event.eventName}</h3>
                        <p><strong>Start Time:</strong> {event.eventStartTime}</p>
                        <p><strong>End Time:</strong> {event.eventEndTime}</p>
                        <p><strong>Date:</strong> {event.eventDate}</p>
                        <p><strong>Location:</strong> {event.eventLocation}</p>
                        <p><strong>Description:</strong> {event.description}</p>
                        <p><strong>URL:</strong> {event.url}</p>
                    </div>
                    <button
                        className={`rsvp-button ${rsvpStatus[event.eventName] ? 'rsvp-active' : ''}`}
                        onClick={() => toggleRsvp(event)}
                    >
                        {rsvpStatus[event.eventName] ? 'Un-RSVP' : 'RSVP'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default EventCardList;
