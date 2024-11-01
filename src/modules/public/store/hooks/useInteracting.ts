
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BoardState_I } from "../reducers/boardSlice";
import { Reducers_I } from "../../../../core/store/store";
import { ConnectedUser_I } from "../../../../core/interfaces";
import { useSocket } from "../../../../core/hooks";
import { useEffect } from "react";

interface useHook_I {

    state: BoardState_I;

    emit_setUserPosition: (users: ConnectedUser_I) => void;
    // emit_restoreDefault: () => void;

}

export const useInteractingBoard = (): useHook_I => {


    const dispatch = useDispatch();

    const state = useSelector<Reducers_I, BoardState_I>(({ _public }) => _public.board, shallowEqual);

    const emit_setUserPosition = (users: ConnectedUser_I) => {

        // dispatch(on_setInteractors({ users }));

    }

    return {
        state,

            emit_setUserPosition
    }

}