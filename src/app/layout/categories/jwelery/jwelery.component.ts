import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BucketService } from '../../../features-modules/dashboard/bucket/bucket.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-jwelery',
  templateUrl: './jwelery.component.html',
  styleUrls: ['./jwelery.component.scss']
})
export class JweleryComponent implements OnInit {
// @Input() jweleryList: any;
jweleryList: any[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private bucketService: BucketService,
    private router: Router
  ) { }

  ngOnInit() {
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
        // this.isDresses = true;
      })
    ).subscribe();
  }

  onSelectJwelery(jweleryObj?: any, index?: any) {
    // window.localStorage.setItem('jwelery-category', JSON.stringify({ jwelery: jweleryObj}));
    this.router.navigate(['/jwelery', jweleryObj.bucketIndex]);  

    
  }
}
