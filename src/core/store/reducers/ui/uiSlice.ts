

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from "@reduxjs/toolkit";
import { CreateTask_Modal_I, EditModal_I, ViewTask_Modal_I } from '../../../interfaces';


export interface uiState_I {
    modals: {
        CreateTaskModal: CreateTask_Modal_I;
        EditModal: EditModal_I;
        ViewTaskModal: ViewTask_Modal_I;
    }

}

const initialState: uiState_I = {
    modals: {
        CreateTaskModal: {
            board_id: '',
            status: false
        },
        EditModal: {
            task_id: '',
            board_id: '',
            status: false
        },
        ViewTaskModal: {
            task_id: '',
            board_id: '',
            status: false
        }
    }
}

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        on_CreateTaskModal: (state, { payload }: PayloadAction<{ status: boolean; board_id: string }>) => {
            const { status, board_id } = payload;
            state.modals.CreateTaskModal = { status, board_id };
        },
        on_EditModal: (state, { payload }: PayloadAction<{ status: boolean; task_id: string; board_id: string }>) => {
            const { status, task_id, board_id } = payload;
            state.modals.EditModal = { status, task_id, board_id };
        },
        on_ViewTaskModal: (state, { payload }: PayloadAction<{ status: boolean; task_id: string; board_id: string }>) => {
            const { status, task_id, board_id } = payload;
            state.modals.ViewTaskModal = { status, task_id, board_id };
        },
        on_restoreDefault: (state) => {
            state = initialState;
        },
    }
});

export const {

    on_restoreDefault,
    on_CreateTaskModal,
    on_EditModal,
    on_ViewTaskModal

} = uiSlice.actions;
