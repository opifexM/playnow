import { dropCookie, getCookie, saveCookie } from "./cookie.ts";

export function getToken(key: string): string {
  return getCookie(key);
}

export function saveToken(key: string, token: string = ""): void {
  saveCookie(key, token);
}

export function dropToken(key: string): void {
  dropCookie(key);
}
