/**
 * Mensagem legível quando `supabase.functions.invoke('send-chronotype-report')` falha.
 * O cliente por vezes só expõe "Edge Function returned a non-2xx status code";
 * o corpo JSON (se existir em `error.context`) costuma ter `error` descritivo.
 */
export async function describeChronotypeReportInvokeError(
  error: unknown,
  lang: 'pt' | 'en' = 'pt',
): Promise<string> {
  const copy = {
    pt: {
      fallback:
        'Não foi possível enviar o e-mail agora. Confira a conexão e toque em Enviar de novo.',
      invalidEmail: 'E-mail inválido. Verifique e tente de novo.',
      serviceDown:
        'Serviço temporariamente indisponível. Tente de novo em alguns minutos.',
      unexpected: 'Algo saiu do esperado. Atualize a página e tente de novo.',
      emailDispatch:
        'Não foi possível enviar o e-mail neste momento. Tente de novo em alguns minutos.',
    },
    en: {
      fallback: 'Could not send the email now. Check your connection and try again.',
      invalidEmail: 'Invalid email. Please check and try again.',
      serviceDown: 'Service temporarily unavailable. Please try again in a few minutes.',
      unexpected: 'Something went wrong. Refresh the page and try again.',
      emailDispatch: 'Could not send the email right now. Please try again in a few minutes.',
    },
  }[lang];

  if (!error || typeof error !== 'object') return copy.fallback;
  const msg =
    'message' in error && typeof (error as { message?: unknown }).message === 'string'
      ? (error as { message: string }).message
      : '';
  const ctx = 'context' in error ? (error as { context?: unknown }).context : undefined;
  if (ctx instanceof Response) {
    try {
      const body = (await ctx.json()) as { error?: string };
      if (body?.error && typeof body.error === 'string') {
        const e = body.error;
        if (e === 'Invalid email') return copy.invalidEmail;
        if (e === 'Service not configured' || e === 'Email provider not configured')
          return copy.serviceDown;
        if (e === 'Invalid chronotype' || e === 'Invalid source') return copy.unexpected;
        if (e === 'Failed to register lead') return copy.fallback;
        if (e === 'Failed to dispatch email' || e === 'Email provider rejected request')
          return copy.emailDispatch;
        return e;
      }
    } catch {
      /* ignore parse */
    }
  }
  if (msg && msg !== 'Edge Function returned a non-2xx status code') return msg;
  return copy.fallback;
}
