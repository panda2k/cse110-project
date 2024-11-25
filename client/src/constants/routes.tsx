// src/constants/routes.tsx
import { AppRoute } from "../types/AppRoute";
import Test from "../components/Test";
import LoginPage from "../components/LoginPage"; // Import the LoginPage component
import MessageList from "../components/MessageList";
export const routes: AppRoute[] = [
    { path: "/", element: <LoginPage /> },  // Set LoginPage as the root component
    { path: "/test", element: <Test /> },   // Test component at /test path
    { path: "/messages", element: <MessageList /> },   // Test component at /messages path
    // Add additional routes if needed
];
