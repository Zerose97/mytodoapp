import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

export const selectUser = (state: any) => state.users;

export const selectAllUser = createSelector(
    selectUser,
    (state: UserState) => state.users
);
