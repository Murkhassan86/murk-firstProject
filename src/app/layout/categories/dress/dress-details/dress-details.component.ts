import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BucketService } from '../../../../features-modules/dashboard/bucket/bucket.service';
import { tap, take } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-dress-details',
  templateUrl: './dress-details.component.html',
  styleUrls: ['./dress-details.component.scss']
})
export class DressDetailsComponent implements OnInit {
// @Input() dresses: any;
purchaseForm: FormGroup;
activeModal: NgbActiveModal;
dresses: any;
dressesList: any [];
dressId: any;
isDress: boolean;

modalConfig: any = { size: 'lg' , ariaLabelledBy: 'available-persons-modal'};
  constructor(
    private activatedRoute: ActivatedRoute,
    private bucketService: BucketService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // this.dresses = {};
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.dressId = (param.get('id'));
      console.log(this.dressId);
    
    })
    console.log(this.dressId);
    // console.log('fetch bucket record', this.dresses, this.dressId);
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
      })
    ).subscribe();
  }
  goPrev(){
    let PreviousId = (+this.dressId) + (-1);
    this.router.navigate(['/dresses', PreviousId]);
  }
   goNext(){
     let NextId = (+this.dressId) + (+1);
     this.router.navigate(['/dresses', NextId]);
   }
   
   goBack() {
     this.router.navigate(['/dresses']);
   }
   buyProduct(dressObj?: any) {
     this.isDress = true;
     window.localStorage.setItem('dressObj', JSON.stringify({dress: dressObj}));
   this.router.navigate(['/login']);
   }

   addToCart(dressObj?: any) {
    window.localStorage.setItem('dress-to-add-cart', JSON.stringify({dressToAddCart: dressObj}));
    this.router.navigate(['/login']);
   }
   open(content?: any, flow?: any) {
    this.activeModal =  this.modalService.open(content, this.modalConfig);
  }
}
