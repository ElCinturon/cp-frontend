import { FormControl } from "@angular/forms"

export interface PortfolioEntryValue {
    id?: number,
    time: string,
    value: number
}

export interface PortfolioEntryValueForm {
    value: FormControl<number>,
    time: FormControl<string>
}