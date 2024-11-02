
import http from 'http';
import { Server, Socket } from "socket.io";
import { registerCursorHandlers } from './visitCursor';
import { ConnectedUser_I } from '../core/interfaces';
import { boardHandler } from './boards';

const connectedUsers: ConnectedUser_I[] = [];

export const initializeSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    io.on("connection", (socket: Socket) => {
        console.log(`User connected: ${socket.id}`);

        const newUser = {
            id: socket.id,
            position: { x: 0, y: 0 },
            username: `User-${Math.floor(Math.random() * 1000)}`
        };

        socket.emit("current_user", newUser);

        connectedUsers.push(newUser);

        const usersExcludingCurrent = connectedUsers.filter(user => user.id !== socket.id);
        socket.emit("update_user_list", usersExcludingCurrent);

        socket.broadcast.emit("update_user_list", connectedUsers);

        registerCursorHandlers(io, socket, connectedUsers);
        boardHandler(io, socket);

        socket.on("disconnect", () => {

            console.log(`User disconnected: ${socket.id}`);

            const index = connectedUsers.findIndex(user => user.id === socket.id);
            if (index !== -1) {
                connectedUsers.splice(index, 1);
            }
            socket.broadcast.emit("update_user_list", connectedUsers);

        });
    });

};