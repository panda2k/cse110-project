import React, { useEffect, useState } from "react";
import { ClubEvent } from "../types/Event";
import { getRSVP } from "../utils/event-utils";
import { User } from "../types/User";
import UserListEntry from "../components/UserListEntry";
import '../styles/ClubOwnerRSVPView.css';
import CBClip from '../assets/CBClip.png';

const ClubRSVPView: React.FC<ClubEvent> = ({id}): JSX.Element => {

    const arr : User[] = [];
    const [userList, setUserList] = useState(arr);
    const [eventId, setEventId] = useState(""); // TEMPORARY variable for demonstration purposes.

    const getEventRSVP = async (id : string) => {
        const users = await getRSVP({id});
        setUserList(users);
    }

    useEffect(() => {
        getEventRSVP(eventId);
    }, [eventId]);

    return (
        <div className="clubOwnerContainer">
            <img className="CBClip" src={CBClip} alt="" />
            <div className="offsetClipBoard"></div>
            <div className="contentContainer">
                <form>
                    <label htmlFor="eventId">Current Event Id: </label>
                    <input value={eventId} id="eventId" type="text" onChange={(event) => {setEventId(event.target.value)}} />   
                </form>
                <div><mark>{userList.length}</mark> Attendees</div>
                <div className="listContainer">
                    <div className="userList">
                        <UserListEntry firstName="Full Name" lastName="" userId="" userName="Username"/>
                        {userList.map((user) => (
                            <UserListEntry firstName={user.firstName} lastName={user.lastName} userId={user.userId} userName={user.userName}/>
                        ))}
                    </div>  
                </div>
            </div>
        </div>
    );

}

export default ClubRSVPView;