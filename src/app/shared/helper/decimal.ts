// Wandelt string in Format 5.000,00 zu Number 5000.00 um
export function stringDecimalToNumber(decimal: string) {
    return Number(decimal.replaceAll(".", "").replaceAll(",", "."));
}

// Wandelt Number im Format 5000.00 zu Dezimalstring um 5.000,00
export function NumberTostringDecimal(numb: number) {
    return numb.toString().replaceAll(".", ",");
}