import { FC, useEffect, useState } from "react";
import { Board_I, Task_I } from "../../../../../core/interfaces";
import { Task } from "./Task";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useBoardStore } from "../../../store/hooks";


interface Props_I {
    board: Board_I;
}

export const ColumnsBoard: FC<Props_I> = ({ board }) => {

    const { emit_setBoardData } = useBoardStore();
    const [isMounted, setisMounted] = useState(false);

    const { title, tasks, id } = board;

    const [taskListRef, tasksList, setTasksList] = useDragAndDrop<HTMLUListElement, Task_I>(
        tasks,
        { group: "taskGroup" }
    );

    const onDeleteTask = (taskId: string) => {

        setTasksList((prev) => prev.filter((task) => task.id !== taskId));

    };

    const onAddNewTask = () => {
        return
    }

    useEffect(() => {
        if (!isMounted) return;
        emit_setBoardData(id, tasksList);
    }, [tasksList]);

    useEffect(() => {
        setisMounted(true);
    }, []);

    return (
        <div className="p-8 bg-gray-200 kanban-board col-span-full rounded-xl sm:col-span-6 xl:col-span-4">
            <header className="flex justify-between mb-6">
                <h2 className="font-semibold text-gray-800 truncate dark:text-gray-100">{title}</h2>
                <button onClick={onAddNewTask} className="ml-2 shrink-0 text-violet-500 hover:text-violet-600 dark:hover:text-violet-400">
                    <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                </button>
            </header>
            <ul ref={taskListRef} className="block h-full space-y-4 parentTasks">
                {tasksList.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onDeleteTask={() => onDeleteTask(task.id)}
                        onEditTask={() => { }}
                    />
                ))}
            </ul>
        </div>
    );
};