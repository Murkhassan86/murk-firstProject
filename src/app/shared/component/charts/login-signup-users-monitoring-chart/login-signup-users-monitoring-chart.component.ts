import { Component, OnInit, Input, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../../../auth/auth.service';
import { take, tap } from 'rxjs/operators';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-login-signup-users-monitoring-chart',
  templateUrl: './login-signup-users-monitoring-chart.component.html',
  styleUrls: ['./login-signup-users-monitoring-chart.component.scss']
})
export class LoginSignupUsersMonitoringChartComponent implements OnInit, AfterViewInit {
  signUpUsersLength: any;
  timeOut1: any;
  signUpUsersList: any;
  @Input() signUpUsers: any;
  @Input() loginUsers: any; 
  AllUsers: any;
  Users: any;
  
  userCharts: boolean;
  chartOptionsUsers: Partial<ChartOptions>;


  // chartOptionsUsersPie: Partial<ChartOptions>;
  // commonOptions: Partial<ChartOptions> = {
  //   title: {
  //     text: 'chart'
  //   },
  //  dataLabels: {
  //    enabled: false
  //  },
  //  stroke: {
  //    width: [4, 4]
  //  },
   
  //     // xaxis: {
  //     //   categories: [2016, 2017, 2018, 2019, 2020]
  //     // },
  //     responsive: [
  //             {
  //               breakpoint: 480,
  //               options: {
  //                 chart: {
  //                   width: '100%',
  //                 },
  //                 legend: {
  //                   position: 'bottom'
  //                 }
  //               }
  //             }
  //           ],
           
          
  // }




  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.loadSignUpUsers();
    // console.log("signUp Users", this.signUpUsers);
    this.AllUsers = this.signUpUsers.length;
    console.log('sign-up users length', this.AllUsers);
    console.log("signUp Users", this.signUpUsers);
    console.log("login Users", this.loginUsers);
    this.Users = this.loginUsers ? 0 : this.loginUsers;
    // this.initProductionChart();
   
    
  }
 ngAfterViewInit(): void {
  this.initProductionChart();
 }
  initProductionChart() {
   
   this.chartOptionsUsers = {
      chart: {
        height: 350,
        type: "bar",  
      },
     
      colors: "#FF1654",
      series: [
        {
          name: "SignUp Users",
          type: 'column',
          data: [this.AllUsers, this.Users]
        },
      ],
      
      xaxis: {
        categories: ['SignUp Users', 'Login Users']
      },
    };

    
     }
   
    
     }

    
   
     

