import { Component, Input, OnInit, ViewChild } from '@angular/core';


import { AuthService } from '../../../auth/auth.service';
import { take, tap } from 'rxjs/operators';
import { BucketService } from '../bucket/bucket.service';
@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  // @ViewChild("chart") chart: ChartComponent;
  // public chartOptions: Partial;
  currentJustify="justified";
  signUpUsers: any;
  isSignUpUsers: boolean;
  isLoginUsers: boolean;
  isBucket: boolean;
  signUpUsersList: any[];
  loginUsersList: any [];
  loginUsers: any;
  bucketList: any[];
  bucketListLength: any;
 getApproveStatus: any;
 getRejectedStatus: any;
 getPendingStatus: any;
  constructor(
    private authService: AuthService,
    private bucketService: BucketService
  ) { 



    // this.chartOptionsUsersPie = {
    //   series : [this.signUpUsers],
    //   labels: ['Users'],
    //   chart: {
    //     type: 'donut'
    //   }
    // }
  }

  ngOnInit() {
    // this.signUpUsers = this.authService.loadSignUpUser.length;
    // console.log(this.signUpUsers);

      this.loadSignUpUsers();
      this.loadLoginUsers();
      this.loadBucket();
   

   
    // this.signUpUsers = this.SignUpList.length;
    // console.log(this.SignUpList);

  }

loadSignUpUsers() {
  this.signUpUsersList = [];
  this.authService.loadSignUpUser()
  .pipe(
    take(1),
    tap((resp: any) => {
      this.signUpUsersList = resp.result;
      this.signUpUsers = resp.result.length;
      console.log(this.signUpUsers);
      this.isSignUpUsers = true;
    })
  ).subscribe();
}

loadLoginUsers() {
this.loginUsersList = [];
this.authService.loadUsers()
.pipe(
  take(1),
  tap((resp: any ) => {
    this.loginUsersList = resp.result;
    this.loginUsers = resp.result.length;
    // this.isLoginUsers = true;
    console.log(this.loginUsers);
  })
).subscribe();
}

loadBucket() {
  this.bucketList = [];
  this.bucketService.loadBucket()
  .pipe(
    take(1),
    tap((resp: any) => {
      this.bucketList = resp.result;
      this.getApproveStatus = this.bucketList.filter(status => {
        return (status.status === 'Approved');
      })
      this.getRejectedStatus = this.bucketList.filter(status => {
        return (status.status === 'rejected')
      })
      this.getPendingStatus = this.bucketList.filter(status => {
        return (status.status === 'pending')
      })
      this.bucketListLength = resp.result.length;
      console.log(this.bucketListLength);
      console.log('~~Bucket record fetched successfully', resp);
      this.isBucket = true;
     
    })
  ).subscribe();
}

}
