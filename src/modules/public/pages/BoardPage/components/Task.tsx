
import { FC } from "react"
import { Task_I } from "../../../../../core/interfaces"


interface Props_I {
    task: Task_I;
}

export const Task: FC<Props_I> = ({ task }) => {
    const { title, description, created_at } = task;

    return (
        <div className="p-4 bg-white shadow-sm kanban-item h-fit hover:cursor-pointer dark:bg-gray-800 rounded-xl">
            <div className="mb-3">
                <h2 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
                <div className="text-sm">{description}</div>
            </div>

            <div className="flex items-center justify-between">

                <div className="flex flex-row buttonsSection gap-x-2">

                    <button className="flex items-center justify-center transition bg-white border border-gray-200 rounded-full w-7 h-7 hover:border-gray-300 text-violet-400">
                        <span className="sr-only">Add</span>
                        <i className=' bx bx-edit-alt'></i>
                    </button>
                    <button className="flex items-center justify-center text-red-400 transition bg-white border border-gray-200 rounded-full w-7 h-7 hover:border-gray-300">
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
                            { created_at }
                        </div>
                    </div>

                    <button className="flex items-center ml-3 text-gray-400 dark:text-gray-500 hover:text-violet-500 dark:hover:text-violet-500">
                        <svg className="shrink-0 fill-current mr-1.5" width="16" height="16" viewBox="0 0 16 16">
                            <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                        </svg>
                        <div className="text-xs text-gray-500 dark:text-gray-400">6</div>
                    </button>

                </div>

            </div>

        </div>
    )
}
