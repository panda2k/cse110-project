import "../styles/App.css";
import "../styles/Home.css";
import React, { useEffect, useState } from "react";
import { getEvents, postRSVP } from "../utils/event-utils"; // Import utility functions
import { Events } from "../types/event"; // Assuming this is where Event type is defined

export const NewEvents = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
    const [events, setEvents] = useState<Events[]>([]);
    const [registeredEvents, setRegisteredEvents] = useState<{ [key: string]: boolean }>({});
    const [welcomePopup, setWelcomePopup] = useState(true);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const interests = [
        "Marshall", "Revelle", "Muir", "Warren", "Sixth", "ERC", "Eighth", "Seventh",
        "Networking", "STEM", "Social", "Freebies", "Music"
    ];

    // Fetch events on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents(); // Use the utility function to fetch events
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
        setWelcomePopup(true); // Show welcome popup on load
    }, []);

    // Toggle interest selection
    const toggleInterest = (interest: string) => {
        setSelectedInterests((prevSelectedInterests) =>
            prevSelectedInterests.includes(interest)
                ? prevSelectedInterests.filter(i => i !== interest)
                : [...prevSelectedInterests, interest]
        );
    };

    // Close welcome popup
    const closeWelcomePopup = () => setWelcomePopup(false);

    // Filter events based on search query
    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    // Open event popup
    const handleNoteClick = (eventData: Events) => {
        setSelectedEvent(eventData);
    };

    // Close event popup
    const closePopup = () => {
        setSelectedEvent(null);
    };

    // Send RSVP to the database and toggle registration
    const toggleRegistration = async (eventId: string) => {
        const userName = "current_user"; // Replace with actual logged-in username

        const isRegistered = registeredEvents[eventId];

        try {
            if (!isRegistered) {
                await postRSVP(eventId, userName); // Use the utility function to send RSVP
            }
            setRegisteredEvents(prev => ({
                ...prev,
                [eventId]: !isRegistered, // Toggle registration status locally
            }));
        } catch (error) {
            console.error("Error toggling registration:", error);
        }
    };

    // Get registered events to display in the box
    const registeredEventsList = events.filter(event => registeredEvents[event.id]);

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
                    {/* Registered Events */}
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

            {/* Popup for RSVP */}
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
                        <button
                            className={`register-button ${registeredEvents[selectedEvent.id] ? 'registered' : ''}`}
                            onClick={() => toggleRegistration(selectedEvent.id.toString())} // Convert to string
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
