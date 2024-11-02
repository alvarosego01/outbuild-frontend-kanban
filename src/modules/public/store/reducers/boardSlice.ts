

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board_I, ConnectedUser_I, Handle_Events_I, Task_I } from "../../../../core/interfaces";

interface Task_Slice_I extends Task_I {
    handle: Handle_Events_I;
}

interface Board_Slice_I extends Board_I {
    handle: Handle_Events_I;
    tasks: Task_Slice_I[];
}

export interface BoardState_I {
    onRefreshBoard: boolean;
    allowExternalEmit: boolean;
    allowExternalRefresh: boolean;
    onDragg: boolean;
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

const initialState: BoardState_I = {

    onRefreshBoard: false,
    allowExternalRefresh: false,
    allowExternalEmit: true,
    onDragg: false,
    boards: [
        {
            id: '1',
            title: 'To Do',
            tasks: [
                // {
                //     id: 'aaa_1234',
                //     title: 'Task 1',
                //     description: 'Description 1',
                //     created_at: '2021-09-09',

                //     handle: initialHandle
                // },
                // {
                //     id: 'bbb_1234',
                //     title: 'Task 2',
                //     description: 'Description 2',
                //     created_at: '2021-09-09',

                //     handle: initialHandle
                // },
                // {
                //     id: 'ccc_1234',
                //     title: 'Task 3',
                //     description: 'Description 3',
                //     created_at: '2021-09-09',

                //     handle: initialHandle
                // }
            ],
            handle: initialHandle,

        },
        {
            id: '2',
            title: 'In Progress',
            tasks: [

            ],
            handle: initialHandle,
        },
        {
            id: '3',
            title: 'Done',
            tasks: [

            ],
            handle: initialHandle,
        }
    ],

}

export const boardSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {


        on_refreshBoards: (state, { payload }: PayloadAction<{ status: boolean }>) => {

            state.onRefreshBoard = payload.status;

        },
        on_allowExternalRefresh: (state, { payload }: PayloadAction<{ status: boolean }>) => {

            state.allowExternalRefresh = payload.status;

        },
        on_allowExternalEmit: (state, { payload }: PayloadAction<{ status: boolean }>) => {

            state.allowExternalEmit = payload.status;

        },
        on_dragg: (state, { payload }: PayloadAction<{ status: boolean }>) => {

            state.onDragg = payload.status;

        },
        on_setBoardLoading: (state, { payload }: PayloadAction<{ board_id: string, status: boolean }>) => {

            const { board_id, status } = payload;
            const index: number = state.boards.findIndex((board: Board_Slice_I) => board.id === board_id);
            state.boards[index].handle.isLoading = status;

        },
        on_setTaskLoading: (state, { payload }: PayloadAction<{ task_id: string, status: boolean }>) => {

            const { task_id, status } = payload;
            let aux_boardIndex: number = -1;
            let aux_taskIndex: number = -1;
            for (const [i, element] of state.boards.entries()) {
                aux_taskIndex = element.tasks.findIndex((task: Task_Slice_I) => task.id === task_id);
                if (aux_taskIndex !== -1) {
                    aux_boardIndex = i;
                    break;
                }
            }
            if (aux_boardIndex === -1) return;
            state.boards[aux_boardIndex].tasks[aux_taskIndex].handle.isLoading = status;

        },
        on_editTask: (state, { payload }: PayloadAction<{ boardId: string, task_id: string, title: string, description: string }>) => {

            const { boardId, task_id, title, description } = payload;

            const boardIndex: number = state.boards.findIndex((board: Board_Slice_I) => board.id === boardId);
            const taskIndex: number = state.boards[boardIndex].tasks.findIndex((task: Task_Slice_I) => task.id === task_id);

            state.boards[boardIndex].tasks[taskIndex] = {
                ...state.boards[boardIndex].tasks[taskIndex],
                title,
                description
            };

        },
        on_deleteTask: (state, { payload }: PayloadAction<{ boardId: string, task_id: string,  }>) => {

            const { boardId, task_id } = payload;

            const boardIndex: number = state.boards.findIndex((board: Board_Slice_I) => board.id === boardId);
            const taskIndex: number = state.boards[boardIndex].tasks.findIndex((task: Task_Slice_I) => task.id === task_id);

            // remove task by id
            state.boards[boardIndex].tasks.splice(taskIndex, 1);

        },
        on_setBoardData: (state, { payload }: PayloadAction<{ boardId: string, tasks: Task_I[] }>) => {

            const { boardId, tasks } = payload;
            const boardIndex: number = state.boards.findIndex((board: Board_Slice_I) => board.id === boardId);

            const aux_board: Board_I = state.boards[boardIndex];

            const areTasksDifferent = (tasks1: Task_I[], tasks2: Task_I[]): boolean => {
                if (tasks1.length !== tasks2.length) return true;
                for (let i = 0; i < tasks1.length; i++) {
                    if (tasks1[i].id !== tasks2[i].id || tasks1[i].title !== tasks2[i].title || tasks1[i].description !== tasks2[i].description) {
                        return true;
                    }
                }
                return false;
            };

            if (areTasksDifferent(aux_board.tasks, tasks)) {
                state.boards[boardIndex].tasks = tasks.map((task: Task_I) => ({
                    handle: initialHandle,
                    ...task
                }));
            }

        },
        on_setBoardExternalData: (state, { payload }: PayloadAction<{ boards: Board_I[] }>) => {

            const { boards } = payload;

            if(state.allowExternalRefresh) {

            state.boards = boards.map((board: Board_I) => ({
                handle: initialHandle,
                ...board,
                tasks: board.tasks.map((task: Task_I) => ({
                    handle: initialHandle,
                    ...task
                }))
            }));

            state.allowExternalRefresh = false;
            };

            // setTimeout(() => {

                // state.onRefreshBoard = false;
                // // state.onRefreshBoard = true;
                // state.allowExternalEmit = true;

            // }, 200);

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
    on_setTaskLoading,
    on_editTask,
    on_dragg,
    on_deleteTask,
    on_setBoardExternalData,
    on_allowExternalRefresh,
    on_refreshBoards,
    on_allowExternalEmit,
    on_setBoardData,
    on_addTaskToBoard

} = boardSlice.actions;
