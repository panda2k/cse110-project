import React from 'react';
import '../../styles/Sidebar.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    selectedEvents: any[];
    removeEventFromSidebar: (event: any) => void;
    rsvpStatus: { [key: string]: boolean };
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, selectedEvents, removeEventFromSidebar, rsvpStatus }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={toggleSidebar}>Close</button>
            <h2>Selected Events</h2>
            {selectedEvents.map((event) => (
                <div className="selected-event-card" key={event.eventName}>
                    <h3>{event.eventName}</h3>
                    <p>{event.eventStartTime}</p>
                    <p>{event.eventEndTime}</p>
                    <p>{event.eventDate}</p>
                    <p>{event.eventLocation}</p>
                    <button onClick={() => removeEventFromSidebar(event)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
