import React, { useState, useEffect, useContext } from 'react';
import "../../styles/Home.css";
import MyEventsList from './MyEventsList';
import EventForm from './EventForm';
import { fetchEventsByID } from '../../utils/event-utils'; // Import the fetchEvents method
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

interface Event {
    eventID?: string;
    orgName: string;
    eventName: string;
    eventStartTime: string;
    eventEndTime: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string | null;
    url?: string;
    orgID?: string;
}

const ClubPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const [events, setEvents] = useState<Event[]>([]);

    const [accMenu, setAccMenu] = useState<boolean>(false);
    const navigate = useNavigate();

    // Fetch events from the API when the component mounts
    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventsData = await fetchEventsByID(String(user.id)); // Use the fetchEvents function
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
                    image: item.image,
                    url: item.url,
                    orgID: item.orgID
                }));
                setEvents(transformedEvents); // Set the fetched events in state
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        getEvents();
    }, [user]);

    const handleAddEvent = (newEvent: Event) => {
        setEvents([...events, newEvent]);
    };

    const handleEditEvent = (index: number, updatedEvent: Event) => {
        const updatedEvents = [...events];
        updatedEvents[index] = updatedEvent;
        setEvents(updatedEvents);
    };

    const handleDeleteEvent = (eventID: string) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.eventID !== eventID));

    };

    return (

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <header id="Navigationbar">
                <div className="Searchbar">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Seal_of_the_University_of_California%2C_San_Diego.svg/300px-Seal_of_the_University_of_California%2C_San_Diego.svg.png"
                        alt="Logo"
                    />
                </div>
                <ul className="nav-links">
                    <li><a href="/club-page">DASHBOARD</a></li>
                    <li><a href="/explore">EXPLORE</a></li>
                </ul>
                <button className="Message-button" onClick={() => setAccMenu(!accMenu)}>
                </button>
                { accMenu ? <div className="acc-menu">
                    <button onClick={() => navigate("/messages")}>Messages</button>
                    <button onClick={() => {googleLogout(); navigate("/")}}> Logout </button>
                    </div> : null}
            </header>
            {/* <div style={{ flex: '1', marginRight: '20px' }}>
                <h1>Event Management</h1>
                <EventForm onAddEvent={handleAddEvent} />
            </div> */}
            <div className="body">
                <div style={{ flex: '1' }}>
                    {/* Pass the events data to MyEventsList */}
                    <MyEventsList
                        events={events}          // Pass fetched events as a prop
                        onEditEvent={handleEditEvent}  // Pass edit handler
                        onDeleteEvent={handleDeleteEvent}  // Pass delete handler
                        onAddEvent={handleAddEvent}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClubPage;
