import { FormControl } from "@angular/forms"
import { PortfolioEntryValue } from "./PortfolioEntryValue"


export interface PortfolioEntry {
    id?: number,
    description: string,
    createdAt: string,
    portfolioId: number,
    latestValue?: PortfolioEntryValue,
    portfolioEntryValues: PortfolioEntryValue[]
}

export interface PortfolioEntryForm {
    description: FormControl<string>,
    value: FormControl<string>,
    datetime: FormControl<string>
}