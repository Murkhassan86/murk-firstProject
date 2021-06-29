import { Component, OnInit } from '@angular/core';
import { BucketService } from '../../../../features-modules/dashboard/bucket/bucket.service';
import { take, tap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-foot-wear-details',
  templateUrl: './foot-wear-details.component.html',
  styleUrls: ['./foot-wear-details.component.scss']
})
export class FootWearDetailsComponent implements OnInit {
footWearList: any;
footWearId: any;
  constructor(
    private bucketService: BucketService,
    private router: Router,
    private ac: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.footWearList = {};
    // let getFootWear = window.localStorage.getItem('footWear-category');
    // getFootWear = JSON.parse(getFootWear);
    // this.footWearList = getFootWear;
    // console.log('~~fetch foot wear success', this.footWearList);
    this.ac.paramMap.subscribe((param: ParamMap) => {
      this.footWearId = (param.get('id'));
    })
    console.log(this.footWearId);
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

buyProduct(footWearObj?: any) {
  // this.isDress = true;
  window.localStorage.setItem('footWear', JSON.stringify({footWear: footWearObj}));
this.router.navigate(['/login']);
}

addToCart(footWearObj?: any) {
 window.localStorage.setItem('footWear-to-add-cart', JSON.stringify({footWearToAddCart: footWearObj}));
 this.router.navigate(['/login']);
}

goPrev(){
  let PreviousId = (+this.footWearId) + (-1);
  this.router.navigate(['/footWear', PreviousId]);
}
 goNext(){
   let NextId = (+this.footWearId) + (+1);
   this.router.navigate(['/footWear', NextId]);
 }
 
 goBack() {
   this.router.navigate(['/footWear']);
 }
}
