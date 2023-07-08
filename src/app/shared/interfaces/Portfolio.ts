import { FormControl } from "@angular/forms"
import { PortfolioType } from "./PortfolioType"

export interface Portfolio {
    description: string,
    createdAt?: Date,
    typeCode: string,
    portfolioType?: PortfolioType
}

export interface PortfolioForm {
    description: FormControl<string>,
    typeCode: FormControl<string>
}