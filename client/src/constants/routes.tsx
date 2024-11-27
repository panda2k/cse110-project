// src/constants/routes.tsx
import { AppRoute } from "../types/AppRoute";
import Test from "../components/Test";
import LoginPage from "../components/LoginPage"; // Import the LoginPage component
import MessageList from "../components/MessageList";
import UserHomepage from "../components/student_user/UserHomepage";
import ClubPage from "../components/student_org/ClubPage";
export const routes: AppRoute[] = [
    { path: "/", element: <LoginPage /> },  // Set LoginPage as the root component
    { path: "/test", element: <Test /> },   // Test component at /test path
    { path: "/messages", element: <MessageList /> },   // Test component at /messages path
    { path: "/user-homepage", element: <UserHomepage /> },
    { path: "/club-page", element: <ClubPage /> }
    // Add additional routes if needed
];
