import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../component/guards/auth.guard';


import { Layout2Component } from './layout2/layout2.component';

const routes: Routes = [
  {
    path: '',
    component: Layout2Component,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        // loadChildren: () => import ('../../features-modules/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule),
        loadChildren: '../../app/features-modules/dashboard/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'signUpRecord',
        loadChildren: '../../features-modules/dashboard/signUpRecord/signup-users/signup-users.module#SignupUsersModule'
        // loadChildren: () => import ('../../features-modules/dashboard/signUpRecord/signup-users/signup-users.module').then (m => m.SignupUsersModule)
      },
      {
        path: 'loginUsersRecord',
        // loadChildren: () => import ('../../features-modules/dashboard/loginUsersRecord/login-users/login-users.module').then (m => m.LoginUsersModule)
        loadChildren: '../../features-modules/dashboard/loginUsersRecord/login-users/login-users.module#LoginUsersModule'
      },
      {
        path: 'calendar',
        loadChildren: '../../features-modules/dashboard/calendar/calendar.module#calendarModule'
        // loadChildren: () => import ('../../features-modules/dashboard/calendar/calendar.module').then(m => m.calendarModule)
      },
      {
        path: 'bucket',
        loadChildren: '../../features-modules/dashboard/bucket/bucket.module#BucketModule'
        // loadChildren: () => import ('../../features-modules/dashboard/bucket/bucket.module').then (m => m.BucketModule)
      },
      {
        path: 'shopping-cart',
        loadChildren: "../../features-modules/dashboard/shopping-cart/shopping-cart.module#ShoppingCartModule"
      },
      {
        path: 'monitoring',
        loadChildren: '../../features-modules/dashboard/monitoring/monitoring.module#MonitoringModule',
        // loadChildren: () => import ('../../features-modules/dashboard/monitoring/monitoring.module').then (m => m.MonitoringModule)
      },
      {
        path: 'userItems',
        loadChildren: '../../features-modules/dashboard/dashboard/useritems/useritems.module#UseritemsModule',
        // loadChildren: () => import ('../../features-modules/dashboard/dashboard/useritems/useritems.module').then (m => m.UseritemsModule)
      }

    //   {
    //     path: 'activities',
    //     loadChildren: '@app/features-modules/activities/activities.module#ActivitiesModule'
    //   },
    //   {
    //     path: 'health-care',
    //     loadChildren: '@app/features-modules/health-care/health-care.module#HealthCareModule'
    //   },
      // {
      //   path: 'health-care/doctor-requests',
      //   loadChildren: '@app/features-modules/health-care/doctor-requests/doctor-requests.module#DoctorRequestsModule'
      // },
    //   {
    //     path: 'logistics',
    //     loadChildren: '@app/features-modules/logistics/logistics.module#LogisticsModule'
    //   },
    //   {
    //     path: 'design-system',
    //     loadChildren: '@app/shared/containers/ds-components/ds-components.module#DsComponentsModule'
    //   },
    //   {
    //     path: 'production',
    //     loadChildren: '@app/features-modules/production/production.module#ProductionModule'
    //   },
    //   {
    //     path: 'user-management',
    //     loadChildren: '@app/features-modules/user-management/user-management.module#UserManagementModule'
    //   },
    //   {
    //     path: 'settings',
    //     loadChildren: '@app/features-modules/settings/settings.module#SettingsModule'
    //   }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainersRoutingModule {}
