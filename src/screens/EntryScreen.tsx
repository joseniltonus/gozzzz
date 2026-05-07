import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  Easing,
  type ViewStyle,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Check, ChevronRight, Lock, Sparkles, Timer } from 'lucide-react-native';
import ChronotypInfoModal from '@/src/screens/ChronotypModal';
import { entryTokens as T, researcherAvatar, type ResearcherKey } from '@/src/screens/entryScreenTokens';

type IconProps = { size?: number; color?: string; strokeWidth?: number };
type LucideIcon = ComponentType<IconProps>;

type StarConfig = {
  key: string;
  leftPct: number;
  topPct: number;
  size: number;
  minOp: number;
  maxOp: number;
  duration: number;
};

function makeStars(): StarConfig[] {
  const out: StarConfig[] = [];
  for (let i = 0; i < 60; i += 1) {
    const a = 0.1 + Math.random() * 0.38;
    const b = 0.1 + Math.random() * 0.38;
    out.push({
      key: `s${i}`,
      leftPct: Math.random() * 100,
      topPct: Math.random() * 100,
      size: 0.4 + Math.random() * 2,
      minOp: Math.min(a, b),
      maxOp: Math.max(a, b),
      duration: 2000 + Math.floor(Math.random() * 5001),
    });
  }
  return out;
}

function buildStarPositionStyles(configs: readonly StarConfig[]) {
  const o: Record<string, ViewStyle> = {};
  configs.forEach((c, i) => {
    o[`star${i}`] = {
      position: 'absolute',
      left: `${c.leftPct}%`,
      top: `${c.topPct}%`,
      width: c.size,
      height: c.size,
      borderRadius: c.size / 2,
      backgroundColor: T.color.star,
    };
  });
  return StyleSheet.create(o);
}

function StarField({ configs, positionStyles }: { configs: readonly StarConfig[]; positionStyles: ReturnType<typeof buildStarPositionStyles> }) {
  return (
    <View style={styles.starField} pointerEvents="none">
      {configs.map((c, i) => (
        <PulsingStar key={c.key} config={c} positionStyle={positionStyles[`star${i}` as keyof typeof positionStyles]} />
      ))}
    </View>
  );
}

function PulsingStar({
  config,
  positionStyle,
}: {
  config: StarConfig;
  positionStyle: ViewStyle;
}) {
  const t = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(t, {
          toValue: 1,
          duration: config.duration / 2,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
        Animated.timing(t, {
          toValue: 0,
          duration: config.duration / 2,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.sin),
        }),
      ]),
    );
    anim.start();
    return () => {
      anim.stop();
    };
  }, [config.duration, t]);

  const opacity = t.interpolate({
    inputRange: [0, 1],
    outputRange: [config.minOp, config.maxOp],
  });

  return <Animated.View style={[positionStyle, { opacity }]} />;
}

