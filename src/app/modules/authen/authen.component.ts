import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUser } from 'src/app/@core/states/user/user.actions';
import { Observable, firstValueFrom } from 'rxjs';
import { UserItem } from 'src/app/@core/models/user,model';
import { selectAllUser } from 'src/app/@core/states/user/user.selector';
import { StorageKey } from 'src/app/@core/models/storage-key.model';
import { AuthenService } from 'src/app/@core/services/authen.service';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.scss']
})
export class AuthenComponent implements OnInit {
  allUser$: Observable<UserItem[]> = this.store.select(selectAllUser);
  regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  emailForm = this.fb.group({
    email: ['', [Validators.required,  Validators.pattern(this.regexEmail)]]
  });
  submitted = false;
  errorMsg = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private authenService: AuthenService
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.store.dispatch(loadUser());
    const user = this.authenService.getUserInfo;
    if(!!user) this.router.navigate(['layout']);
  }

  onLogin() {
    this.submitted = true;
    const formValue = this.emailForm.value;
    const email = formValue.email || '';
    if(this.emailForm.invalid) {
      return;
    }
    const allUser = firstValueFrom(this.allUser$);
    allUser.then(res => {
      const user = res.find(u => u.email === email);
      if(user) {
        this.router.navigate(['layout']);
        this.authenService.setUser(user);
      } else {
        this.errorMsg = 'User Not found';
      }
    })
  }

}
