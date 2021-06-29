import { Component, Input, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexChart,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ChartComponent,
  ApexLegend, ApexResponsive
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  responsive: ApexResponsive[];
  grid: any; // ApexGrid;
  colors: any;
  toolbar: any;
};


@Component({
  selector: 'app-bucket-monitoring',
  templateUrl: './bucket-monitoring.component.html',
  styleUrls: ['./bucket-monitoring.component.scss']
})
export class BucketMonitoringComponent implements OnInit {
@Input() bucketList: any[];
@Input() approvedStatus: any;
@Input() rejectedStatus: any;
@Input() pendingStatus: any;
approvedLength: any;
rejectedLength: any;
pendingLength: any;
bucketChartOptions: Partial<ChartOptions>;
approvedChartOptions: Partial<ChartOptions>;
rejectedChartOptions: Partial<ChartOptions>;
pendingChartOptions: Partial<ChartOptions>;
bucket: any;
pendingData: any;
  constructor() { }

  ngOnInit() {
    console.log("Fetch bucket list in bucket monitoring", this.bucketList);
    this.bucket = this.bucketList.length;
    console.log(this.bucket);
    this.approvedLength = this.approvedStatus.length;
    this.rejectedLength = this.rejectedStatus.length;
    this.pendingLength = this.pendingStatus.length;
    this.pendingData = this.pendingLength ? 0 : this.pendingLength
    // if (this.pendingLength === 0) {
    //   this.pendingData = 0;
    // } else {
    //   this.pendingData = this.pendingLength;
    // }

 

    
  }
  ngAfterViewInit(): void {
    this.initProductionChart();
   }

   initProductionChart() {
     
    this.bucketChartOptions = {
      chart: {
        height: 350,
        type: "bar",  
      },
     
      colors: "#FF1654",
      series: [
        {
          name: "Bucket record",
          data: [this.bucket]
        },
      ],
      
      xaxis: {
        categories: ['Bucket Record']
      },
    };

         
    this.approvedChartOptions = {
      chart: {
        height: 350,
        type: "bar",  
      },
     
      colors: "#FF1654",
      series: [
        {
          // name: ["Approved User Items", "rejected User Items"],
          data: [this.approvedLength, this.rejectedLength, this.pendingLength]
        },
       

      ],
      
      xaxis: {
        categories: ['Approved UsersItems', 'Rejected UserItems', 'Pending UserItems']
      },
    };
   }

}
