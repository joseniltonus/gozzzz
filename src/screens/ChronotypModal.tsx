import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@/src/components/PrimaryButton';
import GhostButton from '@/src/components/GhostButton';
import ProgressBar from '@/src/components/ProgressBar';

type ChronotypModalProps = {
  visible: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
};

export default function ChronotypModal({ visible, onClose, onStartQuiz }: ChronotypModalProps) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (visible) {
      setSlide(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.headerRow}>
          <View style={styles.headerSpacer} />
          <Pressable onPress={onClose} hitSlop={12} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.progressWrap}>
            <ProgressBar current={slide + 1} total={3} />
          </View>

          {slide === 0 && (
            <View style={styles.slide}>
              <Text style={styles.slideIcon}>🧬</Text>
              <Text style={styles.title}>Seu sono tem um tipo biológico</Text>
              <Text style={styles.body}>
                Chamado cronotipo, ele define seus horários naturais de energia, foco e descanso — e não tem
                nada a ver com força de vontade.
              </Text>
              <PrimaryButton label="Próximo →" onPress={() => setSlide(1)} style={styles.primaryTop} />
              <GhostButton label="Ir para o teste" onPress={onStartQuiz} style={styles.ghostTop} />
            </View>
          )}

          {slide === 1 && (
            <View style={styles.slide}>
              <Text style={styles.animals}>🦁  🐻  🐺  🐬</Text>
              <Text style={styles.title}>4 perfis, um é o seu</Text>
              <Text style={styles.body}>
                Leão, Urso, Lobo ou Golfinho. Cada cronotipo tem horários ideais de sono, foco e energia
                completamente diferentes.
              </Text>
              <PrimaryButton label="Próximo →" onPress={() => setSlide(2)} style={styles.primaryTop} />
              <GhostButton label="Ir para o teste" onPress={onStartQuiz} style={styles.ghostTop} />
            </View>
          )}

          {slide === 2 && (
            <View style={styles.slide}>
              <Text style={styles.slideIcon}>🔬</Text>
              <Text style={styles.title}>Baseado em ciência real</Text>
              <Text style={styles.body}>
                Desenvolvido com base no trabalho dos Drs. Michael Breus (American Board of Sleep Medicine),
                Matthew Walker (UC Berkeley) e Andrew Huberman (Stanford University).
              </Text>
              <PrimaryButton label="Fazer o teste agora" onPress={onStartQuiz} style={styles.primaryTop} />
              <Text style={styles.disclaimer}>
                Este app não é afiliado nem endossado por esses pesquisadores.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0c0e1a',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  headerSpacer: {
    flex: 1,
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#4a5275',
  },
  scroll: {
    paddingHorizontal: 22,
    paddingBottom: 32,
    flexGrow: 1,
  },
  progressWrap: {
    marginBottom: 32,
  },
  slide: {
    alignItems: 'stretch',
  },
  slideIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 16,
  },
  animals: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  body: {
    fontSize: 14,
    color: '#8b92b8',
    textAlign: 'center',
    lineHeight: 22,
  },
  primaryTop: {
    marginTop: 32,
  },
  ghostTop: {
    marginTop: 8,
  },
  disclaimer: {
    fontSize: 10,
    color: '#3a4060',
    textAlign: 'center',
    marginTop: 12,
  },
});
