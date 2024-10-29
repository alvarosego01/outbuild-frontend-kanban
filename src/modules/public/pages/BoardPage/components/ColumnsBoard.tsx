import { FC } from "react";
import { Board_I, Task_I } from "../../../../../core/interfaces";
import { Task } from "./Task";

interface Props_I {
    board: Board_I;
    ref: React.RefObject<HTMLDivElement>
}

export const ColumnsBoard: FC<Props_I> = ({ board, ref }) => {

    const { title, tasks, id } = board;

    return (
        <div className="p-8 bg-gray-200 kanban-board col-span-full rounded-xl sm:col-span-6 xl:col-span-4">
            <header className="mb-6">
                <h2 className="font-semibold text-gray-800 truncate dark:text-gray-100">{title}</h2>
            </header>
            <div className="block h-full space-y-4 parentTasks" ref={ref}>
                {tasks.map((task, index) => (
                    <Task
                        className="kanban-item"
                        key={task.id + index}
                        task={task}
                    />
                ))}
            </div>
        </div>
    );
};