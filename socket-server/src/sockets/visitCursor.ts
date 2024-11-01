import { Server, Socket } from "socket.io";
import { ConnectedUser_I, CursorPosition_I } from '../core/interfaces/index';



export const registerCursorHandlers = (
    io: Server,
    socket: Socket,
    connectedUsers: ConnectedUser_I[]
) => {

    socket.on("cursor_position", (position: CursorPosition_I) => {

        const user = connectedUsers.find(user => user.id === socket.id);
        if (user) {
            user.position = position;
        }

        socket.broadcast.emit("update_cursor_position", {
            id: socket.id,
            position
        });

    });

    socket.on("cursor_click", (position: CursorPosition_I) => {
        socket.broadcast.emit("user_click", {
            id: socket.id,
            position
        });
    });
};