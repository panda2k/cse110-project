import React, { useEffect, useState } from "react";
import { ClubEvent } from "../types/Event";
import { getRSVP } from "../utils/event-utils";
import { User } from "../types/User";
import UserListEntry from "../components/UserListEntry";
import '../styles/ClubOwnerRSVPView.css';

const ClubRSVPView: React.FC<ClubEvent> = ({id}): JSX.Element => {

    const arr : User[] = [];
    const [userList, setUserList] = useState(arr);

    const getEventRSVP = async () => {
        const users = await getRSVP({id});
        setUserList(users);
    }

    useEffect(() => {
        getEventRSVP();
    }, []);

    return (
        <div>
            <div>Total RSVP: {userList.length}</div>
            <div className="userList">
                {userList.map((user) => (
                    <UserListEntry firstName={user.firstName} lastName={user.lastName} userId={user.userId} userName={user.userName}/>
                ))}
            </div>  
        </div>
    );

}

export default ClubRSVPView;