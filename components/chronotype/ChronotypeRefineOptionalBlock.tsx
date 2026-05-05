import { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeIn, useReducedMotion } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import type { ChronotypeKey } from '@/data/chronotypesIntelligence';
import type { ChronotypeResultAccent, ChronotypeResultLocale } from '@/data/chronotypeResultPremium';
import {
  REFINE_STEPS,
  buildRefineInsights,
  getRefineUiCopy,
  type RefineOptionId,
} from '@/data/chronotypeRefineOptional';

type Props = {
  chronotypeKey: ChronotypeKey;
  locale: ChronotypeResultLocale;
  accent: ChronotypeResultAccent;
};

export default function ChronotypeRefineOptionalBlock({ chronotypeKey, locale, accent }: Props) {
  const ui = useMemo(() => getRefineUiCopy(locale), [locale]);
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<'teaser' | 'flow' | 'summary'>('teaser');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<(RefineOptionId | null)[]>([null, null, null]);
  const [completedOnce, setCompletedOnce] = useState(false);
  const [bullets, setBullets] = useState<string[]>([]);

  const step = REFINE_STEPS[stepIndex];
  const isEn = locale === 'en';

  const startFlow = useCallback(() => {
    setPhase('flow');
    setStepIndex(0);
    setAnswers([null, null, null]);
  }, []);

  const resetAll = useCallback(() => {
    setPhase('teaser');
    setStepIndex(0);
    setAnswers([null, null, null]);
    setCompletedOnce(false);
    setBullets([]);
  }, []);

  const onPick = useCallback(
    (id: RefineOptionId) => {
      const next = [...answers] as (RefineOptionId | null)[];
      next[stepIndex] = id;
      setAnswers(next);
      if (stepIndex < REFINE_STEPS.length - 1) {
        setStepIndex((s) => s + 1);
        return;
      }
      const filled = next.filter(Boolean) as RefineOptionId[];
      setBullets(buildRefineInsights(chronotypeKey, filled, locale));
      setPhase('summary');
      setCompletedOnce(true);
    },
    [answers, chronotypeKey, locale, stepIndex],
  );

  const finishSummary = useCallback(() => {
    setPhase('teaser');
  }, []);

  const bulletEntering = useCallback(
    (i: number) => (reduceMotion ? FadeIn.duration(240) : FadeInDown.delay(70 * i).duration(380).springify()),
    [reduceMotion],
  );

  if (phase === 'teaser') {
    return (
      <View style={[styles.teaserCard, { borderColor: accent.primarySoft }]}>
        {completedOnce ? (
          <View style={styles.teaserDoneRow}>
            <Text style={[styles.teaserDoneMark, { color: accent.primary }]}>✓</Text>
            <View style={styles.teaserDoneTextCol}>
              <Text style={styles.teaserDoneTitle}>{isEn ? 'Profile refined' : 'Perfil afinado'}</Text>
              <Text style={styles.teaserDoneSub}>
                {isEn ? 'Thanks — you can review or redo below.' : 'Obrigado — podes rever ou refazer abaixo.'}
              </Text>
            </View>
            <TouchableOpacity onPress={resetAll} hitSlop={10}>
              <Text style={[styles.relink, { color: accent.primary }]}>{isEn ? 'Redo' : 'Refazer'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.teaserHeaderRow}>
              <LinearGradient
                colors={[accent.primarySoft, 'rgba(255,255,255,0.04)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.badgeGrad}
              >
                <Text style={styles.badgeText}>{ui.activeBadge}</Text>
              </LinearGradient>
              <Text style={styles.meta}>{ui.collapsedMeta}</Text>
            </View>
            <Text style={styles.teaserTitle}>{ui.collapsedTitle}</Text>
            <Text style={styles.teaserBody}>{ui.collapsedSubtitle}</Text>
            <TouchableOpacity
              onPress={startFlow}
              activeOpacity={0.9}
              style={[styles.teaserCta, { borderColor: accent.primary }]}
            >
              <Text style={[styles.teaserCtaLabel, { color: accent.primary }]}>{ui.collapsedCta}</Text>
              <Text style={[styles.teaserCtaArrow, { color: accent.primary }]}>→</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  if (phase === 'flow') {
    return (
      <View style={[styles.flowCard, { borderColor: accent.primarySoft }]}>
        <View style={styles.flowTop}>
          <Text style={styles.flowBadge}>{ui.activeBadge}</Text>
          <View style={styles.dots}>
            {REFINE_STEPS.map((s, i) => (
              <View
                key={s.id}
                style={[
                  styles.dot,
                  i === stepIndex && { backgroundColor: accent.primary, transform: [{ scale: 1.15 }] },
                  i < stepIndex && { backgroundColor: accent.primary, opacity: 0.45 },
                ]}
              />
            ))}
          </View>
        </View>
        <Text style={styles.qTitle}>{isEn ? step.q_en : step.q_pt}</Text>
        <Text style={styles.qSub}>{isEn ? step.sub_en : step.sub_pt}</Text>
        <View style={styles.opts}>
          {step.options.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={[styles.optRow, { borderColor: 'rgba(255,255,255,0.1)' }]}
              activeOpacity={0.88}
              onPress={() => onPick(opt.id)}
            >
              <Text style={styles.optEmoji}>{opt.emoji}</Text>
              <Text style={styles.optLabel}>{isEn ? opt.label_en : opt.label_pt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            setPhase('teaser');
            setStepIndex(0);
            setAnswers([null, null, null]);
          }}
          hitSlop={12}
        >
          <Text style={styles.skip}>{isEn ? 'Not now' : 'Agora não'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* summary */
  return (
    <View style={[styles.summaryCard, { borderColor: accent.primarySoft }]}>
      <Text style={styles.summaryTitle}>{ui.doneTitle}</Text>
      <Text style={styles.summaryLead}>{ui.doneLead}</Text>
      {bullets.map((b, i) => (
        <Animated.View key={`${i}-${b.slice(0, 24)}`} entering={bulletEntering(i)} style={styles.bulletBlock}>
          <View style={[styles.summaryBullet, { backgroundColor: accent.primary }]} />
          <Text style={styles.summaryBulletText}>{b}</Text>
        </Animated.View>
      ))}
      <Text style={styles.summaryFoot}>{ui.doneFoot}</Text>
      <TouchableOpacity onPress={finishSummary} style={[styles.summaryBtn, { borderColor: accent.primary }]}>
        <Text style={[styles.summaryBtnLabel, { color: accent.primary }]}>{ui.doneDismiss}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  teaserCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.035)',
  },
  teaserHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgeGrad: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#e2e8f0',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  meta: {
    fontSize: 11,
    color: '#64748b',
    letterSpacing: 0.3,
  },
  teaserTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  teaserBody: {
    fontSize: 14,
    lineHeight: 22,
    color: '#94a3b8',
    marginBottom: 16,
  },
  teaserCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
  },
  teaserCtaLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  teaserCtaArrow: {
    fontSize: 16,
    fontWeight: '600',
  },
  teaserDoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teaserDoneMark: {
    fontSize: 22,
    fontWeight: '800',
  },
  teaserDoneTextCol: {
    flex: 1,
  },
  teaserDoneTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  teaserDoneSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  relink: {
    fontSize: 13,
    fontWeight: '600',
  },
  flowCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  flowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  flowBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  qTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f1f5f9',
    lineHeight: 24,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  qSub: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 16,
  },
  opts: {
    gap: 10,
  },
  optRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  optEmoji: {
    fontSize: 22,
  },
  optLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  skip: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  summaryCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.035)',
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  summaryLead: {
    fontSize: 15,
    lineHeight: 22,
    color: '#cbd5e1',
    marginBottom: 14,
    fontWeight: '500',
  },
  bulletBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  summaryBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    opacity: 0.95,
  },
  summaryBulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: '#e2e8f0',
  },
  summaryFoot: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
    marginTop: 6,
    marginBottom: 16,
  },
  summaryBtn: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  summaryBtnLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
});
