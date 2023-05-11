import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { UserItem } from '../models/user,model';
import { StorageKey } from '../models/storage-key.model';

@Injectable()
export class AuthenService {
    public selectedHeader$ = new BehaviorSubject<string>('');
    constructor(
        private router: Router,
    ) {}

    get getUserInfo(): UserItem | null {
        try {
            return JSON.parse(localStorage.getItem(StorageKey.LoginUser) || '');
        } catch (error) {
            return null;
        }
    }

    public clearStorage() {
        localStorage.clear();
        sessionStorage.clear();
    }

    public isLoggedIn(): boolean {
        const getUser = this.getUserInfo;
        return !!getUser;
    }

    public setUser(user: UserItem) {
        this.clearStorage();
        localStorage.setItem(StorageKey.LoginUser, JSON.stringify(user));
    }

    public logout() {
        this.clearStorage();
        this.router.navigate(['login']);
    }
}
