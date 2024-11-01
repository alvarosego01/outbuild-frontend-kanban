
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Reducers_I } from "../store";
import { uiState_I, on_restoreDefault, on_CreateTaskModal, on_EditModal } from "../reducers/uiSlice";

interface useHookStore_I {
    state: uiState_I;

    emit_restoreDefault: () => void;
    emit_CreateTaskModal: (status: boolean, board_id: string) => void;
    emit_EditModal: (status: boolean, task_id: string, board_id: string) => void;
    // emit_ViewTaskModal: (status: boolean, task_id: string, board_id: string) => void;

}

export const useUiStore = (): useHookStore_I => {

    const dispatch = useDispatch();

    const state = useSelector<Reducers_I, uiState_I>(({ _global }) => _global.ui , shallowEqual);

    const emit_restoreDefault = () => {
        dispatch(on_restoreDefault());
    }

    const emit_CreateTaskModal = (status: boolean, board_id: string) => {
        dispatch(on_CreateTaskModal({ status, board_id }));
    };

    const emit_EditModal = (status: boolean, task_id: string, board_id: string) => {
        dispatch(on_EditModal({ status, task_id, board_id }));
    };

    // const emit_ViewTaskModal = (status: boolean, task_id: string, board_id: string) => {
    //     dispatch(on_ViewTaskModal({ status, task_id, board_id }));
    // };

    return {
        state,
        emit_restoreDefault,
        emit_CreateTaskModal,
        emit_EditModal,
        // emit_ViewTaskModal
    };

}


