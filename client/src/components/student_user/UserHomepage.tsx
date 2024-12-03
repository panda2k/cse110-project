import React, { useState } from 'react';
import '../../styles/UserHomepage.css';
import EventCardList from './EventsCardList';
import Sidebar from './Sidebar';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect } from 'react';

const UserHomepage: React.FC = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
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

    useEffect(() => {
        const fetchRsvpEvents = async () => {
            try {
                console.log("Line 30 User info: " + user);
                const userIDStr = user.id;
                const response = await fetch(`http://localhost:8080/rsvp/upcoming/${userIDStr}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch RSVP events');
                }
                const rsvpEventsData = await response.json();
                console.log('RSVP Events Data:', rsvpEventsData);
                const transformedEvents = rsvpEventsData.map((item: any) => ({
                    orgName: item.events.orgName,
                    eventName: item.events.title,          // Map `title` to `eventName`
                    eventStartTime: item.events.startTime,
                    eventEndTime: item.events.endTime,
                    eventDate: item.events.date,           // Map `date` to `eventDate`
                    eventLocation: item.events.location,   // Map `location` to `eventLocation`
                }));
                setSelectedEvents(transformedEvents);
            } catch (error) {
                console.error('Error fetching RSVP events:', error);
            }
        };
        fetchRsvpEvents(); // Call the async function
    }, [user]);

    const removeEventFromSidebar = async (event: any) => {
        try {
            // Send the DELETE request to the server to remove the RSVP
            const response = await fetch('http://localhost:8080/rsvp', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    eventId: event.eventID,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove RSVP');
            }

            // Proceed with the local state updates after a successful request
            setSelectedEvents((prev) => prev.filter(e => e.eventName !== event.eventName));
            setRsvpStatus((prev) => ({
                ...prev,
                [event.eventName]: false,  // Set RSVP to false for this event
            }));

            console.log('Event removed from sidebar and RSVP status updated');
        } catch (error) {
            console.error('Error removing event from sidebar:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Upcoming Events</h1>
                <EventCardList
                    addEventToSidebar={addEventToSidebar}
                    removeEventFromSidebar={removeEventFromSidebar}
                    rsvpStatus={rsvpStatus}
                    selectedEvents={selectedEvents}
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
