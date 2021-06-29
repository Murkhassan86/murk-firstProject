import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DashboardService } from '../../dashboard.service';
import { take, tap, map } from 'rxjs/operators';
import { ConfirmationDialogService } from '../../../../shared/component/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit, OnDestroy {
  activeModal: NgbActiveModal;
  selectedId: any;
  selectedIndex: any;
  userInfoList: any = [];
  users: any = [];
  submitted: boolean;
  isEditUser: boolean;
  userInfoForm: FormGroup;
  timeOut: any;
  apiResponse: any;
  modalConfig: any = { size: 'md' , ariaLabelledBy: 'available-persons-modal'}; 
countries: any = ['Pakistan', 'UAE', 'UK', 'USA', 'CHINA', 'SAUDIA', 'TURKEY', 'MALAYSIA', 'SINGAPORE'];
  constructor(
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef,
    private confirmationService: ConfirmationDialogService
  ) { 
    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      birthDate: new FormControl('',[Validators.required])
    })
  }

  ngOnInit() {
    this.getUserInfo();
  }
  createUser(userData) {
    this.submitted = true;
   this.apiResponse = {
     success: false,
     failure: false,
     inProcess: true
   }
     if (this.userInfoForm.valid) {
       console.log(userData);
       this.dashboardService.createUserInfo(userData)
       .pipe(
         take(1),
         tap((resp: any) => {
           if (!! resp.success) {
             this.apiResponse.success = true;
            this.userInfoList.push(resp.result);
            this.apiResponse.inProcess = false;
            this.timeOut = setTimeout(() => { this.activeModal.close(); }, 1000);
            console.log('~~UserInfo Created Success', resp);
           }
           else {
             this.apiResponse.failure = true;
             this.apiResponse.inProcess = false;
           }
           this.cd.markForCheck();
         })
       ).subscribe(err => err);
      
      
     }
     else {
       this.apiResponse.inProcess = false;
     }
     this.submitted = false;
     this.userInfoForm.reset();

  }

  getUserInfo() {
    this.userInfoList = [];
    this.dashboardService.getUserInfo()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.userInfoList = resp.result;
        console.log('~~Load User info List Success', resp);
      })
    ).subscribe();
  }

  deleteUser(userObj?: any, index?: any) {
    this.selectedId = userObj._id;
    alert(this.selectedId);
    this.selectedIndex = index;
    this.confirmationService.confirm('Confirmation..?', 'Do you really want to delete the record of' + ' ' + userObj.firstName + '?'  )
    .then((confirmed) => {
    console.log(confirmed);
    if (confirmed) {
      this.dashboardService.deleteUserInfo(this.selectedId)
      .pipe(
        take(1),
        tap((resp: any) => {
          this.userInfoList.splice(this.selectedIndex, 1);
          console.log('~~Deleted suceess', resp);
        })
      ).subscribe();
    }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
 
  }

  editUser(userObj?: any, index?: any, content?: any) {
    this.selectedId = userObj._id;
    alert(this.selectedId);
    let updatedUserData = userObj;
    this.selectedIndex = index;
    this.isEditUser = true;
    this.userInfoForm.patchValue(updatedUserData);
    this.open(content, 'edit');
  }

  updateUser(userData) {
    const updatedPayload: any = {
      ...userData, _id: this.selectedId
    }
    this.apiResponse = {
      success: false,
      failure: false,
      inProcess: true
    }
    console.log(updatedPayload);
    this.dashboardService.updateUserInfo(updatedPayload)
    .pipe(
      take(1),
      map((resp: any) => {
        if (resp.success) {
          this.apiResponse.success = true;
          this.userInfoList[this.selectedIndex] = resp.result;
          this.apiResponse.inProcess = false;
          console.log('~~ Updated success', resp);
          console.log(this.userInfoList);
          this.timeOut = setTimeout(() => { this.activeModal.close(); }, 1000);
        } else {
          this.apiResponse.failure = true;
          this.apiResponse.inProcess = false;
        }
        this.cd.markForCheck();

      })
    ).subscribe(err => err);
  }
  onLogout() {
 this.authService.logout();
  }



  open(content?: any, flow?: any) {
    if (flow === 'add') {
      this.isEditUser = false;
    }
    this.activeModal =  this.modalService.open(content, this.modalConfig);
  }
  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }


}
