import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../../shared/component/index';

import { UseritemsRoutingModule } from './useritems-routing.module';
import { UseritemsComponent } from './useritems.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbTabsetModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UseritemsComponent],
  imports: [
    CommonModule,
    UseritemsRoutingModule,
    ComponentsModule,
    NgbTabsetModule,
    NgbAccordionModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UseritemsModule { }
