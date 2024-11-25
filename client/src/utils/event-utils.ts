import { Event } from "../types/Event";

export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response = await fetch(`http://localhost:8080/events`);

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const jsonResponse = await response.json(); // Await the JSON response
        console.log("Raw API response:", jsonResponse);

        // if (!jsonResponse.data) {
        //     throw new Error("Unexpected response format");
        // }

        // console.log("Data in fetchEvents:", jsonResponse.data);
        return jsonResponse;
    } catch (error) {
        console.error("Error in fetchEvents:", error);
        return [];
    }
};