
import { Server, Socket } from "socket.io";


export interface Task_I {
    id: string;
    title: string;
    description: string;
    created_at: string;
}

export interface Board_I {
    id: string;
    title: string;
    tasks: Task_I[];
}

let boardState: Board_I[] = [];

export const boardHandler = (
    io: Server,
    socket: Socket,
) => {

    socket.on("emit_boards", (_boardState: Board_I[]) => {

        if (_boardState.length > 0) {
            boardState = [..._boardState];
        }
        socket.broadcast.emit("listen_boards", boardState);

    });

    socket.on("emit_draggin", (status) => {

        socket.broadcast.emit("listen_draggin", status);

    });


};