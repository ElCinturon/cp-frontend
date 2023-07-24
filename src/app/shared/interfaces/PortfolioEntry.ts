import { FormControl } from "@angular/forms"

export interface PortfolioEntry {
    description: string,
    value: number,
    datetime: string,
    portfolioId: number
}

export interface PortfolioEntryForm {
    description: FormControl<string>,
    value: FormControl<string>,
    datetime: FormControl<string>
}