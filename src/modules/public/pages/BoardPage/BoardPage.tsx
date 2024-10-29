import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useBoardStore } from '../../store/hooks';
import { ColumnsBoard } from './components';
import { Task_I } from '../../../../core/interfaces';

export const BoardPage = () => {

    const {
        state: { boards },

    } = useBoardStore();

    return (
        <div className="w-full h-auto px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
            <div className="grid grid-cols-12 gap-x-6 gap-y-8">

                {boards.map((board) => {

                    const [boardRef, _tasks] = useDragAndDrop<HTMLDivElement, Task_I>(
                        board.tasks,
                        {
                            group: "todoBoard"
                        }
                    );

                    return (
                        <ColumnsBoard key={board.id} board={{
                            ...board,
                            tasks: _tasks
                        }}
                            ref={boardRef}
                        />
                    )

                }

                )}
            </div>
        </div>
    );
};