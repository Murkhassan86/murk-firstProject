import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideMenuModule } from 'cuppa-ng2-slidemenu/cuppa-ng2-slidemenu';

import { ComponentsModule } from '../component/index';
import { ContainersRoutingModule } from './routing';

/** Custom Containers */
import { Layout2Component } from './layout2/layout2.component';


import { UserProfileComponent } from 'src/app/features-modules/dashboard/user-profile/user-profile.component';


/** Custom Containers Registration */
const CONTAINERS = [Layout2Component];

@NgModule({
  imports: [
    /** Angular core dependencies */
    CommonModule,
    ContainersRoutingModule,
    ComponentsModule,
    SlideMenuModule
  ],
  declarations: CONTAINERS,
  exports: CONTAINERS
})
export class ContainersModule { }
