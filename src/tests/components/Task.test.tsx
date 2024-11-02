
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Task } from '../../modules/public/pages/BoardPage/components';

HTMLDialogElement.prototype.showModal = jest.fn();


describe('Task Component', () => {
    const mockEditTask = jest.fn();
    const mockDeleteTask = jest.fn();

    const task = {
        id: '1',
        title: 'Sample Task',
        description: 'This is a sample task description.',
        created_at: '2023-01-01',
    };

    const handle = {
        isLoading: false,
        isInteracting: false,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders task title, description, and creation date', () => {
        render(
            <Task task={task} handle={handle} onEditTask={mockEditTask} onDeleteTask={mockDeleteTask} />
        );

        expect(screen.getByText('Sample Task')).toBeInTheDocument();
        expect(screen.getByText('This is a sample task description.')).toBeInTheDocument();
        expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    });

    test('calls onEditTask when edit button is clicked', () => {
        render(
            <Task task={task} handle={handle} onEditTask={mockEditTask} onDeleteTask={mockDeleteTask} />
        );

        const editButton = screen.getByLabelText('Edit task button');
        fireEvent.click(editButton);

        expect(mockEditTask).toHaveBeenCalled();
    });

    test('calls onDeleteTask when delete button is clicked', () => {
        render(
            <Task task={task} handle={handle} onEditTask={mockEditTask} onDeleteTask={mockDeleteTask} />
        );

        const deleteButton = screen.getByLabelText('Delete task button');
        fireEvent.click(deleteButton);

        expect(mockDeleteTask).toHaveBeenCalled();
    });

    test('does not show loading spinner when isLoading is false', () => {
        render(
            <Task
                task={task}
                handle={{ ...handle, isLoading: false }}
                onEditTask={mockEditTask}
                onDeleteTask={mockDeleteTask}
            />
        );

        const loadingSpinner = screen.queryByRole('img', { hidden: true });
        expect(loadingSpinner).not.toBeInTheDocument();
    });
});
