import { Text, Pressable, StyleSheet, ViewStyle } from 'react-native';

type GhostButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export default function GhostButton({ label, onPress, style }: GhostButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed, style]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8b92b8',
  },
});
