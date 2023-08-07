/**
 * Wandelt DB Timestamp aus dem Backend in Format "DD-MM-YYYY, HH:MM Uhr" um
 * @param timestamp 
 * @returns 
 */
export function formatDbDateTime(timestamp: Date): string {
    return new Date(timestamp)
        .toLocaleDateString("de-DE", { year: "numeric", day: '2-digit', month: "2-digit", hour: "2-digit", minute: "2-digit" })
        + " Uhr"
}

// Gibt aktuelles Datum als String zurück (nötig für local-datetime input)
export function todayAsString() {
    return new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -5);
}