import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserHomepage from '../components/student_user/UserHomepage';

describe('UserHomepage', () => {
    test('sidebar can open and close', async () => {
        render(<UserHomepage />);

        expect(screen.getByText(/selected events/i)).toBeInTheDocument();

        const toggleButton = screen.getByRole('button', { name: /☰/i });
        fireEvent.click(toggleButton);

        await waitFor(() => {
            expect(screen.getByText(/selected events/i)).toBeInTheDocument();
        });

        fireEvent.click(toggleButton);

        expect(screen.getByText(/selected events/i)).toBeInTheDocument();
    });

    test('RSVP button toggles RSVP status and adds event to sidebar', () => {
        render(<UserHomepage />);
        const rsvpButtons = screen.getAllByRole('button', { name: /RSVP/i });

        const rsvpButton = rsvpButtons[0];

        fireEvent.click(rsvpButton);

        expect(rsvpButton).toHaveTextContent(/un-rsvp/i);

        const eventOneAppearances = screen.queryAllByText('Event 1');
        expect(eventOneAppearances).toHaveLength(2);
    });

    test('Un-RSVP button removes event from sidebar', () => {
        render(<UserHomepage />);
        const rsvpButtons = screen.getAllByRole('button', { name: /RSVP/i });

        const rsvpButton = rsvpButtons[0];

        fireEvent.click(rsvpButton);
        expect(rsvpButton).toHaveTextContent(/un-rsvp/i);
        fireEvent.click(rsvpButton);
        expect(rsvpButton).toHaveTextContent(/rsvp/i);
        expect(screen.queryAllByText('Event 1')).toHaveLength(1);
    });

    test('Remove button in sidebar updates RSVP button accordingly', () => {
        render(<UserHomepage />);
        const rsvpButtons = screen.getAllByRole('button', { name: /RSVP/i });

        const rsvpButton = rsvpButtons[0];

        fireEvent.click(rsvpButton);
        expect(rsvpButton).toHaveTextContent(/un-rsvp/i);

        const toggleButton = screen.getByRole('button', { name: /☰/i });
        fireEvent.click(toggleButton);
        const removeButton = screen.getByRole('button', { name: /remove/i });
        fireEvent.click(removeButton);

        expect(rsvpButton).toHaveTextContent(/rsvp/i);
        expect(screen.queryAllByText('Event 1')).toHaveLength(1);
    });

    test('multiple events can be RSVPed and appear in the sidebar', () => {
        render(<UserHomepage />);

        const rsvpButtons = screen.getAllByRole('button', { name: /RSVP/i });

        fireEvent.click(rsvpButtons[0]);
        fireEvent.click(rsvpButtons[1]);

        const toggleButton = screen.getByRole('button', { name: /☰/i });
        fireEvent.click(toggleButton);

        expect(screen.queryAllByText('Event 1')).toHaveLength(2);
        expect(screen.queryAllByText('Event 2')).toHaveLength(2);
    });

    test('RSVP button changes state correctly for each event', () => {
        render(<UserHomepage />);

        const rsvpButtons = screen.getAllByRole('button', { name: /RSVP/i });

        rsvpButtons.forEach((button, index) => {
            fireEvent.click(button);
            expect(button).toHaveTextContent(/un-rsvp/i);

            fireEvent.click(button);
            expect(button).toHaveTextContent(/rsvp/i);
        });
    });
});