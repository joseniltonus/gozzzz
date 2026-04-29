import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '@/lib/storage';

const DARK_MODE_KEY = '@gozzzz_dark_mode';

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  setIsDark: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDarkState] = useState(true);

  useEffect(() => {
    let isMounted = true;
    storage.getItem(DARK_MODE_KEY).then((stored) => {
      if (isMounted && stored !== null) {
        setIsDarkState(stored === 'true');
      }
    });
    return () => { isMounted = false; };
  }, []);

  const setIsDark = (value: boolean) => {
    setIsDarkState(value);
    storage.setItem(DARK_MODE_KEY, String(value));
  };

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
