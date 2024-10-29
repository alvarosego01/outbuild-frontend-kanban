import { FC, useEffect, useState } from "react";
import { Board_I, Task_I } from "../../../../../core/interfaces";
import { Task } from "./Task";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useBoardStore } from "../../../store/hooks";


interface Props_I {
    board: Board_I;
}

export const ColumnsBoard: FC<Props_I> = ({ board }) => {

    const {

        emit_setBoardData

    } = useBoardStore();

    const [isMounted, setisMounted] = useState(false)

    const { title, tasks, id } = board;

    const [taskListRef, tasksList] = useDragAndDrop<HTMLUListElement, Task_I>(
        tasks,
        { group: "taskGroup" }
    );


    useEffect(() => {

        if (!isMounted) return;

        emit_setBoardData(id, tasksList);

    }, [tasksList])

    useEffect(() => {
        setisMounted(true);
    }, []);

    return (
        <div className="p-8 bg-gray-200 kanban-board col-span-full rounded-xl sm:col-span-6 xl:col-span-4">
            <header className="mb-6">
                <h2 className="font-semibold text-gray-800 truncate dark:text-gray-100">{title}</h2>
            </header>
            <ul ref={taskListRef} className="block h-full space-y-4 parentTasks">
                {tasksList.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
};