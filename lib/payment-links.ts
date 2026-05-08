// Links externos de pagamento.
//
// MODELO HÍBRIDO ATIVO:
//   • Stripe (à vista, R$ 147) — fluxo principal, usa /web/assinar -> Edge
//     function process-payment. Margem ~96% (taxa Stripe 3.99% + R$ 0,39).
//   • Kiwify (parcelado, até 6x R$ 24,50) — link externo. Cliente paga juros
//     do cartão (não absorvemos custo de antecipação), e Kiwify cuida de
//     emissão/cobrança. Margem similar a vista, mas conversão maior em
//     ticket parcelado para o público BR.
//
// Link do checkout Kiwify do Sono+ Lite (R$ 147, parcelado em até 6x).
// Produto: "GoZzzz — Programa de Sono em 21 Passos"
// Vendedor: MORFEU SAUDE E TECNOLOGIA LTDA
//
// Quando esta string está vazia, o botão "Parcelar em 6x" não aparece e o
// fluxo cai 100% pra Stripe à vista — não é breakage.
export const KIWIFY_PARCELADO_URL = 'https://pay.kiwify.com.br/Q3Cl5P4';

// (Opcional, futuro) Link Kiwify para o Sono+ Coaching (R$ 497).
// Mesmo modelo: até 12x sem juros pro cliente, juros do cartão pelo banco.
export const KIWIFY_SONO_PLUS_COACHING_URL = '';
