import { Component, OnInit } from '@angular/core';
import { BucketService } from '../../../features-modules/dashboard/bucket/bucket.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dress',
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.scss']
})
export class DressComponent implements OnInit {
dressesList: any;
isDresses: boolean;
  constructor(
    private bucketService: BucketService,
    private route: Router
  ) { }

  ngOnInit() {
    // this.dressesList = [];
    // let getDress = window.localStorage.getItem('dress-catgeory');
    // getDress = JSON.parse(getDress);
    // this.dressesList = getDress;
    // console.log('~~fetch dresses successfully', this.dressesList);
    this.loadBucket();
  }

  
  loadBucket() {
    this.dressesList = [];
    this.bucketService.loadBucket()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.dressesList = resp.result;
        this.dressesList = this.dressesList.filter(item => {
          return (item.category === 'dress' && item.status === 'Approved')
        })
        console.log('~~Bucket record fetched successfully', resp);
        this.isDresses = true;
      })
    ).subscribe();
  }

  onSelectDress(dress?: any, index?: any) {
    this.route.navigate(['/dresses', dress.bucketIndex ]);  
    this.isDresses = true;
  }
}
