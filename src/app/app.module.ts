import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutComponent } from './layout/layout.component';
import { Header2Component } from './layout/header2/header2.component';
import { FooterComponent } from './layout/footer/footer.component';


import { MenuService } from './shared/utility/menu.service';
import { Layout2Component } from './shared/container/layout2/layout2.component';
import { SlideMenuModule } from 'cuppa-ng2-slidemenu/cuppa-ng2-slidemenu';
import { AuthModule } from './auth/auth.module';

import { AuthGuard } from './shared/component/guards/auth.guard';
import { ComponentsModule } from './shared/component/index';
import { DressComponent } from './layout/categories/dress/dress.component';
import { DressDetailsComponent } from './layout/categories/dress/dress-details/dress-details.component';
import { JweleryComponent } from './layout/categories/jwelery/jwelery.component';
import { FootWearComponent } from './layout/categories/foot-wear/foot-wear.component';
import { JweleryDetailsComponent } from './layout/categories/jwelery/jwelery-details/jwelery-details.component';
import { FootWearDetailsComponent } from './layout/categories/foot-Wear/foot-wear-details/foot-wear-details.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    Header2Component,
    FooterComponent,
    Layout2Component,
    DressComponent,
    DressDetailsComponent,
    JweleryComponent,
    FootWearComponent,
    JweleryDetailsComponent,
    FootWearDetailsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SlideMenuModule,
    AuthModule,
    ComponentsModule,
    NgSelectModule,
 
    // Modules for your app modules where you use our components
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // }),

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    AuthService,
    MenuService,
    AuthGuard,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
