import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

export const useGlassEffect = () => {
  const colorScheme = useColorScheme();
  
  return useMemo(() => ({
    intensity: colorScheme === 'dark' ? 100 : 80,
    tint: (colorScheme === 'dark' ? 'dark' : 'light') as 'dark' | 'light',
    backgroundColor: colorScheme === 'dark' 
      ? 'rgba(0, 0, 0, 0.7)' 
      : 'rgba(255, 255, 255, 0.7)',
  }), [colorScheme]);
};