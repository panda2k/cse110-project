import { render, screen, fireEvent } from '@testing-library/react';
import ClubPage from '../components/student_org/ClubPage';
import '@testing-library/jest-dom';

describe('ClubPage', () => {
    test('should add an event when the form is submitted', () => {
        render(<ClubPage />);

        // Get form elements
        const eventNameInput = screen.getByLabelText(/event name/i);
        const eventDateInput = screen.getByLabelText(/event date/i);
        const eventLocationInput = screen.getByLabelText(/event location/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const submitButton = screen.getByText(/publish event/i);

        // Fill in the form
        fireEvent.change(eventNameInput, { target: { value: 'Event 1' } });
        fireEvent.change(eventDateInput, { target: { value: '2024-12-01' } });
        fireEvent.change(eventLocationInput, { target: { value: 'Location 1' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description of event 1' } });

        // Submit the form
        fireEvent.click(submitButton);

        // Assert that the event was added to the list
        expect(screen.getByText('Event 1')).toBeInTheDocument();
        expect(screen.getByText('2024-12-01')).toBeInTheDocument();
        expect(screen.getByText('Location 1')).toBeInTheDocument();
        expect(screen.getByText('Description of event 1')).toBeInTheDocument();
    });

    test('should delete an event when delete button is clicked', () => {
        render(<ClubPage />);

        // Add an event first
        const eventNameInput = screen.getByLabelText(/event name/i);
        const eventDateInput = screen.getByLabelText(/event date/i);
        const eventLocationInput = screen.getByLabelText(/event location/i);
        const descriptionInput = screen.getByLabelText(/description/i);
        const submitButton = screen.getByText(/publish event/i);

        fireEvent.change(eventNameInput, { target: { value: 'Event 1' } });
        fireEvent.change(eventDateInput, { target: { value: '2024-12-01' } });
        fireEvent.change(eventLocationInput, { target: { value: 'Location 1' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description of event 1' } });
        fireEvent.click(submitButton);

        // Assert that the event was added
        const eventToDelete = screen.getByText('Event 1');
        expect(eventToDelete).toBeInTheDocument();

        // Find and click the delete button for the event
        const deleteButton = screen.getByText(/delete/i);
        fireEvent.click(deleteButton);

        // Assert that the event is no longer in the document
        expect(eventToDelete).not.toBeInTheDocument();
    });

    test('should edit an event and reflect the changes', () => {
        render(<ClubPage />);

        // Add an event first
        const eventNameInput = screen.getAllByLabelText(/event name/i)[0]; // Use getAllByLabelText to select the first event name input
        const eventDateInput = screen.getAllByLabelText(/event date/i)[0]; // Use getAllByLabelText for event date
        const eventLocationInput = screen.getAllByLabelText(/event location/i)[0]; // Use getAllByLabelText for event location
        const descriptionInput = screen.getAllByLabelText(/description/i)[0]; // Use getAllByLabelText for description
        const submitButton = screen.getByText(/publish event/i);

        fireEvent.change(eventNameInput, { target: { value: 'Event 1' } });
        fireEvent.change(eventDateInput, { target: { value: '2024-12-01' } });
        fireEvent.change(eventLocationInput, { target: { value: 'Location 1' } });
        fireEvent.change(descriptionInput, { target: { value: 'Description of event 1' } });
        fireEvent.click(submitButton);

        // Assert that the event was added
        const eventToEdit = screen.getByText('Event 1');
        expect(eventToEdit).toBeInTheDocument();

        // Click on the edit button for the event
        const editButton = screen.getByText(/edit/i);
        fireEvent.click(editButton);

        // Edit the event details
        const newEventNameInput = screen.getAllByLabelText(/event name/i)[1];
        const newEventDateInput = screen.getAllByLabelText(/event date/i)[1];
        const newEventLocationInput = screen.getAllByLabelText(/event location/i)[1];
        const newDescriptionInput = screen.getAllByLabelText(/description/i)[1];

        fireEvent.change(newEventNameInput, { target: { value: 'Updated Event 1' } });
        fireEvent.change(newEventDateInput, { target: { value: '2024-12-15' } });
        fireEvent.change(newEventLocationInput, { target: { value: 'Updated Location' } });
        fireEvent.change(newDescriptionInput, { target: { value: 'Updated description' } });

        // Submit the edited event
        const saveButton = screen.getByText(/save changes/i);
        fireEvent.click(saveButton);

        // Assert the updated event is displayed
        expect(screen.getByText('Updated Event 1')).toBeInTheDocument();
        expect(screen.getByText('2024-12-15')).toBeInTheDocument();
        expect(screen.getByText('Updated Location')).toBeInTheDocument();
        expect(screen.getByText('Updated description')).toBeInTheDocument();
    });
});
