import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/views/home/home.component';
import { RegisterComponent } from 'src/app/authentication/views/register/register.component';
import {LoginComponent} from "./authentication/views/login/login.component";
import {SalesSharesComponent} from './sales-shares/views/sales-shares/sales-shares.component';
import { KpiComponent } from './kpi/kpi.component';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'salesShares', component: SalesSharesComponent},
    { path: 'kpi', component: KpiComponent}
  ];
  
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
