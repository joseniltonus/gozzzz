import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  SLEEP_LESSON_CONTENT,
} from '@/data/sleepLessonContent';
import { ChronotypeGrid } from '@/components/ChronotypeGrid';
import { LESSON_FONT, LESSON_INK, LESSON_PAPER } from '@/constants/lessonPaperTheme';

interface Props {
  lessonId: string;
  onComplete?: () => void;
  /** Quando o passo interno muda — a página rola até à zona de leitura (hero fica acima). */
  onStepChange?: () => void;
}

const STEPS = ['hook', 'insight', 'mechanism', 'application', 'commit'];

function DifficultyBadge({ difficulty, isPt }: { difficulty: string; isPt: boolean }) {
  const map: Record<string, { emoji: string; label: string; color: string; bg: string; border: string }> = {
    easy: {
      emoji: '🟢',
      label: isPt ? 'Fácil' : 'Easy',
      color: '#166534',
      bg: '#e8f2e8',
      border: 'rgba(22, 101, 52, 0.2)',
    },
    medium: {
      emoji: '🟡',
      label: isPt ? 'Médio' : 'Medium',
      color: '#854d0e',
      bg: '#f7f0e4',
      border: 'rgba(184, 146, 90, 0.45)',
    },
    advanced: {
      emoji: '🔴',
      label: isPt ? 'Avançado' : 'Advanced',
      color: '#991b1b',
      bg: '#f8ecec',
      border: 'rgba(153, 27, 27, 0.2)',
    },
  };
  const d = map[difficulty] || map.easy;
  return (
    <View style={[sw.badge, { backgroundColor: d.bg, borderColor: d.border }]}>
      <Text style={sw.badgeEmoji}>{d.emoji}</Text>
      <Text style={[sw.badgeText, { color: d.color }]}>{d.label}</Text>
    </View>
  );
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <View style={sw.dots}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            sw.dot,
            i < current ? sw.dotDone : i === current ? sw.dotActive : sw.dotPending,
          ]}
        />
      ))}
    </View>
  );
}

function TagLabel({ tag }: { tag: string }) {
  return (
    <View style={sw.tagRow}>
      <Text style={sw.tagText}>{tag}</Text>
    </View>
  );
}

const READING_INNER_MAX = 628;

