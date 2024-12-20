
import { FC, useEffect, useRef, useState } from "react";
import { Board_I, Handle_Events_I, Task_I } from "../../../../../core/interfaces";
import { Task } from "./Task";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useBoardStore } from "../../../store/hooks";
import { useUiStore } from "../../../../../core/store";
import { useCursorTracking } from "../../../../../core/sockets/hooks";
import { useEmitBoardState } from "../../../store/hooks/useBoardSocket";

interface Props_I {
    board: Board_I;
    onHandle: Handle_Events_I;
}

let intervalMove: any;

export const ColumnsBoard: FC<Props_I> = ({ board, onHandle }) => {
    const {
        state: {
            onRefreshBoard,
            allowExternalRefresh,
            allowExternalEmit,
            onDragg,
        },
        emit_setBoardData,
        emit_onDragg,
        emit_get_taskHandle,
        emit_deleteTask,
        emit_allowExternalEmit
    } = useBoardStore();

    const {
        emit_isDragginSocket,
        emit_boards,
    } = useEmitBoardState();

    const {
        emit_CreateTaskModal,
        emit_EditModal

    } = useUiStore();

    const [isMounted, setIsMounted] = useState(false);


    const { title, tasks, id } = board;
    const { isInteracting, isLoading } = onHandle;

    const prevTasksRef = useRef<Task_I[]>(tasks);

const [taskListRef, tasksList, setTasksList] = useDragAndDrop<HTMLUListElement, Task_I>(
    tasks,
    {
        group: "taskGroup",
        onDragstart(data, state) {
            emit_onDragg(true);
        },
        onDragend(data) {
            emit_onDragg(false);

        },
    }
);



    const updateTasksList = (newTasks: Task_I[]) => {

        setTasksList(newTasks);

    };

    const onDeleteTask = (taskId: string) => {

        emit_deleteTask(id, taskId);

    };

    const onEditTask = (taskId: string) => {
        emit_EditModal(true, taskId, id);
    };

    const onAddNewTask = (board_id: string) => {
        emit_CreateTaskModal(true, board_id);
    };

    useEffect(() => {

        if (onRefreshBoard) {
            updateTasksList(tasks);
            prevTasksRef.current = tasks;
        }

    }, [onRefreshBoard]);

    useEffect(() => {

        if (!isMounted) return;

        emit_isDragginSocket(onDragg);

        if(!onDragg) {
            if(allowExternalEmit) emit_boards();
        };

    }, [onDragg])

    useEffect(() => {
        if (!isMounted) return;
        emit_setBoardData(id, tasksList);
        if(allowExternalEmit) emit_boards();
    }, [tasksList]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="flex flex-col h-full p-8 space-y-4 bg-gray-200 kanban-board col-span-full rounded-xl sm:col-span-6 xl:col-span-4">

            <header className="flex justify-between ">
                <h2 className="font-semibold text-gray-800 truncate dark:text-gray-100">{title}</h2>
                <button aria-label="Add new task" onClick={() => onAddNewTask(id)} className="ml-2 shrink-0 text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 tooltip" data-tip="Add new task">
                    {
                        !isLoading ? (
                            <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16">
                                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 fill-current mr-s_7.5 animate-spin shrink-0" viewBox="0 0 16 16">
                                <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                            </svg>
                        )
                    }
                </button>
            </header>

            <ul ref={taskListRef} className={`flex flex-col space-y-4 box-border min-h-10 rounded-xl	h-full border-3 ${onDragg ? 'border-dashed border-gray-300' : ''} parentTasks  `}>
                {tasksList.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        handle={emit_get_taskHandle(task.id)}
                        onDeleteTask={() => onDeleteTask(task.id)}
                        onEditTask={() => onEditTask(task.id)}
                    />
                ))}
            </ul>
        </div>
    );
};