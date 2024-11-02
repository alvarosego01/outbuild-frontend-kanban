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

let socketInstance: Socket | null = null;

export const useSocket = () => {
    const { emit_setUsers, emit_removeUser, emit_setCurrentUser } = useInteractionStore();
    const [isConnected, setIsConnected] = useState(false);

    if (!socketInstance) {

        socketInstance = io(SOCKET_URL, { withCredentials: true });
    }

    useEffect(() => {
        const socket = socketInstance!;

        const handleConnect = () => {
            console.log("Connected to Socket.IO server");
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            console.log("Disconnected from Socket.IO server");
            setIsConnected(false);
        };

        const handleCurrentUser = (user: ConnectedUser_I) => {
            emit_setCurrentUser(user);
        };

        const handleUserDisconnect = (id: string) => {
            emit_removeUser(id);
        };

        const handleUpdateUserList = (userList: ConnectedUser_I[]) => {
            emit_setUsers(userList);
        };

        socket.on("connect", handleConnect);
        socket.on("current_user", handleCurrentUser);
        socket.on("disconnect", handleDisconnect);
        socket.on("user_desconnect", handleUserDisconnect);
        socket.on("update_user_list", handleUpdateUserList);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("current_user", handleCurrentUser);
            socket.off("user_desconnect", handleUserDisconnect);
            socket.off("update_user_list", handleUpdateUserList);
        };
    }, [emit_setUsers, emit_removeUser, emit_setCurrentUser]);

    return {
        socket: socketInstance,
        isConnected,
    };
};