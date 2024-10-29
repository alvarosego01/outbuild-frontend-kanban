
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { Reducers_I } from "../store";
import { on_restoreDefault, on_toggleCreateTaskModal, on_toggleEditModal, on_toggleViewTaskModal, uiState_I } from "../reducers/ui/uiSlice";


interface useHookStore_I {
    state: uiState_I;

    emit_restoreDefault: () => void;
    emit_toggleCreateTaskModal: (status: boolean, board_id: string) => void;
    emit_toggleEditModal: (status: boolean, task_id: string, board_id: string) => void;
    emit_toggleViewTaskModal: (status: boolean, task_id: string, board_id: string) => void;

}

export const useUiStore = (): useHookStore_I => {

    const dispatch = useDispatch();

    const state = useSelector<Reducers_I, uiState_I>(({ _global }) => _global.ui , shallowEqual);

    const emit_restoreDefault = () => {
        dispatch(on_restoreDefault());
    }

    const emit_toggleCreateTaskModal = (status: boolean, board_id: string) => {
        dispatch(on_toggleCreateTaskModal({ status, board_id }));
    };

    const emit_toggleEditModal = (status: boolean, task_id: string, board_id: string) => {
        dispatch(on_toggleEditModal({ status, task_id, board_id }));
    };

    const emit_toggleViewTaskModal = (status: boolean, task_id: string, board_id: string) => {
        dispatch(on_toggleViewTaskModal({ status, task_id, board_id }));
    };

    return {
        state,
        emit_restoreDefault,
        emit_toggleCreateTaskModal,
        emit_toggleEditModal,
        emit_toggleViewTaskModal
    };

}


