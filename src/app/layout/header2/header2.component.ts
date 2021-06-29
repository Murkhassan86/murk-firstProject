import { Component, OnInit } from '@angular/core';
import { BucketService } from '../../features-modules/dashboard/bucket/bucket.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit {
userItemsList: any;
dressesList: any [];
jweleryList: any [];
footWearList: any [];
isJwelery: boolean;
  constructor(
    private bucketService: BucketService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadBucketInfo();
  }

  
  loadBucketInfo() {
    this.userItemsList = [];
    this.bucketService.loadBucket()
    .pipe(
      take(1),
      tap((resp: any) => {
        // this.userItemsList = resp.result;
        this.dressesList = resp.result.filter(item => {
          return (item.category === 'dress' && item.status === 'Approved')
        });
        this.jweleryList = resp.result.filter(item => {
          return ( item.category === 'jwelery' && item.status === 'Approved' )
          
        });
        this.footWearList = resp.result.filter(item => {
          return ( item.category === 'foot-wear' && item.category === 'Approved')
        })
        // this.isJwelery = true;
      })
    ).subscribe();
  }

  toDress() {
    // window.localStorage.setItem('dress-category', JSON.stringify({ dress: this.dressesList}));
    this.router.navigate(['/dresses']);
  }
toJwelery() {
  // window.localStorage.setItem('jwelery-category', JSON.stringify({ jwelery: this.jweleryList }));
this.router.navigate(['/jwelery']);
}

toFootWear() {
  // window.localStorage.setItem('footWear-category', JSON.stringify({footWear: this.footWearList}));
  this.router.navigate(['/footWear']);
}
}
