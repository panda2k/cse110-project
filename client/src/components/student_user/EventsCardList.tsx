import React from 'react';
import '../../styles/EventsCardList.css';
import { useEffect, useState } from 'react';
import { fetchEvents } from '../../utils/event-utils';

interface Event {
    eventID?: string,
    eventName: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string;
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
                    eventID: item.id,               // Map `id` to `eventID`
                    eventName: item.title,          // Map `title` to `eventName`
                    eventDate: item.date,           // Map `date` to `eventDate`
                    eventLocation: item.location,   // Map `location` to `eventLocation`
                    description: item.description,  // Map `description`
                }));
                setEvents(transformedEvents); // Set the fetched events in state
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        getEvents();
    }, []);

    const toggleRsvp = (event: Event) => {
        if (!rsvpStatus[event.eventName]) {
            addEventToSidebar(event);
        } else {
            removeEventFromSidebar(event);
        }
    };
    return (
        <div className="event-card-list">
            {events.map((event) => (
                <div className="event-card" key={event.eventName}>
                    {/* <img src={event.image} alt={event.eventName} className="event-image" /> */}
                    <div className="card-content">
                        <h3>{event.eventName}</h3>
                        <p><strong>Date:</strong> {event.eventDate}</p>
                        <p><strong>Location:</strong> {event.eventLocation}</p>
                        <p><strong>Description:</strong> {event.description}</p>
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
