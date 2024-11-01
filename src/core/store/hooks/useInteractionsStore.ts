import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { InteractionsState_I, on_removeUser, on_setCurrentUser, on_setInteractors, on_setUserPosition } from '../reducers/interactionsSlice';
import { Reducers_I } from '../store';
import { ConnectedUser_I } from '../../interfaces';



interface useHookStore_I {

    state: InteractionsState_I;

    emit_setUsers: (userList: ConnectedUser_I[]) => void;
    emit_setUserPosition: (user: ConnectedUser_I) => void;
    emit_setCurrentUser: ( user: ConnectedUser_I ) => void;
    emit_removeUser: ( id: string ) => void;


}

export const useInteractionStore = (): useHookStore_I => {

    const dispatch = useDispatch();

    const state = useSelector<Reducers_I, InteractionsState_I>(({ _global }) => _global.interactions, shallowEqual);

    const emit_setUsers = (userList: ConnectedUser_I[]) => {

        dispatch(on_setInteractors({ users: userList }));

    }

    const emit_setUserPosition = (user: ConnectedUser_I) => {

        dispatch(on_setUserPosition({ user }));

    }

    const emit_setCurrentUser = (user: ConnectedUser_I) => {

        dispatch(on_setCurrentUser({ user }));

    }

    const emit_removeUser = (id: string) => {

        dispatch(on_removeUser({ id }));

    }



    return {

        state,

        emit_setUsers,
        emit_setUserPosition,
        emit_removeUser,
        emit_setCurrentUser

    }

}
