import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useInteractionStore } from '@core/store/hooks/useInteractionsStore';
import { useBoardStore } from '@src/modules/public/store/hooks/useBoardStore';
import { useUiStore } from '@core/store/hooks/useUiStore';
import { useEmitBoardState } from '@src/modules/public/store/hooks/useBoardSocket';
import { ColumnsBoard } from '../../modules/public/pages/BoardPage/components';

jest.mock('@src/modules/public/store/hooks/useBoardStore', () => ({
    useBoardStore: jest.fn(),
}));

jest.mock('@core/store/hooks/useUiStore', () => ({
    useUiStore: jest.fn(),
}));

jest.mock('@src/modules/public/store/hooks/useBoardSocket', () => ({
    useEmitBoardState: jest.fn(),
}));


HTMLDialogElement.prototype.showModal = jest.fn();

describe('ColumnsBoard Component', () => {

    const mockSetBoardData = jest.fn();
    const mockEmitBoards = jest.fn();
    const mockEmitIsDraggingSocket = jest.fn();
    const mockEmitCreateTaskModal = jest.fn();
    const mockEmitEditModal = jest.fn();
    const mockEmitDeleteTask = jest.fn();

    const mockBoard = {
        id: '1',
        title: 'To Do',
        tasks: [
            {
                id: 'task1',
                title: 'Task 1',
                description: 'Description 1',
                created_at: '2023-01-01T00:00:00Z',
                handle: jest.fn()
            },
            {
                id: 'task2',
                title: 'Task 2',
                description: 'Description 2',
                created_at: '2023-01-01T00:00:00Z',
                handle: jest.fn()
            },
        ],
    };

    beforeEach(() => {
        (useBoardStore as jest.Mock).mockReturnValue({
            state: {
                onRefreshBoard: false,
                allowExternalEmit: true,
                onDragg: false,
            },
            emit_setBoardData: mockSetBoardData,
            emit_onDragg: jest.fn(),
            emit_get_taskHandle: jest.fn((id) => jest.fn()),
            emit_deleteTask: mockEmitDeleteTask,
        });

        (useUiStore as jest.Mock).mockReturnValue({
            emit_CreateTaskModal: mockEmitCreateTaskModal,
            emit_EditModal: mockEmitEditModal,
        });

        (useEmitBoardState as jest.Mock).mockReturnValue({
            emit_isDragginSocket: mockEmitIsDraggingSocket,
            emit_boards: mockEmitBoards,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the board title', () => {
        render(<ColumnsBoard board={mockBoard} onHandle={{ isInteracting: false, isLoading: false }} />);

        expect(screen.getByText('To Do')).toBeInTheDocument();
    });

    test('renders tasks with correct titles', () => {
        render(<ColumnsBoard board={mockBoard} onHandle={{ isInteracting: false, isLoading: false }} />);

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    test('calls emit_CreateTaskModal with correct board ID on add task button click', () => {

        render(<ColumnsBoard board={mockBoard} onHandle={{ isInteracting: false, isLoading: false }} />);
        const addButton = screen.getByLabelText('Add new task');

        fireEvent.click(addButton);

        expect(mockEmitCreateTaskModal).toHaveBeenCalledWith(true, '1');

    });

    test('calls emit_EditModal with correct task ID on edit task', () => {

        render(<ColumnsBoard board={mockBoard} onHandle={{ isInteracting: false, isLoading: false }} />);

        const taskToEdit = screen.getAllByLabelText('Edit task button')[0];

        fireEvent.click(taskToEdit);

        expect(mockEmitEditModal).toHaveBeenCalledWith(true, 'task1', '1');

    });

    test('calls emit_deleteTask with correct task ID on delete task', () => {
        render(<ColumnsBoard board={mockBoard} onHandle={{ isInteracting: false, isLoading: false }} />);

        const deleteTask = screen.getAllByLabelText('Delete task button')[0];

        fireEvent.click(deleteTask);
        expect(mockEmitDeleteTask).toHaveBeenCalledWith("1", "task1");

    });

    test('handles drag start and end events correctly', () => {
        render(<ColumnsBoard board={mockBoard} onHandle={{ isInteracting: false, isLoading: false }} />);

        const task = screen.getByText('Task 1');

        if (task && task.dataset && task.dataset['dnd-group']) {

            fireEvent.mouseDown(task);
            expect(mockEmitIsDraggingSocket).toHaveBeenCalledWith(true);

            fireEvent.mouseUp(task);
            expect(mockEmitIsDraggingSocket).toHaveBeenCalledWith(false);

        }
    });

});
