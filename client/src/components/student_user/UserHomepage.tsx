import React, { useState } from 'react';
import '../../styles/UserHomepage.css';
import EventCardList from './EventsCardList';
import Sidebar from './Sidebar';

const UserHomepage: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
    const [rsvpStatus, setRsvpStatus] = useState<{ [key: string]: boolean }>({});

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const addEventToSidebar = (event: any) => {
        setSelectedEvents((prev) => [...prev, event]);
        setRsvpStatus((prev) => ({
            ...prev,
            [event.eventName]: true,  // Set RSVP to true for this event
        }));
    };

    const removeEventFromSidebar = (event: any) => {
        setSelectedEvents((prev) => prev.filter(e => e.eventName !== event.eventName));
        setRsvpStatus((prev) => ({
            ...prev,
            [event.eventName]: false,  // Set RSVP to false for this event
        }));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Upcoming Events</h1>
                <EventCardList
                    addEventToSidebar={addEventToSidebar}
                    removeEventFromSidebar={removeEventFromSidebar}
                    rsvpStatus={rsvpStatus}
                />
                <button className="toggle-button" onClick={toggleSidebar}>
                    ☰
                </button>
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    selectedEvents={selectedEvents}
                    removeEventFromSidebar={removeEventFromSidebar}
                    rsvpStatus={rsvpStatus}
                />
            </header>
        </div>
    );
};

export default UserHomepage;