function LogoBlock() {
  const zzzzMaskText = (
    <Text style={styles.logoZzzzMask} allowFontScaling={false}>
      Zzzz
    </Text>
  );

  return (
    <View style={styles.logoBlock}>
      <View style={styles.logoRow}>
        <Text style={styles.logoGo} allowFontScaling={false}>
          Go
        </Text>
        {Platform.OS === 'web' ? (
          <Text style={styles.logoZzzzFallback} allowFontScaling={false}>
            Zzzz
          </Text>
        ) : (
          <MaskedView style={styles.logoMaskWrap} maskElement={zzzzMaskText}>
            <LinearGradient
              colors={[...T.color.gradient.brandWordmark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.logoGradientFill}
            >
              <Text style={styles.logoZzzzHidden} allowFontScaling={false}>
                Zzzz
              </Text>
            </LinearGradient>
          </MaskedView>
        )}
      </View>
      <Text style={styles.tagline}>PROGRAMA DE SONO EM 21 PASSOS</Text>
    </View>
  );
}

function ScienceBadge() {
  const op = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(op, {
          toValue: 0.35,
          duration: 1100,
          useNativeDriver: true,
          easing: Easing.bezier(0.45, 0, 0.55, 1),
        }),
        Animated.timing(op, {
          toValue: 1,
          duration: 1100,
          useNativeDriver: true,
          easing: Easing.bezier(0.45, 0, 0.55, 1),
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [op]);

  return (
    <View style={styles.badgePill}>
      <Animated.View style={[styles.badgeDot, { opacity: op }]} />
      <Text style={styles.badgeText}>CIÊNCIA DO SONO</Text>
    </View>
  );
}

function HeadlineBlock() {
  return (
    <Text style={styles.headline} allowFontScaling={false}>
      Você acorda{'\n'}cansado mesmo{'\n'}dormindo <Text style={styles.headlineAccent}>8 horas?</Text>
    </Text>
  );
}

function BridgeBlock() {
  return (
    <Text style={styles.bridge} allowFontScaling={false}>
      Seu corpo tem um <Text style={styles.bridgeEm}>código de sono</Text>.{'\n'}Descubra o seu em{' '}
      <Text style={styles.bridgeTab}>60</Text> segundos{'\n'}e acorde com mais energia.
    </Text>
  );
}

const SHIMMER_FROM = -200;
const SHIMMER_TO = 500;

function CtaButton({ onPress }: { onPress: () => void }) {
  const tx = useRef(new Animated.Value(SHIMMER_FROM)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(tx, {
        toValue: SHIMMER_TO,
        duration: 3200,
        useNativeDriver: true,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      }),
    );
    anim.start();
    return () => anim.stop();
  }, [tx]);

  return (
    <TouchableOpacity style={styles.ctaTouchable} activeOpacity={0.92} onPress={onPress}>
      <View style={styles.ctaShadowWrap}>
        <LinearGradient
          colors={[...T.color.gradient.cta]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaGradient}
        >
          <View style={styles.ctaTopHairline} />
          <Animated.View style={[styles.ctaShimmerTranslate, { transform: [{ translateX: tx }] }]}>
            <View style={styles.ctaShimmerSkew} />
          </Animated.View>
          <View style={styles.ctaLabelRow}>
            <Text style={styles.ctaLabel}>Descobrir meu código de sono</Text>
            <ArrowRight
              size={T.icon.cta}
              color={T.color.text.inverse}
              strokeWidth={T.strokeWidth.emphasis}
              style={styles.ctaIcon}
            />
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

function MetaCell({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <View style={styles.metaCell}>
      <Icon size={T.icon.md} color={T.color.icon.muted} strokeWidth={T.strokeWidth.regular} />
      <Text style={styles.metaItem}>{label}</Text>
    </View>
  );
}

function MetaRow() {
  return (
    <View style={styles.metaRow}>
      <MetaCell Icon={Check} label="Gratuito" />
      <View style={styles.metaSep} />
      <MetaCell Icon={Timer} label="60 segundos" />
      <View style={styles.metaSep} />
      <MetaCell Icon={Lock} label="Sem cadastro" />
    </View>
  );
}

function DividerRow() {
  return (
    <View style={styles.dividerRow}>
      <View style={styles.dividerLine} />
      <Sparkles size={T.icon.sm} color={T.color.icon.dim} strokeWidth={T.strokeWidth.hairline} style={styles.dividerSparkle} />
      <View style={styles.dividerLine} />
    </View>
  );
}

type Researcher = {
  key: ResearcherKey;
  initials: string;
  name: string;
  institution: string;
  specialty: string;
};

const RESEARCHERS: Researcher[] = [
  {
    key: 'MB',
    initials: 'MB',
    name: 'Dr. Michael Breus',
    institution: 'American Board of Sleep Medicine',
    specialty: 'Cronobiologia circadiana',
  },
  {
    key: 'MW',
    initials: 'MW',
    name: 'Dr. Matthew Walker',
    institution: 'UC Berkeley',
    specialty: 'Neurociência do sono',
  },
  {
    key: 'AH',
    initials: 'AH',
    name: 'Dr. Andrew Huberman',
    institution: 'Stanford University',
    specialty: 'Neurobiologia aplicada',
  },
  {
    key: 'CC',
    initials: 'CC',
    name: 'Dr. Charles Czeisler',
    institution: 'Harvard Medical School',
    specialty: 'Ritmo circadiano',
  },
];

function ResearcherCard({ r }: { r: Researcher }) {
  const avatarStyle = styles[`rAvatar_${r.key}`];
  const avatarTextStyle = styles[`rAvatarTxt_${r.key}`];
  return (
    <View style={styles.rCardShell}>
      <LinearGradient
        colors={[...T.color.gradient.card]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.rCardGrad}
      >
        <View style={styles.rCardHairline} />
        <View style={styles.rCheckWrap}>
          <Check size={T.icon.xs} color={T.color.success.icon} strokeWidth={T.strokeWidth.bold} />
        </View>
        <View style={styles.rCardInner}>
          <View style={avatarStyle}>
            <Text style={avatarTextStyle}>{r.initials}</Text>
          </View>
          <View style={styles.rTextCol}>
            <Text style={styles.rName}>{r.name}</Text>
            <Text style={styles.rInst}>{r.institution}</Text>
            <Text style={styles.rSpec}>{r.specialty}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function ResearchersGrid() {
  return (
    <View style={styles.gridSection}>
      <Text style={styles.gridLabel}>FUNDAMENTADO EM</Text>
      <View style={styles.gridWrap}>
        {RESEARCHERS.map((r) => (
          <View key={r.key} style={styles.gridCell}>
            <ResearcherCard r={r} />
          </View>
        ))}
      </View>
    </View>
  );
}

export default function EntryScreen() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const starConfigs = useMemo(() => makeStars(), []);
  const starPositionStyles = useMemo(() => buildStarPositionStyles(starConfigs), [starConfigs]);

  const goQuiz = () => {
    router.push('/(auth)/quiz');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.bgFill} />
      <View style={styles.glow1} />
      <View style={styles.glow2} />
      <StarField configs={starConfigs} positionStyles={starPositionStyles} />
      <StatusBar style="light" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollInner}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LogoBlock />
        <ScienceBadge />
        <HeadlineBlock />
        <BridgeBlock />
        <CtaButton onPress={goQuiz} />
        <MetaRow />
        <DividerRow />
        <ResearchersGrid />
        <Text style={styles.disclaimer}>
          Conceitos aplicados de forma independente.{'\n'}Não somos afiliados nem endossados por esses pesquisadores.
        </Text>
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => setShowModal(true)}
          activeOpacity={0.92}
          hitSlop={{ top: T.space[3], bottom: T.space[3], left: T.space[2], right: T.space[2] }}
        >
          <Text style={styles.linkText}>O que é um código de sono?</Text>
          <View style={styles.linkArrowBox}>
            <ChevronRight size={T.icon.md} color={T.color.icon.chevron} strokeWidth={T.strokeWidth.medium} />
          </View>
        </TouchableOpacity>
        <View style={styles.homeBar} />
      </ScrollView>
      <ChronotypInfoModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onStartQuiz={() => {
          setShowModal(false);
          goQuiz();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: T.color.canvas,
  },
  bgFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: T.color.canvas,
  },
  glow1: {
    position: 'absolute',
    top: T.layout.glow1.top,
    alignSelf: 'center',
    width: T.layout.glow1.width,
    height: T.layout.glow1.height,
    borderRadius: T.layout.glow1.width / 2,
    backgroundColor: T.color.glow.primary,
  },
  glow2: {
    position: 'absolute',
    top: T.layout.glow2.top,
    right: T.layout.glow2.right,
    width: T.layout.glow2.width,
    height: T.layout.glow2.height,
    borderRadius: T.layout.glow2.width / 2,
    backgroundColor: T.color.glow.secondary,
  },
  starField: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  scroll: {
    flex: 1,
    zIndex: 1,
    backgroundColor: T.color.canvas,
  },
  scrollInner: {
    paddingHorizontal: T.space.pageInline,
    paddingTop: T.space.pageTop,
    paddingBottom: T.space.pageBottom,
    alignItems: 'center',
    backgroundColor: T.color.canvas,
  },
  logoBlock: {
    alignItems: 'center',
    marginBottom: T.space[8],
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGo: {
    fontSize: T.type.logo.fontSize,
    fontWeight: T.type.logo.fontWeight,
    letterSpacing: T.type.logo.letterSpacing,
    lineHeight: T.type.logo.lineHeight,
    color: T.color.text.inverse,
    ...(Platform.OS === 'android' ? { includeFontPadding: false } : {}),
  },
  logoMaskWrap: {
    height: T.type.logo.lineHeight,
    minWidth: T.layout.logoMaskMinW,
    justifyContent: 'center',
  },
  logoZzzzMask: {
    fontSize: T.type.logo.fontSize,
    fontWeight: T.type.logo.fontWeight,
    letterSpacing: T.type.logo.letterSpacing,
    lineHeight: T.type.logo.lineHeight,
    backgroundColor: 'transparent',
    color: '#000000',
  },
  logoGradientFill: {
    height: T.type.logo.lineHeight,
    minWidth: T.layout.logoMaskMinW,
    justifyContent: 'center',
  },
  logoZzzzHidden: {
    fontSize: T.type.logo.fontSize,
    fontWeight: T.type.logo.fontWeight,
    letterSpacing: T.type.logo.letterSpacing,
    lineHeight: T.type.logo.lineHeight,
    opacity: 0,
  },
  logoZzzzFallback: {
    fontSize: T.type.logo.fontSize,
    fontWeight: T.type.logo.fontWeight,
    letterSpacing: T.type.logo.letterSpacing,
    lineHeight: T.type.logo.lineHeight,
    color: T.color.text.accentMuted,
  },
  tagline: {
    marginTop: T.space[2],
    fontSize: T.type.overline.fontSize,
    lineHeight: T.type.overline.lineHeight,
    color: T.color.text.overline,
    letterSpacing: T.type.overline.letterSpacing,
    textTransform: 'uppercase',
    fontWeight: T.type.overline.fontWeight,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: T.space[2],
    marginBottom: T.space[6],
    paddingHorizontal: T.space[5],
    paddingVertical: T.space[1] + 2,
    borderRadius: T.radius.pill,
    backgroundColor: T.color.surface.badgeFill,
    borderWidth: T.borderWidth.default,
    borderColor: T.color.border.badge,
    shadowColor: T.color.shadow.badge,
    shadowOffset: T.elevation.badge.shadowOffset,
    shadowOpacity: T.elevation.badge.shadowOpacity,
    shadowRadius: T.elevation.badge.shadowRadius,
    elevation: T.elevation.badge.elevation,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: T.radius.pill,
    backgroundColor: T.color.surface.badgeDot,
  },
  badgeText: {
    fontSize: T.type.badge.fontSize,
    lineHeight: T.type.badge.lineHeight,
    color: T.color.surface.pillLabel,
    letterSpacing: T.type.badge.letterSpacing,
    textTransform: 'uppercase',
    fontWeight: T.type.badge.fontWeight,
  },
  headline: {
    fontSize: T.type.display.fontSize,
    fontWeight: T.type.display.fontWeight,
    color: T.color.text.primary,
    textAlign: 'center',
    lineHeight: T.type.display.lineHeight,
    letterSpacing: T.type.display.letterSpacing,
    marginBottom: T.space[6],
    maxWidth: T.layout.contentMax,
    textShadowColor: T.color.headline.glow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 28,
    ...(Platform.OS === 'android' ? { includeFontPadding: false } : {}),
  },
  headlineAccent: {
    color: T.color.text.accent,
  },
  bridge: {
    fontSize: T.type.body.fontSize,
    fontWeight: T.type.body.fontWeight,
    color: T.color.text.secondary,
    textAlign: 'center',
    lineHeight: T.type.body.lineHeight,
    marginBottom: T.space[8],
    maxWidth: T.layout.bridgeMax,
    letterSpacing: T.type.body.letterSpacing,
    ...(Platform.OS === 'android' ? { includeFontPadding: false } : {}),
  },
  bridgeEm: {
    color: T.color.text.emphasis,
    fontWeight: T.type.bodyEm.fontWeight,
  },
  bridgeTab: {
    fontVariant: ['tabular-nums'],
    letterSpacing: 0.25,
  },
  ctaTouchable: {
    width: '100%',
    marginBottom: T.space[6],
  },
  ctaShadowWrap: {
    borderRadius: T.radius.lg,
    shadowColor: T.color.shadow.cta,
    shadowOffset: T.elevation.cta.shadowOffset,
    shadowOpacity: T.elevation.cta.shadowOpacity,
    shadowRadius: T.elevation.cta.shadowRadius,
    elevation: T.elevation.cta.elevation,
  },
  ctaGradient: {
    borderRadius: T.radius.lg,
    paddingVertical: T.space[5],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: T.borderWidth.default,
    borderColor: T.color.border.cta,
    minHeight: T.space[12] + T.space[2],
  },
  ctaTopHairline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: T.color.surface.ctaHairline,
  },
  ctaShimmerTranslate: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 80,
  },
  ctaShimmerSkew: {
    flex: 1,
    width: 80,
    backgroundColor: T.color.surface.shimmer,
    transform: [{ skewX: '-20deg' }],
  },
  ctaLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: T.space[3],
    paddingHorizontal: T.space[3],
  },
  ctaLabel: {
    fontSize: T.type.cta.fontSize,
    fontWeight: T.type.cta.fontWeight,
    lineHeight: T.type.cta.lineHeight,
    color: T.color.text.inverse,
    letterSpacing: T.type.cta.letterSpacing,
    ...(Platform.OS === 'android' ? { includeFontPadding: false } : {}),
  },
  ctaIcon: {
    marginTop: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: T.space[3],
    rowGap: T.space[2],
    marginBottom: T.space[8],
    paddingHorizontal: T.space[1],
  },
  metaCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: T.space[1] + 2,
  },
  metaItem: {
    fontSize: T.type.caption.fontSize,
    lineHeight: T.type.caption.lineHeight,
    fontWeight: T.type.caption.fontWeight,
    color: T.color.text.meta,
    letterSpacing: T.type.caption.letterSpacing,
  },
  metaSep: {
    width: T.space[1],
    height: T.space[1],
    borderRadius: T.radius.pill,
    backgroundColor: T.color.surface.dividerDot,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: T.space[4],
    width: '100%',
    marginBottom: T.space[8],
    opacity: 0.95,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: T.color.border.hairline,
  },
  dividerSparkle: {
    opacity: 0.9,
  },
  gridSection: {
    width: '100%',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: T.type.label.fontSize,
    lineHeight: T.type.label.lineHeight,
    color: T.color.text.label,
    letterSpacing: T.type.label.letterSpacing,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: T.type.label.fontWeight,
    marginBottom: T.space[3],
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: T.space[3],
    width: '100%',
  },
  gridCell: {
    width: T.layout.gridCellPct,
  },
  rCardShell: {
    borderRadius: T.radius.lg,
    overflow: 'hidden',
    borderWidth: T.borderWidth.default,
    borderColor: T.color.border.subtle,
    shadowColor: T.color.shadow.card,
    shadowOffset: T.elevation.card.shadowOffset,
    shadowOpacity: T.elevation.card.shadowOpacity,
    shadowRadius: T.elevation.card.shadowRadius,
    elevation: T.elevation.card.elevation,
  },
  rCardGrad: {
    paddingTop: T.space[4],
    paddingBottom: T.space[4] - 1,
    paddingHorizontal: T.space[4],
    position: 'relative',
  },
  rCardHairline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: T.color.surface.cardHairline,
    zIndex: 1,
  },
  rCheckWrap: {
    position: 'absolute',
    top: T.space[3],
    right: T.space[3],
    width: T.layout.checkSeal,
    height: T.layout.checkSeal,
    borderRadius: T.radius.seal,
    zIndex: 3,
    backgroundColor: T.color.success.fill,
    borderWidth: T.borderWidth.default,
    borderColor: T.color.success.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: T.color.shadow.check,
    shadowOffset: T.elevation.check.shadowOffset,
    shadowOpacity: T.elevation.check.shadowOpacity,
    shadowRadius: T.elevation.check.shadowRadius,
    elevation: T.elevation.check.elevation,
  },
  rCardInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: T.space[6] + 4,
    paddingTop: T.space[1],
  },
  rAvatar_MB: {
    width: T.layout.avatar,
    height: T.layout.avatar,
    borderRadius: T.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: researcherAvatar.MB.fill,
    borderWidth: T.borderWidth.default,
    borderColor: researcherAvatar.MB.ring,
  },
  rAvatarTxt_MB: {
    fontSize: T.type.avatar.fontSize,
    lineHeight: T.type.avatar.lineHeight,
    fontWeight: T.type.avatar.fontWeight,
    color: researcherAvatar.MB.text,
  },
  rAvatar_MW: {
    width: T.layout.avatar,
    height: T.layout.avatar,
    borderRadius: T.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: researcherAvatar.MW.fill,
    borderWidth: T.borderWidth.default,
    borderColor: researcherAvatar.MW.ring,
  },
  rAvatarTxt_MW: {
    fontSize: T.type.avatar.fontSize,
    lineHeight: T.type.avatar.lineHeight,
    fontWeight: T.type.avatar.fontWeight,
    color: researcherAvatar.MW.text,
  },
  rAvatar_AH: {
    width: T.layout.avatar,
    height: T.layout.avatar,
    borderRadius: T.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: researcherAvatar.AH.fill,
    borderWidth: T.borderWidth.default,
    borderColor: researcherAvatar.AH.ring,
  },
  rAvatarTxt_AH: {
    fontSize: T.type.avatar.fontSize,
    lineHeight: T.type.avatar.lineHeight,
    fontWeight: T.type.avatar.fontWeight,
    color: researcherAvatar.AH.text,
  },
  rAvatar_CC: {
    width: T.layout.avatar,
    height: T.layout.avatar,
    borderRadius: T.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: researcherAvatar.CC.fill,
    borderWidth: T.borderWidth.default,
    borderColor: researcherAvatar.CC.ring,
  },
  rAvatarTxt_CC: {
    fontSize: T.type.avatar.fontSize,
    lineHeight: T.type.avatar.lineHeight,
    fontWeight: T.type.avatar.fontWeight,
    color: researcherAvatar.CC.text,
  },
  rTextCol: {
    flex: 1,
    marginLeft: T.space[3] - 1,
    paddingTop: 1,
  },
  rName: {
    fontSize: T.type.cardTitle.fontSize,
    lineHeight: T.type.cardTitle.lineHeight,
    fontWeight: T.type.cardTitle.fontWeight,
    color: T.color.text.primary,
    letterSpacing: T.type.cardTitle.letterSpacing,
  },
  rInst: {
    fontSize: T.type.cardMeta.fontSize,
    lineHeight: T.type.cardMeta.lineHeight,
    color: T.color.text.secondary,
    marginTop: T.space[1] + 1,
    letterSpacing: T.type.cardMeta.letterSpacing,
  },
  rSpec: {
    fontSize: T.type.cardSpec.fontSize,
    lineHeight: T.type.cardSpec.lineHeight,
    color: T.color.text.tertiary,
    fontStyle: 'italic',
    marginTop: T.space[1] + 1,
    letterSpacing: T.type.cardSpec.letterSpacing,
  },
  disclaimer: {
    fontSize: T.type.disclaimer.fontSize,
    lineHeight: T.type.disclaimer.lineHeight,
    color: T.color.text.caption,
    textAlign: 'center',
    marginTop: T.space[6],
    marginBottom: T.space[4],
    maxWidth: T.layout.disclaimerMax,
    letterSpacing: T.type.disclaimer.letterSpacing,
    opacity: 0.92,
    paddingHorizontal: T.space[2],
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: T.space[2],
    paddingVertical: T.space[2],
    paddingHorizontal: T.space[1],
  },
  linkText: {
    fontSize: T.type.caption.fontSize,
    lineHeight: T.type.caption.lineHeight,
    color: T.color.text.quaternary,
    fontWeight: T.type.caption.fontWeight,
    letterSpacing: T.type.caption.letterSpacing,
  },
  linkArrowBox: {
    width: T.layout.checkSeal,
    height: T.layout.checkSeal,
    borderRadius: T.radius.seal,
    borderWidth: T.borderWidth.default,
    borderColor: T.color.border.default,
    backgroundColor: T.color.surface.linkPill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBar: {
    width: T.layout.homeBarW,
    height: T.layout.homeBarH,
    borderRadius: T.radius.homeIndicator,
    backgroundColor: T.color.surface.homeIndicator,
    alignSelf: 'center',
    marginTop: T.space[6] + T.space[2],
    opacity: 0.85,
  },
});
