import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { ComponentsModule } from '../../../shared/component/index';
import { MonitoringComponent } from './monitoring.component';
import { SignupUsersModule } from '../signUpRecord/signup-users/signup-users.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MonitoringComponent],
  imports: [
    CommonModule,
    MonitoringRoutingModule,
    ComponentsModule,
    SignupUsersModule,
    NgbTabsetModule
  ]
})
export class MonitoringModule { }
