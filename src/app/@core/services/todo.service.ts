import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TodoItem } from '../models/todo.model';
import { AuthenService } from './authen.service';

@Injectable({ providedIn: 'root' })
export class ToDoService {

  constructor(
    private httpClient: HttpClient,
    private authenService: AuthenService
  ) {}

  getTodoList(): Observable<TodoItem[]> {
    const userId = (this.authenService.getUserInfo)?.id;
    let url = `https://jsonplaceholder.typicode.com/todos?userId=${userId}`;
    return this.httpClient.get<TodoItem[]>(url, {}).pipe(map(dataApi => this.handleGifData(dataApi)));
  }

  updateTodo(body: TodoItem): Observable<any> {
    let url = `https://jsonplaceholder.typicode.com/todos/${body.id}`;
    return this.httpClient.put<any>(url, body).pipe(
      // map(dataApi => {return body}) // let pretent that api is success :')
    );
  }

  addTodo(body: TodoItem): Observable<any> {
    let url = `https://jsonplaceholder.typicode.com/todos`;
    return this.httpClient.post<any>(url, body);
  }

  removeTodo(id: any): Observable<any> {
    let url = `https://jsonplaceholder.typicode.com/todos/${id}`;
    return this.httpClient.delete<any>(url);
  }

  // handle Data
  private handleGifData(dataApi: TodoItem[]): TodoItem[] {
    dataApi.map(t => {
      t.checked = false;
    })
    return dataApi;
  }
}
