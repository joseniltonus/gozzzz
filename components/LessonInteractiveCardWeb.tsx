import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CircleCheck as CheckCircle } from 'lucide-react-native';
import { LESSONS_DATA } from '@/data/lessons';
import { LESSON_ENHANCEMENTS } from '@/data/lessonEnhancements';
import { LESSON_FONT, LESSON_INK, LESSON_PAPER } from '@/constants/lessonPaperTheme';

interface LessonInteractiveCardWebProps {
  lessonId: string;
  onComplete?: () => void;
}

const READ_MAX = 600;

export const LessonInteractiveCardWeb = ({ lessonId, onComplete }: LessonInteractiveCardWebProps) => {
  const { width: windowWidth } = useWindowDimensions();
  const padH = windowWidth < 400 ? 16 : 22;
  useEffect(() => {
    onComplete?.();
  }, [onComplete]);

  const { language } = useLanguage();
  const isPortuguese = language === 'pt';
  const lang = language as 'pt' | 'en';

  const lesson = LESSONS_DATA.find((l) => l.id === lessonId);
  const enhancement = LESSON_ENHANCEMENTS.find((e) => e.lessonId === lessonId);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lesson not found</Text>
      </View>
    );
  }

  const getDescription = () => language === 'pt' ? lesson.description_pt : lesson.description_en;
  const keyPoints = enhancement?.keyPoints[lang] || [];
  const expertTips = enhancement?.expertTips[lang] || [];

  return (
    <View style={[styles.container, { paddingHorizontal: padH, maxWidth: READ_MAX, alignSelf: 'center', width: '100%' }]}>
      {enhancement?.imageUrl && (
        <Image
          source={{ uri: enhancement.imageUrl }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      )}

      {keyPoints.length > 0 && (
        <View style={styles.keyPointsSection}>
          <Text style={styles.sectionTitle}>{isPortuguese ? 'Pontos Principais' : 'Main Points'}</Text>
          <View style={styles.keyPointsGrid}>
            {keyPoints.map((point, i) => (
              <View key={i} style={styles.keyPointItem}>
                <View style={styles.keyPointCheckmark}>
                  <CheckCircle size={18} color="#10b981" />
                </View>
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {getDescription() && (
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>{isPortuguese ? 'Entenda Melhor' : 'Learn More'}</Text>
          <Text style={styles.descriptionText}>{getDescription()}</Text>
        </View>
      )}

      {expertTips.length > 0 && (
        <View style={styles.expertTipsSection}>
          <Text style={styles.sectionTitle}>{isPortuguese ? 'Dicas de Especialistas' : 'Expert Tips'}</Text>
          <View style={styles.expertTipsGrid}>
            {expertTips.map((tip, i) => (
              <View key={i} style={styles.expertTipItem}>
                <View style={styles.expertTipHeader}>
                  <Text style={styles.expertName}>{tip.expert}</Text>
                </View>
                <Text style={styles.expertTipText}>{tip.tip}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LESSON_PAPER.canvas,
    paddingVertical: 20,
    gap: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginTop: 20,
  },
  heroImage: {
    width: '100%',
    height: 220,
    marginBottom: 16,
    borderRadius: 14,
  },
  keyPointsSection: {
    paddingVertical: 16,
  },
  keyPointsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  keyPointItem: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
    backgroundColor: LESSON_PAPER.elevated,
    padding: 18,
    borderRadius: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
  },
  keyPointCheckmark: {
    marginTop: 2,
    flexShrink: 0,
  },
  keyPointText: {
    fontSize: 15,
    color: LESSON_INK.body,
    lineHeight: 25,
    flex: 1,
    letterSpacing: 0.02,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  descriptionSection: {
    paddingVertical: 20,
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
  },
  descriptionText: {
    fontSize: 16,
    color: LESSON_INK.body,
    lineHeight: 28,
    marginBottom: 8,
    letterSpacing: 0.02,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: LESSON_INK.display,
    marginBottom: 14,
    letterSpacing: -0.35,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  expertTipsSection: {
    paddingVertical: 16,
  },
  expertTipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  expertTipItem: {
    width: '100%',
    backgroundColor: LESSON_PAPER.elevated,
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: LESSON_PAPER.foil,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
  },
  expertTipHeader: {
    marginBottom: 10,
  },
  expertName: {
    fontSize: 14,
    fontWeight: '700',
    color: LESSON_INK.display,
    marginBottom: 6,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  expertTipText: {
    fontSize: 15,
    color: LESSON_INK.muted,
    lineHeight: 25,
    fontStyle: 'italic',
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  spacer: {
    height: 20,
  },
});
