import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  SLEEP_LESSON_CONTENT,
} from '@/data/sleepLessonContent';
import { ChronotypeGrid } from '@/components/ChronotypeGrid';

interface Props {
  lessonId: string;
  onComplete?: () => void;
}

const STEPS = ['hook', 'insight', 'mechanism', 'application', 'commit'];

function buildPubMedSearchUrl(source: string, citation: string) {
  const query = `${source} ${citation}`.trim();
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`;
}

type SourceKind = 'peer' | 'secondary';

function classifySource(source: string): SourceKind {
  const s = source.toLowerCase();
  const secondaryHints = [
    'why we sleep',
    'por que nós dormimos',
    'por que dormimos',
    'atomic habits',
    'hábitos atômicos',
    'diet plan',
    '(book)',
    'nobel prize',
    'nobel de',
    'holt paperbacks',
    'scribner',
    'penguin',
    'avery',
    'rodale',
  ];
  return secondaryHints.some((hint) => s.includes(hint)) ? 'secondary' : 'peer';
}

function DifficultyBadge({ difficulty, isPt }: { difficulty: string; isPt: boolean }) {
  const map: Record<string, { emoji: string; label: string; color: string; bg: string }> = {
    easy:     { emoji: '🟢', label: isPt ? 'Fácil'    : 'Easy',     color: '#16a34a', bg: 'rgba(22,163,74,0.12)' },
    medium:   { emoji: '🟡', label: isPt ? 'Médio'    : 'Medium',   color: '#ca8a04', bg: 'rgba(202,138,4,0.12)' },
    advanced: { emoji: '🔴', label: isPt ? 'Avançado' : 'Advanced', color: '#dc2626', bg: 'rgba(220,38,38,0.12)' },
  };
  const d = map[difficulty] || map.easy;
  return (
    <View style={[s.badge, { backgroundColor: d.bg }]}>
      <Text style={s.badgeEmoji}>{d.emoji}</Text>
      <Text style={[s.badgeText, { color: d.color }]}>{d.label}</Text>
    </View>
  );
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <View style={s.dots}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            s.dot,
            i < current ? s.dotDone : i === current ? s.dotActive : s.dotPending,
          ]}
        />
      ))}
    </View>
  );
}

function TagLabel({ tag }: { tag: string }) {
  return (
    <View style={s.tagRow}>
      <Text style={s.tagText}>{tag}</Text>
    </View>
  );
}

export function SleepLessonCard({ lessonId, onComplete }: Props) {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const scrollRef = useRef<ScrollView>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [scienceOpen, setScienceOpen] = useState(false);

  useEffect(() => {
    setCurrentStep(0);
    setScienceOpen(false);
  }, [lessonId]);

  const lesson = SLEEP_LESSON_CONTENT.find((l) => l.id === lessonId);
  if (!lesson) {
    return (
      <View style={s.errorBox}>
        <Text style={s.errorText}>Lesson not found</Text>
      </View>
    );
  }

  const data = isPt ? lesson.pt : lesson.en;

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      console.log("SLEEP LESSON CARD goNext, current:", currentStep, "next:", currentStep + 1);
      setCurrentStep((p) => p + 1);
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }
  };

  const nextLabel = isPt ? 'Próximo' : 'Next';

  return (
    <View style={s.root}>
      <View style={s.stepBar}>
        <StepDots current={currentStep} total={STEPS.length} />
        <Text style={s.stepCount}>{currentStep + 1} / {STEPS.length}</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        key={currentStep}
        style={s.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        {currentStep === 0 && (
          <>
            <TagLabel tag={data.hook.tag} />
            <Text style={s.cardTitle}>{data.hook.title}</Text>
            <Text style={s.cardBody}>{data.hook.body}</Text>

            <View style={s.statCard}>
              <Text style={s.statNumber}>{data.dataPoint.stat}</Text>
              <Text style={s.statSource}>{data.dataPoint.source}</Text>
            </View>
          </>
        )}

        {currentStep === 1 && (
          <>
            <TagLabel tag={data.insight.tag} />
            <Text style={s.cardTitle}>{data.insight.title}</Text>
            <Text style={s.cardBody}>{data.insight.body}</Text>
            {lessonId === '2' && <ChronotypeGrid variant="dark" />}
          </>
        )}

        {currentStep === 2 && (
          <>
            <TagLabel tag={data.mechanism.tag} />
            <Text style={s.cardTitle}>{data.mechanism.title}</Text>
            <Text style={s.cardBody}>{data.mechanism.body}</Text>
          </>
        )}

        {currentStep === 3 && (
          <>
            <TagLabel tag={data.application.tag} />
            <Text style={s.cardTitle}>{data.application.title}</Text>
            <Text style={s.cardBody}>{data.application.body}</Text>

            <View style={s.protocolCard}>
              <View style={s.protocolHeader}>
                <Text style={s.protocolHeaderText}>
                  {isPt ? 'O PROTOCOLO' : 'THE PROTOCOL'}
                </Text>
                <DifficultyBadge difficulty={data.protocol.difficulty} isPt={isPt} />
              </View>

              <View style={s.protocolRow}>
                <Text style={s.protocolIcon}>🌙</Text>
                <View style={s.protocolRowContent}>
                  <Text style={s.protocolRowLabel}>{isPt ? 'Hoje à noite' : 'Tonight'}</Text>
                  <Text style={s.protocolRowText}>{data.protocol.tonight}</Text>
                </View>
              </View>

              <View style={s.protocolDivider} />

              <View style={s.protocolRow}>
                <Text style={s.protocolIcon}>☀️</Text>
                <View style={s.protocolRowContent}>
                  <Text style={s.protocolRowLabel}>{isPt ? 'Amanhã de manhã' : 'Tomorrow morning'}</Text>
                  <Text style={s.protocolRowText}>{data.protocol.morning}</Text>
                </View>
              </View>

              <View style={s.protocolWhy}>
                <Text style={s.protocolWhyLabel}>{isPt ? 'Por que funciona: ' : 'Why it works: '}</Text>
                <Text style={s.protocolWhyText}>{data.protocol.why}</Text>
              </View>
            </View>
          </>
        )}

        {currentStep === 4 && (
          <>
            <TouchableOpacity
              style={s.scienceToggle}
              onPress={() => setScienceOpen((o) => !o)}
              activeOpacity={0.8}
            >
              <Text style={s.scienceToggleText}>
                🔬 {isPt ? 'Ver Ciência Completa' : 'See Full Science'} {scienceOpen ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {scienceOpen && (
              <View style={s.scienceBox}>
                <Text style={s.scienceDisclaimer}>
                  {isPt
                    ? 'Resumo autoral do estudo (sem reprodução de texto protegido).'
                    : 'Author-written summary of the study (no copyrighted text reproduction).'}
                </Text>
                {[...data.science]
                  .sort((a, b) => {
                    const aRank = classifySource(a.source) === 'peer' ? 0 : 1;
                    const bRank = classifySource(b.source) === 'peer' ? 0 : 1;
                    return aRank - bRank;
                  })
                  .map((c, i) => {
                    const kind = classifySource(c.source);
                    return (
                  <View key={i} style={s.citationRow}>
                    <View style={[s.credibilityBadge, kind === 'peer' ? s.credibilityPeer : s.credibilitySecondary]}>
                      <Text style={s.credibilityBadgeText}>
                        {kind === 'peer'
                          ? (isPt ? 'Artigo revisado por pares' : 'Peer-reviewed article')
                          : (isPt ? 'Fonte secundária' : 'Secondary source')}
                      </Text>
                    </View>
                    <Text style={s.citationText}>{c.citation}</Text>
                    <Text style={s.citationSource}>{c.source}</Text>
                    <TouchableOpacity
                      onPress={() => void Linking.openURL(buildPubMedSearchUrl(c.source, c.citation))}
                      style={s.referenceLinkBtn}
                      activeOpacity={0.8}
                    >
                      <Text style={s.referenceLinkText}>
                        {isPt ? 'Abrir referência no PubMed' : 'Open reference on PubMed'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                    );
                  })}
              </View>
            )}

            <View style={s.resultCard}>
              <Text style={s.resultEmoji}>✅</Text>
              <Text style={s.resultTitle}>
                {isPt ? 'Lição concluída!' : 'Lesson complete!'}
              </Text>
              <Text style={s.resultBody}>
                {isPt ? 'Até amanhã.' : 'See you tomorrow.'}
              </Text>
              <View style={s.nextPreviewCard}>
                <Text style={s.nextPreviewLabel}>
                  {isPt ? 'Próxima lição:' : 'Next lesson:'}
                </Text>
                <Text style={s.nextPreviewText}>{data.nextPreview}</Text>
              </View>
            </View>
            {onComplete && (
              <TouchableOpacity style={s.continueBtn} onPress={onComplete} activeOpacity={0.8}>
                <Text style={s.continueBtnText}>{isPt ? 'Continuar' : 'Continue'}</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        <View style={s.spacer} />
      </ScrollView>

      {currentStep < STEPS.length - 1 && (
        <View style={s.navBar}>
          <View style={s.navPlaceholder} />
          <TouchableOpacity style={s.nextBtn} onPress={goNext} activeOpacity={0.8}>
            <Text style={s.nextBtnText}>{nextLabel}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0d16',
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d0d16',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
  },

  stepBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotDone: {
    backgroundColor: '#d4a96a',
  },
  dotActive: {
    backgroundColor: '#d4a96a',
    width: 24,
  },
  dotPending: {
    backgroundColor: 'rgba(212,169,106,0.2)',
  },
  stepCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5568',
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 16,
  },

  tagRow: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212,169,106,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#d4a96a',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#e8d5b7',
    marginBottom: 16,
    lineHeight: 30,
  },
  cardBody: {
    fontSize: 16,
    color: '#8892a4',
    lineHeight: 26,
    marginBottom: 24,
  },

  statCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.2)',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#d4a96a',
    textAlign: 'center',
    marginBottom: 8,
  },
  statSource: {
    fontSize: 12,
    color: '#4a5568',
    textAlign: 'center',
  },

  protocolCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.25)',
    marginBottom: 8,
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
    color: '#d4a96a',
    letterSpacing: 1.2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
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
    color: '#4a5568',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  protocolRowText: {
    fontSize: 15,
    color: '#e8d5b7',
    lineHeight: 22,
    fontWeight: '500',
  },
  protocolDivider: {
    height: 1,
    backgroundColor: 'rgba(212,169,106,0.15)',
    marginBottom: 16,
  },
  protocolWhy: {
    backgroundColor: 'rgba(212,169,106,0.05)',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  protocolWhyLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#d4a96a',
  },
  protocolWhyText: {
    fontSize: 12,
    color: '#8892a4',
    fontStyle: 'italic',
    lineHeight: 18,
    flex: 1,
  },

  scienceToggle: {
    backgroundColor: 'rgba(14, 165, 233, 0.08)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#0ea5e9',
    alignItems: 'center',
  },
  scienceToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0ea5e9',
  },
  scienceBox: {
    backgroundColor: 'rgba(14, 165, 233, 0.06)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0ea5e9',
    gap: 12,
  },
  citationRow: {
    borderLeftWidth: 2,
    borderLeftColor: '#d4a96a',
    paddingLeft: 12,
  },
  citationText: {
    fontSize: 13,
    color: '#c8a876',
    lineHeight: 20,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  citationSource: {
    fontSize: 11,
    color: '#4a5568',
    fontWeight: '600',
  },
  referenceLinkBtn: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  referenceLinkText: {
    fontSize: 11,
    color: '#5fb4df',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  credibilityBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
  },
  credibilityPeer: {
    backgroundColor: 'rgba(16,185,129,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.45)',
  },
  credibilitySecondary: {
    backgroundColor: 'rgba(251,191,36,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.45)',
  },
  credibilityBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#d5e9f5',
  },
  scienceDisclaimer: {
    fontSize: 11,
    color: '#7aa6bf',
    lineHeight: 16,
    marginBottom: 2,
  },

  feedbackCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.2)',
    marginBottom: 8,
  },
  feedbackQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#e8d5b7',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  feedbackRow: {
    flexDirection: 'row',
    gap: 10,
  },
  feedbackOption: {
    flex: 1,
    backgroundColor: '#0d0d16',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  feedbackEmoji: {
    fontSize: 26,
    marginBottom: 6,
  },
  feedbackLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8892a4',
    textAlign: 'center',
    lineHeight: 15,
  },

  resultCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.2)',
    marginBottom: 8,
  },
  resultEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e8d5b7',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultBody: {
    fontSize: 15,
    color: '#8892a4',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  nextPreviewCard: {
    backgroundColor: '#0f1a2e',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.15)',
  },
  nextPreviewLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#d4a96a',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  nextPreviewText: {
    fontSize: 14,
    color: '#c8a876',
    lineHeight: 20,
    fontStyle: 'italic',
  },

  spacer: {
    height: 24,
  },

  navBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    backgroundColor: '#0d0d16',
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
    borderColor: 'rgba(212,169,106,0.25)',
    backgroundColor: 'transparent',
  },
  prevBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#d4a96a',
  },
  nextBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#d4a96a',
  },
  nextBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  continueBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#d4a96a',
    marginTop: 16,
  },
  continueBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
});
