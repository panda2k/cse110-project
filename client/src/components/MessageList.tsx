import { useEffect, useState } from "react";
import { Conversation } from "../types/types";
import { getMessages } from "../utils";

export default function MessageList() {
    const [messages, setMessages] = useState<Conversation[]>([]);

    useEffect(() => {
        const interval = setInterval(async () => {
            setMessages(await getMessages());
        }, 15000)
        return () => clearInterval(interval);
    }, [setMessages]);

    return (
        <div>
        </div>
    );
}
