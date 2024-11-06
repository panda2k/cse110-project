import React, { useState } from 'react';
import '../styles/EventForm.css';

// Define the event interface to specify the structure of an event object
// Most likely will need to add more features such as RSVP count
interface Event {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    description: string;
}

// Define props for the EventForm component, which includes an onAddEvent function
interface EventFormProps {
    onAddEvent: (event: Event) => void;
}

// Create the EventForm component, accepting onAddEvent as a prop
const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
    // State variables to handle form input values
    const [eventName, setEventName] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>('');
    const [eventLocation, setEventLocation] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    // Optionally, a backend API call could be added here to fetch default or saved data for editing

    // Function to handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create an event object with the form values
        const eventData = {
            eventName,
            eventDate,
            eventLocation,
            description,
        };

        // This would be where a backend API call could be added to save the event to a database
        // make a POST request to the backend API to save the event data to a database


        // Pass the event data to the onAddEvent function from props
        onAddEvent(eventData); // Call the prop function to add event

        // Clear form inputs after submission
        setEventName('');
        setEventDate('');
        setEventLocation('');
        setDescription('');
    };

    // Render the form component with input fields for each event property
    return (
        <div className="event-form-card">
            <form onSubmit={handleSubmit}>
                <h2>Create Event</h2>
                <div>
                    {/* Event Name Input */}
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        type="text"
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* Event Date Input */}
                    <label htmlFor="eventDate">Event Date:</label>
                    <input
                        type="date"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* Event Location Input */}
                    <label htmlFor="eventLocation">Event Location:</label>
                    <input
                        type="text"
                        id="eventLocation"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* Event Description Input */}
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Publish Event</button>
            </form>
        </div>
    );
};

export default EventForm;