import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserItem } from '../models/user,model';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getUsers(): Observable<UserItem[]> {
    let url = `https://jsonplaceholder.typicode.com/users`;
    return this.httpClient.get<UserItem[]>(url, {});
  }
}
