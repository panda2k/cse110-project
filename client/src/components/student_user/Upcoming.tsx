import React, { useEffect, useState, useContext } from "react";
import "../../styles/App.css";
import "../../styles/Home.css";
import { AuthContext } from "../../context/AuthContext";
import GoogleCalendarInt from "./GoogleCalButton";

const Upcoming = () => {
    const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
    const [rsvpStatus, setRsvpStatus] = useState<{ [key: string]: boolean }>({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchRsvpEvents = async () => {
            try {
                const userIDStr = user.id;
                const response = await fetch(`http://localhost:8080/rsvp/upcoming/${userIDStr}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch RSVP events");
                }
                const rsvpEventsData = await response.json();
                const transformedEvents = rsvpEventsData.map((item: any) => ({
                    orgName: item.events.orgName,
                    eventName: item.events.title,
                    eventStartTime: item.events.startTime,
                    eventEndTime: item.events.endTime,
                    eventDate: item.events.date,
                    eventLocation: item.events.location,
                }));
                setSelectedEvents(transformedEvents);
            } catch (error) {
                console.error("Error fetching RSVP events:", error);
            }
        };

        fetchRsvpEvents();
    }, [user]);

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
                    <li><a href="/user-homepage">HOME</a></li>
                    <li><a href="/user-explore">EXPLORE</a></li>
                    <li><a href="/upcoming">UPCOMING</a></li>
                </ul>
            </header>

            <div className="body">
                <h2>Upcoming Events</h2>
                <div className="Eventsgrid">
                    {selectedEvents.length > 0 ? (
                        selectedEvents.map((event, index) => (
                            <div key={index} className="event-card">
                                <h3>{event.eventName}</h3>
                                <p><b>Date:</b> {event.eventDate}</p>
                                <p><b>Time:</b> {event.eventStartTime} - {event.eventEndTime}</p>
                                <p><b>Location:</b> {event.eventLocation}</p>
                                <GoogleCalendarInt orgName={event.orgName} eventName={event.EventName} eventStartTime={event.eventStartTime} eventEndTime={event.eventEndTime} eventDate={event.eventDate} eventLocation={event.eventLocation} description={event.description}/>
                            </div>
                        ))
                    ) : (
                        <p>No upcoming events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upcoming;
