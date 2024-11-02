import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUiStore } from '@core/store/hooks/useUiStore';
import { useBoardStore } from '@src/modules/public/store/hooks/useBoardStore';
import { AddTaskModal } from '../../modules/public/pages/BoardPage/components';

jest.mock('@core/store/hooks/useUiStore', () => ({
    useUiStore: jest.fn(),
}));

jest.mock('@src/modules/public/store/hooks/useBoardStore', () => ({
    useBoardStore: jest.fn(),
}));

HTMLDialogElement.prototype.showModal = jest.fn();

describe('AddTaskModal Component', () => {
    const mockCloseModal = jest.fn();
    const mockAddTask = jest.fn();
    const mockSetBoardLoading = jest.fn();

    beforeEach(() => {
        (useUiStore as jest.Mock).mockReturnValue({
            state: {
                modals: {
                    CreateTaskModal: { status: true, board_id: '1' },
                },
            },
            emit_CreateTaskModal: mockCloseModal,
        });

        (useBoardStore as jest.Mock).mockReturnValue({
            emit_addTaskToBoard: mockAddTask,
            emit_setBoardLoading: mockSetBoardLoading,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders modal title and instructions', () => {
        render(<AddTaskModal />);

        expect(screen.getByText(/Add new task/i)).toBeInTheDocument();
        expect(screen.getByText(/Complete the following fields to create a new task/i)).toBeInTheDocument();
    });

    test('shows validation errors on empty submission', async () => {
        render(<AddTaskModal />);

        await act(async () => {
            fireEvent.click(screen.getByText(/Save/i));
        });

        await waitFor(() => {
            expect(screen.getAllByText(/Is required/i).length).toBeGreaterThan(0);
        });
    });

    test('invokes emit_addTaskToBoard on valid form submission', async () => {

        render(<AddTaskModal />);

        await act(async () => {
            fireEvent.change(screen.getByLabelText(/Title task/i), { target: { value: 'Test Task' } });
            fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
            fireEvent.click(screen.getByText(/Save/i));
        expect(screen.getByLabelText(/Title task/i)).toHaveValue('Test Task');
        expect(screen.getByLabelText(/Description/i)).toHaveValue('Test Description');
        });


    });
});
