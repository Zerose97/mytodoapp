import { TodoState } from "./todo/todo.reducer";
import { UserState } from "./user/user.reducer";

export interface AppState {
  todos: TodoState;
  users: UserState;
}
