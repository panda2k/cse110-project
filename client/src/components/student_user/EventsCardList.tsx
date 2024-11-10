import React from 'react';
import '../../styles/EventsCardList.css';

interface Event {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image: string;
}

interface EventCardListProps {
    addEventToSidebar: (event: Event) => void;
    removeEventFromSidebar: (event: Event) => void;
    rsvpStatus: { [key: string]: boolean };  // Update type here
}

const EventCardList: React.FC<EventCardListProps> = ({ addEventToSidebar, removeEventFromSidebar, rsvpStatus }) => {
    const events: Event[] = [
        {
            eventName: 'Event 1',
            eventDate: 'Yesterday',
            eventLocation: 'Location!',
            description: 'Description!',
            image: 'https://via.placeholder.com/300x200?text=Event+1',
        },
        {
            eventName: 'Event 2',
            eventDate: 'Today',
            eventLocation: 'Location!!',
            description: 'Description!!',
            image: 'https://via.placeholder.com/300x200?text=Event+2',
        },
        {
            eventName: 'Event 3',
            eventDate: 'Tomorrow',
            eventLocation: 'Location!!!',
            description: 'Description!!!',
            image: 'https://via.placeholder.com/300x200?text=Event+3',
        },
    ];

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
                    <img src={event.image} alt={event.eventName} className="event-image" />
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
