import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../shared/component/index';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Layout2Component } from '../../../shared/container/layout2/layout2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTabsetModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { AddUsersComponent } from './add-users/add-users.component';
@NgModule({
  declarations: [DashboardComponent, AddUsersComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTabsetModule,
    NgbAccordionModule
  ]
})
export class DashboardModule { }
