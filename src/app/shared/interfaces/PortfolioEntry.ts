import { FormControl } from "@angular/forms"

export interface PortfolioEntry {
    description: string,
    value: Number,
    datetime: Date
}

export interface PortfolioEntryForm {
    description: FormControl<string>,
    value: FormControl<Number>,
    datetime: FormControl<Date>
}