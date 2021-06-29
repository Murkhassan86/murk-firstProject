import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { BucketService } from './bucket.service';
import { tap, take } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
import { ConfirmationDialogService } from '../../../shared/component/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit, OnDestroy {
bucketId: number = 1;
images: any = [];
activeModal: NgbActiveModal;
bucketForm: FormGroup;
submitted: boolean;
imagePreview: string;
bucketList: any = [];
reasonList: any [];
timeOut: any;
loggedInUserId: any;
bucketData: any;
selectedIndex: any;
selectedCategory: any;
getBucketIndex: any;
bucketListLength: any;
dressList: any[];
dressListLength: any;
jweleryList: any[];
jweleryListLength: any;
footWearList: any[];
footWearLength: any;
bucketIndex: any;
isEdit: boolean;
selectedBucketId: any;

fabricList: any = ['Cotton', 'Silk', 'Lawn', 'Khaddar'];
shoesSizes: any = ['6', '7', '8', '9', '10', '11', '12'];
ageGroup: any = ['1-3', '3-4', '5-6', '6-8', '8-9', '9-10', '11-12', '13-14', '15-16', '17-18', '19-20', '21-22', '23-24', '25-26', '27-28', '29-30'];
modalConfig: any = { size: 'lg', ariaLabelledBy: 'modal-basic-title' };
  constructor(
    private modalService: NgbModal,
    private bucketService: BucketService,
    private cd: ChangeDetectorRef,
    private dashboardService: DashboardService,
    private confirmationDialog: ConfirmationDialogService
    
  ) { 

    this.bucketForm = new FormGroup({
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      // condition: new FormControl(''),
      size: new FormControl(''),
      color: new FormControl('', Validators.required),
      fabric: new FormControl(''),
      age: new FormControl(''),
      description: new FormControl(''),
      agreement: new FormControl('', Validators.required),
      image: new FormControl('', {validators: [Validators.required],asyncValidators: [mimeType]})
    })
  }

  ngOnInit() {
  

    this.loadBucket();
    this.loadReason();
    this.loggedInUserId = window.localStorage.getItem('loggedInUserId');
    console.log(this.loggedInUserId);
    
    
  }
  onImagePicker(event : Event) {
    const file = (event.target as HTMLInputElement).files[0]; 
    this.bucketForm.patchValue({image: file});
    this.bucketForm.get('image').updateValueAndValidity();
    //console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

    // if (event.target.file && event.target.files[0]) {
      // var filesAmount = (event.target as HTMLInputElement).files.length;
      // for (let i = 0; i < filesAmount; i++) {
      //         var reader = new FileReader();

      //         reader.onload = (event:any) => {
      //           console.log(event.target.result);
      //            this.images.push(event.target.result); 

      //            this.bucketForm.patchValue({
      //               image: this.images
      //            });
      //         }

      //         reader.readAsDataURL((event.target as HTMLInputElement).files[i]);
      // }
  // }
  }

  open( content?: any, flow?: any) {
    if (flow === 'add') {
      this.isEdit = false;
    }
    this.activeModal = this.modalService.open(content, this.modalConfig);
  }

  createBucket() {
    this.submitted = true;
    // const payload: any = {
    //   category: this.bucketForm.get('category').value,
    //   price: this.bucketForm.get('price').value,
    //   condition: this.bucketForm.get('condition').value,
    //   agreement: this.bucketForm.get('agreement').value,
    //   color: this.bucketForm.get('color').value,
    //   fabric: this.bucketForm.get('fabric').value,
    //   age: this.bucketForm.get('age').value,
    //   description: this.bucketForm.get('description').value,
    //   status: 'pending',
    //   UserId: window.localStorage.getItem("loggedInUserId"),
    //   createdAt: new Date(),
    //   image: this.bucketForm.get('image').value,
    // }
    const category = this.bucketForm.get('category').value;
    const price = this.bucketForm.get('price').value;
    const color = this.bucketForm.get('color').value;
    const fabric = this.bucketForm.get('fabric').value;
    const age = this.bucketForm.get('age').value;
    const description = this.bucketForm.get('description').value;
    const agreement = this.bucketForm.get('agreement').value;
    const image = this.bucketForm.get('image').value;
    const size = this.bucketForm.get('size').value;
    const UserId = window.localStorage.getItem("loggedInUserId");
    const status = 'pending';
    const createdAt = new Date();
    if (category === 'dress') {
      this.bucketIndex = (+this.dressListLength) + (+1);
    }
    if (category === 'jwelery') {
     this.bucketIndex = (+this.jweleryListLength) + (+1);
    }
    if (category === 'foot-wear') {
      this.bucketIndex = (+this.footWearLength) + (+1);
    }
    
   
    this.bucketService.createBucket(category, price, size, color, fabric, age, description, agreement, image, UserId, status, createdAt, this.bucketIndex)
    .pipe(
      take(1),
      tap((resp: any) => {
        if (resp.success) {
          this.bucketList.push(resp.result);
          // console.log(resp.result.);
          this.timeOut = setTimeout(() => { this.activeModal.close(); }, 1000);
          console.log('~~Bucket created successfully', resp);
        }
        this.cd.markForCheck();
      })
    ).subscribe();
    // console.log(itemInfo);
  }

  loadBucket() {
    this.bucketList = [];
    this.bucketService.loadBucket()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.bucketList = resp.result;
        this.bucketList = this.bucketList.filter(item => {
          return (item.UserId._id === this.loggedInUserId)
        })
        this.dressList = resp.result.filter(item => {
          return (item.category === 'dress');
        })
        this.dressListLength = this.dressList.length;
        this.jweleryList = resp.result.filter(item => {
          return (item.category === 'jwelery')
        })
        this.footWearList = resp.result.filter(item => {
          return (item.category === 'foot-wear')
        })
        this.footWearLength = this.footWearList.length;

        this.jweleryListLength = this.jweleryList.length;
        this.bucketListLength = resp.result.length;
        console.log(this.bucketListLength);
                console.log('~~Bucket index',this.getBucketIndex);
        console.log('~~Bucket record fetched successfully', resp);
      })
    ).subscribe();
  }

  loadReason() {
    this.reasonList = [];
    this.dashboardService.loadReason()
    .pipe(
      take(1),
      tap((resp: any) => {
        if (resp.success) {
          this.reasonList = resp.result;
          this.reasonList = this.reasonList.filter(Id => {
            return (Id.UserId._id === this.loggedInUserId);
          })
          console.log('~~load Reasons', this.reasonList);
        }
        this.cd.markForCheck();
      })
    ).subscribe();
  }

  editBucket(bucketData?: any, index?: any, content?: any) { 
    this.selectedBucketId = bucketData._id;
    this.bucketForm.patchValue(bucketData);
    this.isEdit = true;
    this.open(content, 'edit');
    alert('working');
  }

  updateBucket(bucketData) {
    let payload: any = {
      _id: this.selectedBucketId,
      ...bucketData
    }
    this.bucketService.updateBucket(payload)
    .pipe(
      take(1),
      tap((res: any) => {
        if (!! res.success) {
          this.bucketList.push(res.result);
          console.log('~~bucket updated success', res);
          this.timeOut = setTimeout(() => { this.activeModal.close(); }, 1000);

        }
        this.cd.markForCheck();
      })
    ).subscribe();
  }

  viewBucket(content?: any, bucketData?: any) {
    this.bucketData = bucketData;
    this.open(content);
  }

  deleteBucket(bucketObj?: any, index?: any) {
    this.selectedIndex = index;
    this.confirmationDialog.confirm('confirmation..', 'Do You Really want to delete this item..?')
    .then((confirmed) => {
      if (confirmed) {
        this.bucketService.deleteBucket(bucketObj._id)
        .pipe(
          take(1),
          tap((resp: any) => {
           this.bucketList.splice(this.selectedIndex, 1);
          })
        ).subscribe();
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  //change category
  onChangeCategory(category) {
    this.selectedCategory = category;
    console.log(this.selectedCategory);
  }
  ngOnDestroy(){
    clearTimeout(this.timeOut);
  }
}
