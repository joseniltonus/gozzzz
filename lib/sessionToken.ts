import { storage } from './storage';

const SESSION_TOKEN_KEY = 'gozzzz_session_token';

export function generateToken(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function getLocalToken(): Promise<string | null> {
  return storage.getItem(SESSION_TOKEN_KEY);
}

export async function setLocalToken(token: string): Promise<void> {
  await storage.setItem(SESSION_TOKEN_KEY, token);
}

export async function removeLocalToken(): Promise<void> {
  await storage.removeItem(SESSION_TOKEN_KEY);
}
