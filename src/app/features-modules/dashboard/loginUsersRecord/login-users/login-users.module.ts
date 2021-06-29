import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginUsersRoutingModule } from './login-users-routing.module';
import { LoginUsersComponent } from './login-users.component';
import { ComponentsModule } from '../../../../shared/component/index';


@NgModule({
  declarations: [LoginUsersComponent],
  imports: [
    CommonModule,
    LoginUsersRoutingModule,
    ComponentsModule
  ]
})
export class LoginUsersModule { }
