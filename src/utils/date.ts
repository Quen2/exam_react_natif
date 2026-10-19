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

// "JJ/MM/AAAA HH:MM" <-> Date (saisie sur le web, où il n'y a pas de sélecteur natif)
export function toInputString(date: Date): string {
    const pad = (value: number) => String(value).padStart(2, "0");
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function parseInputString(value: string): Date | null {
    const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/);
    if (!match) return null;

    const [, day, month, year, hours, minutes] = match.map(Number);
    const date = new Date(year, month - 1, day, hours, minutes);

    const isSameDate = date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
    return isSameDate && hours < 24 && minutes < 60 ? date : null;
}
