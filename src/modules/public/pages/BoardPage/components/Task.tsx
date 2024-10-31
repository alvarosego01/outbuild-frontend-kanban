
import { FC, useEffect } from "react"
import { Handle_Events_I, Task_I } from "../../../../../core/interfaces"


interface Props_I {
    task: Task_I;
    handle: Handle_Events_I,
    onDeleteTask: () => void;
    onEditTask: () => void;
}

export const Task: FC<Props_I> = ({
    task,
    handle,
    onDeleteTask,
    onEditTask,
}) => {
    const { title, description, created_at } = task;

    const { isLoading, isInteracting } = handle;

    return (
        <div className="p-4 bg-white shadow-sm kanban-item h-fit hover:cursor-grab hover:bg-indigo-100 rounded-xl "  >
            <div className="mb-3">
                <h2 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                <div className="text-sm">{description}</div>
            </div>

            <div className="flex items-center justify-between">

                <div className="flex flex-row buttonsSection gap-x-2">

                    <button
                        onClick={onEditTask}
                        className="flex items-center justify-center transition bg-white border border-gray-200 rounded-full w-7 h-7 hover:border-gray-300 text-violet-400 tooltip" data-tip="Edit task">
                        <span className="sr-only">Edit</span>

                         {
                            !isLoading ? (
                                <i className=' bx bx-edit-alt'></i>
                            ) : (
                                <svg className="w-4 h-4 fill-current mr-s_7.5 animate-spin shrink-0" viewBox="0 0 16 16">
                                    <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                                </svg>
                            )
                        }


                    </button>
                    <button
                        onClick={onDeleteTask}
                        className="flex items-center justify-center text-red-400 transition bg-white border border-gray-200 rounded-full w-7 h-7 hover:border-gray-300 tooltip" data-tip="Delete task">
                        <span className="sr-only">Delete</span>
                        <i className='bx bx-trash'  ></i>
                    </button>

                </div>

                <div className="flex items-center">

                    <div className="flex items-center ml-3 text-yellow-500">
                        <svg className="shrink-0 fill-current mr-1.5" width="16" height="16" viewBox="0 0 16 16">
                            <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
                            <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
                        </svg>
                        <div className="text-xs text-yellow-600">
                            {created_at}
                        </div>
                    </div>



                </div>

            </div>

        </div>
    )
}
