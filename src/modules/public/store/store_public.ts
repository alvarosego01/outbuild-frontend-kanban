
import { combineReducers } from "@reduxjs/toolkit";
import { boardSlice } from "./reducers/boardSlice";



export const publicReducer = combineReducers({

    // profile: profileSlice.reducer,
    board: boardSlice.reducer,

});
