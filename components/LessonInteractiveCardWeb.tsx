import { View, Text, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CircleCheck as CheckCircle } from 'lucide-react-native';
import { LESSONS_DATA } from '@/data/lessons';
import { LESSON_ENHANCEMENTS } from '@/data/lessonEnhancements';

interface LessonInteractiveCardWebProps {
  lessonId: string;
  onComplete?: () => void;
}

const isWeb = Platform.OS === 'web';

export const LessonInteractiveCardWeb = ({ lessonId, onComplete }: LessonInteractiveCardWebProps) => {
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginTop: 20,
  },
  heroImage: {
    width: '100%',
    height: isWeb ? 340 : 240,
    marginBottom: 20,
  },
  keyPointsSection: {
    paddingHorizontal: isWeb ? 48 : 16,
    paddingVertical: isWeb ? 40 : 20,
  },
  keyPointsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  keyPointItem: {
    width: isWeb ? '48%' : '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  keyPointCheckmark: {
    marginTop: 2,
    flexShrink: 0,
  },
  keyPointText: {
    fontSize: isWeb ? 14 : 13,
    color: '#475569',
    lineHeight: 20,
    flex: 1,
  },
  descriptionSection: {
    paddingHorizontal: isWeb ? 48 : 16,
    paddingVertical: isWeb ? 40 : 20,
    backgroundColor: '#ffffff',
    marginHorizontal: isWeb ? 48 : 16,
    borderRadius: 12,
    marginBottom: isWeb ? 40 : 20,
    maxWidth: isWeb ? 900 : undefined,
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: isWeb ? 15 : 14,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: isWeb ? 22 : 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  expertTipsSection: {
    paddingHorizontal: isWeb ? 48 : 16,
    paddingVertical: isWeb ? 40 : 20,
  },
  expertTipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  expertTipItem: {
    width: isWeb ? '48%' : '100%',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  expertTipHeader: {
    marginBottom: 10,
  },
  expertName: {
    fontSize: isWeb ? 14 : 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  expertTipText: {
    fontSize: isWeb ? 14 : 13,
    color: '#64748b',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  spacer: {
    height: 20,
  },
});
