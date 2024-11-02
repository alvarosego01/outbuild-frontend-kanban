import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CursorInteraction } from '../../modules/public/pages/BoardPage/components';

describe('CursorInteraction Component', () => {

    const mockUsers = [
        { id: '1', username: 'User1', position: { x: 100, y: 200 } },
        { id: '2', username: 'User2', position: { x: 300, y: 400 } },
    ];

    test('renders user cursors with correct number of elements', () => {
        render(<CursorInteraction users={mockUsers} />);

        const userElements = screen.getAllByText(/User/i);
        expect(userElements).toHaveLength(mockUsers.length);
    });

    test('renders usernames and positions correctly', () => {
        render(<CursorInteraction users={mockUsers} />);

        expect(screen.getByText(/User1/i)).toBeInTheDocument();
        expect(screen.getByText(/User2/i)).toBeInTheDocument();

        const user1Element = screen.getByText(/User1/i).closest('div');
        const user2Element = screen.getByText(/User2/i).closest('div');

        expect(user1Element).toHaveStyle({ top: '200px', left: '100px' });
        expect(user2Element).toHaveStyle({ top: '400px', left: '300px' });
    });

    test('does not render anything if users array is empty', () => {
        render(<CursorInteraction users={[]} />);

        expect(screen.queryByText(/User/i)).not.toBeInTheDocument();
    });

});
