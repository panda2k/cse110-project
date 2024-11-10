import React from 'react';
import '../../styles/Sidebar.css';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    selectedEvents: any[];
    removeEventFromSidebar: (event: any) => void;
    rsvpStatus: { [key: string]: boolean };
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, selectedEvents, removeEventFromSidebar, rsvpStatus }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-button" onClick={toggleSidebar}>Close</button>
            <h2>Selected Events</h2>
            {selectedEvents.map((event) => (
                <div className="selected-event-card" key={event.eventName}>
                    <h3>{event.eventName}</h3>
                    <p>{event.eventDate}</p>
                    <p>{event.eventLocation}</p>
                    <button onClick={() => removeEventFromSidebar(event)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
