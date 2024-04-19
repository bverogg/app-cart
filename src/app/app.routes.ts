import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    {path:"home", component:HomeComponent},
    {path:"products", component:ProductsComponent},
    {path: "dashboard" , component:DashboardComponent},
    {path: "about" , component:AboutComponent},
    {path: "login", component:LoginComponent}
];
