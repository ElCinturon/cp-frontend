import { FormControl } from "@angular/forms"
import { PortfolioType } from "./PortfolioType"

export interface Portfolio {
    id?: number,
    description: string,
    createdAt?: Date,
    typeCode: string,
    portfolioType?: PortfolioType,
    totalValue?: number
}

export interface PortfolioForm {
    description: FormControl<string>,
    typeCode: FormControl<string>
}