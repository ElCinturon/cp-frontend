import { FormControl } from "@angular/forms"

export interface UserIdentifier {
    userIdentifier: string
}

export interface UserIdentifierForm {
    userIdentifier: FormControl<string>
}