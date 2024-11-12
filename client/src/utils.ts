import { Conversation } from "./types/types";

const API_URL = "http://localhost:8080"

/**
 * Get all the user's messages
 *
 * @returns a list of conversations sorted by most recent first
 */
export const getMessages = async (): Promise<Conversation[]> => {
    const resp = await fetch(`${API_URL}/messages`);
    return resp.json();
}

/**
 * Send a message
 *
 * @param recipientId the user id of the recipient
 * @param content the content of the message
 * @returns the json response from the POST
 */
export const sendMessage = async (recipientId: string, content: string) => {
    const resp = await fetch(`${API_URL}/messages`, 
        { 
            method: "POST",
            body: JSON.stringify({
                recipientId,
                content
            })
        }
    )

    return resp.json();
}

