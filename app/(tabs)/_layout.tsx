import { useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Hop as Home, BookOpen, Heart, User, Info, Moon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ProgressProvider } from '@/contexts/ProgressContext';

/**
 * Altura mínima da *área útil* (acima do inset inferior): ícone ~28px + label ~16px + margens.
 * O React Navigation usa ~49px por defeito — apertado demais com 5 abas visíveis + paddingTop.
 */
const TAB_INNER_MIN = 52;

export default function TabLayout() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 6 : 0);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarLabelPosition: 'below-icon' as const,
      tabBarActiveTintColor: '#d4a96a',
      tabBarInactiveTintColor: isDark ? '#cbd5e1' : '#475569',
      tabBarAllowFontScaling: true,
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600' as const,
        marginTop: 4,
        marginBottom: 0,
        lineHeight: 13,
      },
      tabBarItemStyle: {
        flex: 1,
        paddingTop: 2,
        paddingBottom: 2,
      },
      tabBarStyle: {
        backgroundColor: isDark ? '#07070f' : '#ffffff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: isDark ? 'rgba(212,169,106,0.2)' : 'rgba(0,0,0,0.08)',
        paddingTop: 4,
        paddingBottom: bottomInset,
        /** Total = zona útil + padding topo + home indicator (evita cortar o texto). */
        height: TAB_INNER_MIN + 4 + bottomInset,
      },
    }),
    [isDark, bottomInset],
  );

  return (
    <ProgressProvider>
      <Tabs screenOptions={screenOptions}>
        <Tabs.Screen
          name="home"
          options={{
            title: t('tab.home'),
            tabBarLabel: t('tab.home'),
            tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="program"
          options={{
            title: t('tab.program'),
            tabBarLabel: t('tab.program'),
            tabBarIcon: ({ size, color }) => <BookOpen size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="concierge"
          options={{
            title: t('tab.coach'),
            tabBarLabel: t('tab.coach'),
            tabBarIcon: ({ size, color }) => <Moon size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('tab.profile'),
            tabBarLabel: t('tab.profile'),
            tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="coach"
          options={{
            title: t('tab.coach'),
            tabBarLabel: t('tab.coach'),
            href: null,
            tabBarIcon: ({ size, color }) => <Heart size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: t('tab.about'),
            tabBarLabel: t('tab.about'),
            tabBarIcon: ({ size, color }) => <Info size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="lesson"
          options={{
            title: 'Lesson',
            href: null,
          }}
        />
      </Tabs>
    </ProgressProvider>
  );
}
