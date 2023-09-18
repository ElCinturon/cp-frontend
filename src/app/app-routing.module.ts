import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { HomeComponent } from "./home/home.component";
import { RegistrationSuccessComponent } from "./registration-success/registration-success.component";
import { PortfoliosComponent } from "./components/portfolios/portfolios.component";
import { PortfolioComponent } from "./components/portfolio/portfolio.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ImpressumComponent } from "./components/impressum/impressum.component";
import { DatenschutzerklaerungComponent } from "./components/datenschutzerklaerung/datenschutzerklaerung.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: "registration", component: RegistrationComponent, title: "Registrierung" },
  { path: "home", component: HomeComponent, title: "Home" },
  { path: "registrationSuccess", component: RegistrationSuccessComponent, title: "Registrierung abgeschlossen" },
  {
    path: "portfolios", children: [
      { path: "", component: PortfoliosComponent, title: "Meine Portfolios" },
      { path: ":id", component: PortfolioComponent }
    ]
  },
  { path: "profile", component: ProfileComponent, title: "Profil" },
  { path: "impressum", component: ImpressumComponent, title: "Impressum" },
  { path: "datenschutzerklaerung", component: DatenschutzerklaerungComponent, title: "Datenschutzerklärung" },
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
