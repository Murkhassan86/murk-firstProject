import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../shared/component/index';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { PurchasingItemComponent } from './purchasing-item/purchasing-item.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartService } from './shopping-cart.service';

@NgModule({
  declarations: [PurchasingItemComponent, AddToCartComponent, ShoppingCartComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    ComponentsModule,
    NgbTabsetModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ShoppingCartService]

})
export class ShoppingCartModule { }
