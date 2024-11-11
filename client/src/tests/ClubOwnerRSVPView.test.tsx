import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';
import { User } from '../types/User';
import UserListEntry from '../components/UserListEntry';

test('Component renders all users passed in', () => {
    const user1 : User = {
        firstName: "Jon",
        lastName: "Doe",
        userName: "JD123",
        userId: "aaaa"
    }

    const user2 : User = {
        firstName: "Jane",
        lastName: "Smith",
        userName: "JS01",
        userId: "bbbb"
    }
    const userList : User[] = [user1, user2]
	render(<div>
        <div>Total RSVP: {userList.length}</div>
        <div className="userList">
            {userList.map((user) => (
                <UserListEntry firstName={user.firstName} lastName={user.lastName} userId={user.userId} userName={user.userName}/>
            ))}
        </div>  
    </div>);
	for (const user of userList) {
        const userEntry = screen.getByText("Username: " + user.userName);
        expect(userEntry).toBeInTheDocument();
    }
    const rsvpCount = screen.getByText("Total RSVP: " + userList.length.toString());
    expect(rsvpCount).toBeInTheDocument();
});

test('Component renders nothing when no user exist', () => {
    const userList : User[] = []
	render(<div>
        <div>Total RSVP: {userList.length}</div>
        <div className="userList">
            {userList.map((user) => (
                <UserListEntry firstName={user.firstName} lastName={user.lastName} userId={user.userId} userName={user.userName}/>
            ))}
        </div>  
    </div>);
	for (const user of userList) {
        const userEntry = screen.getByText("Username: " + user.userName);
        expect(userEntry).toBeInTheDocument();
    }
    const rsvpCount = screen.getByText("Total RSVP: " + userList.length.toString());
    expect(rsvpCount).toBeInTheDocument();
});
