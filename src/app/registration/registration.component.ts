import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../registration.service';


@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
	constructor(public registerService: RegistrationService) {}

	onSubmit(registerData: NgForm) {

		// User registrieren
		this.registerService.registerUser(registerData.value).subscribe(response => {
			if (response.status === 200) {
						this.router.navigate(["../registration-success"]);
					}
		});
	}

}
