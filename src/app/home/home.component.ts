import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { UserInfoService } from 'src/app/services/userInfo.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  username!: string;
  constructor(private cookieService: CookieService, private userInfoService: UserInfoService) { }

  // TODO Code doppelt mit appmodule. Möglichkeit für globale Userinfos schaffen
  ngOnInit() {

    // Zunächst Usernamen aus Cookie auslesen (Für Reload wichtig)
    if (!this.username) {
      this.username = this.cookieService.get("username");
      console.log(this.username);
    }


    // Änderungen des Usernames beobachten (benötigt um Änderung nach Login zu erhalten)
    this.userInfoService.get().subscribe({
      next: (value) => {
        this.username = value;
      },
      error: (error) => { console.error("error bei Abruf von Userinfos:", error); }
    });
  }
}
