import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupUsersRoutingModule } from './signup-users-routing.module';
import { SignupUsersComponent } from './signup-users.component';
import { MenuService } from '../../../../shared/utility/menu.service';
import { MainHeaderComponent } from '../../../../shared/component/main-header/main-header.component';
import { ComponentsModule } from '../../../../shared/component/index';
@NgModule({
  declarations: [SignupUsersComponent
    //  MainHeaderComponent
    ],
  imports: [
    CommonModule,
    SignupUsersRoutingModule,
    ComponentsModule
  ],
  providers: [MenuService]
})
export class SignupUsersModule { }
