import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../app.state";
import { Store } from "@ngrx/store";
import * as UserActions from "./user.actions";
import { catchError, map, of, switchMap, mergeMap } from "rxjs";
import { UserService } from "../../services/user.service";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private userService: UserService
    ) {}

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUser),
            switchMap(() => {
                return this.userService.getUsers().pipe(
                    map((res) => {
                        return UserActions.loadUserSuccess({data: res})
                    }),
                    catchError((error) => {
                        return of(UserActions.loadUserFailure({error}))
                    })
                )
            })
        )
    )
}