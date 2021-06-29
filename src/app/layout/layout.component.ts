import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BucketService } from '../features-modules/dashboard/bucket/bucket.service';
import { take, tap } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
@ViewChild('openModal', {static: true}) openModal:ElementRef;
activeModal: NgbActiveModal;
userItemsList: any[];
userItems: any;
getApproveStatus: any[];
modalConfig: any = { size: 'lg' , ariaLabelledBy: 'available-persons-modal'};
  constructor(
    private bucketService: BucketService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.openModal.nativeElement.click();
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
       
       
        // this.userItemsList = this.userItemsList.filter(user => {
        //   return (user.UserId)
        // })
       
        console.log('~~Users with Items fetched successfully', this.getApproveStatus);
        // this.userItem = true;
        // console.log(this.userItemsList);
      })
    ).subscribe();
  }
bucketInfo(content?: any, bucketData?: any) {
  this.userItems = bucketData;
  console.log(this.userItems);
  this.open(content);
}

  open (content?: any) {
    this.activeModal =  this.modalService.open(content, this.modalConfig);
  }
}
