import { AppRoute } from "../types/AppRoute";
import Test from "../components/Test";
import ClubRSVPView from "../views/ClubOwnerRSVPView";

// add a route by specifying a path, followed by your JSX element. Import said element above.
// See the path "/" as an example.


export const routes: AppRoute[] = [
    {path: "/", element: <Test></Test>},
    {path: "/test", element: <div>this is atest</div>},
    {path: "/clubrsvp", element: <ClubRSVPView id="abc"/>}
]