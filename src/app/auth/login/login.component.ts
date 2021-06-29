import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { take, tap, map, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
loginForm: FormGroup;
apiResponseSuccess: boolean;
apiResponseInProcess: boolean;
apiResponseFailure: boolean;
apiResponse: any;
timeOut: any;
tokenTimer: any;
token: any;
isAuthenticated: boolean;
dressData: any;
footWearData: any;
CartDress: any;
CartFootWear: any;
getDressFlag: boolean;
private authStatusListener = new Subject<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
  
  ) { 

    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit() {
    this.dressData = {};
    let dress: any = window.localStorage.getItem('dressObj');
   dress = JSON.parse(dress);
    this.dressData = dress || 0;
   console.log(this.dressData); 
    this.CartDress = {};
    let getCartDress: any = window.localStorage.getItem('dress-to-add-cart');
    getCartDress = JSON.parse(getCartDress);
    this.CartDress = getCartDress || 0;
    console.log(this.CartDress);

    // get footWear Data
    this.footWearData = {};
    let footWear: any = window.localStorage.getItem('footWear');
    footWear = JSON.parse(footWear);
    this.footWearData = footWear || 0;
    console.log(this.footWearData);
    this.CartFootWear = {};
    let getCartFootWear: any = window.localStorage.getItem('footWear-to-add-cart');
    getCartFootWear = JSON.parse(getCartFootWear);
    this.CartFootWear = getCartFootWear || 0;
    console.log(this.CartFootWear);
}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  login(formData) {
    if (formData.invalid) {
      return;
    }
    this.apiResponse = {
      success: false,
      failure: false,
      inProcess: true
    }
    const payload: any = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,   
    }
    console.log(payload);
  this.authService.login(payload)
  .pipe(
    take(1),
    map((resp: any) => {
      if (resp.success) {
        // this.apiResponse.success = 'Logged In Successfully';
        this.apiResponse.success = true;
        this.apiResponse.inProcess = false;
        console.log('~~Login Success', resp);
         localStorage.setItem('token', resp.token);
        localStorage.setItem('user-email', resp.email);
        localStorage.setItem('loggedInUserId', resp.userId);
        localStorage.setItem('role', resp.role);
        localStorage.setItem('firstName', resp.firstName);
        localStorage.setItem('phone', resp.phone);
        localStorage.setItem('city', resp.city);
        localStorage.setItem('address', resp.address);
        // const role = localStorage.getItem(resp.role);
        console.log(resp.role);
        
          this.isAuthenticated = true;
          console.log(resp.email);
          console.log(resp.userId);
          this.timeOut = setTimeout(() => {
            this.apiResponse.success = false; 
            if (resp.role === 'Admin') {
              this.router.navigate(['admin/dashboard']);
            } else if (resp.role === 'client' && ((this.dressData === 0 && this.CartDress === 0) && (this.footWearData === 0 && this.CartFootWear === 0))) {
              this.router.navigate(['admin/bucket']);
            } else if (resp.role === 'client'){
              this.router.navigate(['admin/shopping-cart']);
            }
          
          }, 1000);     
        }
    
        else {
          console.log('role admin is required');
          this.apiResponse.error = 'Something Went Wrong';
          console.log(this.apiResponse.error);
          this.apiResponse.failure = true;
          this.apiResponse.inProcess = false;
        }
      //   else {
      //     console.log('something went wrong');
      //   }
      // }
    })
  ).subscribe(err => err);
  }

//    setAuthTimer(duration: number) {
//     console.log("Setting timer: " + duration);
//     this.tokenTimer = setTimeout(() => {
//       this.logout();
//     }, duration * 1000);
//   }

//   autoAuthUser() {
//     const authInformation = this.getAuthData();
//     if (!authInformation) {
//       return;
//     }
//     const now = new Date();
//     const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
//     if (expiresIn > 0) {
//       this.token = authInformation.token;
//       this.isAuthenticated = true;
//       this.setAuthTimer(expiresIn / 1000);
//        this.authStatusListener.next(true);
//     }
//   }
//  getAuthData() {
//     const token = localStorage.getItem("token");
//     const expirationDate = localStorage.getItem("expiration");
//     if (!token || !expirationDate) {
//       return;
//     }
//     return {
//       token: token,
//       expirationDate: new Date(expirationDate)
//     }
//   }

//  saveAuthData(token: string, expirationDate: Date) {
//     localStorage.setItem("token", token);
// // const date = this.datepipe.transform(expirationDate, 'yyyy-MM-dd');
//     localStorage.setItem("expiration", expirationDate.toDateString());
//   }

//  clearAuthData() {
//     localStorage.removeItem("token");
//     localStorage.removeItem("expiration");
//   }
   
//  logout() {
//   this.token = null;
//   this.isAuthenticated = false;
//   this.authStatusListener.next(false);
//   clearTimeout(this.tokenTimer);
//   this.clearAuthData();
//   // this.router.navigate(["/"]);
// }

  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }
}
