import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { CircleCheck as CheckCircle, Brain, Zap, Heart, Lightbulb, Clock, Moon } from 'lucide-react-native';
import { LESSONS_DATA } from '@/data/lessons';
import { LESSON_ENHANCEMENTS } from '@/data/lessonEnhancements';

interface LessonInteractiveCardProps {
  lessonId: string;
  onComplete?: () => void;
}

export const LessonInteractiveCard = ({ lessonId, onComplete }: LessonInteractiveCardProps) => {
  React.useEffect(() => {
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
  const stats = enhancement && enhancement.stats ? enhancement.stats[lang] : [];
  const concepts = enhancement && enhancement.concepts ? enhancement.concepts[lang] : [];
  const insights = enhancement && enhancement.insights ? enhancement.insights[lang] : [];
  const quickTips = enhancement && enhancement.quickTips ? enhancement.quickTips[lang] : [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {stats.length > 0 && (
        <View style={styles.statsRow}>
          {stats.map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statNumber}>{stat.number}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statDescription}>{stat.description}</Text>
            </View>
          ))}
        </View>
      )}

      {concepts.length > 0 && (
        <View style={styles.conceptGrid}>
          {concepts.map((card, i) => (
            <View key={i} style={[styles.conceptCard, { backgroundColor: card.color }]}>
              <Text style={styles.conceptEmoji}>{card.icon}</Text>
              <Text style={[styles.conceptTitle, { color: card.textColor }]}>{card.title}</Text>
              <Text style={[styles.conceptDescription, { color: card.textColor }]}>
                {card.description}
              </Text>
            </View>
          ))}
        </View>
      )}

      {insights.length > 0 && (
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>{isPortuguese ? 'Pontos-chave' : 'Key Insights'}</Text>
          {insights.map((insight, i) => {
            const getIcon = (iconName: string) => {
              const iconMap: Record<string, any> = {
                Brain, Moon, Zap, Heart, Lightbulb, Clock
              };
              return iconMap[iconName] || Brain;
            };
            const IconComponent = getIcon(insight.icon);
            return (
              <View key={i} style={styles.insightRow}>
                <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                  <IconComponent size={20} color={insight.color} />
                </View>
                <View style={styles.insightContent}>
                  <Text style={styles.insightTitle}>{insight.title}</Text>
                  <Text style={styles.insightDescription}>{insight.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {quickTips.length > 0 && (
        <View style={styles.quickTipsSection}>
          <Text style={styles.sectionTitle}>{isPortuguese ? 'Dicas Rápidas' : 'Quick Tips'}</Text>
          <View style={styles.tipsGrid}>
            {quickTips.map((tip, i) => {
              const getIcon = (iconName: string) => {
                const iconMap: Record<string, any> = {
                  Brain, Moon, Zap, Heart, Lightbulb, Clock
                };
                return iconMap[iconName] || Clock;
              };
              const IconComponent = getIcon(tip.icon);
              return (
                <View key={i} style={styles.tipCard}>
                  <View style={styles.tipIconContainer}>
                    <IconComponent size={24} color="#6366f1" />
                  </View>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription}>{tip.description}</Text>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {keyPoints.length > 0 && (
        <View style={styles.keyPointsSection}>
          <Text style={styles.sectionTitle}>{isPortuguese ? 'Pontos Principais' : 'Main Points'}</Text>
          {keyPoints.map((point, i) => (
            <View key={i} style={styles.keyPointItem}>
              <View style={styles.keyPointCheckmark}>
                <CheckCircle size={18} color="#10b981" />
              </View>
              <Text style={styles.keyPointText}>{point}</Text>
            </View>
          ))}
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
          {expertTips.map((tip, i) => (
            <View key={i} style={styles.expertTipItem}>
              <View style={styles.expertTipHeader}>
                <Text style={styles.expertName}>{tip.expert}</Text>
              </View>
              <Text style={styles.expertTipText}>{tip.tip}</Text>
            </View>
          ))}
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
  heroSection: {
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  heroImage: {
    width: '100%',
    height: 240,
  },
  heroContent: {
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  statDescription: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  conceptGrid: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  conceptCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  conceptEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  conceptTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  conceptDescription: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  insightsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
  insightRow: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
  quickTipsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tipCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
  },
  keyPointsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  keyPointItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  keyPointCheckmark: {
    marginTop: 2,
    flexShrink: 0,
  },
  keyPointText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    flex: 1,
  },
  descriptionSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  expertTipsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  expertTipItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  expertTipHeader: {
    marginBottom: 8,
  },
  expertName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  expertTipText: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  videoButton: {
    marginHorizontal: 16,
    marginVertical: 20,
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  videoButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  spacer: {
    height: 20,
  },
});
