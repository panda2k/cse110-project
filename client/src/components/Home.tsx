import "../styles/App.css"
import "../styles/Home.css"
import {Post, Events} from "../constants/EventLists"
import React from "react"
import { useState } from "react"
import { Route, Routes, Link } from "react-router-dom"



export const NewEvents = () =>{
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<Post | null>(null);
    const [events, setEvents] = useState<Post[]>([]); 

    // Filter events based on search query
    const filteredEvents = Events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    //Handle each note click to create the popup
    const handleNoteClick = (eventData: Post) => {
        setSelectedEvent(eventData);
    };

    //Close the popup
    const closePopup = () => {
        setSelectedEvent(null);
    }
    
    return(
        <div>
            <header id= "Navigationbar">
                <div className="Searchbar">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Seal_of_the_University_of_California%2C_San_Diego.svg/300px-Seal_of_the_University_of_California%2C_San_Diego.svg.png" //Placeholder logo
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
                        onClick={() => alert("Button clicked!")}  //Change this to link to messaging page
                    />
            </header>
            <div className="body">
                <div className="Eventsgrid">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="events-list" onClick={() => handleNoteClick(event)}>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Popup that shows the RSVP option */}
            {selectedEvent && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closePopup}>X</button>
                        <h2>{selectedEvent.title}</h2>
                        <p>{selectedEvent.description}</p>
                        <button
                            className="register-button"
                            onClick={() => alert(`Registered for ${selectedEvent.title}`)}
                        >
                            Register
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};