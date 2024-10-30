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
        },
        emit_CreateTaskModal

    } = useUiStore();



    return (
        <>
            <div className="w-full h-auto px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                <div className="grid grid-cols-12 gap-x-6 gap-y-8">

                    {boards.map((board) => {

                        return (
                            <ColumnsBoard key={board.id} board={board} onHandle={board.handle} />
                        )

                    }

                    )}
                </div>
            </div>

            {
                CreateTaskModal.status && ( <AddTaskModal /> )
            }
            {
                EditModal.status && ( <EditTaskModal /> )
            }

        </>
    );
};