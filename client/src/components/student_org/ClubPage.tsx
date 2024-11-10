import React, { useState } from 'react';
import "../../styles/ClubPage.css";
import MyEventsList from './MyEventsList';
import EventForm from './EventForm';

interface Event {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    description: string;
}

const ClubPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const handleAddEvent = (newEvent: Event) => {
        setEvents([...events, newEvent]);
    };

    const handleEditEvent = (index: number, updatedEvent: Event) => {
        const updatedEvents = [...events];
        updatedEvents[index] = updatedEvent;
        setEvents(updatedEvents);
    };

    const handleDeleteEvent = (index: number) => {
        const updatedEvents = events.filter((_, i) => i !== index);
        setEvents(updatedEvents);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: '1', marginRight: '20px' }}>
                <h1>Event Management</h1>
                <EventForm onAddEvent={handleAddEvent} />
            </div>
            <div style={{ flex: '1' }}>
                <MyEventsList events={events} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} />
            </div>
        </div>
    );
};

export default ClubPage;
