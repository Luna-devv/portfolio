export function getBaseUrl() {
    return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}

export function getCanonicalUrl(...pages: string[]) {
    return `${getBaseUrl()}/${pages.join("/")}`;
}