import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ConnectedUser_I } from "../../interfaces";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { on_setInteractors } from "../../store/reducers/interactionsSlice";
import { useInteractionStore } from "../../store/hooks/useInteractionsStore";


interface useHook_I {
    socket: Socket | null;
    isConnected: boolean;
    users: ConnectedUser_I[];
}

const SOCKET_URL = "http://localhost:3150";

export const useSocket = () => {

    const dispatch = useDispatch();

    const {
        emit_setUsers,
        emit_removeUser,
        emit_setCurrentUser
    } = useInteractionStore();

    const [isConnected, setIsConnected] = useState(false);
    // const [users, setUsers] = useState<ConnectedUser_I[]>([]);
    const socketRef = useRef<Socket | null>(null);


    useEffect(() => {

        const socket: Socket = io(SOCKET_URL, { withCredentials: true });
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Connected to Socket.IO server", socket);
            setIsConnected(true);
        });

        socket.on("current_user", (user: ConnectedUser_I) => {
            emit_setCurrentUser(user);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from Socket.IO server");
            setIsConnected(false);
        });

        socket.on("user_desconnect", (id: string) => {

            emit_removeUser(id);

        });

        socket.on("update_user_list", (userList: ConnectedUser_I[]) => {
            emit_setUsers(userList);
        });

        return () => {
            socket.disconnect();
        };

    }, []);



    return {
        socket: socketRef.current,
        isConnected,
        // users,

    };
};
