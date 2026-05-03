/**
 * GoZzzz — geração multi-plataforma a partir de `chronotypeKey`.
 * WhatsApp Status (9:16), Instagram Stories (2 frames), TikTok (roteiro), metadados web.
 */

import {
  CHRONOTYPE_EXP_KEYS,
  getChronotypeExperience,
  tiktokScriptText,
  type ChronotypeExpKey,
  type LocaleChronotypeBlock,
} from '@/data/chronotypesExperience';

export type ChronotypeContentPack = {
  chronotypeKey: ChronotypeExpKey;
  locale: 'pt' | 'en';
  block: LocaleChronotypeBlock;
  /** 1 — WhatsApp Status: 9:16, texto mínimo (emoji + uma frase). */
  whatsappStatus: {
    emoji: string;
    /** Uma frase curta (identificação emocional). */
    line: string;
  };
  /** 2 — Instagram Stories: frame identidade + frame curiosidade + CTA. */
  instagramStories: {
    frame1: { headline: string; line: string };
    frame2: { curiosity: string; cta: string };
  };
  /** 3 — TikTok 10–15s: hook → identificação → explicação → CTA. */
  tiktok: {
    hook: string;
    identify: string;
    explain: string;
    cta: string;
    /** Texto completo para copiar / colar. */
    scriptText: string;
    suggestedDurationLabel: string;
  };
  /** 4 — Blocos curtos para hero/cards na web (sem parágrafos longos). */
  webSnippets: {
    cardTitle: string;
    cardTagline: string;
    ctaLine: string;
  };
};

export function getChronotypeContentPack(
  chronotypeKey: ChronotypeExpKey,
  locale: 'pt' | 'en' = 'pt',
): ChronotypeContentPack {
  const block = getChronotypeExperience(chronotypeKey, locale);
  const ctaIg =
    locale === 'pt' ? 'Descubra o seu → gozzzz.app' : 'Find yours → gozzzz.app';
  const headIg = locale === 'pt' ? `Eu sou ${block.name}` : `I'm ${block.name}`;

  return {
    chronotypeKey,
    locale,
    block,
    whatsappStatus: {
      emoji: block.emoji,
      line: block.story.short,
    },
    instagramStories: {
      frame1: { headline: headIg, line: block.story.short },
      frame2: { curiosity: block.story.curiosity, cta: ctaIg },
    },
    tiktok: {
      hook: block.tiktok.hook,
      identify: block.tiktok.identify,
      explain: block.tiktok.explain,
      cta: block.tiktok.cta,
      scriptText: tiktokScriptText(block, locale),
      suggestedDurationLabel: locale === 'pt' ? '10–15 s' : '10–15s',
    },
    webSnippets: {
      cardTitle: block.name,
      cardTagline: block.landingTagline,
      ctaLine: block.tiktok.cta,
    },
  };
}

/** Lista todos os cronótipos (ex.: grelha na landing web). */
export function allChronotypeKeys(): readonly ChronotypeExpKey[] {
  return CHRONOTYPE_EXP_KEYS;
}
