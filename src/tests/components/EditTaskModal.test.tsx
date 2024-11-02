import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUiStore } from '@core/store/hooks/useUiStore';
import { useBoardStore } from '@src/modules/public/store/hooks/useBoardStore';
import { EditTaskModal } from '../../modules/public/pages/BoardPage/components/EditTaskModal';

jest.mock('@core/store/hooks/useUiStore', () => ({
    useUiStore: jest.fn(),
}));

jest.mock('@src/modules/public/store/hooks/useBoardStore', () => ({
    useBoardStore: jest.fn(),
}));

HTMLDialogElement.prototype.showModal = jest.fn();

describe('EditTaskModal Component', () => {
    const mockCloseModal = jest.fn();
    const mockEditTask = jest.fn();
    const mockSetTaskLoading = jest.fn();

    beforeEach(() => {
        (useUiStore as jest.Mock).mockReturnValue({
            state: {
                modals: {
                    EditModal: { status: true, board_id: '1', task_id: '101' },
                },
            },
            emit_EditModal: mockCloseModal,
        });

        (useBoardStore as jest.Mock).mockReturnValue({
            state: {
                boards: [
                    {
                        id: '1',
                        title: 'Board 1',
                        tasks: [
                            { id: '101', title: 'Test Task', description: 'Task Description' },
                        ],
                    },
                ],
            },
            emit_editTask: mockEditTask,
            emit_setTaskLoading: mockSetTaskLoading,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders modal title and instructions', () => {
        render(<EditTaskModal />);

        expect(screen.getByText(/Edit task/i)).toBeInTheDocument();
        expect(screen.getByText(/Complete the following fields to edit a task/i)).toBeInTheDocument();
    });

    test('pre-fills the form with task data when modal is open', () => {
        render(<EditTaskModal />);

        expect(screen.getByLabelText(/Title task/i)).toHaveValue('Test Task');
        expect(screen.getByLabelText(/Description/i)).toHaveValue('Task Description');
    });

    test('shows validation errors when required fields are empty', async () => {
        render(<EditTaskModal />);

        fireEvent.change(screen.getByLabelText(/Title task/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: '' } });
        fireEvent.click(screen.getByText(/Save/i));

        expect(await screen.findAllByText(/Is required/i)).toHaveLength(2);
    });

    test('calls emit_editTask with correct arguments on form submission', () => {
        render(<EditTaskModal />);

        fireEvent.change(screen.getByLabelText(/Title task/i), { target: { value: 'Updated Task' } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Updated Description' } });

        fireEvent.click(screen.getByText(/Save/i));

        expect(screen.getByLabelText(/Title task/i)).toHaveValue('Updated Task');
        expect(screen.getByLabelText(/Description/i)).toHaveValue('Updated Description');

    });


});
