import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { take, tap, map } from 'rxjs/operators';
import { Menu, MenuService } from '../../../../shared/utility/menu.service';
import { ConfirmationDialogService } from '../../../../shared/component/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-signup-users',
  templateUrl: './signup-users.component.html',
  styleUrls: ['./signup-users.component.scss']
})
export class SignupUsersComponent implements OnInit {
SignUpList: any = [];
isMobile: any;
selectedId: any;
selectedIndex: any;

  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private confirmationService: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.menuService.getAll();
    
    // this.isMobile = this.menuService.isMobile();
  }

  loadUsers() {
    this.SignUpList = [];
    this.authService.loadSignUpUser()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.SignUpList = resp.result;
        console.log('~~load Registered success', resp);
      })
    ).subscribe();
  }

deleteUser(userObj?: any, index?: any) {
  this.selectedId = userObj._id;
  this.selectedIndex = index;
  this.confirmationService.confirm('Confirmation..?', 'Do You Really Want to Delete the Record of ' + ' ' + userObj.firstName + '?')
  .then((confirmed) => {
    if (confirmed) {
      this.authService.deletesignUpUser(this.selectedId)
      .pipe(
        take(1),
        tap((resp: any) => {
          if (resp.success) {
            this.SignUpList.splice(this.selectedIndex, 1);
            console.log('~~User Deleted Success');
          }
        })
      ).subscribe();
    }
  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  
}

}
