// DeleteEvent.tsx
import React from 'react';
import '../styles/DeleteEvent.css';

// Define the props that DeleteEvent will receive
interface DeleteEventProps {
    onConfirmDelete: () => void;
    onCancelDelete: () => void;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ onConfirmDelete, onCancelDelete }) => {
    return (
        <div className="delete-event-modal">
            <div className="delete-event-content">
                <h3>Are you sure you want to delete this event?</h3>
                <p>This action cannot be undone.</p>
                <button className="confirm-delete" onClick={onConfirmDelete}>
                    Confirm Delete
                </button>
                <button className="cancel-delete" onClick={onCancelDelete}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteEvent;