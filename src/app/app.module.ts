import { NgModule, LOCALE_ID } from "@angular/core";
import localeDe from "@angular/common/locales/de";
import { registerLocaleData } from "@angular/common";

import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { ToastService, AngularToastifyModule } from "angular-toastify";


import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AppRoutingModule } from "./app-routing.module";
import { RegistrationSuccessComponent } from "./registration-success/registration-success.component";
import { HomeComponent } from "./home/home.component";
import { InvalidInputMsgComponent } from "./invalid-input-msg/invalid-input-msg.component";
import { PortfoliosComponent } from "./components/portfolios/portfolios.component";
import { AddPortfolioComponent } from "./components/addPortfolio/add-portfolio/add-portfolio.component";
import { PortfolioListComponent } from "./components/portfolioList/portfolio-list/portfolio-list.component";
import { PortfolioComponent } from "./components/portfolio/portfolio.component";
import { AddPortfolioEntryComponent } from "./components/add-portfolio-entry/add-portfolio-entry.component";
import { PortfolioEntryListComponent } from "./components/portfolio-entry-list/portfolio-entry-list.component";
import { ValueModalComponent } from "./components/value-modal/value-modal.component";
import { AddEntryValueComponent } from "./components/add-entry-value/add-entry-value.component";
import { DecimalInputComponent } from "./components/controls/decimal-input/decimal-input.component";
import { PortfolioTypeSelectComponent } from "./shared/components/portfolio-type-select/portfolio-type-select.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { UnauthorizedInterceptor } from "./interceptors/unauthorized.interceptor";
import { ImpressumComponent } from "./components/impressum/impressum.component";
import { DatenschutzerklaerungComponent } from "./components/datenschutzerklaerung/datenschutzerklaerung.component";

// Deprecated, aber notwendig um Error NG0701 zu verhindern https://github.com/Digivertaisverkko/UKK-tiketit/commit/e6bf37a348f19c98b8d1cc8b284e2095c8f130f2
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    RegistrationSuccessComponent,
    HomeComponent,
    InvalidInputMsgComponent,
    PortfoliosComponent,
    AddPortfolioComponent,
    PortfolioListComponent,
    PortfolioComponent,
    AddPortfolioEntryComponent,
    PortfolioEntryListComponent,
    ValueModalComponent,
    AddEntryValueComponent,
    DecimalInputComponent,
    PortfolioTypeSelectComponent,
    ProfileComponent,
    ImpressumComponent,
    DatenschutzerklaerungComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularToastifyModule
  ],
  providers: [CookieService, ToastService, { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true }, { provide: LOCALE_ID, useValue: "de-DE" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
