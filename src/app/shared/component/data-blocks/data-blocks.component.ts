import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-blocks',
  templateUrl: './data-blocks.component.html',
  styleUrls: ['./data-blocks.component.scss']
})
export class DataBlocksComponent implements OnInit {
@Input() title: any;
@Input() description: any;

  constructor() { }

  ngOnInit() {
    
  }

}
