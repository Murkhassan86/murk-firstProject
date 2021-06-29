import { Component, OnInit } from '@angular/core';
import { BucketService } from '../../../features-modules/dashboard/bucket/bucket.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-foot-wear',
  templateUrl: './foot-wear.component.html',
  styleUrls: ['./foot-wear.component.scss']
})
export class FootWearComponent implements OnInit {
footWearList: any;
  constructor(
    private bucketService: BucketService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.footWearList = [];
    // let getFootWear = window.localStorage.getItem('footWear-category');
    // console.log(getFootWear);
    // getFootWear = JSON.parse(getFootWear);
    // this.footWearList = getFootWear;
    // console.log('~~fetch foot Wear List', this.footWearList);
    this.loadBucket();
  }
  loadBucket() {
    this.footWearList  = [];
    this.bucketService.loadBucket()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.footWearList = resp.result;
        this.footWearList = this.footWearList .filter(item => {
          return (item.category === 'foot-wear' && item.status === 'Approved')
        })
        console.log('~~Bucket record fetched successfully', resp);
        // this.isDresses = true;
      })
    ).subscribe();
  }

  onSelectFootWear(footWearObj?: any, index?: any) {
    // console.log(jweleryObj);
    // window.localStorage.setItem('footWear-category', JSON.stringify({ footWear: footWearObj}));
    this.router.navigate(['/footWear', footWearObj.bucketIndex]);  

    
  }

}
