import { Component, OnInit,  Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { take, tap } from 'rxjs/operators';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainHeaderComponent implements OnInit {
  @Input() isMobile: boolean;
  @Input() userInfo: any;
  @Input() SignUpList: any[];
  @Output() clickHandler: EventEmitter<any> = new EventEmitter<any>();
  public isCollapsed = true;
  allUsers: any = [];
  role: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.users();
    console.log(this.isMobile);
    this.role = window.localStorage.getItem('role');
    console.log(this.role);
    console.log(this.userInfo);
  }
  users() {
    this.allUsers = [];
    this.authService.loadSignUpUser()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.allUsers = resp.result.length;
        console.log(this.allUsers);
      })
    ).subscribe();
    // this.allUsers.push(this.SignUpList);
    // console.log(this.allUsers);
  }
  
}
