
import { useUiStore } from '../../../../core/store';
import { useBoardStore } from '../../store/hooks';
import { AddTaskModal, ColumnsBoard, CursorInteraction } from './components';

import { FC, useEffect } from 'react';
import { EditTaskModal } from './components/EditTaskModal';
import { useSocket } from '../../../../core/hooks';
import { useCursorTracking } from '../../../../core/sockets/hooks';
import { useInteractionStore } from '../../../../core/store/hooks/useInteractionsStore';

export const BoardPage: FC = () => {

    useCursorTracking();

    const {
        state: {
            currentUser,
            interations: {
                users
            }
        }
    } = useInteractionStore();

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
            <div className="relative flex flex-col w-full h-auto px-4 py-8 mx-auto z-1 sm:px-6 lg:px-8 max-w-9xl">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">Outbuild tasks</h1>
                    {
                        currentUser && (
                            <span className='flex self-center p-2 px-6 text-xl text-white bg-indigo-400 rounded-full name '>
                                <strong className='block mr-1'>Username:</strong> {currentUser.username}
                            </span>
                        )
                    }
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

            <CursorInteraction users={users} />

            {
                CreateTaskModal.status && (<AddTaskModal />)
            }
            {
                EditModal.status && (<EditTaskModal />)
            }
        </>
    );
};