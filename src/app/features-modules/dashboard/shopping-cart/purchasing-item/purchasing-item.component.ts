import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingCartService } from '../shopping-cart.service';
import { BucketService } from '../../bucket/bucket.service';
import { take, tap } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-purchasing-item',
  templateUrl: './purchasing-item.component.html',
  styleUrls: ['./purchasing-item.component.scss']
})
export class PurchasingItemComponent implements OnInit {
  activeModal: NgbActiveModal;
  deliveryForm: FormGroup;
  deliveryList: any[];
  @Input() dressData: any;
  selectedProvince: any;
  submitted: boolean;
  dressPrice: any;
  apiResponse: any;
  apiResponseProceed: any;
  deliveryData: any;
  selectedBucketId: any;
  userId: any;
  currentDate: any;
  dispatchDate: any;
  arrivalDate: any;
  itemInfo: any;
  customerInfo: any;
  slipPayload: any;
  provinces: any = ['Azad Kashmir', 'Balochistan', 'Federally Administered Tribal Areas', 'Gilgit-Baltistan', 'Islamabad', 'Khyber-Pakhtunkhwa', 'Punjab', 'Sindh' ];
  sindhProvince: any = ['Badin', 'Shaheed Benazirabad',	'Dadu', 'Guddu Barrage', 'Hala', 'Khairpur Mirs', 'Hyderabad', 'Jacobabad', 'Jamshoro',	'Karachi', 'Kashmore', 'Khairpur', 'Kotri', 'Larkana', 'Matiari', 'Mehar', 'Mirpur Khas', 'Mithi', 'Moro', 'Naushahro Feroze', 'Nawabshah', 'Sanghar', 'Sehwan Sharif', 'Shikarpaur', 'Sukkur', 'Tando Adam Khan', 'Tando Allahyar', 'Tando Muhammad Khan', 'Thatta', 'Umerkot'];
  punjabProvince: any = ['Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Multan', 'Sargodha', 'Bahalwapur', 'Sialkot'];
  khyberProvince: any = ['Peshawar', 'Mardan', 'Mingora', 'Kohat', 'Dera Ismail khan', 'Abbottabad', 'Mansehra', 'Swabi', 'Nowshera', 'Kabal'];
  balochistanProvince: any = ['Quetta', 'Turbat', 'Khuzdar', 'Hub, balochistan', 'Chaman', 'Gwadar', 'Sibi'];
  kashmirProvince: any = ['Srinagar', 'Jammu', 'Anantnag'];
  baltistanProvince: any = ['Chilas', 'Gamba Skardu', 'Gilgit', 'Khaplu', 'Skardu'];
  tribalAreas: any = ['Darra Admal Khel', 'Khar Bajur Agencty', 'Miran Shah', 'Thana Malakand Agency'];
  islamabad: any = ['Islamabad-E', 'Islamabad-F', 'Islamabad-G', 'Islamabad-Ghauri Town', 'Islamabad-H', 'Islamabad-I'];
  modalConfig: any = { size: 'lg', ariaLabelledBy: 'modal-basic-title' };
  constructor(
    private shoppingService: ShoppingCartService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private bucketService: BucketService

  ) { 

    this.deliveryForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      provinceName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    })
   
  }

  get fullName() {return this.deliveryForm.get('fullName');}
  get province() { return this.deliveryForm.get('province');}
  get phoneNumber() { return this.deliveryForm.get('phoneNumber');}
  get provinceName() { return this.deliveryForm.get('provinceName');}
  get email() { return this.deliveryForm.get('email');}
  get address() { return this.deliveryForm.get('address');}

  ngOnInit() {
    console.log(this.dressData);
    this.dressPrice = this.dressData.dress.price;
    this.dressPrice = (+this.dressPrice) + (+100);
    this.getDeliveryInfo();
    this.currentDate = new Date() ;
    this.dispatchDate = new Date(Date.now() + (3600*1000*24));
    this.arrivalDate = new Date(Date.now() + (3600*1000*24)*4);
    console.log(this.arrivalDate);
  
  }

  onChangeProvince(province) {
    this.selectedProvince = province;
    console.log(province);
  }

  sendDeliveryInfo(deliveryData) {
    this.apiResponse = {
      success: false,
      failure: false,
      inProcess: true
    }
    this.submitted = true;
    const payload: any = {
        _id: this.dressData.dress._id,
        fullName: this.fullName.value,
        province: this.province.value,
        phoneNumber: this.phoneNumber.value,
        provinceName: this.provinceName.value,
        email: this.email.value,
        address: this.address.value
    }
    console.log(payload);
    if (this.deliveryForm.valid) {
      console.log(payload);
      this.bucketService.updateBucket(payload)
      .pipe(
        take(1),
        tap((resp: any) => {
          if (!! resp.success) {
            window.localStorage.setItem('deliveryInfo', JSON.stringify({deliveryInfo: payload}));
            this.deliveryList = [];
            this.apiResponse.success = true;
            this.deliveryList.push(resp.result);
            this.apiResponse.inProcess = false;
            console.log('~~ delivery info updated successfully', resp);
          } else {
            this.apiResponse.failure = true;
            this.apiResponse.inProcess = false;
          }
          this.cd.markForCheck();
        })
      ).subscribe();
    } else {
      this.apiResponse.inProcess = true;
    }
  
  }

  getDeliveryInfo() {
    this.deliveryList = [];
    this.bucketService.loadBucket()
    .pipe(
      take(1),
      tap((resp: any) => {
        this.deliveryList = resp.result;
        console.log('~~fetch delivery info success', resp);
      })
    ).subscribe();
  }

  proceed() {
    this.apiResponseProceed = {
      success: false,
      failure: false,
      inProcess: true
    }
    // this.selectedUserId = this.dressData.dress.UserId._id;
    this.deliveryData = {};
    let PurchasingInfo: any = window.localStorage.getItem('deliveryInfo');
    PurchasingInfo = JSON.parse(PurchasingInfo);
    this.deliveryData = PurchasingInfo || 0;
    console.log(this.deliveryData);
    const payload: any = {
        ...this.deliveryData,
        proceed: 'Yes',
        deliveryStatus: 'purchased',
        _id: this.dressData.dress._id   
    }
    console.log(payload);
    if (this.deliveryForm.valid) {
      console.log(payload);
      this.bucketService.updateBucket(payload)
      .pipe(
        take(1),
        tap((resp: any) => {
          if (!! resp.success) {
            this.apiResponseProceed.success = true;
            this.deliveryList.push(resp.result);
            this.apiResponseProceed.inProcess = false;
            console.log('~~Delivery info updated successfully', resp);
          } else {
            this.apiResponseProceed.failure = true;
            this.apiResponseProceed.inProcess = false;
          }
        })
      ).subscribe();

    } else {
      this.apiResponseProceed.inProcess = false;
    }
  }

  open( content?: any, flow?: any) {
    this.activeModal = this.modalService.open(content, this.modalConfig);
  }


  // pdf generation
  generatePdf(customerData){
    this.slipPayload = {
      color: this.dressData.dress.color,
      price: this.dressPrice,
      fullName: customerData.fullName,
      phoneNumber: customerData.phoneNumber,
      address: customerData.address,
      category: this.dressData.dress.category,
      dispatchDate: this.dispatchDate,
      arrivalDate: this.arrivalDate

    }
    if (this.slipPayload.category !== 'jwelery') {
      this.slipPayload.age = this.dressData.dress.age;
    }
    if (this.slipPayload.category === 'dress') {
      this.slipPayload.fabric = this.dressData.dress.fabric;
    }
    if (this.slipPayload.category === 'foot-wear') {
      this.slipPayload.size = this.dressData.dress.size;
    }
    console.log(this.slipPayload);
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download();
   }

   getDocumentDefinition() {
    sessionStorage.setItem('Order-slip', JSON.stringify(this.slipPayload));
    return {
    content : [
      {
      text: 'Order Slip',
      bold: true,
      fontSize: 20,
      alignment: 'center',
      margin : [0, 0, 0, 20]
      },
      {
        columns: [
         [{
            text: 'Full Name:' + ' ' + this.slipPayload.fullName,
            style: 'name',
            alignment: 'center'
          },
          {
            text : 'Address: ' + ' ' + this.slipPayload.address,
            alignment: 'center'
          },
          {
            text : 'Contact :' +  ' ' + this.slipPayload.phoneNumber,
            alignment: 'center'
          },
          {
            text : 'Fabric :' +  ' ' + this.slipPayload.fabric,
            alignment: 'center'
          },
          {
            text : 'Color :' +  ' ' + this.slipPayload.color,
            alignment: 'center'
          },
          {
            text : 'Price :' +  ' ' + this.slipPayload.price,
            alignment: 'center'
          },
          {
            text : 'Dispatch Date :' +  ' ' + this.slipPayload.dispatchDate,
            alignment: 'center'
          },
          {
            text : 'Arrival Date :' +  ' ' + this.slipPayload.arrivalDate,
            alignment: 'center'
          },
          // {
          //  text: 'GitHub : ' + this.resume.socialProfile,
          //  Link: this.resume.socialProfile,
          //  color: 'blue'
          // }
        ],
    ]
   },

 ],
 info : {
   title: this.slipPayload.fullName,
   author: this.slipPayload.fullName,
   subject: 'ORDER SLIP',
   keywords: 'SLIP, order Slip'

 },
 styles : {
   header: {
     fontsize : 18,
     bold: true,
     margin: [0, 20, 0, 10],
     decoration: 'underline'
   },
   name : {
     fontsize: 16,
     bold: true
   },
   jobTitle : {
     fontsize: 14,
     bold: true,
     italics: true
   },
   sign : {
     margin : [0, 50, 0, 10],
     alignment : 'right',
     italics: true
   },
   tableHeader : {
     bold: true,
   }
 }
};
  
   }

}
