import { useEffect, useState } from "react";
import { Conversation } from "../types/types";
import { getMessages } from "../utils";
import "./MessageList.css"

const testConversations: Conversation[] = [
    {
        otherParticipant: {
            id: "user-123",
            name: "Alice",
        },
        messages: [
            { recipientId: "me", content: "Hey, how are you?", date: new Date("2024-11-15T10:00:00Z"), authorId: "user-123", id: "msg-1" },
            { recipientId: "user-123", content: "I'm good, thanks! How about you?", date: new Date("2024-11-15T10:02:00Z"), authorId: "me", id: "msg-2" },
            { recipientId: "me", content: "Doing well! Are we still on for lunch tomorrow?", date: new Date("2024-11-15T10:03:00Z"), authorId: "user-123", id: "msg-3" },
            { recipientId: "user-123", content: "Yes, 12:30 at the usual spot?", date: new Date("2024-11-15T10:04:00Z"), authorId: "me", id: "msg-4" },
            { recipientId: "me", content: "Perfect, see you then!", date: new Date("2024-11-15T10:05:00Z"), authorId: "user-123", id: "msg-5" },
        ],
    },
    {
        otherParticipant: {
            id: "user-456",
            name: "Bob",
        },
        messages: [
            { recipientId: "me", content: "Can you review my code?", date: new Date("2024-11-14T09:15:00Z"), authorId: "user-456", id: "msg-1" },
            { recipientId: "user-456", content: "Sure, send it over!", date: new Date("2024-11-14T09:17:00Z"), authorId: "me", id: "msg-2" },
            { recipientId: "me", content: "Just sent it to your email.", date: new Date("2024-11-14T09:18:00Z"), authorId: "user-456", id: "msg-3" },
            { recipientId: "user-456", content: "Got it. I’ll take a look and get back to you soon.", date: new Date("2024-11-14T09:20:00Z"), authorId: "me", id: "msg-4" },
            { recipientId: "me", content: "Thanks! Let me know if you have any questions.", date: new Date("2024-11-14T09:21:00Z"), authorId: "user-456", id: "msg-5" },
        ],
    },
    {
        otherParticipant: {
            id: "user-789",
            name: "Charlie",
        },
        messages: [
            { recipientId: "me", content: "Did you finish the presentation?", date: new Date("2024-11-13T08:30:00Z"), authorId: "user-789", id: "msg-1" },
            { recipientId: "user-789", content: "Not yet, I’m wrapping up the slides now.", date: new Date("2024-11-13T08:32:00Z"), authorId: "me", id: "msg-2" },
            { recipientId: "me", content: "Do you need help with anything?", date: new Date("2024-11-13T08:33:00Z"), authorId: "user-789", id: "msg-3" },
            { recipientId: "user-789", content: "Maybe proofreading later, if you don’t mind.", date: new Date("2024-11-13T08:34:00Z"), authorId: "me", id: "msg-4" },
            { recipientId: "me", content: "Of course, just send it my way!", date: new Date("2024-11-13T08:35:00Z"), authorId: "user-789", id: "msg-5" },
        ],
    },
    {
        otherParticipant: {
            id: "user-321",
            name: "Dana",
        },
        messages: [
            { recipientId: "me", content: "Did you see the latest episode?", date: new Date("2024-11-12T20:00:00Z"), authorId: "user-321", id: "msg-1" },
            { recipientId: "user-321", content: "Not yet, no spoilers please!", date: new Date("2024-11-12T20:01:00Z"), authorId: "me", id: "msg-2" },
            { recipientId: "me", content: "Okay, but you’re going to love it!", date: new Date("2024-11-12T20:02:00Z"), authorId: "user-321", id: "msg-3" },
            { recipientId: "user-321", content: "Now I’m even more excited to watch!", date: new Date("2024-11-12T20:03:00Z"), authorId: "me", id: "msg-4" },
            { recipientId: "me", content: "Text me when you’re done watching, I want to discuss it!", date: new Date("2024-11-12T20:04:00Z"), authorId: "user-321", id: "msg-5" },
        ],
    },
    {
        otherParticipant: {
            id: "user-654",
            name: "Eve",
        },
        messages: [
            { recipientId: "me", content: "Are you free to join the meeting tomorrow?", date: new Date("2024-11-11T15:00:00Z"), authorId: "user-654", id: "msg-1" },
            { recipientId: "user-654", content: "What time is it?", date: new Date("2024-11-11T15:01:00Z"), authorId: "me", id: "msg-2" },
            { recipientId: "me", content: "10 AM, conference room B.", date: new Date("2024-11-11T15:02:00Z"), authorId: "user-654", id: "msg-3" },
            { recipientId: "user-654", content: "I’ll be there. Thanks for letting me know!", date: new Date("2024-11-11T15:03:00Z"), authorId: "me", id: "msg-4" },
            { recipientId: "me", content: "Great, see you then!", date: new Date("2024-11-11T15:04:00Z"), authorId: "user-654", id: "msg-5" },
        ],
    }
];

export default function MessageList() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const userId = "me";

    useEffect(() => {
        const interval = setInterval(async () => {
            //setConversations(await getMessages());
            setConversations(testConversations);
        }, 15000)
        return () => clearInterval(interval);
    }, [setConversations]);

    return (
        <div className="container">
            <div className="user-list">
                { conversations.map(({ otherParticipant, messages }) => (
                    <div>
                        <p>{otherParticipant.name}</p>
                        <p>{messages.at(-1)?.content ?? "Message cannot be loaded"}</p>
                    </div>
                )) }
            </div>
            <div className="messages">
                { conversations.map(({ messages }) => (
                    <div>
                        { messages.map(m => (
                            <div className={ m.authorId === userId ? "own-message" : "other-message" }>
                                <div>{m.content}</div>
                            </div>
                        )) }
                    </div>
                )) } 
            </div>
        </div>
    );
}
