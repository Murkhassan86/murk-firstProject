import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { take, tap, map } from 'rxjs/operators';
import { SelectorMatcher } from '@angular/compiler';

@Component({
  selector: 'app-login-users',
  templateUrl: './login-users.component.html',
  styleUrls: ['./login-users.component.scss']
})
export class LoginUsersComponent implements OnInit {
users: any = [];
userData: any;
selectedIndex: any;
selectedId: any
  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users = [];
    this.authService.loadUsers()
    .pipe(
      take(1),
      tap((resp: any)=> {
        this.users = resp.result;
        console.log('~~load users', resp);
      })
    ).subscribe();
  }

  deleteUser(userObj?: any, index?: any) {
    this.userData = userObj;
    this.selectedId = userObj._id;
    alert(this.selectedId);
    this.selectedIndex = index;
    this.authService.deleteUser(this.selectedId)
    .pipe(
      take(1),
      tap((resp: any) => {
        if (resp.success) {
          this.users.splice(this.selectedIndex, 1);
          console.log('~~User deleted success');
        }
        this.cd.markForCheck();
      })
    ).subscribe();

  }

}
