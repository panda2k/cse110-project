import { Events } from "../types/event";
import { User } from "../types/user"

const BASE_URL = "http://localhost:3000";

export const getEvents = async (): Promise<any[]> => {
    try {
        const response = await fetch(`${BASE_URL}/events`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events");
    }
};

export const postRSVP = async (eventId: string, userName: string): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/rsvp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId, userName }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error posting RSVP:", error);
        throw new Error("Failed to post RSVP");
    }
};