// src/constants/routes.tsx
import { AppRoute } from "../types/AppRoute";
import Test from "../components/Test";
import LoginPage from "../components/LoginPage"; // Import the LoginPage component
import MessageList from "../components/MessageList";
import UserHomepage from "../components/student_user/UserHomepage";
import ClubPage from "../components/student_org/ClubPage";
import { Home } from "../components/student_user/Home";
import Upcoming from "../components/student_user/Upcoming";

export const routes: AppRoute[] = [
    { path: "/", element: <LoginPage /> },  // Set LoginPage as the root component
    { path: "/test", element: <Test /> },   // Test component at /test path
    { path: "/messages", element: <MessageList /> },   // Test component at /messages path
    { path: "/user-homepage", element: <Home /> },
    { path: "/club-page", element: <ClubPage /> },
    { path: "/upcoming", element: <Upcoming /> }
    // Add additional routes if needed
];
