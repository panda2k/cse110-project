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
        
        const formattedEvents = data.map((event:any)=> {
            const date = new Date(event.date);

            //Extract Month/Day
            const monthName = date.toLocaleString("en-US", { month: "long" });
            const day = date.getDate().toString().padStart(2,"0");

              // Extract hours, minutes, and seconds
              let hours = date.getHours();
              const minutes = date.getMinutes().toString().padStart(2, "0");

            //Convert time into 12 hour format
              let period = "AM";
            if (hours >= 12) {
                period = "PM";
                if (hours > 12) {
                    hours = hours - 12; 
                }
            } else if (hours === 0) {
                hours = 12; 
            }


              const time = `${hours}:${minutes} ${period}`;
              const monthDay = `${monthName} ${day}`;

              return {
                id: event.id,
                title: event.title,
                description: event.description,
                monthDay: monthDay,
                time: time,
                poster: event.image,
                tags: event.tags, // Send tags as is (comma-separated string)
            };
        })



        return formattedEvents;
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

export const deleteRSVP = async (eventId: string, userName: string): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/rsvp`, {
            method: "DELETE",
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
        console.error("Error deleting RSVP:", error);
        throw new Error("Failed to delete RSVP");
    }
};
