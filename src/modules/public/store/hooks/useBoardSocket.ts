import { useEffect } from "react";
import { useSocket } from "../../../../core/hooks";
import { useBoardStore } from "./useBoardStore";
import { Board_I } from "../../../../core/interfaces";


interface useHook_I {
    emit_boards: () => void;
    emit_isDragginSocket: (status: boolean) => void;
}

export const useEmitBoardState = (): useHook_I => {

    const {
        state: {
            boards,
            allowExternalRefresh,
            allowExternalEmit
        },
        emit_onDragg,
        emit_setBoardData,
        emit_allowExternalRefresh,
        emit_allowExternalEmit,
        emit_refreshBoards,
        emit_setBoardExternalData
    } = useBoardStore();

    const { socket } = useSocket();

         useEffect(() => {

        if (!socket) return;


        socket.on("listen_boards", (payload: Board_I[]) => {

            emit_setBoardExternalData(payload);


        });

        socket.on('listen_draggin', (payload: boolean) => {

            emit_onDragg(payload);

        })

    }, [socket]);


    const emit_isDragginSocket = (status: boolean) => {

        socket.emit("emit_draggin", status);

    }

    const emit_boards = () => {

        if (!socket || !allowExternalEmit) return;
            socket.emit("emit_boards", boards);

    }

    return {
        emit_boards,
        emit_isDragginSocket

    }

};