// Templates de e-mail por cronótipo (Golfinho · Leão · Urso · Lobo).
//
// Estratégia: HTML auto-contido com <style> no <head>. Provedores modernos
// (Gmail, Outlook 365, Yahoo, Apple Mail) suportam estilos no head desde
// 2017–2018. Para clientes legados (Outlook 2007/2010) o layout degrada
// para empilhamento simples — aceitável para o público-alvo.
//
// Sem imagens: garante deliverability e renderiza igual em modo escuro.
// Sem JS, sem fontes externas, sem trackers — um só link de unsubscribe.
//
// IMPORTANTE: cada cronótipo cita um pesquisador público (nome, cargo,
// instituição) com pequena justificativa de relevância. Sem reprodução
// de obras protegidas.

export type Chronotype = "dolphin" | "lion" | "bear" | "wolf";
export type Language = "pt" | "en";

interface Researcher {
  name: string;
  role: string;
  affiliation: string;
  why: string;
}

interface ChronotypeContent {
  name: string;
  popPercent: string;
  oneLiner: string;
  subject: string;
  preheader: string;
  heroTitle: string;
  lead: string;
  intro: string;
  scienceTitle: string;
  scienceBody: string;
  scienceFollowup: string;
  researcher: Researcher;
  daily: string[];
  steps: Array<{ n: string; title: string; desc: string }>;
  upsellTitle: string;
  upsellBody: string;
  ctaUrl: string;
  sonoPlusWa: string;
  closing: string;
  ctKicker: string;
}

const WHATSAPP_NUMBER = "5511982820759";

function waUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function ctaUrl(slug: string): string {
  return `https://gozzzz.app/web/sono-plus?ct=${slug}#checkout-section`;
}

