import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { uiSlice } from ".";

import { Core_Reducers_I } from "./interfaces";
import { Public_Reducers_I } from "../../modules/public/store/interfaces";
import { publicReducer } from "../../modules/public/store/store_public";

export interface Reducers_I extends Core_Reducers_I, Public_Reducers_I { }

const sessionReducer = combineReducers({
    // auth: authSlice.reducer,
    // notifications: notificationsSlice.reducer,
});

const globalReducer = combineReducers({
    ui: uiSlice.reducer,
    // session: sessionReducer,
});

export const core_store = configureStore<Reducers_I>({
    reducer: {
        _global: globalReducer,
        // dashboard: dashboardReducer,
        _public: publicReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

