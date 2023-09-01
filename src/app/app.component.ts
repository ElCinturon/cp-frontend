import { Component } from "@angular/core";
import { UserInfoService } from "./services/userInfo.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "capitalPortal";
  username = "";

  constructor(private userInfoService: UserInfoService, private cookieService: CookieService) { }

  ngOnInit() {
    // Zunächst Usernamen aus Cookie auslesen (Für Reload wichtig)
    if (!this.username) {
      this.username = this.cookieService.get("username");
    }

    // Änderungen des Usernames beobachten (benötigt um Änderung nach Login zu erhalten)
    this.userInfoService.get().subscribe({
      next: (value) => {
        if (value) {
          this.username = value;
        }
      },
      error: (error) => { console.error("error bei Abruf von Userinfos:", error); }
    });
  }
}
