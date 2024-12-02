import { Conversation, UserType } from "./types/types";

const API_URL = "http://localhost:8080"

/**
 * Get all the user's messages
 *
 * @returns a list of conversations sorted by most recent first
 */
export const getMessages = async (userType: UserType, userId: number): Promise<Conversation[]> => {
    const resp = await fetch(`${API_URL}/messages/${userType}/${userId}`);
    return resp.json();
}

/**
 * Send a message
 *
 * @param recipientId the user id of the recipient
 * @param content the content of the message
 * @returns the json response from the POST
 */
export const sendMessage = async (author: UserType, studentId: number, organizationId: number, content: string) => {
    const resp = await fetch(`${API_URL}/messages`,
        {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentId,
                organizationId,
                author,
                content
            })
        }
    )

    return resp.json();
}

