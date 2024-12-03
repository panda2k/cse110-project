import React from 'react';
import '../../styles/CompactEventCardContainer.css';

interface CompactEventCardContainerProps {
    selectedEvents: any[];
}

const CompactEventCardContainer: React.FC<CompactEventCardContainerProps> = ({ selectedEvents }) => {
    return (
        <div className="compact-event-card-container">
            <h2 className="upcoming-events-title">Upcoming Events</h2>
            <div className="compact-event-card scrollable-card">
                {selectedEvents.map((event) => (
                    <div className="compact-event-card-item" key={event.eventName}>
                        <h3>{event.eventName}</h3>
                        <p>{event.eventDate}</p>
                        <p>{event.eventStartTime} - {event.eventEndTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompactEventCardContainer;
