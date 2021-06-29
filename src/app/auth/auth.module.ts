import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
// import { AppRoutingModule } from './../app-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './auth.service';
import { ComponentsModule } from '../shared/component/index';
@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // AppRoutingModule
    ComponentsModule,
    
  ],
  providers: [AuthService]
})
export class AuthModule { }
