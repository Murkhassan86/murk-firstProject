import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { map, take} from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  submitted: boolean;
  // signUpForm: FormGroup;
  apiResponse: any;
  roles: any = ['Admin', 'Client'];
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  readonly signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
    // role: new FormControl('')
  })
  ngOnInit() {
    this.apiResponse = {
      success: false,
      failure: false, 
      inProcess: false
    }
  }

  signUp(formData) {
    this.submitted = true;

    if (formData.invalid) {
     return;
    }
    const payload: any = {
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      phone: this.signUpForm.get('phone').value,
      city: this.signUpForm.get('city').value,
      address: this.signUpForm.get('address').value,
      // role: this.signUpForm.get('role').value
      role: 'client'
    }
    console.log(payload);
    this.authService.createUser(payload)
    .pipe(
      take(1),
      map((resp: any) => {
        if (resp.success) {
          this.apiResponse.success = true;
          window.localStorage.setItem('role', resp.result.role);
          console.log(resp.result.role);
          console.log(this.apiResponse);
           this.apiResponse.inProcess = false;
          this.router.navigate(['login']);
        }
        else {
         this.apiResponse.error = 'Email should be unique';
         console.log(this.apiResponse.error);
        this.apiResponse.failure = true;
         this.apiResponse.inProcess = false;
        //  this.apiResponse.failure = true;
        //  this.apiResponse.inProcess = false;
          
        }
      })
    ).subscribe(err => err);
    this.submitted = false;
    this.signUpForm.reset();
  
  }
 
}
