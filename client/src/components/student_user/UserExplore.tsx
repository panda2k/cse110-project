import React, { useState, useEffect } from 'react';
import '../../styles/EventsCardList.css';
import { fetchEvents } from '../../utils/event-utils';

interface Event {
    orgName: string;
    eventID?: string;
    eventName: string;
    eventStartTime: string;
    eventEndTime: string;
    eventDate: string;
    eventLocation: string;
    description: string;
    image?: string | undefined;
    url?: string;
}

const UserExplore: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const getEvents = async () => {
            try {
                const eventsData = await fetchEvents();
                const transformedEvents: Event[] = eventsData.map((item: any) => ({
                    orgName: item.orgName,
                    eventID: item.id,
                    eventName: item.title,
                    eventStartTime: item.startTime,
                    eventEndTime: item.endTime,
                    eventDate: item.date,
                    eventLocation: item.location,
                    description: item.description,
                    url: item.url,
                    image: item.image
                }));
                setEvents(transformedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        getEvents();
    }, []);

    return (
        <div>
            <header id="Navigationbar">
                <div className="Searchbar">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Seal_of_the_University_of_California%2C_San_Diego.svg/300px-Seal_of_the_University_of_California%2C_San_Diego.svg.png"
                        alt="Logo"
                    />
                </div>
                <ul className="nav-links">
                    <li><a href="/user-homepage">FOR YOU</a></li>
                    <li><a href="/user-explore">EXPLORE</a></li>
                    <li><a href="/upcoming">UPCOMING</a></li>
                </ul>
                <button className="Message-button">
                </button>
            </header>
            <div className="body">
                <div className="event-card-list">
                    {events.map((event) => (
                        <div className="event-card" key={event.eventID}>
                            <img src={event.image} alt={event.eventName} className="event-image" />
                            <div className="card-content">
                                <h3>{event.orgName}</h3>
                                <h3>{event.eventName}</h3>
                                <p><strong>Start Time:</strong> {event.eventStartTime}</p>
                                <p><strong>End Time:</strong> {event.eventEndTime}</p>
                                <p><strong>Date:</strong> {event.eventDate}</p>
                                <p><strong>Location:</strong> {event.eventLocation}</p>
                                <p><strong>Description:</strong> {event.description}</p>
                                {event.url && (
                                    <p><strong>URL:</strong> <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a></p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserExplore;
