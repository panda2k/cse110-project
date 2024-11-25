import React, { useState, useEffect } from 'react';
import "../../styles/ClubPage.css";
import MyEventsList from './MyEventsList';
import EventForm from './EventForm';
import { fetchEvents } from '../../utils/event-utils'; // Import the fetchEvents method

interface Event {
    eventID?: string;
    eventName: string;
    eventTime: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string | null;
}

const ClubPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    // Fetch events from the API when the component mounts
    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventsData = await fetchEvents(); // Use the fetchEvents function
                console.log(eventsData);
                const transformedEvents: Event[] = eventsData.map((item: any) => ({
                    eventID: item.id,               // Map `id` to `eventID`
                    eventName: item.title,          // Map `title` to `eventName`
                    eventTime: item.time,
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
            <div style={{ flex: '1', marginRight: '20px' }}>
                <h1>Event Management</h1>
                <EventForm onAddEvent={handleAddEvent} />
            </div>
            <div style={{ flex: '1' }}>
                {/* Pass the events data to MyEventsList */}
                <MyEventsList
                    events={events}          // Pass fetched events as a prop
                    onEditEvent={handleEditEvent}  // Pass edit handler
                    onDeleteEvent={handleDeleteEvent}  // Pass delete handler
                />
            </div>
        </div>
    );
};

export default ClubPage;