const CONTENT_PT: Record<Chronotype, ChronotypeContent> = {
  dolphin: {
    name: "Golfinho",
    popPercent: "~10% das pessoas",
    oneLiner: "sono leve · alta sensibilidade · mente ativa à noite",
    subject: "Seu plano Golfinho — entender por que sua mente não desliga",
    preheader:
      "Não é defeito de personalidade. É um padrão circadiano específico, e tem caminho.",
    heroTitle: "Você é Golfinho. Faz sentido.",
    ctKicker: "Cronótipo identificado · Golfinho",
    lead: "Eu durmo. Mas é como se nunca descansasse de verdade.",
    intro:
      "Você completou o quiz e o seu perfil é Golfinho — o cronótipo mais sensível dos quatro. Antes de qualquer estratégia: isso não é falha sua, e não tem nada a ver com força de vontade. É uma configuração biológica específica, e ela pode ser muito bem trabalhada.",
    scienceTitle: "Por que seu sono é tão leve",
    scienceBody:
      "A pesquisa em cronobiologia identifica que pessoas do perfil Golfinho tendem a apresentar três traços simultâneos: maior reatividade do sistema nervoso autônomo durante a noite, ciclos de sono mais fragmentados (com mais despertares breves entre os estágios) e uma resposta mais intensa a estímulos externos — luz, som, temperatura. Em termos práticos, o seu cérebro entra em modo vigia mais facilmente do que o de um Urso ou um Leão.",
    scienceFollowup:
      "Some-se a isso um traço comum de personalidade: o Golfinho costuma ter mente analítica, pensamento ruminativo e tendência a resolver problemas deitando — o que ativa o eixo cortisol exatamente quando ele deveria estar baixo. Resultado: você deita cansado, mas a mente liga.",
    researcher: {
      name: "Michael Breus, PhD",
      role: "Psicólogo clínico do sono",
      affiliation: "Diplomado pela American Board of Sleep Medicine",
      why: "Pesquisador que organizou e popularizou o modelo dos quatro cronótipos animais (Golfinho, Leão, Urso, Lobo) em literatura clínica e divulgação científica internacional. O perfil Golfinho é descrito a partir do trabalho dele com pacientes de insônia primária.",
    },
    daily: [
      "Demora mais de 30 minutos para pegar no sono, mesmo cansado.",
      "Acorda durante a madrugada (geralmente entre 3h e 5h) e a mente liga sozinha.",
      "Ruído, luz fraca ou troca de cama atrapalham seu sono mais do que deveriam.",
      "Tem o pico cognitivo mais claro no fim da manhã ou meio da tarde.",
      "Já tentou várias soluções (apps, melatonina, chás) com resultado morno.",
    ],
    steps: [
      {
        n: "3",
        title: "Dívida de sono e sistema nervoso reativo",
        desc:
          "Por que tentar compensar no fim de semana intensifica a ansiedade noturna em vez de resolver, e o protocolo gradual de 14 dias para zerar a dívida sem forçar.",
      },
      {
        n: "7",
        title: "Janela de desaceleração circadiana",
        desc:
          "Os 90 minutos que antecedem o sono. Aqui o Golfinho ganha ou perde a noite — e a maioria nem percebe que está perdendo.",
      },
      {
        n: "12",
        title: "Reentrada no sono interrompido",
        desc:
          "O que fazer quando você acorda na madrugada e a mente engata. Técnicas estruturadas, sem melatonina e sem tela.",
      },
    ],
    upsellTitle: "Atalho premium · Sono+ (R$ 497)",
    upsellBody:
      "Se prefere ir direto ao ponto, o Sono+ é uma <b>consultoria 100% online</b> de diagnóstico aprofundado + plano personalizado para o perfil Golfinho + 30 dias de Premium do programa.",
    ctaUrl: ctaUrl("dolphin"),
    sonoPlusWa: waUrl(
      "Oi! Fiz o quiz e sou Golfinho. Quero saber mais sobre o Sono+.",
    ),
    closing:
      "Se quiser conversar antes de decidir, é só responder este e-mail. Quem responde sou eu mesmo.",
  },
  lion: {
    name: "Leão",
    popPercent: "~15% das pessoas",
    oneLiner: "pico matinal · queda precoce à noite",
    subject: "Seu plano Leão — proteja a manhã, blinde a noite",
    preheader:
      "Você acorda cedo de boa. O problema é o que acontece depois das 21h.",
    heroTitle: "Você é Leão. A manhã é seu ativo.",
    ctKicker: "Cronótipo identificado · Leão",
    lead: "Antes das 9h da manhã eu rendo o que outros rendem o dia inteiro.",
    intro:
      "Seu perfil é Leão — o cronótipo madrugador clássico. A maior parte do mundo é desenhada por Leões e para Leões: reuniões cedo, expediente das 8h, produtividade matinal. Você está alinhado com isso, mas existe um custo silencioso — e é ele que o programa endereça.",
    scienceTitle: "Por que sua manhã é poderosa e sua noite é frágil",
    scienceBody:
      "Pessoas do perfil Leão apresentam um pico de cortisol matinal mais precoce e mais intenso do que a média. O cortisol não é vilão — é o hormônio que te tira da cama com clareza mental e foco. O reverso disso é igualmente programado: sua melatonina noturna costuma subir mais cedo (em torno de 20h–21h) e seu sono profundo é mais frágil quando você fica acordado contra essa onda.",
    scienceFollowup:
      "Detalhe que poucos Leões sabem: o pico matinal só se mantém saudável ao longo dos anos se for alimentado por luz natural certa nas duas primeiras horas após acordar. Sem isso, o Leão envelhece o cronótipo, fica achatado — perde a manhã sem ganhar a noite.",
    researcher: {
      name: "Andrew Huberman, PhD",
      role: "Professor de Neurobiologia e Oftalmologia",
      affiliation: "Stanford University School of Medicine",
      why: "Pesquisador da neurobiologia da visão e dos circuitos circadianos. Trabalho amplamente referenciado sobre o papel da luz natural matinal no disparo saudável do cortisol e na manutenção da fase precoce — exatamente o motor do cronótipo Leão.",
    },
    daily: [
      "Acorda naturalmente entre 5h e 6h30, mesmo sem alarme.",
      "Rende muito nas 3 primeiras horas do dia, depois cai mais cedo do que os colegas.",
      "Sente-se morto depois das 21h e dorme rápido se a luz for baixa.",
      "Café depois das 14h prejudica seu sono mesmo que você não sinta.",
      "Fins de semana com sono deslocado custam 2 ou 3 dias para reorganizar.",
    ],
    steps: [
      {
        n: "8",
        title: "Luz matinal estratégica",
        desc:
          "Como usar os primeiros 12 minutos de luz natural após acordar para reforçar o cortisol matinal sem queimá-lo. Detalhe da intensidade, da janela e da posição do corpo.",
      },
      {
        n: "4",
        title: "Janela de cafeína para Leões",
        desc:
          "Por que o café inocente das 15h adia seu sono em 30–40 minutos sem você perceber, e como recalibrar a janela.",
      },
      {
        n: "15",
        title: "Proteção da janela curta de sono",
        desc:
          "Blindagem das três horas antes de deitar — o que comer, o que evitar, como negociar compromissos sociais sem sabotar a manhã seguinte.",
      },
    ],
    upsellTitle: "Atalho premium · Sono+ (R$ 497)",
    upsellBody:
      "O Sono+ é uma <b>consultoria 100% online</b>: diagnóstico aprofundado + plano de luz, cafeína e janela de sono específico para Leões + 30 dias Premium do programa.",
    ctaUrl: ctaUrl("lion"),
    sonoPlusWa: waUrl(
      "Oi! Fiz o quiz e sou Leão. Quero saber mais sobre o Sono+.",
    ),
    closing: "Qualquer dúvida, é só responder este e-mail. Eu leio.",
  },
  bear: {
    name: "Urso",
    popPercent: "~55% das pessoas",
    oneLiner: "alinhado com o ciclo claro-escuro · cronótipo mais comum",
    subject: "Seu plano Urso — consistência é seu ativo, não sua jaula",
    preheader:
      "A maioria do mundo é Urso. A maioria dorme mal mesmo assim. Aqui está o porquê.",
    heroTitle: "Você é Urso. Você é a maioria.",
    ctKicker: "Cronótipo identificado · Urso",
    lead: "Eu durmo bem quando a vida deixa. O problema é que a vida quase nunca deixa.",
    intro:
      "Você é Urso — o cronótipo mais comum, e também o mais facilmente sabotado pela rotina urbana moderna. A boa notícia: como sua biologia segue o ciclo claro-escuro de perto, o Urso é o perfil que responde mais rápido a ajustes simples. Você não precisa reescrever sua vida — precisa parar de fazer 4 ou 5 coisas que estão drenando o seu sono profundo.",
    scienceTitle: "Por que sua maior força é a regularidade",
    scienceBody:
      "O perfil Urso apresenta um padrão circadiano fortemente sincronizado com luz e temperatura ambiente. Quando você dorme em horários consistentes, o eixo melatonina-cortisol funciona como um relógio: melatonina sobe pouco antes de deitar, cortisol sobe pouco antes de acordar, temperatura corporal central cai durante a noite e sobe pela manhã. Quando esse padrão é quebrado por horários irregulares, telas tarde da noite ou viagens, o Urso perde sono profundo (estágio N3) primeiro — exatamente o estágio que faz reparo físico e consolidação de memória.",
    scienceFollowup:
      "Outro detalhe pouco conhecido: a queda de energia que você sente entre 13h e 15h não é problema seu, e nem é o almoço. É uma queda fisiológica programada da temperatura corporal, e existe protocolo para usar isso a favor (em vez de lutar com café e açúcar).",
    researcher: {
      name: "Charles A. Czeisler, MD, PhD",
      role: "Diretor da Divisão de Medicina do Sono e Distúrbios Circadianos",
      affiliation:
        "Harvard Medical School · Brigham and Women's Hospital",
      why: "Uma das maiores referências mundiais em ritmos circadianos populacionais. Estudos clínicos clássicos sobre o impacto da regularidade de horários na arquitetura do sono profundo — exatamente o ponto que define a saúde do cronótipo Urso.",
    },
    daily: [
      "Acorda bem entre 6h30 e 8h, com alarme tranquilo.",
      "Tem queda real de energia entre 13h e 15h, todos os dias.",
      "Dorme melhor quando os horários da semana são parecidos.",
      "Fim de semana com sono deslocado leva 1 ou 2 dias para voltar.",
      "Acorda à noite ocasionalmente, mas o que mais incomoda é dormir e não descansar.",
    ],
    steps: [
      {
        n: "2",
        title: "Cronótipos e ritmo circadiano na prática",
        desc:
          "Como seu relógio biológico funciona, por que a queda das 14h não é falta de produtividade, e como aproveitar — em vez de combater — os ciclos do dia.",
      },
      {
        n: "9",
        title: "Janela ideal de sono profundo",
        desc:
          "Por que dormir 7h45 das 23h às 6h45 não equivale a 7h45 das 1h às 8h45 — apesar da mesma duração.",
      },
      {
        n: "14",
        title: "Regularidade negociada (sem virar prisão)",
        desc:
          "A regra das 2 horas: até onde você pode estender o sono no fim de semana sem desregular a próxima segunda-feira.",
      },
    ],
    upsellTitle: "Atalho premium · Sono+ (R$ 497)",
    upsellBody:
      "O Urso responde rápido — então uma <b>consultoria 100% online</b> identifica em 60 minutos os 3 ou 4 pontos que estão drenando seu sono profundo, monta um plano de 4 semanas e entrega 30 dias Premium do programa.",
    ctaUrl: ctaUrl("bear"),
    sonoPlusWa: waUrl(
      "Oi! Fiz o quiz e sou Urso. Quero saber mais sobre o Sono+.",
    ),
    closing:
      "Se quiser tirar dúvida específica antes de decidir, é só responder este e-mail.",
  },
  wolf: {
    name: "Lobo",
    popPercent: "~15-20% das pessoas",
    oneLiner: "fase circadiana tardia · pico cognitivo à noite",
    subject:
      "Seu plano Lobo — você não é preguiçoso, é tardio (e tem solução)",
    preheader:
      "Acordar cedo dói porque é genética, não falta de força de vontade.",
    heroTitle: "Você é Lobo. Você é tardio, não preguiçoso.",
    ctKicker: "Cronótipo identificado · Lobo",
    lead: "Acordo cansado todo dia. À noite, finalmente, viro outra pessoa.",
    intro:
      "Seu perfil é Lobo — fase circadiana tardia. Antes de qualquer estratégia: a maior parte do que você ouviu a vida inteira sobre disciplina de sono foi escrito por e para Leões e Ursos. Para Lobos, o jogo é outro. Você não é indisciplinado, você é simplesmente tardio — e a literatura científica é cada vez mais clara sobre isso.",
    scienceTitle: "Por que acordar cedo realmente dói",
    scienceBody:
      "O perfil Lobo apresenta um padrão circadiano com fase atrasada em relação ao horário social: a melatonina sobe mais tarde (perto de meia-noite, às vezes depois), o pico de cortisol matinal acontece mais tarde também, e a temperatura corporal central só atinge o ponto baixo de fato no fim da madrugada. Conclusão prática: quando você é forçado a acordar às 7h, seu corpo está fisiologicamente no que seria, para um Urso, as 4h da manhã. Por isso dói. Não é falta de hábito — é jet lag crônico contra a sua biologia.",
    scienceFollowup:
      "A boa notícia: o cronótipo é parcialmente plástico. Existe um caminho para antecipar a sua fase em até 2 horas de forma sustentada, sem melatonina, sem sofrimento, em torno de 14 dias. Mas a abordagem precisa respeitar a sua biologia — forçar despertador cedo sem o resto do plano só piora.",
    researcher: {
      name: "Matthew Walker, PhD",
      role: "Professor de Neurociência e Psicologia",
      affiliation:
        "University of California, Berkeley · Diretor do Center for Human Sleep Science",
      why: "Pesquisador de referência sobre arquitetura do sono e fases circadianas tardias. Trabalho público amplo descrevendo o custo cognitivo, metabólico e emocional do desalinhamento entre o relógio biológico tardio e o horário social — base de evidência do plano para Lobos.",
    },
    daily: [
      "Se deixarem, dorme depois da meia-noite e acorda perto das 9h ou mais tarde.",
      "Manhã é nebulosa: leva 2 horas até ligar de verdade.",
      "Tem o pico cognitivo mais nítido depois das 17h ou à noite.",
      "Já se sentiu culpado por ser preguiçoso várias vezes na vida — e nunca foi.",
      "Mesmo dormindo 8 horas, acorda pesado se for cedo demais.",
    ],
    steps: [
      {
        n: "5",
        title: "Sono profundo do Lobo",
        desc:
          "Por que sua arquitetura empilha REM e sono profundo de forma diferente, e como isso explica acordar pesado mesmo com 8 horas na cama.",
      },
      {
        n: "11",
        title: "Avanço de fase progressivo",
        desc:
          "Protocolo de 14 dias para mover seu horário de dormir entre 60 e 90 minutos para trás de forma sustentada — sem melatonina como muleta diária.",
      },
      {
        n: "17",
        title: "Negociar a manhã sem destruir a noite",
        desc:
          "Como sobreviver a reuniões cedo sem pagar com fadiga: sequência de luz, primeira refeição, hidratação, janela de cafeína.",
      },
    ],
    upsellTitle: "Atalho premium · Sono+ (R$ 497)",
    upsellBody:
      "Se a sua rotina exige despertar cedo e você está exausto há tempo demais, o Sono+ é uma <b>consultoria 100% online</b>: desenha um avanço de fase específico para o seu caso, com plano de 4 semanas + 30 dias Premium do programa.",
    ctaUrl: ctaUrl("wolf"),
    sonoPlusWa: waUrl(
      "Oi! Fiz o quiz e sou Lobo. Quero saber mais sobre o Sono+.",
    ),
    closing:
      "Lobos costumam ter mais perguntas — é normal. Se quiser, responde este e-mail antes de decidir.",
  },
};

