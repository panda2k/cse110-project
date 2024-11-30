import React, { useEffect, useState, useContext } from "react";
import "../../styles/App.css";
import "../../styles/Home.css";
import EventCardList from "./EventsCardList";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthContext";

export const Home = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
    const [rsvpStatus, setRsvpStatus] = useState<{ [key: string]: boolean }>({});
    const [welcomePopup, setWelcomePopup] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const { user } = useContext(AuthContext);

    const interests = [
        "Marshall", "Revelle", "Muir", "Warren", "Sixth", "ERC", "Eighth", "Seventh",
        "Networking", "STEM", "Social", "Freebies", "Music"
    ];

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prevSelectedInterests) =>
            prevSelectedInterests.includes(interest)
                ? prevSelectedInterests.filter(i => i !== interest)
                : [...prevSelectedInterests, interest]
        );
    };

    const closeWelcomePopup = () => {
        setWelcomePopup(false);
        localStorage.setItem("welcomePopupSeen", "true");  // Set the flag in localStorage
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

        // Check if the popup has already been seen
        if (!localStorage.getItem("welcomePopupSeen")) {
            setWelcomePopup(true);  // Show popup if not seen before
        }
    }, [user]);

    const removeEventFromSidebar = async (event: any) => {
        try {
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
        <div>
            {/* Welcome Popup */}
            {welcomePopup && (
                <div className="popup-overlay" onClick={closeWelcomePopup}>
                    <div className="welcome-popup" onClick={(e) => e.stopPropagation()}>
                        <h2>Hello {user?.name || "User"}! <span role="img" aria-label="wave">👋</span></h2>
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
                <EventCardList
                    addEventToSidebar={addEventToSidebar}
                    removeEventFromSidebar={removeEventFromSidebar}
                    rsvpStatus={rsvpStatus}
                    selectedEvents={selectedEvents}
                />
            </div>

            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                selectedEvents={selectedEvents}
                removeEventFromSidebar={removeEventFromSidebar}
                rsvpStatus={rsvpStatus}
            />
        </div>
    );
};
