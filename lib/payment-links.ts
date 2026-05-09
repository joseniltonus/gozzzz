// Links externos de pagamento.
//
// MODELO ATUAL — Kiwify único (decisão estratégica May/2026):
//   • Kiwify cuida de cartão + Pix + Boleto + parcelamento + área de membros
//     + e-mails transacionais + nota fiscal + reembolso 7d (CDC). Reduz fricção
//     pro cliente BR e elimina código de webhook/entrega do nosso lado.
//   • Stripe permanece no repositório, mas DESATIVADO da experiência pública
//     pra evitar confusão (dois botões = decision fatigue). Pra reativar
//     (mercado internacional / SaaS recorrente futuro), basta mudar a flag
//     STRIPE_ENABLED abaixo pra true — código intacto em /assinar e na
//     edge function process-payment.
//
// Link do checkout Kiwify do Sono+ Lite (R$ 147, parcelado em até 6x).
// Produto: "GoZzzz — Programa de Sono em 21 Passos"
// Vendedor: MORFEU SAUDE E TECNOLOGIA LTDA
export const KIWIFY_PARCELADO_URL = 'https://pay.kiwify.com.br/Q3Cl5P4';

// Área de membros do Kiwify (cliente faz login com o e-mail da compra). Esse
// é o link que o /web/obrigado mostra como CTA principal pós-pagamento.
// Kiwify também envia esse link automaticamente no e-mail de confirmação.
export const KIWIFY_MEMBER_AREA_URL = 'https://dashboard.kiwify.com.br/login';

// Feature flag: enquanto false, esconde todos os botões "Pagar à vista"
// que apontam pro Stripe. Quando true, volta o modelo híbrido (Kiwify
// parcelado + Stripe à vista lado a lado).
export const STRIPE_ENABLED = false;

// (Opcional, futuro) Link Kiwify para o Sono+ Coaching (R$ 497).
// Mesmo modelo: até 12x sem juros pro cliente, juros do cartão pelo banco.
export const KIWIFY_SONO_PLUS_COACHING_URL = '';
