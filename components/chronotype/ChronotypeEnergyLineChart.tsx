import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop, Line } from 'react-native-svg';

type Props = {
  morning: number;
  night: number;
  accent: string;
};

/** Minimal day curve (manhã → noite) for “Por que isso acontece?” — scannable in a few seconds. */
export default function ChronotypeEnergyLineChart({ morning, night, accent }: Props) {
  const { width: winW } = useWindowDimensions();
  const W = Math.min(342, Math.max(280, winW - 48));
  const H = 120;
  const padX = 14;
  const padY = 18;

  const yFor = (energy: number) => padY + (1 - Math.min(100, Math.max(0, energy)) / 100) * (H - 2 * padY);

  const e0 = morning;
  const e1 = morning * 0.72 + night * 0.28;
  const e2 = (morning + night) / 2;
  const e3 = morning * 0.28 + night * 0.72;
  const e4 = night;

  const x0 = padX;
  const x1 = padX + (W - 2 * padX) * 0.28;
  const x2 = padX + (W - 2 * padX) * 0.5;
  const x3 = padX + (W - 2 * padX) * 0.72;
  const x4 = W - padX;

  const p = (x: number, e: number) => `${x},${yFor(e)}`;
  const lineD = `M ${p(x0, e0)} L ${p(x1, e1)} L ${p(x2, e2)} L ${p(x3, e3)} L ${p(x4, e4)}`;
  const areaD = `${lineD} L ${x4} ${H - padY} L ${x0} ${H - padY} Z`;

  return (
    <View style={[styles.host, { width: W }]}>
      <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <Defs>
          <LinearGradient id="chFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={accent} stopOpacity="0.22" />
            <Stop offset="1" stopColor={accent} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Line x1={padX} y1={H / 2} x2={W - padX} y2={H / 2} stroke="rgba(148,163,184,0.12)" strokeWidth={1} />
        <Path d={areaD} fill="url(#chFill)" />
        <Path
          d={lineD}
          fill="none"
          stroke={accent}
          strokeWidth={10}
          strokeOpacity={0.16}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d={lineD}
          fill="none"
          stroke={accent}
          strokeWidth={2.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    alignSelf: 'center',
    marginVertical: 4,
  },
});
