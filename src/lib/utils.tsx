export function cx(...parts: (string | boolean | null | undefined)[]) {
    return parts.filter(Boolean).join(" ");
}

export function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

export function formatYearRange(start: string, end?: string) {
    return end ? `${start} – ${end}` : `${start} – Present`;
}
