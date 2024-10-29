

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board_I, Handle_Events_I, Task_I, TaskStatus_E } from "../../../../core/interfaces";

interface Task_Slice_I extends Task_I {
    handle: Handle_Events_I;
}

interface Board_Slice_I extends Board_I {
    handle: Handle_Events_I;
    tasks: Task_Slice_I[];
}

export interface boardState_I {
    boards: Board_Slice_I[];
}

const initialHandle: Handle_Events_I = {
    isInteracting: false,
    isLoading: false
}

const randomid = () => {

    const id = Math.random().toString(36).substr(2, 9);
    return id;

}

const initialState: boardState_I = {

    boards: [
        {
            id: '1',
            title: 'To Do',
            tasks: [
                {
                    id: randomid(),
                    title: 'Task 1',
                    description: 'Description 1',
                    created_at: '2021-09-09',
                    comments: [],
                    status: TaskStatus_E.TODO,
                    handle: initialHandle
                },
                {
                    id: randomid(),
                    title: 'Task 2',
                    description: 'Description 2',
                    created_at: '2021-09-09',
                    comments: [],
                    status: TaskStatus_E.TODO,
                    handle: initialHandle
                },
                {
                    id: randomid(),
                    title: 'Task 3',
                    description: 'Description 3',
                    created_at: '2021-09-09',
                    comments: [],
                    status: TaskStatus_E.TODO,
                    handle: initialHandle
                }
            ],
            handle: initialHandle,

        },
        {
            id: '2',
            title: 'In Progress',
            tasks: [
                // {
                //     id: randomid(),
                //     title: 'Task c2 1',
                //     description: 'Description 1',
                //     created_at: '2021-09-09',
                //     comments: [],
                //     status: TaskStatus_E.TODO,
                //     handle: initialHandle
                // },
                // {
                //     id: randomid(),
                //     title: 'Task c2s 2',
                //     description: 'Description 2',
                //     created_at: '2021-09-09',
                //     comments: [],
                //     status: TaskStatus_E.TODO,
                //     handle: initialHandle
                // },
                // {
                //     id: randomid(),
                //     title: 'Task c2s 3',
                //     description: 'Description 3',
                //     created_at: '2021-09-09',
                //     comments: [],
                //     status: TaskStatus_E.TODO,
                //     handle: initialHandle
                // }
            ],
            handle: initialHandle,
        },
        {
            id: '3',
            title: 'Done',
            tasks: [
                //    {
                //     id: randomid(),
                //     title: 'Task c3 1',
                //     description: 'Description c3 1',
                //     created_at: '2021-09-09',
                //     comments: [],
                //     status: TaskStatus_E.TODO,
                //     handle: initialHandle
                // },
            ],
            handle: initialHandle,
        }
    ],

}

export const boardSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {

        on_setBoardLoading: (state, { payload }: PayloadAction<string>) => {

            const index: number = state.boards.findIndex((board: Board_Slice_I) => board.id === payload);

            state.boards[index].handle.isLoading = true;

        },
        on_editTask: (state, { payload }: PayloadAction<{ boardId: string, task: Task_I }>) => {

            const { boardId, task } = payload;
            const taskId = task.id;
            const boardIndex: number = state.boards.findIndex((board: Board_Slice_I) => board.id === boardId);

            const taskIndex: number = state.boards[boardIndex].tasks.findIndex((task: Task_Slice_I) => task.id === taskId);

            state.boards[boardIndex].tasks[taskIndex] = {
                handle: initialHandle,
                ...task
            };

        },
        on_moveTask: (state, { payload }: PayloadAction<{ taskId: string, targetBoardId: string, newIndex: number }>) => {

        },
        on_removeTask: (state, { payload }: PayloadAction<{ boardId: string, task: Task_I }>) => {

            const { boardId, task } = payload;
            const taskId = task.id;
            const boardIndex: number = state.boards.findIndex((board: Board_Slice_I) => board.id === boardId);

            const taskIndex: number = state.boards[boardIndex].tasks.findIndex((task: Task_Slice_I) => task.id === taskId);

            state.boards[boardIndex].tasks.splice(taskIndex, 1);

        },
        on_setOrderBoard: (state, { payload }: PayloadAction<{ board_id: string, tasks: Task_I[] }>) => {

            const { board_id, tasks } = payload;
            const index: number = state.boards.findIndex((board: Board_Slice_I) => board.id === board_id);

            state.boards[index].tasks = tasks.map((task: Task_I) => ({
                handle: initialHandle,
                ...task
            }));

            state.boards[index].handle = initialHandle;

        },
        on_addTaskToBoard: (state, { payload }: PayloadAction<{ board_id: string, task: Task_I }>) => {

            const { board_id, task } = payload;
            const index: number = state.boards.findIndex((board: Board_Slice_I) => board.id === board_id);

            state.boards[index].tasks.push({
                handle: initialHandle,
                ...task
            });

            state.boards[index].handle = initialHandle;

        },
        on_restoreDefault: (state) => {

            state = initialState;

        },
    }
});

export const {
    on_restoreDefault,
    on_setBoardLoading,
    on_editTask,
    on_removeTask,
    on_moveTask,
    on_setOrderBoard,
    on_addTaskToBoard

} = boardSlice.actions;
