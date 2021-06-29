import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  dressData: any;
  constructor() { }

  ngOnInit() {
    this.dressData = {};
    let dress: any = window.localStorage.getItem('dressObj');
   dress = JSON.parse(dress);
   this.dressData = dress;
   console.log(this.dressData); 
  }

}
