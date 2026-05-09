# GoZzzz — Templates de E-mail de Boas-vindas

Dois templates HTML standalone prontos pra qualquer ESP (Mailchimp, ActiveCampaign, Klaviyo, RD Station, Brevo, Resend, SendGrid, ConvertKit, etc.).

---

## Arquivos

| Arquivo | Quando enviar |
|---|---|
| `gozzzz_email_fez_teste.html` | Cliente comprou e **já fez** o quiz de cronótipo |
| `gozzzz_email_nao_fez_teste.html` | Cliente comprou mas **ainda não fez** o quiz |

---

## Variáveis a substituir no ESP

### Em ambos os e-mails

| Variável | Descrição | Exemplo |
|---|---|---|
| `{{primeiro_nome}}` | Primeiro nome do cliente | `Maria` |
| `{{link_cancelar}}` | Link para reportar compra indevida | `https://gozzzz.app/cancelar-compra?id=...` |
| `{{link_descadastrar}}` | Unsubscribe (obrigatório por lei) | `https://gozzzz.app/unsubscribe?email=...` |
| `{{link_politica}}` | Política de privacidade | `https://gozzzz.app/privacidade` |

### Apenas em `gozzzz_email_fez_teste.html`

| Variável | Descrição | Exemplo |
|---|---|---|
| `{{cronótipo}}` | Resultado do quiz | `Lobo`, `Leão`, `Urso`, `Golfinho` |
| `{{janela_sono}}` | Janela de sono ideal | `00h00 e 01h00` |
| `{{descricao_cronotipo}}` | Texto personalizado por perfil (ver tabela abaixo) | (texto longo) |
| `{{link_acesso}}` | Link direto para a área de membros | `https://gozzzz.app/web/programa?token=...` |

---

## Descrições por cronótipo (`{{descricao_cronotipo}}`)

Cole o texto correspondente ao perfil identificado:

### Lobo
> Você tem pico de energia à noite e dificuldade com rotinas matutinas. Seu corpo naturalmente libera melatonina mais tarde — forçar dormir cedo cria resistência, não sono. O programa começa calibrando isso.

### Leão
> Você acorda naturalmente cedo e tem mais energia nas primeiras horas do dia. O risco é acumular sono social aos fins de semana quebrando o ritmo. O programa te ajuda a manter a consistência.

### Urso
> Você segue o ciclo solar — o perfil mais comum. Ainda assim, pequenas variações de rotina (luz, alimentação, telas) criam um débito silencioso. O programa identifica o que está quebrando o seu ciclo.

### Golfinho
> Seu sono é leve e você acorda facilmente no meio da noite. É o perfil mais complexo e o que mais se beneficia do protocolo específico. O programa tem um módulo dedicado para você.

---

## Janelas de sono (`{{janela_sono}}`)

Sugestões médicas baseadas em cronótipo:

| Cronótipo | Janela |
|---|---|
| Lobo | `00h00 e 01h00` |
| Leão | `21h30 e 22h30` |
| Urso | `22h30 e 23h30` |
| Golfinho | `23h30 e 00h00` |

---

## Subjects recomendados

### `gozzzz_email_fez_teste.html`
- `Seu cronótipo: {{cronótipo}} — veja o que isso significa`
- `{{primeiro_nome}}, seu perfil de sono foi identificado`
- `{{primeiro_nome}}, seu plano para os próximos 21 dias está pronto`

### `gozzzz_email_nao_fez_teste.html`
- `Uma coisa antes de começar, {{primeiro_nome}} (60 segundos)`
- `Antes da Lição 1 — faça isso primeiro`
- `Você pulou a parte mais importante do programa`

---

## Lógica de automação sugerida

```
COMPRA CONFIRMADA (Kiwify webhook)
      │
      ├─ Aguarda 30 minutos
      │
      ├─ Cliente fez o quiz?
      │   (lookup em chronotype_leads pelo email)
      │
      ├─ SIM ───► Envia: gozzzz_email_fez_teste.html
      │           Variáveis: nome, cronótipo, janela_sono,
      │           descricao_cronotipo, link_acesso, ...legais
      │
      └─ NÃO ───► Envia: gozzzz_email_nao_fez_teste.html
                  Variáveis: nome, ...legais
                  │
                  └─ Aguarda 24h
                     │
                     └─ Ainda não fez? ──► Re-envio com subject
                                             alternativo (ver lista acima)
```

---

## Cores da identidade

| Token | Hex | Uso |
|---|---|---|
| Roxo primário | `#7c5ce8` | Links, labels, destaques |
| Roxo claro | `#f8f6ff` | Backgrounds de cards |
| Escuro | `#1a1535` | Títulos, botão principal |
| Texto corpo | `#4a4560` | Parágrafos |
| Texto suave | `#9590b0` | Notas, rodapé |
| Fundo externo | `#f0f0f4` | Background do e-mail |

---

## Compatibilidade

Testado para:

- Gmail (web + app, light + dark mode)
- Apple Mail (macOS + iOS)
- Outlook 2016 / 2019 / 365 (com fallback VML)
- Yahoo Mail
- Samsung Mail

Técnicas usadas:

- Table-based layout (sem CSS Grid/Flexbox)
- Inline styles + `<style>` block para media queries
- MSO conditional comments (`<!--[if mso]>`) para Outlook
- VML `<v:roundrect>` para botões com cantos arredondados em Outlook
- Preheader com zero-width characters (entrega o texto sem cortar)
- `role="presentation"` em todas as tables (acessibilidade)
- Suporte a dark mode via `prefers-color-scheme`

---

## Como testar antes de publicar no ESP

1. Abra cada arquivo no navegador (basta dar duplo clique)
2. Substitua manualmente as variáveis `{{...}}` por valores de exemplo pra ver
   o resultado renderizado
3. Para teste em vários clientes de e-mail, use serviços como:
   - [Litmus](https://www.litmus.com/) (pago, mais completo)
   - [Email on Acid](https://www.emailonacid.com/) (pago)
   - [Mail-tester](https://www.mail-tester.com/) (gratuito, foca em deliverability)
   - Ou apenas mande pra você mesmo via Gmail/Outlook/iCloud

---

## Integração via edge function (modo automático)

Se preferir disparar via API ao invés de configurar no ESP, a edge function
`send-welcome-email` já implementa toda essa lógica automaticamente:

- Lookup automático do cronótipo em `chronotype_leads`
- Renderização do template correto (com ou sem teste)
- Envio via Resend
- Tags pra tracking de deliverability

Endpoint:

```
POST https://virxgaxsnxdqjwyvqqme.supabase.co/functions/v1/send-welcome-email
```

Body:

```json
{
  "email": "cliente@gmail.com",
  "firstName": "Maria",
  "source": "kiwify"
}
```

A função detecta o cronótipo automaticamente se o cliente fez o quiz no site
antes de comprar. Se não detectar, manda a versão "nao fez teste".

---

*GoZzzz · MORFEU SAÚDE E TECNOLOGIA LTDA*
