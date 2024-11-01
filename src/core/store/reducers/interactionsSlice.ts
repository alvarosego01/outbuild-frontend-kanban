import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectedUser_I } from "../../interfaces";


export interface InteractionsState_I {

    currentUser: ConnectedUser_I;
    interations: {
        users: ConnectedUser_I[]
    }

}

const initialState: InteractionsState_I = {

    currentUser: {
        id: "",
        username: "",
        position: {
            x: 0,
            y: 0
        }
    },
    interations: {
        users: []
    }

}

export const interactionsSlice = createSlice({
    name: "interactions",
    initialState,
    reducers: {
        on_setCurrentUser: (state, { payload }: PayloadAction<{ user: ConnectedUser_I }>) => {

            state.currentUser = payload.user;

        },
        on_removeUser: (state, { payload }: PayloadAction<{ id: string }>) => {

            state.interations.users = state.interations.users.filter((user: ConnectedUser_I) => user.id !== payload.id);

        },
        on_setInteractors: (state, { payload }: PayloadAction<{ users: ConnectedUser_I[] }>) => {

            state.interations.users = payload.users.filter((user: ConnectedUser_I) => user.id !== state.currentUser.id);

        },
        on_setUserPosition: (state, { payload }: PayloadAction<{ user: ConnectedUser_I }>) => {

            const user_index = state.interations.users.findIndex((user: ConnectedUser_I) => user.id === payload.user.id);

            if (user_index !== -1) {

                state.interations.users[user_index].position = payload.user.position;

            }

        }

    }

});

export const {
    on_setInteractors,
    on_setUserPosition,
    on_removeUser,
    on_setCurrentUser
} = interactionsSlice.actions;