import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Animated, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { useToast, ToastType } from '@/contexts/ToastContext';

const getToastColors = (type: ToastType) => {
  switch (type) {
    case 'success':
      return { bg: '#10b981', text: '#ffffff', border: '#059669' };
    case 'error':
      return { bg: '#ef4444', text: '#ffffff', border: '#dc2626' };
    case 'warning':
      return { bg: '#f59e0b', text: '#ffffff', border: '#d97706' };
    case 'info':
    default:
      return { bg: '#3b82f6', text: '#ffffff', border: '#2563eb' };
  }
};

const getIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    case 'info':
    default:
      return 'ℹ';
  }
};

function ToastItem({ id, message, type, duration, action }: any) {
  const { hideToast } = useToast();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const colors = getToastColors(type);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animatedValue]);

  const handleClose = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => hideToast(id));
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const containerStyle: any = {
    transform: [{ translateY }],
    opacity,
  };

  return (
    <Animated.View style={[styles.toastContainer, containerStyle]}>
      <View style={[styles.toast, { backgroundColor: colors.bg, borderLeftColor: colors.border }]}>
        <View style={styles.content}>
          <Text style={[styles.icon, { color: colors.text }]}>{getIcon(type)}</Text>
          <View style={styles.messageWrapper}>
            <Text style={[styles.message, { color: colors.text }]} numberOfLines={2}>
              {message}
            </Text>
          </View>
        </View>

        {action ? (
          <TouchableOpacity
            onPress={() => {
              action.onPress();
              handleClose();
            }}
            style={styles.actionButton}
          >
            <Text style={[styles.actionText, { color: colors.text }]}>{action.label}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={18} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 60,
    left: Platform.OS === 'web' ? 20 : 16,
    right: Platform.OS === 'web' ? 20 : 16,
    zIndex: 9999,
    pointerEvents: 'box-none',
  },
  toastContainer: {
    marginBottom: 12,
    pointerEvents: 'auto',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
    minHeight: 52,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 24,
  },
  messageWrapper: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  closeButton: {
    padding: 4,
    minWidth: 28,
    minHeight: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
