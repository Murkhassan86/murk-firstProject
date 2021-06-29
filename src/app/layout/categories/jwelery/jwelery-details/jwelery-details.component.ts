import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BucketService } from '../../../../features-modules/dashboard/bucket/bucket.service';
import { take, tap } from 'rxjs/operators';
@Component({
  selector: 'app-jwelery-details',
  templateUrl: './jwelery-details.component.html',
  styleUrls: ['./jwelery-details.component.scss']
})
export class JweleryDetailsComponent implements OnInit {
jweleryList: any;
jweleryId: any;
  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private bucketService: BucketService
  ) { }

  ngOnInit() {
    // this.jweleryList = {};
    // let getJwelery = window.localStorage.getItem('jwelery-category');
    // getJwelery = JSON.parse(getJwelery);
    // this.jweleryList = getJwelery;
    // this.jweleryId = this.jweleryList.jwelery.bucketIndex;
    // console.log(this.jweleryId);
    // console.log('~~fetch jwelery list success', this.jweleryList);
    this.ac.paramMap.subscribe((param: ParamMap) => {
      this.jweleryId = (param.get('id'));
    })
    console.log(this.jweleryId);
    this.loadBucket();
  }

  loadBucket() {
    this.jweleryList = [];
    this.bucketService.loadBucket()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.jweleryList = resp.result;
        this.jweleryList = this.jweleryList.filter(item => {
          return (item.category === 'jwelery' && item.status === 'Approved')
        })
        console.log('~~Bucket record fetched successfully', resp);
      })
    ).subscribe();
  }
  goPrev(){
    let PreviousId = (+this.jweleryId) + (-1);
    this.router.navigate(['/jwelery', PreviousId]);
  }
   goNext(){
     let NextId = (+this.jweleryId) + (+1);
     this.router.navigate(['/jwelery', NextId]);
   }

   goBack() {
     this.router.navigate(['/jwelery']);
   }

}
