/**
 * JSON-LD para a landing pública do programa (URL canónica `/sono`) —
 * HowTo, WebSite/WebPage (Speakable), Product opcional com AggregateRating.
 *
 * AggregateRating só entra no grafo se EXPO_PUBLIC_PRODUCT_AGGREGATE_RATING_VALUE e
 * EXPO_PUBLIC_PRODUCT_REVIEW_COUNT estiverem definidos no build (avaliações reais —
 * inventar viola as diretrizes do Google).
 */

import { LESSONS_DATA } from '@/data/lessons';

const ORG_ID = 'https://gozzzz.app/#org';
const WEBSITE_ID = 'https://gozzzz.app/#website';
const PRODUCT_ID = 'https://gozzzz.app/#product-21';
const SONO_LANDING_URL = 'https://gozzzz.app/sono';
const WEBPAGE_ID = `${SONO_LANDING_URL}#webpage`;
const HOWTO_ID = `${SONO_LANDING_URL}#howto`;

export function truncateSchemaText(raw: string, max = 300): string {
  const oneLine = raw.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= max) return oneLine;
  return `${oneLine.slice(0, max - 1).trimEnd()}…`;
}

export function sumLessonDurationsMinutes(): number {
  return LESSONS_DATA.reduce((acc, l) => acc + (l.duration_minutes ?? 5), 0);
}

function buildHowToSteps(isPt: boolean): Record<string, unknown>[] {
  const sorted = [...LESSONS_DATA].sort((a, b) => a.step_number - b.step_number);
  return sorted.map((l) => ({
    '@type': 'HowToStep',
    position: l.step_number,
    name: isPt ? l.title_pt : l.title_en,
    text: truncateSchemaText(isPt ? l.description_pt : l.description_en, 320),
  }));
}

/** Só retorna objeto se env públicos forem válidos (evita rich results falsos). */
export function getOptionalProductAggregateRating(): Record<string, unknown> | null {
  const rawVal =
    typeof process !== 'undefined'
      ? process.env.EXPO_PUBLIC_PRODUCT_AGGREGATE_RATING_VALUE?.trim()
      : undefined;
  const rawCount =
    typeof process !== 'undefined' ? process.env.EXPO_PUBLIC_PRODUCT_REVIEW_COUNT?.trim() : undefined;
  if (!rawVal || !rawCount) return null;
  const rating = Number.parseFloat(rawVal.replace(',', '.'));
  const count = Number.parseInt(rawCount, 10);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) return null;
  if (!Number.isFinite(count) || count < 1) return null;
  return {
    '@type': 'AggregateRating',
    ratingValue: rating.toFixed(1),
    reviewCount: String(count),
    bestRating: '5',
    worstRating: '1',
  };
}

export type FaqItem = { question: string; answer: string };

export function buildSonoPlusSchemaGraph(input: {
  isPt: boolean;
  headTitle: string;
  headDesc: string;
  socialImageUrl: string;
  faq: FaqItem[];
}): Record<string, unknown> {
  const { isPt, headTitle, headDesc, socialImageUrl, faq } = input;
  const totalMin = sumLessonDurationsMinutes();
  const totalTime = `PT${Math.max(1, Math.round(totalMin))}M`;
  const agg = getOptionalProductAggregateRating();

  const product: Record<string, unknown> = {
    '@type': 'Product',
    '@id': PRODUCT_ID,
    name: 'Programa de Sono em 21 Passos — GoZzzz',
    description:
      'Trilha de 21 passos para reorganizar sono, ritmo circadiano e rotina com base em neurociência do sono.',
    url: SONO_LANDING_URL,
    image: socialImageUrl,
    brand: { '@type': 'Brand', name: 'GoZzzz' },
    offers: {
      '@type': 'Offer',
      price: '147.00',
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      url: SONO_LANDING_URL,
      seller: { '@id': ORG_ID },
    },
  };
  if (agg) product.aggregateRating = agg;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'GoZzzz',
        legalName: 'MORFEU SAÚDE E TECNOLOGIA LTDA',
        url: 'https://gozzzz.app',
        logo: socialImageUrl,
        email: 'suporte@gozzzz.app',
        taxID: '66.059.212/0001-52',
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: 'https://gozzzz.app',
        name: 'GoZzzz',
        description:
          'Programa de sono e neurociência do ritmo circadiano — cronótipos, hábitos e sono restaurador.',
        publisher: { '@id': ORG_ID },
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'WebPage',
        '@id': WEBPAGE_ID,
        url: SONO_LANDING_URL,
        name: headTitle,
        description: headDesc,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': PRODUCT_ID },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: socialImageUrl,
          width: 1200,
          height: 800,
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#speakable-headline', '#speakable-summary', '#speakable-faq'],
        },
        mainEntity: { '@id': HOWTO_ID },
      },
      product,
      {
        '@type': 'HowTo',
        '@id': HOWTO_ID,
        name: isPt
          ? 'Programa de Sono em 21 Passos — GoZzzz'
          : 'GoZzzz 21-Step Sleep Program',
        description: isPt
          ? 'Trilha guiada em 21 passos para reorganizar sono, ritmo circadiano e rotina com base em evidência.'
          : 'A guided 21-step path to reorganize sleep, circadian rhythm, and routine.',
        totalTime,
        step: buildHowToSteps(isPt),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GoZzzz', item: 'https://gozzzz.app/web' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Programa 21 Passos',
            item: SONO_LANDING_URL,
          },
        ],
      },
    ],
  };
}
