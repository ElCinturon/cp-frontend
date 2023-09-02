import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private userService: UserService, private cookieService: CookieService) { }

  deleteUser() {
    if (confirm("Möchten Sie Ihr Konto wirklich unwiederuflich löschen?")) {
      const userId = this.cookieService.get("userId");
      this.userService.delete(Number(userId)).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => { console.log(error); }
      });
    }
  }


}
