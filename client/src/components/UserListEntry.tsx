import React, { useState } from "react";
import { ClubEvent } from "../types/Event";
import { getRSVP } from "../utils/event-utils";
import { User } from "../types/User";
import '../styles/UserListEntry.css';

const UserListEntry = (user : User) => {
    return (
        <div className="entryContainer">
            <div className="entryElement">
                {user.firstName} {user.lastName}
            </div>
            <div className="entryElement">
                {user.userName}
            </div>
        </div>
    );
}

export default UserListEntry;