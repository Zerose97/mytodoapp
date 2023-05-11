import { createAction, props } from "@ngrx/store";
import { UserItem } from "../../models/user,model";

export const loadUser = createAction(
    '[Login page] Load User List'
)

export const loadUserSuccess = createAction(
    '[Login page] Load User List Success',
    props<{data: UserItem[]}>()
)

export const loadUserFailure = createAction(
    '[Login page] Load User List Failed',
    props<{ error: string }>()
)