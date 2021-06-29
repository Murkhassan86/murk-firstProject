import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// custom components
import { MainHeaderComponent } from './main-header/main-header.component';
import { LoginSignupUsersMonitoringChartComponent } from './charts/login-signup-users-monitoring-chart/login-signup-users-monitoring-chart.component';
import { UserItemsComponent } from './user-items/user-items.component';
import { BucketMonitoringComponent } from './charts/bucket-monitoring/bucket-monitoring.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DataBlocksComponent } from './data-blocks/data-blocks.component';
// appx chart integeration
//import apexcharts
import { NgApexchartsModule } from 'ng-apexcharts';

export const COMPONENTS = [
    MainHeaderComponent,
    LoginSignupUsersMonitoringChartComponent,
    UserItemsComponent,
    BucketMonitoringComponent,
    ConfirmationDialogComponent,
    DataBlocksComponent
];

@NgModule({
    imports: [
        //Angular Core Dependencies
        CommonModule,
        RouterModule,

        //Third party Modules
        NgApexchartsModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: [ConfirmationDialogComponent]
})

export class ComponentsModule{}