export function SleepLessonCardWeb({ lessonId, onComplete, onStepChange }: Props) {
  const { language } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const isPt = language === 'pt';
  const padH = windowWidth < 400 ? 16 : 22;
  const bodySize = windowWidth < 400 ? 17 : 18;
  const bodyLine = windowWidth < 400 ? 30 : 32;
  const titleSize = windowWidth < 400 ? 23 : 26;
  const titleLine = windowWidth < 400 ? 31 : 34;

  const [currentStep, setCurrentStep] = useState(0);
  const [scienceOpen, setScienceOpen] = useState(false);

  const lesson = SLEEP_LESSON_CONTENT.find((l) => l.id === lessonId);
  if (!lesson) {
    return (
      <View style={sw.errorBox}>
        <Text style={sw.errorText}>Lesson not found</Text>
      </View>
    );
  }

  const data = isPt ? lesson.pt : lesson.en;

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((p) => p + 1);
      setScienceOpen(false);
      onStepChange?.();
    }
  };

  const nextLabel = isPt ? 'Próximo' : 'Next';

  const readingTitle = { fontSize: titleSize, lineHeight: titleLine };
  const readingBody = { fontSize: bodySize, lineHeight: bodyLine };

  return (
    <View style={sw.root}>
      <View style={[sw.progressBar, { paddingHorizontal: padH }]}>
        <StepDots current={currentStep} total={STEPS.length} />
        <Text style={sw.stepCount}>{currentStep + 1} / {STEPS.length}</Text>
      </View>

      <View key={currentStep} style={[sw.stepBody, { paddingHorizontal: padH }]}>
        <View style={[sw.inner, { maxWidth: READING_INNER_MAX }]}>
          {currentStep === 0 && (
            <>
              <TagLabel tag={data.hook.tag} />
              <Text style={[sw.cardTitle, readingTitle]}>{data.hook.title}</Text>
              <Text style={[sw.cardBody, readingBody]}>{data.hook.body}</Text>
              <View style={sw.statCard}>
                <Text style={[sw.statNumber, { fontSize: windowWidth < 420 ? 28 : 32 }]}>{data.dataPoint.stat}</Text>
                <Text style={sw.statSource}>{data.dataPoint.source}</Text>
              </View>
            </>
          )}

          {currentStep === 1 && (
            <>
              <TagLabel tag={data.insight.tag} />
              <Text style={[sw.cardTitle, readingTitle]}>{data.insight.title}</Text>
              <Text style={[sw.cardBody, readingBody]}>{data.insight.body}</Text>
              {lessonId === '2' && <ChronotypeGrid variant="light" />}
            </>
          )}

          {currentStep === 2 && (
            <>
              <TagLabel tag={data.mechanism.tag} />
              <Text style={[sw.cardTitle, readingTitle]}>{data.mechanism.title}</Text>
              <Text style={[sw.cardBody, readingBody]}>{data.mechanism.body}</Text>
            </>
          )}

          {currentStep === 3 && (
            <>
              <TagLabel tag={data.application.tag} />
              <Text style={[sw.cardTitle, readingTitle]}>{data.application.title}</Text>
              <Text style={[sw.cardBody, readingBody]}>{data.application.body}</Text>

              <View style={sw.protocolCard}>
                <View style={sw.protocolHeader}>
                  <Text style={sw.protocolHeaderText}>
                    {isPt ? 'O PROTOCOLO' : 'THE PROTOCOL'}
                  </Text>
                  <DifficultyBadge difficulty={data.protocol.difficulty} isPt={isPt} />
                </View>

                <View style={sw.protocolRow}>
                  <Text style={sw.protocolIcon}>🌙</Text>
                  <View style={sw.protocolRowContent}>
                    <Text style={sw.protocolRowLabel}>{isPt ? 'Hoje à noite' : 'Tonight'}</Text>
                    <Text style={[sw.protocolRowText, { fontSize: bodySize, lineHeight: bodyLine }]}>{data.protocol.tonight}</Text>
                  </View>
                </View>

                <View style={sw.protocolDivider} />

                <View style={sw.protocolRow}>
                  <Text style={sw.protocolIcon}>☀️</Text>
                  <View style={sw.protocolRowContent}>
                    <Text style={sw.protocolRowLabel}>{isPt ? 'Amanhã de manhã' : 'Tomorrow morning'}</Text>
                    <Text style={[sw.protocolRowText, { fontSize: bodySize, lineHeight: bodyLine }]}>{data.protocol.morning}</Text>
                  </View>
                </View>

                <View style={sw.protocolWhy}>
                  <Text style={sw.protocolWhyLabel}>{isPt ? 'Por que funciona: ' : 'Why it works: '}</Text>
                  <Text style={sw.protocolWhyText}>{data.protocol.why}</Text>
                </View>
              </View>
            </>
          )}

          {currentStep === 4 && (
            <>
              <TouchableOpacity
                style={sw.scienceToggle}
                onPress={() => setScienceOpen((o) => !o)}
                activeOpacity={0.8}
              >
                <Text style={sw.scienceToggleText}>
                  🔬 {isPt ? 'Ver Ciência Completa' : 'See Full Science'} {scienceOpen ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {scienceOpen && (
                <View style={sw.scienceBox}>
                  {data.science.map((c, i) => (
                    <View key={i} style={sw.citationRow}>
                      <Text style={sw.citationText}>{c.citation}</Text>
                      <Text style={sw.citationSource}>{c.source}</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={sw.resultCard}>
                <Text style={sw.resultEmoji}>✅</Text>
                <Text style={sw.resultTitle}>
                  {isPt ? 'Lição concluída!' : 'Lesson complete!'}
                </Text>
                <Text style={sw.resultBody}>
                  {isPt ? 'Até amanhã.' : 'See you tomorrow.'}
                </Text>
                <View style={sw.nextPreviewCard}>
                  <Text style={sw.nextPreviewLabel}>
                    {isPt ? 'Próxima lição:' : 'Next lesson:'}
                  </Text>
                  <Text style={sw.nextPreviewText}>{data.nextPreview}</Text>
                </View>
              </View>
              {onComplete && (
                <TouchableOpacity style={sw.continueBtn} onPress={onComplete} activeOpacity={0.8}>
                  <Text style={sw.continueBtnText}>{isPt ? 'Continuar' : 'Continue'}</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          <View style={sw.spacer} />
        </View>
      </View>

      {currentStep < STEPS.length - 1 && (
        <View style={[sw.navBar, { paddingHorizontal: padH }]}>
          <TouchableOpacity style={[sw.nextBtn, { maxWidth: READING_INNER_MAX }]} onPress={goNext} activeOpacity={0.8}>
            <Text style={sw.nextBtnText}>{nextLabel}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const sw = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: LESSON_PAPER.canvas,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginTop: -8,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: LESSON_PAPER.border,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.09,
    shadowRadius: 24,
    elevation: 3,
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LESSON_PAPER.canvas,
    padding: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#dc2626',
  },

  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: LESSON_PAPER.elevated,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: LESSON_PAPER.divider,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotDone: {
    width: 8,
    backgroundColor: LESSON_PAPER.foil,
  },
  dotActive: {
    width: 32,
    backgroundColor: LESSON_PAPER.foil,
  },
  dotPending: {
    width: 8,
    backgroundColor: LESSON_PAPER.border,
  },
  stepCount: {
    fontSize: 12,
    fontWeight: '500',
    color: LESSON_INK.label,
    letterSpacing: 0.8,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },

  stepBody: {
    width: '100%',
    paddingVertical: 32,
  },
  inner: {
    alignSelf: 'center',
    width: '100%',
  },

  tagRow: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(184, 146, 90, 0.10)',
    borderWidth: 1,
    borderColor: LESSON_PAPER.foilSoft,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 18,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#7a5c32',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },

  cardTitle: {
    fontWeight: '700',
    color: LESSON_INK.display,
    marginBottom: 14,
    letterSpacing: -0.4,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  cardBody: {
    color: LESSON_INK.body,
    marginBottom: 24,
    letterSpacing: 0.02,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },

  statCard: {
    backgroundColor: '#100e0c',
    borderRadius: 18,
    padding: 26,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: LESSON_PAPER.foilSoft,
  },
  statNumber: {
    fontWeight: '800',
    color: '#fbbf24',
    textAlign: 'center',
    marginBottom: 10,
  },
  statSource: {
    fontSize: 12,
    color: LESSON_INK.wash,
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: 0.2,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },

  protocolCard: {
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 18,
    padding: 26,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    marginBottom: 8,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 3,
  },
  protocolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  protocolHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: LESSON_INK.display,
    letterSpacing: 2,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeEmoji: {
    fontSize: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  protocolRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  protocolIcon: {
    fontSize: 22,
    marginTop: 2,
  },
  protocolRowContent: {
    flex: 1,
  },
  protocolRowLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: LESSON_INK.label,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 5,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  protocolRowText: {
    color: LESSON_INK.body,
    fontWeight: '500',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  protocolDivider: {
    height: 1,
    backgroundColor: LESSON_PAPER.divider,
    marginBottom: 16,
  },
  protocolWhy: {
    backgroundColor: LESSON_PAPER.inset,
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  protocolWhyLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: LESSON_INK.display,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  protocolWhyText: {
    fontSize: 14,
    color: LESSON_INK.muted,
    fontStyle: 'italic',
    lineHeight: 22,
    flex: 1,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },

  scienceToggle: {
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: LESSON_PAPER.borderStrong,
    alignItems: 'center',
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  scienceToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: LESSON_INK.muted,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  scienceBox: {
    backgroundColor: '#e9eef4',
    borderRadius: 14,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(71, 95, 119, 0.22)',
    gap: 14,
  },
  citationRow: {
    borderLeftWidth: 2,
    borderLeftColor: LESSON_PAPER.foil,
    paddingLeft: 16,
  },
  citationText: {
    fontSize: 15,
    color: LESSON_INK.body,
    lineHeight: 25,
    marginBottom: 6,
    fontStyle: 'italic',
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  citationSource: {
    fontSize: 11,
    color: LESSON_INK.label,
    fontWeight: '600',
    letterSpacing: 0.2,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },

  feedbackCard: {
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    marginBottom: 8,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 3,
  },
  feedbackQuestion: {
    fontSize: 17,
    fontWeight: '600',
    color: LESSON_INK.display,
    marginBottom: 22,
    textAlign: 'center',
    lineHeight: 26,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  feedbackRow: {
    flexDirection: 'row',
    gap: 12,
  },
  feedbackOption: {
    flex: 1,
    backgroundColor: LESSON_PAPER.canvas,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
  },
  feedbackEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  feedbackLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: LESSON_INK.label,
    textAlign: 'center',
    lineHeight: 15,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },

  resultCard: {
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 20,
    padding: 36,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    marginBottom: 8,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 28,
    elevation: 4,
  },
  resultEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: LESSON_INK.display,
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: -0.3,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  resultBody: {
    fontSize: 17,
    color: LESSON_INK.muted,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 28,
    maxWidth: 420,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  nextPreviewCard: {
    backgroundColor: '#100e0c',
    borderRadius: 14,
    padding: 22,
    width: '100%',
    borderWidth: 1,
    borderColor: LESSON_PAPER.foilSoft,
  },
  nextPreviewLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fbbf24',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  nextPreviewText: {
    fontSize: 14,
    color: LESSON_INK.wash,
    lineHeight: 22,
    fontStyle: 'italic',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },

  spacer: {
    height: 40,
  },

  navBar: {
    backgroundColor: LESSON_PAPER.elevated,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: LESSON_PAPER.divider,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  prevBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    backgroundColor: LESSON_PAPER.elevated,
  },
  prevBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: LESSON_INK.muted,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  nextBtn: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121018',
    borderWidth: 1,
    borderColor: LESSON_PAPER.foilSoft,
  },
  nextBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#faf7f0',
    letterSpacing: 1,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  continueBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#121018',
    marginTop: 16,
    borderWidth: 1,
    borderColor: LESSON_PAPER.foilSoft,
  },
  continueBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#faf7f0',
    letterSpacing: 0.8,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
});
