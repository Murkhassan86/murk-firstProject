import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BucketService } from '../../bucket/bucket.service';
import { take, tap, map } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../../dashboard.service';
import { ConfirmationDialogService } from '../../../../shared/component/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-useritems',
  templateUrl: './useritems.component.html',
  styleUrls: ['./useritems.component.scss']
})
export class UseritemsComponent implements OnInit, OnDestroy {
  currentJustify="justified";
  selectedUserItemStatus: any;
  activeModal: NgbActiveModal;
  selectedbucketUserObj: any;
userItemsList: any [];
bucketUser: any;
usersList: any [];
bucketList: any [];
userItemSelectedId: any;
selectedIndex: any;
isApprove: boolean;
status: any;
storeStatus: any;
getStatus: any;
timer: any;
reasonForm: FormGroup;
apiStatus: string;
selectedUserId : any;
selectedBucketId: any;
reasonList: any [];
userItem: boolean;
getApproveStatus: any[];
getRejectedStatus: any[];
getPendingStatus: any[];
modalConfig: any = { size: 'lg' , ariaLabelledBy: 'available-persons-modal'}; 
  constructor(
    private bucketService: BucketService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private dashboardService: DashboardService,
    private confirmationDialog: ConfirmationDialogService
  ) { 

    this.reasonForm = new FormGroup ({
      reason: new FormControl('')
    })
  }

  ngOnInit() {
    this.loadBucketInfo();

   
  }

  loadBucketInfo() {
    this.userItemsList = [];
    this.bucketService.loadBucket()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.userItemsList = resp.result;
        this.getApproveStatus = this.userItemsList.filter(status => {
          return (status.status === 'Approved');
        })
        this.getRejectedStatus = this.userItemsList.filter(status => {
          return (status.status === 'rejected')
        })
        this.getPendingStatus = this.userItemsList.filter(status => {
          return (status.status === 'pending')
        })
        // this.userItemsList = this.userItemsList.filter(user => {
        //   return (user.UserId)
        // })
       
        console.log('~~Users with Items fetched successfully', resp);
        this.userItem = true;
        // console.log(this.userItemsList);
      })
    ).subscribe();
  }

  approve(userItemObj?: any, inx?: any) {
    // window.localStorage.setItem('updatedStatus', JSON.stringify({status: 'approved', data: userItemObj, index: inx}));
    // this.selectedUserItemStatus = {};
    // let bucketUserStatus: any = window.localStorage.getItem('updatedStatus');
    // bucketUserStatus = JSON.parse(bucketUserStatus);
    // if (!!bucketUserStatus && bucketUserStatus.status ) {
    //   this.selectedUserItemStatus = bucketUserStatus.status || {};
    // } 
    const payload: any = {
      category: userItemObj.category,
      price: userItemObj.price,
      condition: userItemObj.condition,
      agreement: userItemObj.agreement,
      image: userItemObj.image,
      status: 'Approved',
        firstName: userItemObj.UserId.firstName,
        lastName: userItemObj.UserId.lastName,
        email: userItemObj.UserId.email,
        password: userItemObj.UserId.password,
        role: userItemObj.UserId.role,
        UserId: userItemObj.UserId._id,
       _id: userItemObj._id
    };
    console.log(payload);
    this.apiStatus = 'loading';
    this.bucketService.updateBucket(payload)
    .pipe(
      take(1),
      map((resp: any) => {
        this.timer = setTimeout(() => { this.apiStatus = 'approved'; }, 2000);
        this.timer = setTimeout(() => {
          this.apiStatus = '';
          this.loadBucketInfo();
        }, 3000);
      })
    ).subscribe();
    
  }

  deleteBucket(userItemObj?: any, index?: any) {
   
    this.userItemSelectedId = userItemObj._id;
    this.selectedUserId = userItemObj.UserId._id;
  
    alert(this.userItemSelectedId);
    alert(this.selectedUserId);
    
    this.selectedIndex = index;
    
    alert(this.selectedIndex);  
    this.confirmationDialog.confirm("Confirmation..?", "Do You Really Want to Delete " + ' ' + userItemObj.UserId.firstName + ' ' + 'bucket Record' + '?')
    .then((confirmed) => {
      if (confirmed) {
        this.bucketService.deleteBucket(this.userItemSelectedId)
        .pipe(
          take(1),
          tap((resp: any) => {
            if (resp.success) {
              this.userItemsList.splice(this.selectedIndex, 1);
              console.log('~~Item Deleted successfully', resp);
            }
            this.cd.markForCheck();
          })
        ).subscribe();
      }  
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  open(content?: any, data?: any, inx?: any) {
    // if (flow === 'add') {
    //   this.isEditUser = false;
    // }
    window.localStorage.setItem('selected-bucketUser-info', JSON.stringify({ bucketUser: data, index: inx}));
     this.selectedbucketUserObj = {};
    let bucketUserInfo: any = window.localStorage.getItem('selected-bucketUser-info');
    bucketUserInfo = JSON.parse(bucketUserInfo);
    if (!!bucketUserInfo && bucketUserInfo.bucketUser ) {
      this.selectedbucketUserObj = bucketUserInfo.bucketUser || {};
    } 
    this.activeModal =  this.modalService.open(content, this.modalConfig);
  }

  // createReason(reasonData) {
  //   console.log(reasonData);
  //   const payload: any = {
  //     _id: this.selectedUserId,
  //     userItemId: this.userItemSelectedId,
  //     ...reasonData
  //   }
  //   this.dashboardService.createReason(payload)
  //   .pipe(
  //     take(1),
  //     tap((resp: any) => {
  //       if (resp.success) {
  //         this.reasonList = resp.result;
  //         console.log('~~rejection reason created successfully', resp);
  //         this.timer = setTimeout(() => { this.activeModal.close(); }, 1000);
  //       }
  //       this.cd.markForCheck();
  //     })
  //    ).subscribe();

  // }

  createReason(reasonData) {
this.selectedbucketUserObj = {};
let bucketUserInfo: any = window.localStorage.getItem('selected-bucketUser-info');
bucketUserInfo = JSON.parse(bucketUserInfo);
if (!!bucketUserInfo && bucketUserInfo.bucketUser ) {
  this.selectedbucketUserObj = bucketUserInfo.bucketUser || {};
} 
console.log(this.selectedbucketUserObj);
if (this.reasonForm.valid) {
  console.log(this.selectedbucketUserObj._id);
 const payload = {
  // _id: this.selectedbucketUserObj?._id,
  // UserId: this.selectedbucketUserObj?.UserId?._id,
  ...this.selectedbucketUserObj,
  reason: this.reasonForm.get('reason').value,
  status: 'rejected'
 }
 console.log(payload);
   this.bucketService.updateBucket(payload)
    .pipe(
      take(1),
      tap((resp: any) => {
        if (resp.success) {
          this.userItemsList.push(resp.result);
          console.log('~~user items updated successfully', resp);
          this.timer = setTimeout(() => { this.activeModal.close(); }, 1000);
        }
        this.cd.markForCheck();
      })
    ).subscribe();
}

  }

  approveRequest(data) {
    console.log(data);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
