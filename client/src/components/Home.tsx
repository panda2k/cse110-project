import "../styles/App.css";
import "../styles/Home.css";
import { Post, Events } from "../constants/EventLists";
import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";


export const NewEvents = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<Post | null>(null);
    const [events, setEvents] = useState<Post[]>(Events);
    const [registeredEvents, setRegisteredEvents] = useState<{ [key: number]: boolean }>({});
    const [welcomePopup, setWelcomePopup] = useState(true);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);


    const interests = [
        "Marshall", "Revelle", "Muir", "Warren", "Sixth", "ERC", "Eighth", "Seventh",
        "Networking", "STEM", "Social", "Freebies", "Music"
    ];


    const toggleInterest = (interest: string) => {
        setSelectedInterests((prevSelectedInterests) =>
            prevSelectedInterests.includes(interest)
                ? prevSelectedInterests.filter(i => i !== interest)
                : [...prevSelectedInterests, interest]
        );
    };


    const closeWelcomePopup = () => setWelcomePopup(false);


    // Filter events based on search query
    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };


    // Handle each note click to create the popup
    const handleNoteClick = (eventData: Post) => {
        setSelectedEvent(eventData);
    };


    // Close the popup
    const closePopup = () => {
        setSelectedEvent(null);
    };


    // Toggle registration for a specific event
    const toggleRegistration = (eventId: number) => {
        setRegisteredEvents(prev => ({
            ...prev,
            [eventId]: !prev[eventId] // Toggle the registration status for the specific event ID
        }));
    };


    // Get registered events to display in the box
    const registeredEventsList = events.filter(event => registeredEvents[event.id]);


    useEffect(() => {
        setWelcomePopup(true);
    }, []);


    return (
        <div>
            {/* Welcome Popup */}
            {welcomePopup && (
                <div className="popup-overlay" onClick={closeWelcomePopup}>
                    <div className="welcome-popup" onClick={(e) => e.stopPropagation()}>
                        <h2>Hello User! <span role="img" aria-label="wave">👋</span></h2>
                        <p>Choose at least 3 interests:</p>
                        <div className="interests-grid">
                            {interests.map((interest, index) => (
                                <button
                                    key={index}
                                    className={`interest-button ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                                    onClick={() => toggleInterest(interest)}
                                >
                                    {interest}
                                </button>
                            ))}
                        </div>
                        <button className="confirm-button" onClick={closeWelcomePopup}>✓</button>
                    </div>
                </div>
            )}


            <header id="Navigationbar">
                <div className="Searchbar">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Seal_of_the_University_of_California%2C_San_Diego.svg/300px-Seal_of_the_University_of_California%2C_San_Diego.svg.png"
                        alt="Logo"
                    />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                <ul className="nav-links">
                    <li><a href="#ForYou">FOR YOU</a></li>
                    <li><a href="#Explore">EXPLORE</a></li>
                    <li><a href="#Upcoming">UPCOMING</a></li>
                </ul>
                <button
                    className="Message-button"
                    onClick={() => alert("Button clicked!")}
                />
            </header>
            <div className="body">
                <div className="Eventsgrid">
                    {/* Registered Events as the first item in the grid */}
                    {registeredEventsList.length > 0 && (
                        <div className="registered-events-container">
                            {registeredEventsList.map(event => (
                                <div key={event.id} className="registered-event-box">
                                    <h5>{event.title}</h5>
                                    <p>Date: {event.date}</p>
                                    <p>Time: {event.time}</p>
                                </div>
                            ))}
                        </div>
                    )}


                    {/* Main Event Grid */}
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="events-list" onClick={() => handleNoteClick(event)}>
                            <img src={event.image} alt={event.title} className="event-image" />
                        </div>
                    ))}
                </div>
            </div>


            {/* Popup for RSVP option */}
            {selectedEvent && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closePopup}>X</button>
                        <h2>{selectedEvent.title}</h2>
                        <h4>Date: {selectedEvent.date}</h4>
                        <h4>Time: {selectedEvent.time}</h4>
                        <div className="popup-desc">
                            <p>{selectedEvent.description}</p>
                        </div>
                        <div className="popup-footer">
                            <a href="dummyurl.com" target="_blank" rel="noopener noreferrer">dummyurl.com</a>
                            <button
                                className={`register-button ${registeredEvents[selectedEvent.id] ? 'registered' : ''}`}
                                onClick={() => toggleRegistration(selectedEvent.id)}
                            >
                                {registeredEvents[selectedEvent.id] ? "Unregister" : "Register"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};





