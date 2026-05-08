# send-chronotype-report

Edge function que recebe o e-mail capturado no gate pós-quiz, registra o
lead em `chronotype_leads` (tabela com RLS, acesso restrito a service
role) e dispara o relatório personalizado por cronótipo via Resend.

## Endpoint

`POST https://<project>.supabase.co/functions/v1/send-chronotype-report`

Headers que o cliente envia automaticamente via `supabase.functions.invoke`:

- `Authorization: Bearer <ANON_KEY>`
- `Apikey: <ANON_KEY>`
- `Content-Type: application/json`

## Body

```json
{
  "email": "pessoa@example.com",
  "chronotype": "dolphin | lion | bear | wolf",
  "language": "pt | en",        // opcional, default "pt"
  "source":   "web_quiz_inline | modal_quiz | web_funnel | test",
  "quizAnswers": [["a"], ["b","c"], ["d"], ["e"]] // opcional
}
```

## Respostas

- `200 { success: true, leadId, messageId, chronotype }` — lead salvo + e-mail despachado.
- `200 { success: true, deduplicated: true, leadId }` — mesmo `(email, chronotype)` recebeu envio bem-sucedido nas últimas 24h. Idempotente.
- `400` — payload inválido (`email`, `chronotype`, `language`, `source`).
- `500` — variáveis ausentes ou falha no insert.
- `502` — provedor de e-mail (Resend) rejeitou ou falhou.

## Variáveis de ambiente

Devem estar configuradas no projeto Supabase (Settings → Edge Functions → Secrets):

| Variável | Origem | Já existe? |
|---|---|---|
| `SUPABASE_URL` | injetada automaticamente pelo runtime | sim |
| `SUPABASE_SERVICE_ROLE_KEY` | injetada automaticamente | sim |
| `RESEND_API_KEY` | painel Resend → API Keys | sim (já usada pela `send-email`) |

Nada novo precisa ser configurado.

## Deploy

```bash
# 1. Aplicar a migration que cria a tabela chronotype_leads
supabase db push

# 2. Deploy da edge function
supabase functions deploy send-chronotype-report --no-verify-jwt=false

# 3. (opcional) Smoke test com curl
curl -X POST \
  "https://<project>.supabase.co/functions/v1/send-chronotype-report" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ANON_KEY>" \
  -H "apikey: <ANON_KEY>" \
  -d '{
    "email": "voce@example.com",
    "chronotype": "wolf",
    "language": "pt",
    "source": "test"
  }'
```

A resposta esperada é `200` com `messageId` (id do envio no Resend).

## Auditoria de leads

Como a tabela está protegida por RLS sem policies para anon/authenticated,
a leitura só pode ser feita via SQL Editor do Supabase (que usa service role)
ou via uma edge function dedicada protegida.

Consulta útil:

```sql
SELECT
  chronotype,
  count(*) FILTER (WHERE email_sent_at IS NOT NULL) AS sent,
  count(*) FILTER (WHERE email_sent_at IS NULL)     AS pending,
  count(*) FILTER (WHERE email_error IS NOT NULL)   AS errors,
  count(DISTINCT email)                             AS unique_emails
FROM public.chronotype_leads
WHERE created_at >= now() - interval '7 days'
GROUP BY chronotype
ORDER BY sent DESC;
```

## Idempotência e anti-abuso

- **Dedupe 24h**: a mesma combinação `(email, chronotype)` que já recebeu
  um envio confirmado nas últimas 24 horas retorna sucesso sem reenviar.
- **`ip_hash`**: armazenado para detectar abuso por IP sem reter IP cru
  (LGPD compliance). Para futuro rate-limit por IP, basta agregar por
  `ip_hash` na tabela.
- **`quiz_answers`**: salvas como `jsonb` para auditoria e segmentação
  futura (ex.: enviar tira-dúvidas específico se a pessoa marcou
  "ansiedade noturna" como sintoma dominante).

## Templates

Os 4 templates HTML vivem em `templates.ts` no mesmo diretório. Para
ajustes de copy, é só editar `CONTENT_PT` (e adicionar `CONTENT_EN`
quando o conteúdo em inglês existir).

Validação visual recomendada antes de cada deploy de mudança de copy:
abrir `gozzzz-emails-cronotipos.html` na raiz do projeto (preview com o
mesmo design system).
