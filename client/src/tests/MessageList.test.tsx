import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Wrap with MemoryRouter
import MessageList from "../components/MessageList";
import { AuthContext } from "../context/AuthContext";
import { UserType, Conversation } from "../types/types";
import * as utils from "../utils";

// Mock the user context
const mockUser = {
    id: 1,
    type: UserType.STUDENT,
    username: "testuser"
};

// Mock implementation for login and logout
const mockLogin = jest.fn();
const mockLogout = jest.fn();

jest.mock("../utils", () => ({
    getMessages: jest.fn(),
    sendMessage: jest.fn(),
}));

describe("MessageList Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should display 'No conversations yet' if no conversations are returned", async () => {
        // Mock the API call to return an empty array
        (utils.getMessages as jest.Mock).mockResolvedValue([]);

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: mockUser, login: mockLogin, logout: mockLogout }}>
                    <MessageList />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // Check for the 'No conversations yet' message
        expect(screen.getByTestId("info-message")).toBeInTheDocument();
        expect(screen.getByTestId("no-conversations")).toBeInTheDocument();
    });

    test("should render conversation list", async () => {
        // Mock the API to return a list of conversations
        const mockConversations: Conversation[] = [
            {
                otherParticipant: { id: 2, username: "otheruser" },
                messages: [
                    {
                        content: "Hello",
                        date: new Date(),
                        organizationId: 2,
                        studentId: 1,
                        author: UserType.STUDENT,
                        id: "1"
                    }
                ]
            }
        ];
        (utils.getMessages as jest.Mock).mockResolvedValue(mockConversations);

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: mockUser, login: mockLogin, logout: mockLogout }}>
                    <MessageList />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // Verify the conversation list is rendered
        await waitFor((() => expect(screen.getByText("otheruser")).toBeInTheDocument()), { timeout: 5000 });
    });

    test("should select a conversation when clicked", async () => {
        const mockConversations: Conversation[] = [
            {
                otherParticipant: { id: 2, username: "otheruser" },
                messages: [
                    {
                        content: "Hello",
                        date: new Date(),
                        organizationId: 2,
                        studentId: 1,
                        author: UserType.STUDENT,
                        id: "1"
                    }
                ]
            }
        ];
        (utils.getMessages as jest.Mock).mockResolvedValue(mockConversations);

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: mockUser, login: mockLogin, logout: mockLogout }}>
                    <MessageList />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        await waitFor(() => expect(screen.getByText("otheruser")).toBeInTheDocument(), { timeout: 5000 })
        const conversation = screen.getByText("otheruser");
        fireEvent.click(conversation);

        // Check if the conversation is selected
        await waitFor(() => expect(screen.getAllByText("Hello")).toHaveLength(2), { timeout: 2000 });
    });

    test("should send a message", async () => {
        const mockConversations: Conversation[] = [
            {
                otherParticipant: { id: 2, username: "otheruser" },
                messages: [
                    {
                        content: "Hello",
                        date: new Date(),
                        organizationId: 2,
                        studentId: 1,
                        author: UserType.STUDENT,
                        id: "1"
                    }
                ]
            }
        ];
        (utils.getMessages as jest.Mock).mockResolvedValue(mockConversations);

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: mockUser, login: mockLogin, logout: mockLogout }}>
                    <MessageList />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        await waitFor(() => expect(screen.getByText("otheruser")).toBeInTheDocument(), { timeout: 5000 });
        // Select conversation
        const conversation = screen.getByText("otheruser");
        fireEvent.click(conversation);

        // Mock sending a new message
        const messageInput = screen.getByPlaceholderText("Message here...") as HTMLInputElement;
        fireEvent.change(messageInput, { target: { value: "New message" } });

        const sendButton = screen.getByTestId("send-message");
        fireEvent.click(sendButton);

        // Check if sendMessage was called with the correct arguments
        expect(utils.sendMessage).toHaveBeenCalledWith(
            UserType.STUDENT,
            1,
            2,
            "New message"
        );

        // Verify the new message is added
        await waitFor(() => {
            expect(screen.getAllByText("New message")).toHaveLength(2);
        });
    });

    test("should display 'Select a conversation first' when no conversation is selected", async () => {
        const mockConversations: Conversation[] = [
            {
                otherParticipant: { id: 2, username: "otheruser" },
                messages: [
                    {
                        content: "Hello",
                        date: new Date(),
                        organizationId: 2,
                        studentId: 1,
                        author: UserType.STUDENT,
                        id: "1"
                    }
                ]
            }
        ];
        (utils.getMessages as jest.Mock).mockResolvedValue(mockConversations);

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ user: mockUser, login: mockLogin, logout: mockLogout }}>
                    <MessageList />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // Verify info message for selecting a conversation
        await waitFor(() => expect(screen.getByText("Select a conversation first")).toBeInTheDocument(), { timeout: 5000 });
    });
});
