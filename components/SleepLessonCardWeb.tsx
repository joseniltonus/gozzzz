import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  SLEEP_LESSON_CONTENT,
} from '@/data/sleepLessonContent';
import { ChronotypeGrid } from '@/components/ChronotypeGrid';

const isWeb = Platform.OS === 'web';

interface Props {
  lessonId: string;
  onComplete?: () => void;
}

const STEPS = ['hook', 'insight', 'mechanism', 'application', 'commit'];

function DifficultyBadge({ difficulty, isPt }: { difficulty: string; isPt: boolean }) {
  const map: Record<string, { emoji: string; label: string; color: string; bg: string; border: string }> = {
    easy:     { emoji: '🟢', label: isPt ? 'Fácil'    : 'Easy',     color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
    medium:   { emoji: '🟡', label: isPt ? 'Médio'    : 'Medium',   color: '#ca8a04', bg: '#fefce8', border: '#fde68a' },
    advanced: { emoji: '🔴', label: isPt ? 'Avançado' : 'Advanced', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
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

export function SleepLessonCardWeb({ lessonId, onComplete }: Props) {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const scrollRef = useRef<ScrollView>(null);

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
      console.log("SLEEP LESSON CARD WEB goNext, current:", currentStep, "next:", currentStep + 1);
      setCurrentStep((p) => p + 1);
      setScienceOpen(false);
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }
  };

  const nextLabel = isPt ? 'Próximo' : 'Next';

  return (
    <View style={sw.root}>
      <View style={sw.progressBar}>
        <StepDots current={currentStep} total={STEPS.length} />
        <Text style={sw.stepCount}>{currentStep + 1} / {STEPS.length}</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        key={currentStep}
        style={sw.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={sw.scrollContent}
      >
        <View style={sw.inner}>
          {currentStep === 0 && (
            <>
              <TagLabel tag={data.hook.tag} />
              <Text style={sw.cardTitle}>{data.hook.title}</Text>
              <Text style={sw.cardBody}>{data.hook.body}</Text>
              <View style={sw.statCard}>
                <Text style={sw.statNumber}>{data.dataPoint.stat}</Text>
                <Text style={sw.statSource}>{data.dataPoint.source}</Text>
              </View>
            </>
          )}

          {currentStep === 1 && (
            <>
              <TagLabel tag={data.insight.tag} />
              <Text style={sw.cardTitle}>{data.insight.title}</Text>
              <Text style={sw.cardBody}>{data.insight.body}</Text>
              {lessonId === '2' && <ChronotypeGrid variant="light" />}
            </>
          )}

          {currentStep === 2 && (
            <>
              <TagLabel tag={data.mechanism.tag} />
              <Text style={sw.cardTitle}>{data.mechanism.title}</Text>
              <Text style={sw.cardBody}>{data.mechanism.body}</Text>
            </>
          )}

          {currentStep === 3 && (
            <>
              <TagLabel tag={data.application.tag} />
              <Text style={sw.cardTitle}>{data.application.title}</Text>
              <Text style={sw.cardBody}>{data.application.body}</Text>

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
                    <Text style={sw.protocolRowText}>{data.protocol.tonight}</Text>
                  </View>
                </View>

                <View style={sw.protocolDivider} />

                <View style={sw.protocolRow}>
                  <Text style={sw.protocolIcon}>☀️</Text>
                  <View style={sw.protocolRowContent}>
                    <Text style={sw.protocolRowLabel}>{isPt ? 'Amanhã de manhã' : 'Tomorrow morning'}</Text>
                    <Text style={sw.protocolRowText}>{data.protocol.morning}</Text>
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
      </ScrollView>

      {currentStep < STEPS.length - 1 && (
        <View style={sw.navBar}>
          <View style={sw.navInner}>
            <View style={sw.navPlaceholder} />
            <TouchableOpacity style={sw.nextBtn} onPress={goNext} activeOpacity={0.8}>
              <Text style={sw.nextBtnText}>{nextLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const sw = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
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
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
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
    backgroundColor: '#0f172a',
  },
  dotActive: {
    width: 28,
    backgroundColor: '#0f172a',
  },
  dotPending: {
    width: 8,
    backgroundColor: '#e2e8f0',
  },
  stepCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  inner: {
    maxWidth: 720,
    alignSelf: 'center',
    width: '100%',
  },

  tagRow: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef9ee',
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400e',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  cardTitle: {
    fontSize: isWeb ? 30 : 22,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
    lineHeight: isWeb ? 40 : 30,
  },
  cardBody: {
    fontSize: isWeb ? 17 : 16,
    color: '#475569',
    lineHeight: 28,
    marginBottom: 28,
  },

  statCard: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: isWeb ? 32 : 26,
    fontWeight: '800',
    color: '#fbbf24',
    textAlign: 'center',
    marginBottom: 10,
  },
  statSource: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },

  protocolCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  protocolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  protocolHeaderText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: 1.2,
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
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  protocolRowText: {
    fontSize: 15,
    color: '#0f172a',
    lineHeight: 22,
    fontWeight: '500',
  },
  protocolDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 16,
  },
  protocolWhy: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  protocolWhyLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  protocolWhyText: {
    fontSize: 12,
    color: '#64748b',
    fontStyle: 'italic',
    lineHeight: 18,
    flex: 1,
  },

  scienceToggle: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#0ea5e9',
    alignItems: 'center',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  scienceToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  scienceBox: {
    backgroundColor: '#f0f9fe',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#0ea5e9',
    gap: 14,
  },
  citationRow: {
    borderLeftWidth: 3,
    borderLeftColor: '#0f172a',
    paddingLeft: 14,
  },
  citationText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  citationSource: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
  },

  feedbackCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  feedbackQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  feedbackRow: {
    flexDirection: 'row',
    gap: 12,
  },
  feedbackOption: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  feedbackEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  feedbackLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 15,
  },

  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  resultEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultBody: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
    maxWidth: 420,
  },
  nextPreviewCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 20,
    width: '100%',
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
    color: '#94a3b8',
    lineHeight: 20,
    fontStyle: 'italic',
  },

  spacer: {
    height: 40,
  },

  navBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  navInner: {
    maxWidth: 720,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  navPlaceholder: {
    flex: 1,
  },
  prevBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  prevBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  nextBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  nextBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  continueBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#0f172a',
    marginTop: 16,
  },
  continueBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
});
