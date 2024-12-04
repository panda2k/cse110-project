import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Conversation, UserType } from "../types/types";
import { getMessages, sendMessage } from "../utils";
import "./MessageList.css"
import { useNavigate } from "react-router-dom";

const getInitials = (name: string) => {
    return name.split(" ").map(s => s.charAt(0)).join("");
}

export default function MessageList() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversation, setCurrentConversation] = useState<number>(-1);
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(async () => {
            if (user) {
                setConversations(await getMessages(user.type, user.id));
            }
        }, 1000)
        return () => clearInterval(interval);
    }, [setConversations, user]);

    const onFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            content: { value: string }
        }
        const userId = user.id;
        const studentId = user.type === UserType.STUDENT ? user.id : currentConversation;
        const organizationId = user.type === UserType.STUDENT ? currentConversation : user.id;
        sendMessage(user.type, studentId, organizationId, formElements.content.value);
        const newConversations = [...conversations];
        newConversations.find(c => c.otherParticipant.id === currentConversation)?.messages.push({
            content: formElements.content.value,
            studentId,
            organizationId,
            author: user.type,
            date: new Date(),
            id: String(+new Date())
        })
        setConversations(newConversations);
        formElements.content.value = "";
    }

    return (
        <div className="outer">
            {
                user ?
                    <>
                        <div className="container">
                            <div className="user-list">
                                {!conversations.length && <div data-testid="no-conversations" className="no-conversations">No conversations yet</div>}
                                {conversations.map(({ otherParticipant, messages }) => (
                                    <div key={otherParticipant.id} onClick={() => setCurrentConversation(otherParticipant.id)}>
                                        <div className="picture">
                                            <div className="picture-inner">{getInitials(otherParticipant.username)}</div>
                                        </div>
                                        <div className="preview">
                                            <p>{otherParticipant.username}</p>
                                            <p>{messages.at(-1)?.content ?? "Message cannot be loaded"}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="message-container">
                                {currentConversation !== -1 ? (
                                    <>
                                        <div className="header">
                                            <div className="picture">
                                                <div className="picture-inner">{getInitials(conversations.find(c => c.otherParticipant.id === currentConversation)?.otherParticipant.username ?? "")}</div>
                                            </div>
                                            <div className="name">
                                                {conversations.find(c => c.otherParticipant.id === currentConversation)?.otherParticipant.username}
                                            </div>
                                        </div>
                                        <div className="messages">
                                            {
                                                currentConversation !== -1 && conversations.find(c => c.otherParticipant.id === currentConversation)?.messages.slice().reverse().map(m => (
                                                    <div key={m.id} className={m.author === user.type ? "own-message" : "other-message"}>
                                                        <div>{m.content}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <form className="send-message" onSubmit={onFormSubmit}>
                                            <div>
                                                <input id="content" type="text" placeholder="Message here..." />
                                                <button type="submit" data-testid="send-message">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" /><path d="M6 12h16" /></svg>
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                ) : <div data-testid="info-message" className="info-message">{conversations.length ? "Select a conversation first" : "No conversations yet"}</div>}
                            </div>
                        </div>
                        <button className="back-button" onClick={() => navigate("/user-homepage")}>
                            <i className="material-icons">arrow_back</i>
                        </button>
                    </>
                    :
                    <div>
                        You must login before you can view messages
                    </div>
            }
        </div>
    );
}
