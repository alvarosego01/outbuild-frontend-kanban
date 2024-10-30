
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { boardState_I, on_addTaskToBoard, on_dragg, on_editTask, on_refreshBoards, on_restoreDefault, on_setBoardData, on_setBoardLoading, on_setTaskLoading  } from '../reducers/boardSlice';
import { Reducers_I } from "../../../../core/store/store";
import { Handle_Events_I, Task_I } from "../../../../core/interfaces";

interface useBoardStore_I {

    state: boardState_I;

    emit_restoreDefault: () => void;
    emit_setBoardLoading: (boardId: string, stastus: boolean) => void;
    emit_setTaskLoading: (task_id: string, status: boolean) => void;
    emit_editTask: (boardId: string, task_id: string, title: string, description: string) => void;
    emit_setBoardData: (board_id: string, tasks: Task_I[]) => void;
    emit_addTaskToBoard: (board_id: string, title: string, description: string) => void;
    emit_get_taskHandle: ( task_id: string) => Handle_Events_I;
    emit_refreshBoards: (status: boolean) => void;
    emit_onDragg: (status: boolean) => void;

}

export const useBoardStore = (): useBoardStore_I => {

    const dispatch = useDispatch();

    const state = useSelector<Reducers_I, boardState_I>(({ _public }) => _public.board, shallowEqual);

    const emit_restoreDefault = () => {
        dispatch(on_restoreDefault());
    }

    const emit_onDragg = (status: boolean) => {
        dispatch(on_dragg({status}))
    }

    const emit_refreshBoards = (status: boolean) => {
        dispatch(on_refreshBoards({status}));
    }

    const emit_setBoardLoading = (board_id: string, status: boolean) => {
        dispatch(on_setBoardLoading({board_id, status}));
    }

    const emit_setTaskLoading = (task_id: string, status: boolean) => {
        dispatch(on_setTaskLoading({task_id, status}));
    }

    const emit_editTask = (boardId: string, task_id: string, title: string, description: string) => {
        dispatch(on_editTask({ boardId, task_id, title, description }));
        emit_refreshBoards(true);
    }

    const emit_setBoardData = (boardId: string, tasks: Task_I[]) => {

        dispatch(on_setBoardData({ boardId, tasks }));
        emit_refreshBoards(false);

    }

    const emit_get_taskHandle = (task_id: string): Handle_Events_I => {

        const boardIndex: number = state.boards.findIndex((board) =>
                board.tasks.some((task) => task.id === task_id)
            );
        const task = state.boards[boardIndex].tasks.find((task) => task.id === task_id);

        if(task){
            return task.handle;
        } else {
            return {
                isInteracting: false,
                isLoading: false,
            }
        }

    }

    const emit_addTaskToBoard = (board_id: string, title: string, description: string ) => {

        const task: Task_I = {
            id: Math.random().toString(36).substring(7),
            title,
            description,
            created_at: new Date().toLocaleString(),
            comments: [],
        }

        dispatch(on_addTaskToBoard({ board_id, task }));
        emit_refreshBoards(true);
    }

    return {
        // state
        state,
        // methods
        emit_restoreDefault,
        emit_refreshBoards,
        emit_setBoardLoading,
        emit_setTaskLoading,
        emit_editTask,
        emit_onDragg,
        emit_get_taskHandle,
        emit_setBoardData,
        emit_addTaskToBoard
    }

}