import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './home/views/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './authentication/views/register/register.component';
import { InputComponent } from './shared/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './authentication/views/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { SalesSharesComponent } from './sales-shares/views/sales-shares/sales-shares.component';
import { AddSalesComponent } from './sales-shares/components/add-sales/add-sales.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { KpiComponent } from './kpi/kpi.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { SalesTabComponent } from './sales-shares/components/sales-tab/sales-tab.component';
import { RowTabComponent } from './sales-shares/components/row-tab/row-tab.component';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    InputComponent,
    LoginComponent,
    SalesSharesComponent,
    AddSalesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
