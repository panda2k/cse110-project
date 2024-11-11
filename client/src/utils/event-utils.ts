import { API_BASE_URL } from "../constants/misc";
import { ClubEvent } from "../types/Event";
import { User } from "../types/User";

export const getRVSP = async (event: ClubEvent): Promise<User[]> => { 
	const response = await fetch(`${API_BASE_URL}/rsvp/${event.id}`	);
	if (!response.ok) {
    	throw new Error("Failed to get RSVPs");
	}
	return response.json();
};