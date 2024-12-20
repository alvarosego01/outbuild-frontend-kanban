import { useEffect } from "react";
import { useSocket } from ".";
import { ConnectedUser_I, CursorPosition_I } from "../../interfaces";
import { useInteractionStore } from "../../store/hooks/useInteractionsStore";
import { useBoardStore } from "../../../modules/public/store/hooks";


interface useHook_I {

}
export const useCursorTracking = () => {
    const { emit_setUserPosition } = useInteractionStore();
    const { socket } = useSocket();
    const {
        state: {
            onDragg
        },
        emit_allowExternalEmit
    } = useBoardStore();

    useEffect(() => {
        if (!socket) return;


        const getCursorPosition = (event: MouseEvent): CursorPosition_I => ({
            x: event.clientX,
            y: event.clientY
        });

        const handlePointerMove = (event: MouseEvent) => {
            const position = getCursorPosition(event);
            socket.emit("cursor_position", position);
            emit_allowExternalEmit(true);
        };


        const handleClick = (event: MouseEvent) => {
            const position = getCursorPosition(event);
            socket.emit("cursor_click", position);
            emit_allowExternalEmit(true);
        };


        socket.on("update_cursor_position", (payload: ConnectedUser_I) => {
            emit_setUserPosition(payload);
        });


        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("dragover", handlePointerMove);
        window.addEventListener("dragleave", handlePointerMove);
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("dragover", handlePointerMove);
            window.removeEventListener("dragleave", handlePointerMove);
            window.removeEventListener("click", handleClick);
            socket.off("update_cursor_position");
        };
    }, [socket, emit_setUserPosition, onDragg]);

};