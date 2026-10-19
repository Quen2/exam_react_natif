const LOCALE = "fr-FR";

export function formatLongDate(iso: string): string {
    const formatted = new Date(iso).toLocaleDateString(LOCALE, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatTime(iso: string): string {
    const date = new Date(iso);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

export function formatDay(iso: string): string {
    return String(new Date(iso).getDate()).padStart(2, "0");
}

export function formatMonth(iso: string): string {
    return new Date(iso)
        .toLocaleDateString(LOCALE, {month: "short"})
        .replace(".", "")
        .toUpperCase();
}

export function isPast(iso: string): boolean {
    return new Date(iso).getTime() < Date.now();
}
