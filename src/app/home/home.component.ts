import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { UserInfoService } from "src/app/services/userInfo.service";
import { PortfolioService } from "../services/portfolio.service";
import { Portfolio } from "../shared/interfaces/Portfolio";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  username!: string;
  amountPortfolios = 0;
  mostValuablePortfolio: Portfolio | null = null;

  constructor(private cookieService: CookieService, private userInfoService: UserInfoService, private portfolioService: PortfolioService) { }

  // TODO Code doppelt mit appmodule. Möglichkeit für globale Userinfos schaffen
  ngOnInit() {

    // Zunächst Usernamen aus Cookie auslesen (Für Reload wichtig)
    if (!this.username) {
      this.username = this.cookieService.get("username");
    }


    // Änderungen des Usernames beobachten (benötigt um Änderung nach Login zu erhalten)
    this.userInfoService.get().subscribe({
      next: (value) => {
        this.username = value;
      },
      error: (error) => { console.error("error bei Abruf von Userinfos:", error); }
    });

    if (this.username) {
      this.getPortfolioStats();
    }
  }

  // Ruft anhand aller Portfolios Statistiken für den User ab
  getPortfolioStats() {
    this.portfolioService.getPortfolios().subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.amountPortfolios = response.length;
          this.mostValuablePortfolio = response.reduce((prev, current) => prev.totalValue! > current.totalValue! ? prev : current);
        } else {
          this.amountPortfolios = 0;
        }
      },
      error: (error) => { console.log("Beim Abruf der Portfoliostatistiken ist ein Fehler aufgetreten", error) },
    })
  }





}
