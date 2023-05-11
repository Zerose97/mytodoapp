import { TodoItem } from "../../models/todo.model";
import { createReducer, on } from "@ngrx/store";
import * as TodoActions from './todo.actions';

export interface TodoState {
    todos: TodoItem[];
    total: number;
    error: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: TodoState = {
    todos: [],
    total: 0,
    error: null,
    status: 'pending',
};

export const todoReducer = createReducer(
    initialState,
    on(TodoActions.loadTodo, (state) => ({
        ...state,
        status: 'loading'
    })),
    on(TodoActions.loadTodoSuccess, (state, { data }) => ({
        ...state,
        todos: [...state.todos, ...data],
        error: null,
        status: 'success'
    })),
    on(TodoActions.loadTodoFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error'
    })),
    on(TodoActions.addTodo, (state, { item }) => ({
        ...state,
        todos: [{...item}, ...state.todos],
    })),
    on(TodoActions.removeTodo, (state, { id }) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
    })),
    on(TodoActions.editTodo, (state, { item }) => ({
        ...state,
        todos: state.todos.map((t: TodoItem) => {
            if (t.id === item.id) {
                return {
                    ...t,
                    title: item.title,
                    checked: item.checked
                };
            }
            return t;
        }),
        error: null,
        status: 'error'
    })),
)