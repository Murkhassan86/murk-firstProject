import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { BucketService } from '../bucket/bucket.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
name: any;
lastName: any;
email: any;
role: any;
phone: any;
city: any;
address: any;
bucketList: any [];
bucketApproveList: any [];
bucketPendingList: any [];
bucketRejectedList: any [];
loggedInUserId: any;
  constructor(
    private bucketService: BucketService
  ) { }

  ngOnInit() {
    this.name = window.localStorage.getItem('firstName');
    this.email = window.localStorage.getItem('user-email');
    this.lastName = window.localStorage.getItem('lastName');
    this.role = window.localStorage.getItem('role');
    this.phone = window.localStorage.getItem('phone');
    this.city = window.localStorage.getItem('city');
    this.address = window.localStorage.getItem('address');
    this.loggedInUserId = window.localStorage.getItem('loggedInUserId');
    console.log(this.loggedInUserId);
    this.loadBucket();
  }

  loadBucket() {
    this.bucketList = [];
    this.bucketService.loadBucket()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.bucketList = resp.result;
        // this.bucketListLength = resp.result.length;
        this.bucketApproveList = this.bucketList.filter(item => {
          return (item.UserId._id === this.loggedInUserId && item.status === 'Approved')
        })
        this.bucketRejectedList = this.bucketList.filter(item => {
          return (item.UserId._id === this.loggedInUserId && item.status === 'rejected')
        })
        this.bucketPendingList = this.bucketList.filter(item => {
          return (item.UserId._id === this.loggedInUserId && item.status === 'pending')
        })
        
        console.log('~~Bucket record fetched successfully', resp);
      })
    ).subscribe();
  }

}
