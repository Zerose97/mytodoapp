import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import * as TodoAction from "./todo.actions";
import { catchError, map, of, switchMap, mergeMap, withLatestFrom } from "rxjs";
import { ToDoService } from "../../services/todo.service";
import { TodoItem } from "../../models/todo.model";
import { selectAllTodo } from "./todo.selector";

@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private todoService: ToDoService
    ) {}

    loadTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoAction.loadTodo),
            switchMap((params) => {
                return this.todoService.getTodoList().pipe(
                    map((res) => {
                        return TodoAction.loadTodoSuccess({data: res})
                    }),
                    catchError((error) => {
                        return of(TodoAction.loadTodoFailure({error}))
                    })
                )
            })
        )
    )

    editTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoAction.editTodo),
            // withLatestFrom(this.store.select(selectAllTodo)),
            switchMap(({item}) => {
                return this.todoService.updateTodo(item)
            })
        ),
        { dispatch: false } // "fire and forget" effect
    )

    addTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoAction.addTodo),
            switchMap(({item}) => {
                return this.todoService.addTodo(item)
            })
        ),
        { dispatch: false } // "fire and forget" effect
    )

    removeTodo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TodoAction.removeTodo),
            switchMap(({id}) => {
                return this.todoService.removeTodo(id)
            })
        ),
        { dispatch: false } // "fire and forget" effect
    )
}