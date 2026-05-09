/**
 * "Destrava" o programa premium na web quando o usuário chega via link
 * com `?key=…` (link enviado pelo Kiwify após a compra).
 *
 * Não é login — é um token compartilhado por todos os clientes pagantes,
 * salvo no localStorage do navegador depois da primeira validação. Assim
 * o cliente não precisa carregar o `?key=` em todas as URLs internas;
 * o próximo clique nas lições já encontra o flag salvo.
 *
 * Para invalidar massa de acessos antigos, basta trocar a string em
 * lib/program-access.ts (PROGRAM_ACCESS_KEY) e reenviar o link novo aos
 * compradores. Os flags antigos param de bater com a chave nova e a
 * pessoa cai no fluxo bloqueado.
 */
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { getPublicProgramAccessKey } from './program-access';

const STORAGE_KEY = 'gozzzz.program_unlock.v1';

function readKeyFromStorage(): string | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeKeyToStorage(key: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, key);
  } catch {
    /* sem storage (modo privado em alguns browsers) — ignora */
  }
}

export function clearProgramUnlock(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Retorna `true` se o usuário tem acesso liberado nesta sessão (vindo
 * da URL com `?key=` correta ou já salvo no localStorage). Renderiza-
 * primeiro como `false` e depois atualiza em um efeito, então use sempre
 * acoplado a estados condicionais — nunca assuma sincrono no SSR.
 */
export function useProgramUnlock(): boolean {
  const params = useLocalSearchParams<{ key?: string | string[] }>();
  const rawKey = params.key;
  const providedKey = (Array.isArray(rawKey) ? rawKey[0] : rawKey ?? '').trim();

  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const expected = getPublicProgramAccessKey().trim();
    if (!expected) {
      setUnlocked(false);
      return;
    }

    if (providedKey && providedKey === expected) {
      writeKeyToStorage(providedKey);
      setUnlocked(true);
      return;
    }

    const stored = readKeyFromStorage();
    setUnlocked(Boolean(stored && stored === expected));
  }, [providedKey]);

  return unlocked;
}
