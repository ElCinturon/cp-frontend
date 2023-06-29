import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { PortfoliosComponent } from './components/portfolios/portfolios.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'registration', component: RegistrationComponent, title: 'Registrierung' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'registrationSuccess', component: RegistrationSuccessComponent, title: 'Registrierung abgeschlossen' },
  { path: 'portfolios', component: PortfoliosComponent, title: 'Meine Portfolios' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
