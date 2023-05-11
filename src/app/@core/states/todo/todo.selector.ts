import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TodoState } from './todo.reducer';

export const selectTodo = (state: any) => state.todos;

export const selectAllTodo = createSelector(
    selectTodo,
    (state: TodoState) => state.todos
);

// export const selectPagination = createSelector(
//     selectTrendingGiphy,
//     (state: TodoState) => state.pagination
// );
