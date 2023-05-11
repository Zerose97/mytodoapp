import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.actions';
import { UserItem } from "../../models/user,model";

export interface UserState {
    users: UserItem[];
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}
  
export const initialState: UserState = {
    users: [],
    error: null,
    status: 'pending',
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.loadUser, (state) => ({
        ...state,
        status: 'loading'
    })),
    on(UserActions.loadUserSuccess, (state, {data}) => ({
        ...state,
        users: [...state.users, ...data],
        error: null,
        status: 'success'
    })),
    on(UserActions.loadUserFailure, (state, {error}) => ({
        ...state,
        error: error,
        status: 'error'
    })),
)