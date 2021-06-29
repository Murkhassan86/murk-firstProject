import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../utility/menu.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';


@Component({
  selector: 'app-layout2',
  templateUrl: './layout2.component.html',
  styleUrls: ['./layout2.component.scss']
})
export class Layout2Component implements OnInit {
allUsers: any [];

  menuList: any;
  isHeader: boolean;
  userInfo: any;
  menuItemsArray: any[];
  menuItemsArray2: any[];
    isMobile: any = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i);
    constructor(
      private menuService: MenuService,
      private authService: AuthService,
      private router: Router,
     
    ) { }

  ngOnInit() {

    this.menuItemsArray2 = [];
    this.menuList = this.menuService;
    const menuList = this.menuService.getAll();
    console.log(menuList);
    menuList.map((menu: any) => {
      if(menu.main.length && menu.main.lenght > 0) {
        this.menuItemsArray2 = menu.main.map((item) => {
          if (item.name) {
            return { tittle: `${item.name.toUpperCase()}`, link: `/${item.state}`};
          }
        })
      }
    })
    this.users();
   
    this.userInfo = {
      role: window.localStorage.getItem('role'),
      firstName: window.localStorage.getItem('firstName'),
      loggedInUserId: window.localStorage.getItem('loggedInUserId'),
      
    }
   
    console.log('user info', this.userInfo);
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


signOut() {
  this.authService.logout();
}
onMenuClose() {
  console.log('menu closed');
}
 onMenuOpen() {
  console.log('menu Opened');
}
 onItemSelect(item: any) {
  console.log(item);
  if (item.link === '/logout') {
    this.authService.logout();
  } else {
    this.router.navigate([ item.link ]);
  }
}

}
