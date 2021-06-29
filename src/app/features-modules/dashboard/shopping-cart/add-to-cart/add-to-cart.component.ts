import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { take, tap } from 'rxjs/operators';
import { BucketService } from '../../bucket/bucket.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() dressData: any;
  selectedBucketId: any;
  deliveryList: any =[];
  apiResponse: any;
  timeLeft: number = 3600;
interval;
  constructor(
    private shoppingCart: ShoppingCartService,
    private bucketService: BucketService
  ) { }

  ngOnInit() {
    this.selectedBucketId = this.dressData.dress._id;
    console.log(this.dressData);
    this.fetchDeliveryData();
    if (this.deliveryList.status === 'added-to-cart') {
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 60;
        }
      },1000)
    }
  }

  addToCart() {
    this.apiResponse = {
      success: false,
      failure: false,
      inProcess: true
    }
    const payload: any = {
      agreement: this.dressData.dress.agreement,
      bucketIndex: this.dressData.dress.bucketIndex,
      age: this.dressData.dress.age,
      category: this.dressData.dress.category,
      color: this.dressData.dress.color,
      fabric: this.dressData.dress.fabric,
      price: this.dressData.dress.price,
      size: this.dressData.dress.size,
      description: this.dressData.dress.description,
      image: this.dressData.dress.image,
      fullName: this.dressData.dress.fullName,
      email: this.dressData.dress.email,
      province: this.dressData.dress.province,
      phoneNumber: this.dressData.dress.phoneNumber,
      provinceName: this.dressData.dress.provinceName,
      address: this.dressData.dress.address,
      status: 'added-to-cart',
        _id: this.selectedBucketId, 
    }
    console.log(payload);
    this.bucketService.updateBucket(payload)
    .pipe(
      take(1),
      tap((resp: any) => {
        if (!! resp.success) {
          this.apiResponse.success = true;
          this.deliveryList.push(resp.result);
          this.apiResponse.inProcess = false;
          console.log('~~ devliery data updated successfully', resp);
        } else {
          this.apiResponse.failure = true;
          this.apiResponse.inProcess = false;
        }
      })
    ).subscribe();
  }

  fetchDeliveryData() {
    this.deliveryList = [];
    this.bucketService.loadBucket()
    .pipe(
      take(1),
      tap((resp: any) => {
      this.deliveryList = resp.result;
      this.deliveryList = this.deliveryList.filter((item) => {
        return (item.status === 'added-to-cart')
      })
      console.log('~~ fetch delivery data success', this.deliveryList);
      })
    ).subscribe();
  }

  // startTimer() {
  //   this.interval = setInterval(() => {
  //     if(this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       this.timeLeft = 60;
  //     }
  //   },1000)
  // }

  // pauseTimer() {
  //   clearInterval(this.interval);
  // }

}
