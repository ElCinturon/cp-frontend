import { FormControl } from "@angular/forms"

export interface Portfolio {
    description: string,
    createdAt?: Date,
    typeCode: string
}

export interface PortfolioForm {
    description: FormControl<string>,
    typeCode: FormControl<string>
}