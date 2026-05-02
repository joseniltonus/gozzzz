import { Tabs } from 'expo-router';
import { Hop as Home, BookOpen, Heart, User, Info, Moon } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ProgressProvider } from '@/contexts/ProgressContext';

export default function TabLayout() {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <ProgressProvider>
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#d4a96a',
        tabBarInactiveTintColor: isDark ? '#4a5568' : '#94a3b8',
        tabBarStyle: {
          backgroundColor: isDark ? '#07070f' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: isDark ? 'rgba(212,169,106,0.15)' : 'rgba(0,0,0,0.08)',
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600' as const,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: t('tab.home') || 'Home',
          href: '/(tabs)/home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: t('tab.program'),
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="concierge"
        options={{
          title: 'Concierge',
          tabBarIcon: ({ size, color }) => (
            <Moon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tab.profile'),
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="coach"
        options={{
          title: t('tab.coach'),
          href: null,
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: t('tab.about'),
          tabBarIcon: ({ size, color }) => (
            <Info size={size} color={color} />
          ),
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
