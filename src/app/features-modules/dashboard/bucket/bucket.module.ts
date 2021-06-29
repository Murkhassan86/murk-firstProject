import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../shared/component/index';

import { BucketRoutingModule } from './bucket-routing.module';
import { BucketComponent } from './bucket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { BucketService } from './bucket.service';

@NgModule({
  declarations: [BucketComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    BucketRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [BucketService]
})
export class BucketModule { }
