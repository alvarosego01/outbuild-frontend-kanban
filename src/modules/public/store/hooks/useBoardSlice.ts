
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { boardState_I, on_addTaskToBoard, on_editTask, on_moveTask, on_removeTask, on_restoreDefault, on_setBoardLoading, on_setOrderBoard } from '../reducers/boardSlice';
import { Reducers_I } from "../../../../core/store/store";
import { Task_I } from "../../../../core/interfaces";

interface useBoardStore_I {

    state: boardState_I;

    emit_restoreDefault: () => void;
    emit_setBoardLoading: (boardId: string) => void;
    emit_editTask: (boardId: string, task: Task_I) => void;
    emit_removeTask: (boardId: string, task: Task_I) => void;
    emit_setOrderBoard: (board_id: string, tasks: Task_I[]) => void;
    emit_addTaskToBoard: (board_id: string, task: Task_I) => void;
    emit_moveTask: (taskId: string, targetBoardId: string, newIndex: number ) => void;

}

export const useBoardStore = (): useBoardStore_I => {

    const dispatch = useDispatch();

    const state = useSelector<Reducers_I, boardState_I>(({ _public }) => _public.board, shallowEqual);

    const emit_restoreDefault = () => {
        dispatch(on_restoreDefault());
    }

    const emit_setBoardLoading = (boardId: string) => {
        dispatch(on_setBoardLoading(boardId));
    }

    const emit_editTask = (boardId: string, task: Task_I) => {
        dispatch(on_editTask({ boardId, task }));
    }

    const emit_removeTask = (boardId: string, task: Task_I) => {
        dispatch(on_removeTask({ boardId, task }));
    }

    const emit_setOrderBoard = (board_id: string, tasks: Task_I[]) => {
        dispatch(on_setOrderBoard({ board_id, tasks }));
    }

    const emit_addTaskToBoard = (board_id: string, task: Task_I) => {
        dispatch(on_addTaskToBoard({ board_id, task }));
    }

    const emit_moveTask = ( taskId: string, targetBoardId: string, newIndex: number ) => {
          dispatch(on_moveTask({ taskId, targetBoardId, newIndex }));
    }

    return {
        state,
        emit_restoreDefault,
        emit_setBoardLoading,
        emit_editTask,
        emit_removeTask,
        emit_setOrderBoard,
        emit_moveTask,
        emit_addTaskToBoard
    }

}