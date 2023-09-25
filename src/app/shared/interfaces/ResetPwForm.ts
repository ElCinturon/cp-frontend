import { FormControl } from "@angular/forms"

export interface ResetPwForm {
    userIdentifier: FormControl<string>,
    password: FormControl<string>,
    passwordConfirm: FormControl<string>
}