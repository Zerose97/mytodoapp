import { Component, OnInit } from '@angular/core';
import { UserItem } from 'src/app/@core/models/user,model';
import { AuthenService } from 'src/app/@core/services/authen.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: UserItem | undefined | null;
  constructor(
    private authenService: AuthenService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authenService.getUserInfo;
  }

  logout() {
    this.authenService.logout();
  }

}
