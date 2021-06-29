import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

import { LayoutComponent } from './layout/layout.component';
// import { Calendar } from './features-modules/dashboard/calendar/calendar.component';
import { Layout2Component } from './shared/container/layout2/layout2.component';
import { Header2Component } from './layout/header2/header2.component';
import { FooterComponent } from './layout/footer/footer.component';

import { DressComponent } from './layout/categories/dress/dress.component';
import { DressDetailsComponent } from './layout/categories/dress/dress-details/dress-details.component';
//Jwelery
import { JweleryComponent } from './layout/categories/jwelery/jwelery.component';
import { JweleryDetailsComponent } from './layout/categories/jwelery/jwelery-details/jwelery-details.component';
//fotwear
import { FootWearComponent } from './layout/categories/foot-wear/foot-wear.component';
import { FootWearDetailsComponent } from './layout/categories/foot-Wear/foot-wear-details/foot-wear-details.component';

//AUTH Guard
import { AuthGuard } from './shared/component/guards/auth.guard';
const routes: Routes = [
  {path: '', component: LayoutComponent},
  {path: 'header2', component: Header2Component},
  {path: 'footer', component: FooterComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'dresses', component: DressComponent},
  {path: 'dresses/:id', component: DressDetailsComponent},
  {path: 'jwelery', component: JweleryComponent},
  {path: 'jwelery/:id', component: JweleryDetailsComponent},
  {path: 'footWear', component: FootWearComponent},
  {path: 'footWear/:id', component: FootWearDetailsComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'signup', component: SignUpComponent},
  // {
  //   path: 'dashboard', 
  //   component: DashboardComponent,
  //   // children: [
  //   //   {
  //   //     path: 'signUpRecord',
  //   //     // redirectTo: 'signUpRecord',
  //   //     component: SignupUsersComponent
  //   //   }
  //   // ]
  // },
  // {path: 'loginRecord', component: LoginUsersComponent},
  {
    path: 'admin',
    component: Layout2Component,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        // component: DashboardComponent,
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: "./features-modules/dashboard/dashboard/dashboard.module#DashboardModule",
        // loadChildren: () => import ('./features-modules/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'signUpRecord',
        loadChildren: "./features-modules/dashboard/signUpRecord/signup-users/signup-users.module#SignupUsersModule",
        // loadChildren: () => import ('./features-modules/dashboard/signUpRecord/signup-users/signup-users.module').then(m => m.SignupUsersModule)
      },
      {
        path: 'calendar',
        loadChildren: "./features-modules/dashboard/calendar/calendar.module#calendarModule",
        // loadChildren: () => import ('./features-modules/dashboard/calendar/calendar.module').then(m => m.calendarModule)
      },
      {
        path: 'user-profile',
        loadChildren: "./features-modules/dashboard/user-profile/user-profile.module#UserProfileModule",
        // loadChildren: () => import ('./features-modules/dashboard/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'bucket',
        loadChildren: "./features-modules/dashboard/bucket/bucket.module#BucketModule",
        // loadChildren: () => import ('./features-modules/dashboard/bucket/bucket.module').then(m => m.BucketModule)
      },
      {
        path: 'shopping-cart',
        loadChildren: "./features-modules/dashboard/shopping-cart/shopping-cart.module#ShoppingCartModule",
      },
      {
        path: 'monitoring',
        loadChildren: "./features-modules/dashboard/monitoring/monitoring.module#MonitoringModule",
        // loadChildren: () => import ('./features-modules/dashboard/monitoring/monitoring.module').then(m => m.MonitoringModule)
      },
      {
        path: 'userItems',
        loadChildren: "./features-modules/dashboard/dashboard/useritems/useritems.module#UseritemsModule",
        // loadChildren: () => import ('./features-modules/dashboard/dashboard/useritems/useritems.module').then(m => m.UseritemsModule)
      },
            

    ]
  },
  // {
  //   path: 'client',
  //   component: Layout2Component,
  //   children: [
  //     {
  //       path: 'bucket',
  //       redirectTo: 'bucket',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'bucket',
  //       loadChildren: () => import ('./features-modules/dashboard/bucket/bucket.module').then(m => m.BucketModule)
  //     }

  //   ]
  // }
  // {path: 'dashboard/signUpRecord', component: SignupUsersComponent},
  // {path: 'calendar', component: CalendarComponent},
//   { 
//     path: 'login',
//   loadChildren: () => import ('./auth/auth.module').then(m => m.AuthModule),
// },
  // {
  //   path: 'dashboard',
  //   component: Layout2Component,
  //   children: [
  //     {
  //       path: 'signUpRecord',
  //       loadChildren: () => import ('./features-modules/dashboard/signUpRecord/signup-users/signup-users.module').then(m => m.SignupUsersModule),
  //       // loadChildren: '@app/features-modules/dashboard/signUpRecord/signup-users/signup-users.module#SignupUsersModule',
  //     },
  //     {
  //       path: 'calendar',
  //       loadChildren: () => import ('./features-modules/dashboard/calendar/calendar.module').then(m => m.CalendarModule)
  //           }
  //   ]
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
