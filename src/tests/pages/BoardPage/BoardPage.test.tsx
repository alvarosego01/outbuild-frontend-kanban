import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useInteractionStore } from '@core/store/hooks/useInteractionsStore';
import { useBoardStore } from '@src/modules/public/store/hooks/useBoardStore';
import { useUiStore } from '@core/store/hooks/useUiStore';

import { BoardPage } from '@src/modules/public/pages/BoardPage/BoardPage';

jest.mock('@core/store/hooks/useInteractionsStore', () => ({
    useInteractionStore: jest.fn(),
}));
jest.mock('@core/store/hooks/useUiStore', () => ({
    useUiStore: jest.fn(),
}));
jest.mock('@src/modules/public/store/hooks/useBoardStore', () => ({
    useBoardStore: jest.fn(() => ({
        state: {
            boards: [
                { id: '1', title: 'To Do', tasks: [], handle: jest.fn() },
                { id: '2', title: 'In Progress', tasks: [], handle: jest.fn() }
            ],
        },
        emit_addTaskToBoard: jest.fn(),
        emit_setTaskLoading: jest.fn(),
        emit_setBoardLoading: jest.fn(),
    })),
}));

HTMLDialogElement.prototype.showModal = jest.fn();

describe('BoardPage Component', () => {
    beforeEach(() => {
        (useInteractionStore as jest.Mock).mockReturnValue({
            state: {
                currentUser: { username: 'TestUser' },
                interations: { users: [{ id: 'user1', username: 'User 1' }] }
            }
        });
        (useUiStore as jest.Mock).mockReturnValue({
            state: {
                modals: {
                    CreateTaskModal: { status: false },
                    EditModal: { status: false },
                }
            }
        });
    });

    test('renders the title "Outbuild tasks"', () => {
        render(<BoardPage />);


        const titleElement = screen.getByText(/Outbuild tasks/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('displays the current user information', () => {
        render(<BoardPage />);


        const usernameLabel = screen.getByText(/Username:/i);
        const username = screen.getByText(/TestUser/i);
        expect(usernameLabel).toBeInTheDocument();
        expect(username).toBeInTheDocument();
    });

    test('renders the correct number of boards with titles', () => {
        render(<BoardPage />);


        expect(screen.getByText(/To Do/i)).toBeInTheDocument();
        expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
    });

    test('does not display CreateTaskModal or EditModal when their status is false', () => {
        render(<BoardPage />);


        expect(screen.queryByText(/Add Task Modal/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Edit Task Modal/i)).not.toBeInTheDocument();
    });

    test('displays CreateTaskModal when status is true', () => {
        (useUiStore as jest.Mock).mockReturnValue({
            state: {
                modals: {
                    CreateTaskModal: { status: true },
                    EditModal: { status: false },
                }
            }
        });

        render(<BoardPage />);

        expect(screen.getByText(/Add new task/i)).toBeInTheDocument();
    });

    test('displays EditTaskModal when status is true', () => {

        (useUiStore as jest.Mock).mockReturnValue({
            state: {
                modals: {
                    CreateTaskModal: { status: false },
                    EditModal: { status: true },
                }
            }
        });

        render(<BoardPage />);


        expect(screen.getByText(/Complete the following fields to edit a task/i)).toBeInTheDocument();
    });
});
