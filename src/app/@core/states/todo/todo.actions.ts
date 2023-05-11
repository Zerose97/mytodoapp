import { createAction, props } from "@ngrx/store";
import { TodoItem } from "../../models/todo.model";

export const loadTodo = createAction(
    '[Todo page] Load Todo List'
)

export const loadTodoSuccess = createAction(
    '[Todo page] Load Todo List Success',
    props<{data: TodoItem[]}>()
)

export const loadTodoFailure = createAction(
    '[Todo page] Load Todo List Failed',
    props<{ error: string }>()
)

export const editTodo = createAction(
    '[Todo page] Edit Todo',
    props<{ item: TodoItem }>()
)

export const addTodo = createAction(
    '[Todo page] Add Todo',
    props<{ item: TodoItem }>()
)

export const removeTodo = createAction(
    '[Todo page] Remove Todo',
    props<{ id: any }>()
)