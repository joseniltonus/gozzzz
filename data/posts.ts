/**
 * Blog data — single source of truth pra /blog/* e geração de sitemap.
 *
 * Cada post é puro TypeScript (sem markdown) pra evitar dependência extra
 * em RN-Web e manter type-safety. Conteúdo renderizado por blocos
 * estruturados (BlogBlock).
 *
 * Diretrizes de conteúdo deste arquivo:
 * - PT-BR sempre (mercado-alvo).
 * - Citação de pesquisadores: nome + cargo + instituição + artigo/conceito
 *   publicado, padrão "fundamentado em" — sem afiliação implícita.
 * - YMYL (saúde): toda recomendação prática vem com disclaimer educativo.
 * - Cada post: 600-900 palavras, 1 mecanismo fisiológico claro, 1-2 ações
 *   concretas, CTA suave pro programa.
 */

export type BlogCategoryId =
  | 'sintomas'
  | 'cronotipo'
  | 'habitos'
  | 'mitos'
  | 'otimizacao'
  | 'educacao'
  | 'tecnica';

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; tone: 'info' | 'warning' | 'tip'; text: string }
  | { type: 'quote'; text: string; cite?: string };

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  category: BlogCategoryId;
  /** Emoji que vira "ilustração" no hero do artigo. */
  emoji: string;
  /** Resumo curto pro card no índice (~140-160 chars). */
  excerpt: string;
  /** Resposta direta nos primeiros 100-150 chars do post — bom pra featured snippets. */
  intro: string;
  body: BlogBlock[];
  faq: BlogFaqItem[];
  /** Links internos pros próximos passos (slugs do mesmo blog). */
  relatedSlugs: string[];
}

export const BLOG_CATEGORIES: Record<
  BlogCategoryId,
  { label: string; color: string; description: string }
> = {
  sintomas: { label: 'Sintomas', color: '#f59e0b', description: 'Quando algo não bate certo' },
  cronotipo: { label: 'Cronótipo', color: '#a78bfa', description: 'Seu relógio biológico' },
  habitos: { label: 'Hábitos', color: '#10b981', description: 'Pequenas mudanças que importam' },
  mitos: { label: 'Mitos', color: '#ef4444', description: 'Crenças populares revistas' },
  otimizacao: { label: 'Otimização', color: '#7c5ce8', description: 'Ajustes finos' },
  educacao: { label: 'Educação', color: '#4a9eff', description: 'A ciência explica' },
  tecnica: { label: 'Técnica', color: '#22d3ee', description: 'Métodos práticos' },
};

export const BLOG_AUTHOR = {
  name: 'Equipe GoZzzz',
  role: 'Conteúdo educativo — neurociência do sono',
};

// ─────────────────────────────────────────────────────────────────────────
// POSTS
// ─────────────────────────────────────────────────────────────────────────

