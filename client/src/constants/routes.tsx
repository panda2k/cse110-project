// src/constants/routes.tsx
import { AppRoute } from "../types/AppRoute";
import Test from "../components/Test";
import ClubRSVPView from "../views/ClubOwnerRSVPView";
import LoginPage from "../components/LoginPage"; // Import the LoginPage component

// add a route by specifying a path, followed by your JSX element. Import said element above.
// See the path "/" as an example.


export const routes: AppRoute[] = [
    {path: "/", element: <LoginPage />},  // Set LoginPage as the root component
    {path: "/test", element: <div>this is atest</div>},
    {path: "/clubrsvp", element: <ClubRSVPView id="abc"/>}
]
