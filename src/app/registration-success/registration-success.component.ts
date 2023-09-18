import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-registration-success",
  templateUrl: "./registration-success.component.html",
  styleUrls: ["./registration-success.component.css"]
})
export class RegistrationSuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  username = "";

  ngOnInit() {
    this.username = this.route.snapshot.queryParamMap.get("username")!;
  }

}
