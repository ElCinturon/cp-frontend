import { Component, signal } from '@angular/core';
import { NgForm} from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

	constructor(public registerService: RegistrationService, private router: Router) { }
	
	test(e: Event){
		console.log("change", e);
	}

	registerUser(registerData: NgForm) {
		if (registerData.valid) {
			
			// User registrieren
			this.registerService.registerUser(registerData.value).subscribe(response => {
				if (response.status === 200) {
					this.router.navigate(["../registrationSuccess"]);
				}
			}, error => { console.log("Fehler bei der Registrierung!") });
		}
	}

}
