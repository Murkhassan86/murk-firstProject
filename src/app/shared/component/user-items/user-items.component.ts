import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {
@Input() userItemsList: any;
@Input() pendingStatusList: any;
@Input() rejectedStatusList: any;
@Input() approveStatusList: any;
@Output() editHandler: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    console.log("pending buckets record", this.pendingStatusList);
    console.log(this.userItemsList);
  }

  approve(bucketInfo, index) {
    this.editHandler.emit( {bucketInfo, index });
  }

}
