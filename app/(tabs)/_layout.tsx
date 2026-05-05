import { useMemo } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Hop as Home, BookOpen, Heart, User, Info, Moon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ProgressProvider } from '@/contexts/ProgressContext';

const ICON_PX = 22;

const androidLabel = Platform.OS === 'android' ? ({ includeFontPadding: false } as const) : {};

/**
 * Rótulos longos ("Programa", "Concierge") + pouca largura por aba → texto cortado.
 * Duas linhas + fonte ligeiramente menor + sem padding extra no item libertam espaço.
 */
function TabBarLabelText({ color, children }: { color: string; children: string }) {
  return (
    <Text
      numberOfLines={2}
      adjustsFontSizeToFit={Platform.OS !== 'web'}
      minimumFontScale={0.82}
      maxFontSizeMultiplier={1.2}
      style={{
        color,
        fontSize: Platform.OS === 'web' ? 10 : 10.5,
        fontWeight: '600',
        lineHeight: Platform.OS === 'android' ? 13 : 12,
        textAlign: 'center',
        marginTop: 2,
        width: '100%',
        ...androidLabel,
      }}
    >
      {children}
    </Text>
  );
}

export default function TabLayout() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 8 : 0);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarShowLabel: true,
      tabBarLabelPosition: 'below-icon' as const,
      tabBarActiveTintColor: '#d4a96a',
      tabBarInactiveTintColor: isDark ? '#cbd5e1' : '#475569',
      tabBarAllowFontScaling: true,
      tabBarLabel: ({ color, children }: { color: string; children: string }) => (
        <TabBarLabelText color={color} children={children} />
      ),
      tabBarItemStyle: {
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 1,
        justifyContent: 'center' as const,
        minWidth: 0,
      },
      tabBarStyle: {
        backgroundColor: isDark ? '#07070f' : '#ffffff',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: isDark ? 'rgba(212,169,106,0.2)' : 'rgba(0,0,0,0.08)',
        paddingTop: 6,
        paddingBottom: bottomInset,
        /**
         * Área interior ≈ (62 + bottomInset) - 6 - bottomInset = 56px para ícone+2 linhas de texto.
         * Valores abaixo de ~54 cortavam labels em iPhones com home indicator.
         */
        height: 62 + bottomInset,
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
            tabBarIcon: ({ color }) => <Home size={ICON_PX} color={color} />,
          }}
        />
        <Tabs.Screen
          name="program"
          options={{
            title: t('tab.program'),
            tabBarLabel: t('tab.program'),
            tabBarIcon: ({ color }) => <BookOpen size={ICON_PX} color={color} />,
          }}
        />
        <Tabs.Screen
          name="concierge"
          options={{
            title: t('tab.coach'),
            tabBarLabel: t('tab.coach'),
            tabBarIcon: ({ color }) => <Moon size={ICON_PX} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: t('tab.profile'),
            tabBarLabel: t('tab.profile'),
            tabBarIcon: ({ color }) => <User size={ICON_PX} color={color} />,
          }}
        />
        <Tabs.Screen
          name="coach"
          options={{
            title: t('tab.coach'),
            tabBarLabel: t('tab.coach'),
            href: null,
            tabBarIcon: ({ color }) => <Heart size={ICON_PX} color={color} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: t('tab.about'),
            tabBarLabel: t('tab.about'),
            tabBarIcon: ({ color }) => <Info size={ICON_PX} color={color} />,
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
