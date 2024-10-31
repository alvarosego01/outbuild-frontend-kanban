import { BlankModal, InfoModal } from '../../../../core/components';
import { useUiStore } from '../../../../core/store';
import { useBoardStore } from '../../store/hooks';
import { AddTaskModal, ColumnsBoard } from './components';

import { useEffect } from 'react';
import { EditTaskModal } from './components/EditTaskModal';

export const BoardPage = () => {

    const {
        state: { boards },

    } = useBoardStore();

    const {
        state: {
            modals: {
                CreateTaskModal,
                EditModal
            }
        }
    } = useUiStore();

    return (
        <>
            <div className="flex flex-col w-full h-auto px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                <div className="">
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">Outbuild tasks</h1>
                </div>
                <hr className='mt-6 mb-10' />
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">

                    {boards.map((board) => {
                        return (
                            <ColumnsBoard key={board.id} board={board} onHandle={board.handle} />
                        )
                    })}

                </div>
            </div>

            {
                CreateTaskModal.status && (<AddTaskModal />)
            }
            {
                EditModal.status && (<EditTaskModal />)
            }

        </>
    );
};