export const BLOG_POSTS: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'dormir-8-horas-acordar-cansado',
    title: 'Você dorme 8 horas mas acorda cansado? A ciência explica o porquê',
    metaDescription:
      'Acordar cansado mesmo dormindo 8 horas tem causa: a arquitetura do seu sono. Entenda os 4 estágios e o que pode estar fragmentando o seu descanso.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 4,
    category: 'sintomas',
    emoji: '😴',
    excerpt:
      'Dormir muito não é dormir bem. O que decide se você acorda descansado é a arquitetura dos ciclos — não o relógio.',
    intro:
      'Acordar cansado depois de 8 horas na cama é mais comum do que parece — e quase sempre tem a mesma raiz: a sua arquitetura de sono está fragmentada. Quantidade não substitui qualidade.',
    body: [
      { type: 'h2', text: 'O sono é uma sequência, não um interruptor' },
      {
        type: 'p',
        text: 'O cérebro não dorme do mesmo jeito a noite inteira. Em cada ciclo de aproximadamente 90 minutos, ele atravessa quatro estágios distintos — N1 (transição), N2 (sono leve), N3 (sono profundo) e REM (movimento rápido dos olhos). Numa noite saudável, esse ciclo se repete de 4 a 6 vezes.',
      },
      {
        type: 'p',
        text: 'Cada estágio cumpre uma função: N3 é onde o corpo libera hormônio do crescimento e sustenta processos de recuperação física. REM é onde a memória emocional se consolida e a criatividade se reorganiza. Quando algum desses estágios é encurtado ou interrompido, você pode dormir 8 horas e ainda assim acordar como se tivesse dormido 4.',
      },
      { type: 'h2', text: 'Os 3 sabotadores mais comuns das suas 8 horas' },
      {
        type: 'p',
        text: 'A literatura aponta consistentemente três fatores que cortam estágios reparadores sem você perceber:',
      },
      {
        type: 'ol',
        items: [
          'Álcool antes de dormir — facilita o adormecer, mas reduz REM e fragmenta o sono na segunda metade da noite.',
          'Quarto quente — a temperatura corporal precisa cair cerca de 1 °C para o sono profundo se estabelecer; ambientes acima de 24-25 °C dificultam essa queda.',
          'Cafeína tarde — a meia-vida da cafeína é de 5 a 6 horas em média. Um café às 16h ainda está bloqueando receptores de adenosina à meia-noite.',
        ],
      },
      { type: 'h2', text: 'O outro fator que ninguém comenta: o cronótipo' },
      {
        type: 'p',
        text: 'O psicólogo do sono Michael J. Breus, PhD, popularizou a ideia de quatro cronótipos (Leão, Urso, Lobo e Golfinho) como modelo educativo do seu relógio biológico individual. Quem é Lobo (preferência tardia) tentando acordar às 6h vai cortar REM — que se concentra mais na segunda metade da noite. Resultado: 8 horas que não restauram emocionalmente.',
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Se você acorda fisicamente recuperado mas mentalmente nublado, costuma ser falta de REM. Se acorda dolorido, costuma ser falta de N3.',
      },
      { type: 'h2', text: 'O que fazer já hoje' },
      {
        type: 'ul',
        items: [
          'Mantenha o mesmo horário de acordar todos os dias — inclusive no fim de semana. A consistência sincroniza os ciclos.',
          'Reduza a temperatura do quarto pra 18-21 °C (literatura de Walker e Czeisler).',
          'Última cafeína 8 horas antes de dormir.',
        ],
      },
    ],
    faq: [
      {
        question: 'Dormir 9 ou 10 horas resolve o cansaço?',
        answer:
          'Quase nunca. Se a arquitetura está fragmentada, mais tempo na cama só multiplica o problema. O alvo é melhorar a qualidade dos ciclos — não esticar o total.',
      },
      {
        question: 'Cochilo no meio do dia atrapalha o sono da noite?',
        answer:
          'Cochilos curtos (15-20 min) antes das 15h costumam ajudar. Sonecas longas ou tardias diminuem a pressão de sono e atrapalham o adormecer.',
      },
      {
        question: 'Quanto tempo demora pra notar diferença?',
        answer:
          'Mudanças simples (temperatura, cafeína, horário fixo) começam a mostrar efeito em 7-10 dias. Recuperação real de dívida de sono crônica leva semanas.',
      },
    ],
    relatedSlugs: [
      'cronotipo-forcar-acordar-cedo',
      'sono-profundo-rem-diferenca',
      'cafeina-quanto-tempo-antes-de-dormir',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'cronotipo-forcar-acordar-cedo',
    title: 'Cronótipo: por que forçar acordar cedo pode estar sabotando seu sono',
    metaDescription:
      'Cronótipo tem base genética, não disciplina. Entenda os 4 perfis (Leão, Urso, Lobo, Golfinho) e por que ir contra o seu pode prejudicar mais do que ajudar.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 4,
    category: 'cronotipo',
    emoji: '🦁',
    excerpt:
      'O 5AM Club não é universal. Cronótipo tardio não é preguiça — é biologia. Entenda quando ir contra ela vira sabotagem.',
    intro:
      'Acordar às 5 da manhã é virtude pra alguns e tortura pra outros — e isso não tem nada a ver com força de vontade. O cronótipo é em grande parte genético; ignorá-lo costuma cobrar caro.',
    body: [
      { type: 'h2', text: 'O que é cronótipo, em uma frase' },
      {
        type: 'p',
        text: 'Cronótipo é a sua preferência biológica inata para dormir e acordar em determinados horários. Estudos com gêmeos sugerem componente genético substancial — não é hábito puro, e tampouco é fixo pra vida toda (muda com idade).',
      },
      { type: 'h2', text: 'Os 4 cronótipos no modelo de Breus' },
      {
        type: 'p',
        text: 'O modelo simplificado de quatro arquétipos foi popularizado pelo psicólogo do sono Michael J. Breus, PhD, especialista em cronobiologia clínica. As percentagens populacionais a seguir são ilustrações didáticas, não consenso epidemiológico:',
      },
      {
        type: 'ul',
        items: [
          'Leão (~15%): acorda cedo naturalmente, pico de energia pela manhã, cansa cedo à noite.',
          'Urso (~50%): segue o ciclo solar — acorda com o nascer do sol, performa bem no meio do dia, dorme após o pôr do sol.',
          'Lobo (~15%): preferência tardia genuína — pico cognitivo no fim da tarde e à noite, dificuldade real de acordar antes das 8h.',
          'Golfinho (~10%): sono mais leve e fragmentado, frequentemente associado a alta vigilância cognitiva.',
        ],
      },
      { type: 'h2', text: 'O que acontece quando você força contra o seu cronótipo' },
      {
        type: 'p',
        text: 'O fenômeno se chama "jet lag social" — viver num horário diferente do que sua biologia preferiria. Estudos populacionais associam jet lag social crônico a piora de humor, prejuízo cognitivo e marcadores metabólicos desfavoráveis. Não é casual: a parte da noite que você corta ao "acordar cedo demais" é justamente onde o REM se concentra.',
      },
      {
        type: 'callout',
        tone: 'warning',
        text: 'Lobos forçando rotina de Leão tendem a cortar REM. Leões forçando rotina de Lobo tendem a cortar N3 inicial. Em ambos os casos, perde-se um pedaço estrutural do sono.',
      },
      { type: 'h2', text: 'Como saber qual é o seu' },
      {
        type: 'p',
        text: 'Três sinais práticos: (1) sem alarme por 3-4 dias seguidos, em que horário você acorda naturalmente? (2) em que parte do dia você sente o pico cognitivo claro? (3) à noite, em que ponto vem a primeira "onda" real de sonolência? As respostas costumam compor o seu perfil.',
      },
      { type: 'h2', text: 'Posso mudar o meu cronótipo?' },
      {
        type: 'p',
        text: 'Marginalmente. Luz solar matinal e horários consistentes empurram o cronótipo na direção mais cedo. Mas a base genética não desaparece — você não transforma um Lobo em Leão, só ajusta a curva.',
      },
    ],
    faq: [
      {
        question: 'Cronótipo muda com a idade?',
        answer:
          'Sim. Adolescentes tendem a horários mais tardios; pessoas mais velhas costumam acordar mais cedo. A mudança é gradual e individual.',
      },
      {
        question: 'Trabalho começa às 7h e meu cronótipo é Lobo. O que faço?',
        answer:
          'Foque em três coisas: dormir mais cedo (luz solar matinal forte ajuda a adiantar), proteger a janela de sono dos sabotadores (álcool, telas, calor) e usar o pico cognitivo natural do fim da tarde para tarefas que exijam foco.',
      },
      {
        question: 'O 5AM Club é mentira?',
        answer:
          'Não é mentira — funciona pra Leões e parte dos Ursos. Pra Lobos, é uma receita de fadiga crônica. A regra "todo mundo deveria acordar às 5" ignora variabilidade biológica real.',
      },
    ],
    relatedSlugs: [
      'dormir-8-horas-acordar-cansado',
      'luz-solar-manha-10-minutos',
      'acordar-3-da-manha',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'luz-celular-22h-cerebro',
    title: 'O que a luz do celular faz com o seu cérebro às 22h (e como reverter)',
    metaDescription:
      'Luz forte à noite suprime melatonina e atrasa o seu relógio biológico. Entenda o mecanismo e veja 3 ações práticas com horário e fundamento.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 4,
    category: 'habitos',
    emoji: '📱',
    excerpt:
      'Não é "luz azul" só. É a intensidade da luz noturna chegando na retina e dizendo ao seu cérebro que ainda é dia.',
    intro:
      'Quando você abre o celular às 22h, o cérebro recebe um sinal claro: ainda é dia. A consequência é uma cascata fisiológica que pode roubar duas horas do início do seu sono — e não, não é só "luz azul".',
    body: [
      { type: 'h2', text: 'O cérebro mede luz, não tempo' },
      {
        type: 'p',
        text: 'No fundo do olho existem células fotorreceptoras chamadas ipRGC (células ganglionares retinais intrinsecamente fotossensíveis). Elas não enxergam imagem; só medem intensidade luminosa e mandam um sinal direto ao núcleo supraquiasmático (NSQ) — o relógio mestre do cérebro.',
      },
      {
        type: 'p',
        text: 'O conceito ganhou destaque público nos materiais educativos de Andrew Huberman, PhD, professor de neurobiologia em Stanford, e na medicina do sono de Charles Czeisler, MD, PhD, em Harvard. Quando ipRGC detecta luz forte tarde da noite, o NSQ reage como se ainda fosse dia.',
      },
      { type: 'h2', text: 'O efeito prático em 30 minutos de tela às 22h' },
      {
        type: 'p',
        text: 'Estudos com luz brilhante à noite mostram supressão significativa de melatonina e atraso do início subjetivo de sono. O efeito varia entre pessoas, mas a direção é consistente: noites de uso intenso de tela costumam vir acompanhadas de adormecer mais tarde e sono mais fragmentado.',
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'Não é só comprimento de onda azul. Luz branca brilhante de qualquer cor, em alta intensidade, ativa as ipRGC. O filtro "modo noite" amarelado ajuda, mas não resolve sozinho — a intensidade é o vetor principal.',
      },
      { type: 'h2', text: '3 ações com horário e fundamento' },
      {
        type: 'ol',
        items: [
          '21h — diminuir o brilho do celular ao mínimo legível (não é o filtro de cor, é o brilho). Reduz drasticamente a quantidade de fótons na retina.',
          '21h30 — trocar a iluminação principal do ambiente por uma luz indireta e quente (abajur, fita LED âmbar). Teto aceso à noite é o que mais ativa ipRGC.',
          '22h em diante — uso de telas sentado a uma distância maior. Distância dobrada = quarto da intensidade luminosa percebida (lei do inverso do quadrado).',
        ],
      },
      { type: 'h2', text: 'O que esperar' },
      {
        type: 'p',
        text: 'A maioria das pessoas que reduz exposição luminosa à noite percebe diferença em 5-7 dias: adormecer mais rápido e despertares noturnos menos frequentes. Não é mágica — é o relógio biológico voltando a receber o sinal correto.',
      },
    ],
    faq: [
      {
        question: 'Óculos de bloqueio de luz azul resolvem?',
        answer:
          'Reduzem parcialmente. Bloqueiam só o componente azul, não a intensidade total. Brilho baixo e iluminação ambiente quente costumam ter mais impacto prático.',
      },
      {
        question: 'Posso ler em tablet com modo noite ativado?',
        answer:
          'Em tablet com brilho mínimo e tom quente, o impacto cai bastante — mas tela ainda é mais luminosa que livro físico iluminado por luz indireta. Se o sono está difícil, o livro vence.',
      },
      {
        question: 'TV à noite tem o mesmo efeito?',
        answer:
          'Depende da distância e do brilho. TV a 3 metros tem intensidade luminosa muito menor na retina do que celular a 30 cm. Mais leve, mas não neutro.',
      },
    ],
    relatedSlugs: [
      'luz-solar-manha-10-minutos',
      'temperatura-quarto-dormir',
      'nao-consigo-desligar-mente-noite',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'divida-de-sono-fim-de-semana',
    title: 'Dívida de sono: o que acontece quando você "recupera" no fim de semana',
    metaDescription:
      'Dormir 11 horas no sábado não paga a dívida acumulada na semana. Entenda por que, e o que de fato funciona pra recuperar sono perdido.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 4,
    category: 'mitos',
    emoji: '📉',
    excerpt:
      'Dormir até tarde sábado e domingo mascara o cansaço — não paga a dívida. E pode até atrasar mais o seu relógio biológico.',
    intro:
      'A ideia de que dá pra "compensar" sono perdido na semana com noites longas no fim de semana é parcialmente verdade — e parcialmente um problema. A literatura aponta que o que parece reposição costuma piorar a sincronia do relógio biológico.',
    body: [
      { type: 'h2', text: 'O que é, biologicamente, "dívida de sono"' },
      {
        type: 'p',
        text: 'Durante o dia acordado, uma molécula chamada adenosina vai se acumulando no cérebro. É ela que produz a sensação de pressão de sono. Dormir reduz adenosina; ficar acordado a aumenta. Quando você dorme menos do que o necessário por vários dias, a adenosina não é totalmente "limpa" — daí o termo dívida.',
      },
      {
        type: 'p',
        text: 'Estudos de restrição de sono em laboratório (4-6 horas por noite, várias noites) mostram prejuízo cognitivo cumulativo. O efeito é real e mensurável.',
      },
      { type: 'h2', text: 'Por que dormir 12h no sábado não resolve' },
      {
        type: 'p',
        text: 'Duas razões. Primeira: o sono extra cobre parte da pressão de adenosina, mas não substitui semanas de sono curto em termos de consolidação de memória, recuperação imunológica e ajuste hormonal. Estudos sugerem que recuperação completa demora semanas, não um fim de semana.',
      },
      {
        type: 'p',
        text: 'Segunda: dormir até as 11h no domingo desloca o seu relógio biológico — você acaba dormindo mais tarde domingo à noite e começa a semana com um mini-jet-lag autoinfligido. O cronobiólogo Till Roenneberg cunhou o termo "jet lag social" pra esse fenômeno.',
      },
      {
        type: 'callout',
        tone: 'warning',
        text: 'Diferenças de mais de 1 hora entre o horário de acordar dos dias de semana e do fim de semana já são suficientes pra desorganizar o ritmo circadiano em parte significativa das pessoas.',
      },
      { type: 'h2', text: 'O que de fato funciona pra recuperar' },
      {
        type: 'ul',
        items: [
          'Manter o mesmo horário de acordar todos os dias (variação máxima de 30-45 min) — protege o relógio e ainda permite cochilo curto à tarde se houver dívida.',
          'Adicionar 30-60 min de sono pelo lado da noite (deitar mais cedo), não pelo lado da manhã (acordar mais tarde) — preserva a luz solar matinal sincronizadora.',
          'Cochilo curto (20 min) entre 13h e 15h alivia pressão de adenosina sem comprometer a noite.',
          'Aceitar que o pagamento real é gradual: se a dívida foi de meses, recuperação leva semanas de sono regular — não 2 dias.',
        ],
      },
    ],
    faq: [
      {
        question: 'Então é melhor não dormir mais no fim de semana?',
        answer:
          'Não — é melhor dormir mais sem deslocar o horário. 30-60 min a mais, deitando mais cedo, é mais útil que 3 horas a mais, acordando ao meio-dia.',
      },
      {
        question: 'Qual a diferença entre dívida de sono e insônia?',
        answer:
          'Dívida é não dormir o suficiente quando se tem oportunidade. Insônia é não conseguir dormir mesmo tendo oportunidade. Estratégias de tratamento são diferentes.',
      },
      {
        question: 'Quanto tempo demora pra recuperar 2 meses de noites curtas?',
        answer:
          'Estudos sugerem várias semanas de sono regular e suficiente. Não há fórmula exata — depende do quão profunda foi a privação e do estado de saúde individual.',
      },
    ],
    relatedSlugs: [
      'dormir-8-horas-acordar-cansado',
      'cafeina-quanto-tempo-antes-de-dormir',
      'sono-profundo-rem-diferenca',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'acordar-3-da-manha',
    title: 'Por que você acorda às 3h da manhã (e o que o seu corpo está dizendo)',
    metaDescription:
      'Despertar de madrugada não é coincidência. Veja as 4 causas fisiológicas mais comuns — cortisol, glicose, álcool e fragmentação de REM.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 4,
    category: 'sintomas',
    emoji: '🌑',
    excerpt:
      'Acordar às 3h não é aleatório. É o ponto onde quatro processos fisiológicos se encontram — e qualquer um pode estar fora de calibre.',
    intro:
      'Se você acorda quase sempre por volta das 3h da manhã, não é coincidência. Esse horário é onde quatro processos fisiológicos se cruzam — e é provável que pelo menos um esteja fora do esperado.',
    body: [
      { type: 'h2', text: 'A meia-noite biológica nem sempre é meia-noite no relógio' },
      {
        type: 'p',
        text: 'Por volta de 3-4 horas após adormecer, o corpo passa por uma transição: a parte da noite rica em sono profundo (N3) começa a ceder espaço pra noites de REM mais longas. É também o momento de menor temperatura corporal e queda de glicose. Qualquer perturbação nesse ponto tende a virar despertar consciente.',
      },
      { type: 'h2', text: 'As 4 causas mais comuns' },
      { type: 'h3', text: '1. Pico de cortisol antecipado' },
      {
        type: 'p',
        text: 'O cortisol normalmente sobe nas duas horas antes do acordar — é o "alarme" hormonal natural. Em pessoas sob estresse crônico, esse pico pode antecipar pra 3h, despertando o sono já prematuramente.',
      },
      { type: 'h3', text: '2. Queda de glicose' },
      {
        type: 'p',
        text: 'Jantares pobres em proteína, ou consumo de carboidratos rápidos perto da hora de dormir, podem causar oscilação glicêmica que culmina em hipoglicemia leve no meio da noite. O corpo libera adrenalina pra corrigir — e isso desperta.',
      },
      { type: 'h3', text: '3. Álcool processando' },
      {
        type: 'p',
        text: 'Álcool ajuda a adormecer e atrapalha o restante. A meia-vida hepática do etanol e seus metabólitos coincide aproximadamente com 3-4h após uma dose moderada — momento em que o sono REM tenta retornar e é fragmentado pelo metabolismo do álcool.',
      },
      { type: 'h3', text: '4. Fragmentação de REM' },
      {
        type: 'p',
        text: 'REM se concentra na segunda metade da noite. Em pessoas com privação crônica ou apneia, essa fase é interrompida com mais frequência — e muitos despertares "do nada" são na verdade microdespertares de REM mal consolidado.',
      },
      { type: 'h2', text: 'Sinais de alerta clínico' },
      {
        type: 'callout',
        tone: 'warning',
        text: 'Despertar com falta de ar, ronco intenso relatado pelo parceiro, sonolência diurna persistente ou fadiga matinal severa são indicativos de avaliação médica — apneia do sono é mais comum do que se pensa e exige diagnóstico clínico.',
      },
      { type: 'h2', text: 'O que tentar primeiro' },
      {
        type: 'ul',
        items: [
          'Jantar com proteína e gordura saudável; evitar carboidratos refinados nas 2h antes de dormir.',
          'Última dose de álcool 4-5h antes de deitar (idealmente reduzir).',
          'Quarto resfriado e escuro — facilita atravessar a janela das 3h sem despertar.',
          'Avaliação médica se o padrão se mantém por mais de 4 semanas mesmo com ajustes.',
        ],
      },
    ],
    faq: [
      {
        question: 'É normal acordar uma vez à noite?',
        answer:
          'Sim. Despertar breve entre ciclos é fisiológico — a maioria das pessoas faz e nem lembra de manhã. O problema é não conseguir voltar a dormir ou acordar no mesmo horário todas as noites.',
      },
      {
        question: 'Posso usar melatonina pra voltar a dormir?',
        answer:
          'Melatonina não é hipnótico — não te faz dormir. Ela sinaliza ao corpo que é noite. Tomar às 3h costuma não ajudar e pode atrapalhar o despertar de manhã. Consulte um médico antes de usar regularmente.',
      },
      {
        question: 'Por que acordo aos 3h só em dias estressantes?',
        answer:
          'Provavelmente cortisol. Pessoas com eixo HPA reativo têm picos antecipados em períodos de estresse. Trabalhar a regulação noturna (luz, respiração, jantar) ajuda — e em casos persistentes, terapia comportamental cognitiva específica para insônia (TCC-I) tem evidência sólida.',
      },
    ],
    relatedSlugs: [
      'nao-consigo-desligar-mente-noite',
      'dormir-8-horas-acordar-cansado',
      'temperatura-quarto-dormir',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'luz-solar-manha-10-minutos',
    title: 'Luz solar de manhã: o hábito de 10 minutos que reorganiza o seu sono',
    metaDescription:
      'Exposição à luz solar nos primeiros 30 min após acordar calibra o relógio biológico e melhora o sono da noite seguinte. Entenda por quê.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 4,
    category: 'habitos',
    emoji: '🌅',
    excerpt:
      'O hábito mais bem documentado pra melhorar sono noturno acontece pela manhã. 10 minutos de luz solar fazem mais que aplicativo nenhum.',
    intro:
      'Se eu pudesse recomendar uma única mudança pra melhorar sono, seria 10 minutos de luz solar nos primeiros 30 minutos depois de acordar. O fundamento é sólido: o seu sono da noite começa a ser construído de manhã.',
    body: [
      { type: 'h2', text: 'O cérebro precisa receber o sinal de "manhã"' },
      {
        type: 'p',
        text: 'Andrew Huberman, PhD, professor de neurobiologia em Stanford, popularizou na comunicação científica a importância da luz solar matinal direta na ativação do eixo cortisol-circadiano. Quando as células ipRGC da retina recebem luz solar de alta intensidade pela manhã, elas disparam um sinal robusto pro núcleo supraquiasmático.',
      },
      {
        type: 'p',
        text: 'Esse sinal cumpre três funções simultâneas: marca o "início do dia" no relógio biológico, dispara o pico saudável de cortisol matinal (que dá energia) e — o ponto mais surpreendente — programa a liberação de melatonina pra cerca de 14-16 horas depois.',
      },
      { type: 'h2', text: 'O sono da noite começa de manhã' },
      {
        type: 'p',
        text: 'Em outras palavras: a sua hora de dormir natural é determinada pela primeira luz forte do seu dia. Se a primeira luz é o teto do banheiro às 7h, sua melatonina vai querer subir lá pelas 21-22h. Se a primeira luz é tela de celular num quarto escuro, o sinal é confuso e a melatonina pode atrasar.',
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Não precisa olhar pro sol — só precisa estar exposto à luz solar a céu aberto. Janela com vidro reduz significativamente a intensidade que chega à retina.',
      },
      { type: 'h2', text: 'Protocolo prático' },
      {
        type: 'ol',
        items: [
          'Nos primeiros 30 minutos após acordar, saia ao ar livre por 10 minutos.',
          'Se o céu está aberto, 5-10 minutos é suficiente. Se nublado, 15-20 minutos. Se chuvoso, ainda funciona — só precisa de mais tempo.',
          'Sem óculos escuros nesse intervalo (óculos de grau e lentes de contato comuns são ok).',
          'Se for impossível sair, abra a janela e fique perto dela. É inferior, mas é melhor que nada.',
        ],
      },
      { type: 'h2', text: 'O que esperar' },
      {
        type: 'p',
        text: 'A maioria das pessoas que adota esse hábito por 2-3 semanas relata adormecer mais facilmente e acordar mais alerta. Não substitui higiene do sono noturna — é parte do mesmo sistema.',
      },
    ],
    faq: [
      {
        question: 'Funciona se eu acordo antes do sol nascer?',
        answer:
          'Em parte. Use luz artificial brilhante pelo menos durante o intervalo até amanhecer; assim que houver luz natural, expor-se. Lâmpadas de fototerapia (10.000 lux) são uma alternativa documentada.',
      },
      {
        question: 'E se eu trabalho à noite?',
        answer:
          'Trabalho noturno é caso particular — exposição luminosa precisa ser invertida com cuidado e idealmente com orientação profissional. A receita "luz forte ao acordar" continua válida, só se desloca pro seu período subjetivo de manhã.',
      },
      {
        question: 'Tomar café no sol é melhor que dentro de casa?',
        answer:
          'Sim, na prática combina dois efeitos: a luz reorganiza o relógio e a movimentação leve eleva temperatura corporal — ambos sinalizadores de "estamos no início do dia".',
      },
    ],
    relatedSlugs: [
      'cronotipo-forcar-acordar-cedo',
      'luz-celular-22h-cerebro',
      'cafeina-quanto-tempo-antes-de-dormir',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'temperatura-quarto-dormir',
    title: 'Temperatura do quarto e sono: o número que a maioria ignora',
    metaDescription:
      'A temperatura corporal precisa cair cerca de 1°C pro sono profundo se estabelecer. Veja a faixa ideal e como ajustar mesmo sem ar condicionado.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 3,
    category: 'otimizacao',
    emoji: '🌡️',
    excerpt:
      'O corpo precisa esfriar pra dormir profundo. Quarto quente sabota a noite mais do que muito hábito tido como vilão.',
    intro:
      'A queda de temperatura corporal é gatilho fisiológico do sono profundo. Quartos quentes mantêm a temperatura central elevada — e o resultado direto é noite fragmentada e madrugada cansada.',
    body: [
      { type: 'h2', text: 'Por que o corpo precisa esfriar pra dormir' },
      {
        type: 'p',
        text: 'A temperatura corporal central segue um ritmo circadiano: sobe ao acordar, atinge pico no início da tarde, e cai à noite. A queda noturna não é coincidência — ela é um dos sinais para o cérebro entrar em sono profundo (N3). Pesquisas com Charles Czeisler, MD, PhD, em Harvard, e Matthew Walker, PhD, em Berkeley, descrevem essa relação como uma das mais robustas da medicina do sono.',
      },
      { type: 'h2', text: 'A faixa que a literatura aponta' },
      {
        type: 'p',
        text: 'A maior parte da literatura sugere temperatura ambiente entre 16 e 20 °C como faixa ideal pra adultos dormirem. Acima de 24 °C, a queda da temperatura central fica dificultada — e o sono profundo costuma ser cortado.',
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'No Brasil, com noites quentes e nem sempre ar condicionado, o ajuste prático costuma ser mais difícil. As ações abaixo buscam o efeito (queda da temperatura central) sem depender só do termostato.',
      },
      { type: 'h2', text: 'Como ajustar mesmo sem ar condicionado' },
      {
        type: 'ul',
        items: [
          'Banho morno (não frio) 60-90 min antes de dormir — paradoxalmente acelera a perda de calor depois, ao dilatar vasos periféricos.',
          'Roupa de cama leve e respirável (algodão, linho).',
          'Ventilador apontado pra parede, criando circulação — não direto no corpo, que pode causar tensão muscular ou ressecar mucosas.',
          'Janela aberta na hora de dormir, mesmo que pequena — troca de ar abaixa percepção térmica.',
          'Pés pra fora do cobertor — extremidades dissipam calor.',
        ],
      },
      { type: 'h2', text: 'O que esperar' },
      {
        type: 'p',
        text: 'Quem ajusta a temperatura noturna tende a notar duas mudanças em 5-10 dias: adormecer mais rápido e dor menos frequente ao acordar. O sono profundo deixa marca física — quem dorme bem em N3 acorda com músculos restaurados, não dolorida.',
      },
    ],
    faq: [
      {
        question: 'Tomar banho frio antes de dormir ajuda?',
        answer:
          'Banho frio sobe temperatura central temporariamente (corpo reage produzindo calor). Pra preparar pro sono, banho morno funciona melhor — facilita a queda térmica que vem em seguida.',
      },
      {
        question: 'Dormir com meias é bom ou ruim?',
        answer:
          'Pra muitas pessoas, meias finas dilatam vasos dos pés e ajudam a dissipar calor central — o que facilita o sono. Pra outras, geram desconforto. Vale testar.',
      },
      {
        question: 'Em qual horário a temperatura deveria cair?',
        answer:
          'A queda começa naturalmente 1-2 horas antes do horário habitual de dormir. Por isso ambientes quentes nesse intervalo final da noite são especialmente prejudiciais.',
      },
    ],
    relatedSlugs: [
      'dormir-8-horas-acordar-cansado',
      'sono-profundo-rem-diferenca',
      'acordar-3-da-manha',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'cafeina-quanto-tempo-antes-de-dormir',
    title: 'Café: quanto tempo antes de dormir é seguro tomar?',
    metaDescription:
      'A meia-vida da cafeína é de 5-6h. Entenda por que o café das 16h ainda está agindo à meia-noite — e o limite prático pra cada pessoa.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 3,
    category: 'habitos',
    emoji: '☕',
    excerpt:
      'Cafeína bloqueia adenosina por horas. O último café tem que respeitar a meia-vida — e ela é maior do que parece.',
    intro:
      'Café à tarde parece inofensivo, mas a meia-vida da cafeína é de 5 a 6 horas em média. Um expresso às 16h ainda tem metade da dose ativa às 22h — e isso explica boa parte das noites mal dormidas atribuídas a "ansiedade".',
    body: [
      { type: 'h2', text: 'Como cafeína te mantém acordado' },
      {
        type: 'p',
        text: 'Durante o dia, adenosina vai se acumulando no cérebro e gera pressão de sono. Cafeína funciona ocupando os mesmos receptores que a adenosina ocuparia — sem disparar a sonolência. O resultado é mascarar o cansaço, não eliminá-lo.',
      },
      { type: 'h2', text: 'A matemática da meia-vida' },
      {
        type: 'p',
        text: 'Meia-vida é o tempo pra metade da dose ser metabolizada. Em adultos saudáveis, fica entre 5 e 6 horas. Concretamente:',
      },
      {
        type: 'ul',
        items: [
          'Café às 14h, dose total: 200 mg.',
          'Por volta das 20h: ainda há ~100 mg circulando.',
          'Por volta das 02h da madrugada: ainda há ~25-50 mg — o equivalente a meio expresso.',
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Regra prática conservadora: última dose de cafeína 8-10 horas antes de dormir. Pessoas sensíveis (metabolizadores lentos, geneticamente determinados) precisam de janela ainda maior.',
      },
      { type: 'h2', text: 'Genética muda tudo' },
      {
        type: 'p',
        text: 'O gene CYP1A2 codifica a enzima que metaboliza cafeína. Cerca de metade da população tem variantes "lentas" — pra essas pessoas, a meia-vida pode chegar a 8-9 horas. Se você dorme mal mesmo tomando café cedo, é boa pista de que pertence a esse grupo.',
      },
      { type: 'h2', text: 'O que isso muda na prática' },
      {
        type: 'ul',
        items: [
          'Última xícara antes das 14h pra a maioria das pessoas.',
          'Se duvidoso, fazer 2 semanas sem cafeína após 12h — e observar a diferença no sono.',
          'Refrigerantes, chás escuros e chocolate amargo também contam.',
        ],
      },
    ],
    faq: [
      {
        question: 'Café descafeinado tem cafeína?',
        answer:
          'Tem — em quantidade reduzida (geralmente 2-12 mg por xícara, contra 80-120 mg do tradicional). Pra metabolizadores lentos, ainda pode atrapalhar à noite.',
      },
      {
        question: 'Posso tomar café antes de cochilar de tarde?',
        answer:
          'Sim, é uma técnica chamada "coffee nap" — tomar café e cochilar 20 min em seguida. A cafeína começa a fazer efeito ao acordar. Funciona pra muita gente, mas só antes das 15h.',
      },
      {
        question: 'Café preto é melhor que com leite pro sono?',
        answer:
          'O leite atrasa um pouco a absorção, mas não muda a quantidade total de cafeína. Pro impacto no sono, o que importa é a dose total e o horário.',
      },
    ],
    relatedSlugs: [
      'dormir-8-horas-acordar-cansado',
      'divida-de-sono-fim-de-semana',
      'nao-consigo-desligar-mente-noite',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'sono-profundo-rem-diferenca',
    title: 'Sono profundo e REM: dois estágios, duas funções, dois tipos de cansaço',
    metaDescription:
      'Sono profundo (N3) restaura o corpo; REM consolida emoções e memória. Saiba como reconhecer a falta de cada um — e o que está cortando.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 4,
    category: 'educacao',
    emoji: '🧠',
    excerpt:
      'N3 e REM não são sinônimos. Cada um tem função própria — e a falta de um dá um tipo bem específico de cansaço.',
    intro:
      'Sono profundo e REM aparecem juntos no vocabulário, mas não cumprem a mesma função. Entender a diferença ajuda a ler o que o seu corpo está pedindo de manhã — e o que pode estar cortando cada um deles.',
    body: [
      { type: 'h2', text: 'Sono profundo (N3): a manutenção física' },
      {
        type: 'p',
        text: 'O N3 — também chamado de sono de ondas lentas — predomina nas primeiras horas da noite. É nele que o sistema glinfático parece participar da limpeza de metabólitos cerebrais (ainda em pesquisa em humanos), o hormônio do crescimento é liberado, e o tecido muscular se repara. Matthew Walker, PhD, em Berkeley, dedica boa parte do seu trabalho público à importância desse estágio.',
      },
      {
        type: 'p',
        text: 'Sinais de pouco N3: acordar dolorido, recuperação física lenta após exercício, sensação de "corpo pesado" no início do dia.',
      },
      { type: 'h2', text: 'REM: a manutenção emocional e cognitiva' },
      {
        type: 'p',
        text: 'O REM se concentra na segunda metade da noite — e por isso quem dorme pouco corta proporcionalmente mais REM. É a fase em que sonhos vívidos acontecem, memórias declarativas se consolidam, e a regulação emocional é processada. Charles Czeisler, MD, PhD, em Harvard, e o trabalho histórico de Matthew Walker descrevem o REM como um "primeiro socorro emocional" da noite anterior.',
      },
      {
        type: 'p',
        text: 'Sinais de pouco REM: irritabilidade, raras lembranças de sonhos, dificuldade de aprender informação nova, sensação de "mente nublada" mesmo descansado fisicamente.',
      },
      { type: 'h2', text: 'O que tipicamente corta cada um' },
      {
        type: 'callout',
        tone: 'info',
        text: 'N3 é cortado por: temperatura alta, álcool, ruído, despertares iniciais.\nREM é cortado por: privação de sono (pouco tempo total), álcool processando, alguns antidepressivos, jet lag.',
      },
      { type: 'h2', text: 'Como melhorar cada um' },
      {
        type: 'h3',
        text: 'Pra N3:',
      },
      {
        type: 'ul',
        items: [
          'Quarto resfriado (16-20 °C).',
          'Última cafeína 8-10h antes de deitar.',
          'Exercício aeróbico moderado regularmente.',
          'Reduzir álcool, especialmente nas 4h antes de dormir.',
        ],
      },
      {
        type: 'h3',
        text: 'Pra REM:',
      },
      {
        type: 'ul',
        items: [
          'Tempo total suficiente — REM precisa de noite cheia pra aparecer plenamente.',
          'Horário consistente de acordar — o REM se concentra perto do despertar habitual.',
          'Exposição à luz solar matinal — sincroniza o ciclo onde REM emerge.',
          'Avaliação de medicações: alguns antidepressivos suprimem REM (não suspender por conta própria).',
        ],
      },
    ],
    faq: [
      {
        question: 'Quanto de N3 e REM o adulto deveria ter?',
        answer:
          'A literatura aponta cerca de 13-23% da noite em N3 e 20-25% em REM, mas há variabilidade individual grande. Não fixe metas exatas sem polissonografia.',
      },
      {
        question: 'Apps de smartwatch medem corretamente?',
        answer:
          'Estimam, com precisão limitada. Tendências semanais (aumento ou queda) costumam ser úteis; valores absolutos isolados, não.',
      },
      {
        question: 'Posso "treinar" mais sono profundo?',
        answer:
          'Em parte. Exercício, frio noturno e regularidade aumentam tendência a N3. Mas N3 também tem teto biológico — depois de certa quantidade, o corpo distribui o resto pra outras fases.',
      },
    ],
    relatedSlugs: [
      'dormir-8-horas-acordar-cansado',
      'temperatura-quarto-dormir',
      'divida-de-sono-fim-de-semana',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'melatonina-funciona-quando-tomar',
    title: 'Melatonina: ela funciona? E quando tomar faz sentido?',
    metaDescription:
      'Melatonina não é sonífero — é sinalizador de noite. Entenda quando faz sentido (e quando não), e por que dose menor costuma ser mais útil.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 4,
    category: 'educacao',
    emoji: '💊',
    excerpt:
      'Melatonina não dá sono — sinaliza ao corpo que é noite. Entender essa diferença muda totalmente quando ela ajuda.',
    intro:
      'A melatonina é frequentemente confundida com sonífero. Não é. Ela é um hormônio sinalizador — diz ao corpo "é noite". Saber a diferença muda completamente quando ela ajuda e quando é só placebo.',
    body: [
      {
        type: 'callout',
        tone: 'warning',
        text: 'O conteúdo abaixo é educativo. Suplementação hormonal exige orientação médica individualizada — especialmente em gestantes, lactantes, crianças e quem usa outras medicações.',
      },
      { type: 'h2', text: 'O que a melatonina faz no corpo' },
      {
        type: 'p',
        text: 'A glândula pineal libera melatonina endógena à medida que escurece. O hormônio age como um sinal sistêmico de "é noite biológica". Não desliga você — ela cria condição pra que o sono ocorra mais facilmente, junto com queda de temperatura, redução de cortisol e aumento de pressão de adenosina.',
      },
      { type: 'h2', text: 'Onde ela funciona bem (com evidência)' },
      {
        type: 'ul',
        items: [
          'Jet lag — em viagens com 4+ fusos, melatonina ajuda a antecipar o relógio.',
          'Síndrome de fase atrasada do sono (Lobos extremos) — sob orientação médica, em dose baixa, pode adiantar o início do sono.',
          'Trabalho em turnos noturnos — uso pontual e estratégico, sob orientação.',
          'Crianças com transtornos do espectro autista — uso clínico documentado, sempre com pediatra.',
        ],
      },
      { type: 'h2', text: 'Onde ela costuma decepcionar' },
      {
        type: 'ul',
        items: [
          'Insônia primária crônica em adultos saudáveis — efeito modesto na maioria dos estudos.',
          'Despertar no meio da noite — quando você acorda às 3h, a melatonina já cumpriu seu papel; tomar nessa hora não traz de volta.',
          'Como hipnótico de "tomar e dormir" — quem espera apagão imediato vai se frustrar.',
        ],
      },
      { type: 'h2', text: 'Dose: menos costuma ser mais' },
      {
        type: 'p',
        text: 'Estudos sugerem que doses fisiológicas (0,3 a 1 mg) costumam ser tão ou mais eficazes que doses altas (3 a 10 mg) — e com menos efeitos colaterais como sonolência diurna ou alteração hormonal. Doses altas saturam receptores e podem dessensibilizar o sistema.',
      },
      {
        type: 'callout',
        tone: 'info',
        text: 'No Brasil, melatonina é regulamentada pela Anvisa como suplemento alimentar com limite de dose. Doses acima do permitido geralmente requerem prescrição médica.',
      },
      { type: 'h2', text: 'Horário importa mais que dose' },
      {
        type: 'p',
        text: 'Tomar 0,5 mg às 19h tem efeito muito diferente de tomar 5 mg às 22h. Pra antecipar fase, tomar mais cedo. Pra dormir simplesmente "esta noite", o efeito é limitado mesmo. A ferramenta certa pra cada problema é diferente.',
      },
    ],
    faq: [
      {
        question: 'Posso tomar melatonina todos os dias?',
        answer:
          'Uso crônico não é recomendado sem avaliação. Pra maioria das situações, faz sentido como ferramenta pontual ou ciclos curtos sob orientação.',
      },
      {
        question: 'Vicia?',
        answer:
          'Não causa dependência química como benzodiazepínicos. Mas pode haver dependência psicológica e, em alguns casos, redução da produção endógena com uso muito prolongado.',
      },
      {
        question: 'Melatonina ou higiene do sono primeiro?',
        answer:
          'Higiene primeiro, sempre. Luz solar matinal, escuridão noturna, horários consistentes e quarto frio são mais potentes que qualquer dose de melatonina pra maioria dos casos.',
      },
    ],
    relatedSlugs: [
      'luz-celular-22h-cerebro',
      'luz-solar-manha-10-minutos',
      'cronotipo-forcar-acordar-cedo',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'respiracao-4-7-8-funciona',
    title: 'Respiração 4-7-8 funciona? O que a fisiologia diz',
    metaDescription:
      'Respiração 4-7-8 é técnica popular pra dormir. Entenda o mecanismo (sistema parassimpático), passo a passo e quando ela realmente ajuda.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 3,
    category: 'tecnica',
    emoji: '🌬️',
    excerpt:
      'Respiração lenta com expiração longa ativa o nervo vago e baixa o estado de alerta. A técnica 4-7-8 é só uma das que funcionam.',
    intro:
      'A técnica 4-7-8 ficou popular como "truque pra dormir em 60 segundos". A promessa exagera, mas o fundamento é real: respiração com expiração prolongada acalma o sistema nervoso pelo nervo vago. Veja como aplicar bem.',
    body: [
      { type: 'h2', text: 'O passo a passo' },
      {
        type: 'ol',
        items: [
          'Expire totalmente pela boca, com leve som de "shhh".',
          'Inspire pelo nariz contando até 4 (segundos).',
          'Segure a respiração contando até 7.',
          'Expire pela boca contando até 8, com o som de "shhh" novamente.',
          'Repita o ciclo 4 vezes.',
        ],
      },
      { type: 'h2', text: 'Por que funciona' },
      {
        type: 'p',
        text: 'A expiração longa estimula o nervo vago, que ativa o sistema nervoso parassimpático — o "modo descanso" do corpo. Frequência cardíaca cai, pressão arterial reduz e o estado de alerta diminui. Não é placebo — é fisiologia direta.',
      },
      {
        type: 'p',
        text: 'A técnica foi popularizada por Andrew Weil, MD, professor da Universidade do Arizona, no contexto de medicina integrativa. A premissa central — expiração mais longa que inspiração — é compartilhada com várias tradições respiratórias e tem suporte na neurociência cardiopulmonar.',
      },
      { type: 'h2', text: 'Quando ela ajuda' },
      {
        type: 'ul',
        items: [
          'Mente acelerada na hora de dormir.',
          'Despertar de madrugada com pensamento rápido.',
          'Antes de situações que sobem cortisol (apresentação, conversa difícil).',
          'Volta de cochilo, pra desacelerar antes de retomar atividade.',
        ],
      },
      { type: 'h2', text: 'Quando não ajuda' },
      {
        type: 'callout',
        tone: 'info',
        text: 'Em quadros de insônia crônica grave, técnicas respiratórias isoladas raramente são suficientes — TCC-I (terapia cognitivo-comportamental para insônia) tem evidência mais sólida. Em pessoas com pânico respiratório, a contagem prolongada pode aumentar ansiedade; preferir técnicas mais leves nesse caso.',
      },
      { type: 'h2', text: 'Variações que valem testar' },
      {
        type: 'p',
        text: 'Se 4-7-8 te incomoda (segurar a respiração desconforta muita gente), uma variação suave: respiração diafragmática 4-6 (4 inspirando, 6 expirando, sem segurar) — efeito parassimpático similar com menos estresse.',
      },
    ],
    faq: [
      {
        question: 'Quantas vezes ao dia posso fazer?',
        answer:
          'Geralmente recomenda-se 4 ciclos por sessão, até 4 sessões ao dia. Mais que isso pode causar tontura passageira em algumas pessoas.',
      },
      {
        question: 'Funciona pra crianças?',
        answer:
          'Sim, em versões adaptadas. Crianças menores costumam preferir contar até 3-5-7 em vez de 4-7-8. O princípio é o mesmo: expiração mais longa que inspiração.',
      },
      {
        question: 'Sinto tontura na primeira vez. É normal?',
        answer:
          'É comum. Costuma passar com prática. Se persistir ou for forte, simplifique pra padrão 4-6 (sem reter ar) ou converse com seu médico.',
      },
    ],
    relatedSlugs: [
      'nao-consigo-desligar-mente-noite',
      'acordar-3-da-manha',
      'temperatura-quarto-dormir',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: 'nao-consigo-desligar-mente-noite',
    title: 'Mente não desliga à noite: o que está acontecendo no seu cérebro',
    metaDescription:
      'Mente acelerada na hora de dormir não é "estresse" qualquer. Veja a fisiologia da rolagem mental e 3 protocolos pra desligar com fundamento.',
    publishedAt: '2026-05-10',
    updatedAt: '2026-05-10',
    readingMinutes: 4,
    category: 'sintomas',
    emoji: '🌀',
    excerpt:
      'Mente que não para tem um padrão fisiológico específico — e ele responde a três protocolos com mecanismo claro.',
    intro:
      'A "mente que não desliga" não é vontade fraca. É um estado fisiológico específico — alerta cognitivo elevado e regulação emocional incompleta — que responde melhor a protocolos com mecanismo claro do que a frases motivacionais.',
    body: [
      { type: 'h2', text: 'O que está acontecendo no seu cérebro' },
      {
        type: 'p',
        text: 'Quando você se deita e a mente acelera, três coisas costumam estar combinadas: cortisol residual elevado (eixo HPA ainda ativo), córtex pré-frontal ruminando (default mode network sobre-engajado) e amígdala em vigilância sutil — varrendo o ambiente em busca de "ameaças" não resolvidas.',
      },
      {
        type: 'p',
        text: 'É um estado de transição mal feita: o corpo pode estar cansado, mas o sistema nervoso ainda não fez o "switch" pro modo parassimpático. E é justamente esse switch que precisa ser provocado.',
      },
      { type: 'h2', text: '3 protocolos com mecanismo' },
      { type: 'h3', text: '1. Despejo cognitivo (cérebro → papel)' },
      {
        type: 'p',
        text: 'Por 5 minutos, escreva tudo que está vindo à cabeça — preocupações, tarefas, ideias. Sem editar. Pesquisas com escrita expressiva sugerem que essa "transferência" reduz a recursão mental: o cérebro deixa de "segurar" o que já foi externalizado.',
      },
      { type: 'h3', text: '2. Respiração com expiração longa' },
      {
        type: 'p',
        text: 'Inspire 4, expire 6 (ou 4-7-8 se preferir). A expiração mais longa que a inspiração ativa o nervo vago, que dispara resposta parassimpática. Não é mítico — é o mecanismo mais direto pra baixar frequência cardíaca rapidamente.',
      },
      { type: 'h3', text: '3. Foco corporal (atenção fora da cabeça)' },
      {
        type: 'p',
        text: 'Faça uma "varredura corporal" — atenção lenta nos pés, panturrilhas, coxas, abdome, peito. A atenção plena ao corpo desloca o foco do córtex pré-frontal pro córtex somatossensorial, e na prática reduz a rolagem mental sem exigir esforço de "parar de pensar".',
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'A combinação dos três protocolos em sequência (5 min de escrita, 4 ciclos de respiração, 5-10 min de varredura corporal) costuma funcionar melhor do que cada um isolado. O sistema nervoso adora coerência de sinais.',
      },
      { type: 'h2', text: 'O que cuidar de dia, não só à noite' },
      {
        type: 'p',
        text: 'Mente acelerada à noite costuma ser eco de cortisol mal regulado durante o dia: cafeína em excesso, falta de pausas, descarga emocional comprimida. Sintomas noturnos pedem ajuste diurno — luz solar matinal, exercício, e momentos de descompressão são parte do tratamento.',
      },
    ],
    faq: [
      {
        question: 'Por que isso piora em períodos de mudança?',
        answer:
          'Mudanças (trabalho novo, relacionamento, mudança de cidade) aumentam carga cognitiva e elevam cortisol basal. O sistema gasta mais tempo em vigilância, então a transição pro sono fica mais difícil.',
      },
      {
        question: 'Pensar no que vou fazer amanhã é normal?',
        answer:
          'É — mas se essa "lista mental" não permite dormir, é sinal de que precisa sair da cabeça. O despejo cognitivo no papel, antes de deitar, costuma resolver.',
      },
      {
        question: 'Quando procurar ajuda profissional?',
        answer:
          'Se a mente acelerada está atrelada a tristeza persistente, ansiedade incapacitante ou a dificuldade pra dormir já dura mais de 3 meses, vale procurar avaliação. TCC-I tem boa evidência pra insônia crônica.',
      },
    ],
    relatedSlugs: [
      'respiracao-4-7-8-funciona',
      'acordar-3-da-manha',
      'luz-celular-22h-cerebro',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, max = 3): BlogPost[] {
  return post.relatedSlugs
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter((p): p is BlogPost => Boolean(p))
    .slice(0, max);
}

export function getPostsByCategory(): Record<BlogCategoryId, BlogPost[]> {
  const grouped = {} as Record<BlogCategoryId, BlogPost[]>;
  (Object.keys(BLOG_CATEGORIES) as BlogCategoryId[]).forEach((cat) => {
    grouped[cat] = [];
  });
  BLOG_POSTS.forEach((p) => {
    grouped[p.category].push(p);
  });
  return grouped;
}

export function getAllPostSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

/** Texto plano usado pelo Web Speech API (botão "Escutar artigo"). */
export function getPostPlainText(post: BlogPost): string {
  const out: string[] = [post.title, post.intro];
  for (const block of post.body) {
    switch (block.type) {
      case 'p':
      case 'h2':
      case 'h3':
      case 'callout':
      case 'quote':
        out.push(block.text);
        break;
      case 'ul':
      case 'ol':
        out.push(block.items.join('. '));
        break;
    }
  }
  return out.join('. ').replace(/\s+/g, ' ').trim();
}