// Mapa de cor de destaque por cronótipo (kicker do hero)
const ACCENT: Record<Chronotype, string> = {
  dolphin: "#2563eb",
  lion: "#c2620e",
  bear: "#7c3aed",
  wolf: "#475569",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHtml(c: ChronotypeContent, accent: string): string {
  const dailyLis = c.daily
    .map(
      (d, i) =>
        `<li><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${escapeHtml(d)}</span></li>`,
    )
    .join("");

  const stepsRows = c.steps
    .map(
      (s) =>
        `<tr><td class="n">${escapeHtml(s.n)}</td><td class="title">${escapeHtml(s.title)}</td><td class="desc">${escapeHtml(s.desc)}</td></tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${escapeHtml(c.subject)}</title>
<style>
  body { margin:0; padding:0; background:#f3f3f5; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Inter",Helvetica,Arial,sans-serif; color:#0b1220; line-height:1.55; -webkit-font-smoothing:antialiased; }
  a { color:#0b1220; }
  .container { max-width:640px; margin:0 auto; padding:24px 16px; }
  .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; }
  .email { background:#fff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; }
  .hero { padding:32px 32px 24px; border-bottom:1px solid #f1f3f5; }
  .kicker { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:${accent}; font-weight:700; margin:0 0 10px; }
  .hero h1 { font-size:28px; line-height:1.18; margin:0 0 6px; letter-spacing:-0.01em; color:#0b1220; }
  .hero .subtitle { color:#6b7280; font-size:14px; margin:0; }
  .body { padding:24px 32px 32px; }
  .body p { margin:0 0 16px; font-size:15.5px; color:#1f2937; }
  .lead { border-left:3px solid #e5e7eb; padding:4px 0 4px 16px; margin:0 0 22px; color:#0b1220; font-style:italic; font-size:17px; line-height:1.5; }
  h2.section { font-size:18px; margin:24px 0 12px; letter-spacing:-0.005em; color:#0b1220; }
  .callout { background:#f7faff; border:1px solid #dbe7fb; border-left:3px solid #2563eb; border-radius:10px; padding:18px 20px; margin:6px 0 20px; }
  .callout .label { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#2563eb; font-weight:700; margin:0 0 6px; }
  .callout h3 { font-size:16px; margin:0 0 8px; color:#0b1220; }
  .callout p { margin:0; font-size:14.5px; color:#1f2937; }
  .researcher { background:#f7efe1; border:1px solid #ead7b3; border-radius:10px; padding:18px 20px; margin:6px 0 24px; }
  .researcher .label { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#b88a4a; font-weight:700; margin:0 0 8px; }
  .researcher .name { font-size:17px; font-weight:700; color:#0b1220; margin:0 0 3px; }
  .researcher .role { font-size:13px; color:#6b7280; margin:0 0 12px; }
  .researcher .why { font-size:14.5px; color:#1f2937; margin:0 0 12px; line-height:1.55; }
  .researcher .disclaimer { font-size:11.5px; color:#6b7280; font-style:italic; margin:0; line-height:1.5; }
  .daily { list-style:none; padding:0; margin:4px 0 24px; border-top:1px solid #f1f3f5; }
  .daily li { display:flex; gap:14px; padding:12px 0; border-bottom:1px solid #f1f3f5; font-size:14.5px; color:#1f2937; }
  .daily li .num { color:#94a3b8; font-weight:700; font-size:12.5px; flex-shrink:0; width:28px; }
  .steps { width:100%; border-collapse:collapse; margin:4px 0 24px; font-size:14.5px; }
  .steps th, .steps td { text-align:left; padding:12px 14px; border-bottom:1px solid #f1f3f5; vertical-align:top; }
  .steps thead th { background:#fafafa; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:#6b7280; font-weight:700; border-bottom:1px solid #e5e7eb; }
  .steps td.n { width:56px; text-align:center; color:#b88a4a; font-weight:700; font-size:13px; }
  .steps td.title { font-weight:600; color:#0b1220; width:32%; }
  .steps td.desc { color:#1f2937; }
  .upsell { background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:20px 22px; margin:6px 0 22px; }
  .upsell .label { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#6b7280; font-weight:700; margin:0 0 6px; }
  .upsell h3 { font-size:16px; margin:0 0 10px; color:#0b1220; }
  .upsell p { font-size:14.5px; color:#1f2937; margin:0 0 14px; }
  .upsell .meta { font-size:12.5px; color:#6b7280; margin:0 0 14px; }
  .btn-wa { display:inline-block; background:#25d366; color:#fff !important; text-decoration:none; font-weight:700; font-size:14px; padding:11px 18px; border-radius:8px; }
  .cta { background:#0b1220; color:#fff; border-radius:12px; padding:26px 24px; margin:6px 0 26px; }
  .cta .label { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#b88a4a; font-weight:700; margin:0 0 8px; }
  .cta h3 { font-size:18px; margin:0 0 6px; color:#fff; line-height:1.3; }
  .cta p { font-size:13.5px; color:#cbd5e1; margin:0 0 16px; }
  .btn-primary { display:inline-block; background:#b88a4a; color:#0b1220 !important; text-decoration:none; font-weight:700; font-size:14.5px; padding:12px 20px; border-radius:8px; }
  .signature { margin:8px 0 0; padding-top:18px; border-top:1px solid #f1f3f5; }
  .signature p { margin:0 0 12px; font-size:14.5px; color:#1f2937; }
  .signature .sign-name { font-weight:700; color:#0b1220; margin:0 0 2px; font-size:15px; }
  .signature .sign-role { font-size:12.5px; color:#6b7280; margin:0; }
  .footer { padding:18px 32px 24px; background:#fafafa; color:#6b7280; font-size:11.5px; text-align:center; line-height:1.6; border-top:1px solid #f1f3f5; }
  .footer a { color:#6b7280; }
  @media (max-width:560px) {
    .hero { padding:24px 20px 20px; }
    .hero h1 { font-size:23px; }
    .body { padding:20px 20px 26px; }
    .footer { padding:18px 20px 22px; }
    .steps th:nth-child(3), .steps td.desc { display:none; }
  }
</style>
</head>
<body>
<div class="preheader">${escapeHtml(c.preheader)}</div>
<div class="container">
  <div class="email">
    <div class="hero">
      <p class="kicker">${escapeHtml(c.ctKicker)}</p>
      <h1>${escapeHtml(c.heroTitle)}</h1>
      <p class="subtitle">${escapeHtml(c.popPercent)} · ${escapeHtml(c.oneLiner)}</p>
    </div>
    <div class="body">
      <p class="lead">"${escapeHtml(c.lead)}"</p>
      <p>${escapeHtml(c.intro)}</p>
      <div class="callout">
        <p class="label">A ciência</p>
        <h3>${escapeHtml(c.scienceTitle)}</h3>
        <p>${escapeHtml(c.scienceBody)}</p>
      </div>
      <p>${escapeHtml(c.scienceFollowup)}</p>
      <div class="researcher">
        <p class="label">Pesquisador de referência</p>
        <p class="name">${escapeHtml(c.researcher.name)}</p>
        <p class="role">${escapeHtml(c.researcher.role)} · ${escapeHtml(c.researcher.affiliation)}</p>
        <p class="why">${escapeHtml(c.researcher.why)}</p>
        <p class="disclaimer">Citação para fins didáticos. Atribuição de autoria pública (nome, cargo, instituição). Sem reprodução de obras protegidas.</p>
      </div>
      <h2 class="section">No dia-a-dia</h2>
      <ul class="daily">${dailyLis}</ul>
      <h2 class="section">3 passos do programa pensados para o seu perfil</h2>
      <table class="steps">
        <thead><tr><th>Passo</th><th>Título</th><th>O que cobre</th></tr></thead>
        <tbody>${stepsRows}</tbody>
      </table>
      <div class="upsell">
        <p class="label">${escapeHtml(c.upsellTitle)}</p>
        <h3>Quer pular a auto-implementação?</h3>
        <p>${c.upsellBody}</p>
        <p class="meta">Atendimento com José Nilton · agendamento direto pelo WhatsApp.</p>
        <a class="btn-wa" href="${c.sonoPlusWa}">Falar no WhatsApp sobre o Sono+</a>
      </div>
      <div class="cta">
        <p class="label">Caminho recomendado</p>
        <h3>Programa completo · 21 passos pensados para o ${escapeHtml(c.name)}</h3>
        <p>Pagamento único · sem mensalidade · sem renovação automática · acesso vitalício.</p>
        <a class="btn-primary" href="${c.ctaUrl}">Acessar o programa — R$ 147 →</a>
      </div>
      <div class="signature">
        <p>${escapeHtml(c.closing)}</p>
        <p class="sign-name">José Nilton</p>
        <p class="sign-role">Fundador do GoZzzz · suporte@gozzzz.app</p>
      </div>
    </div>
    <div class="footer">
      GoZzzz · São Paulo, BR · Em conformidade com a LGPD: dados usados apenas para entrega do relatório.<br>
      <a href="mailto:unsubscribe@support.gozzzz.app?subject=unsubscribe">Cancelar inscrição</a>
    </div>
  </div>
</div>
</body>
</html>`;
}

export interface BuiltEmail {
  subject: string;
  preheader: string;
  html: string;
  text: string;
}

export function buildEmail(
  chronotype: Chronotype,
  language: Language = "pt",
): BuiltEmail {
  // Hoje só pt está completo — en cai em pt para não bloquear UX.
  // Quando o template em inglês existir, adicionar CONTENT_EN e ramificar aqui.
  void language;
  const c = CONTENT_PT[chronotype];
  const accent = ACCENT[chronotype];
  const html = renderHtml(c, accent);
  const text = buildPlainText(c);
  return { subject: c.subject, preheader: c.preheader, html, text };
}

function buildPlainText(c: ChronotypeContent): string {
  const lines: string[] = [];
  lines.push(c.heroTitle);
  lines.push(`${c.popPercent} · ${c.oneLiner}`);
  lines.push("");
  lines.push(`"${c.lead}"`);
  lines.push("");
  lines.push(c.intro);
  lines.push("");
  lines.push(`> ${c.scienceTitle}`);
  lines.push(c.scienceBody);
  lines.push("");
  lines.push(c.scienceFollowup);
  lines.push("");
  lines.push("Pesquisador de referência:");
  lines.push(c.researcher.name);
  lines.push(`${c.researcher.role} · ${c.researcher.affiliation}`);
  lines.push(c.researcher.why);
  lines.push("");
  lines.push("No dia-a-dia:");
  c.daily.forEach((d, i) => {
    lines.push(`${String(i + 1).padStart(2, "0")}. ${d}`);
  });
  lines.push("");
  lines.push("3 passos do programa pensados para o seu perfil:");
  c.steps.forEach((s) => {
    lines.push(`Passo ${s.n} — ${s.title}`);
    lines.push(`  ${s.desc}`);
  });
  lines.push("");
  lines.push(`${c.upsellTitle}`);
  lines.push(c.upsellBody.replace(/<[^>]+>/g, ""));
  lines.push(`Falar no WhatsApp: ${c.sonoPlusWa}`);
  lines.push("");
  lines.push(`Acessar o programa — R$ 147: ${c.ctaUrl}`);
  lines.push("");
  lines.push(c.closing);
  lines.push("");
  lines.push("José Nilton");
  lines.push("Fundador do GoZzzz · suporte@gozzzz.app");
  lines.push("");
  lines.push(
    "Cancelar inscrição: mailto:unsubscribe@support.gozzzz.app?subject=unsubscribe",
  );
  return lines.join("\n");
}

export const TEST_HARNESS = { CONTENT_PT, ACCENT };
