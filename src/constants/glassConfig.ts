import { Platform } from 'react-native';

export const GlassConfig = {
  // Blur intensities
  blur: {
    subtle: 40,
    light: 60,
    medium: 80,
    strong: 100,
  },

  // Tints
  tint: {
    light: 'light' as const,
    dark: 'dark' as const,
    default: 'default' as const,
  },

  // Background colors for different surfaces
  backgrounds: {
    card: Platform.OS === 'ios' 
      ? 'rgba(255, 255, 255, 0.7)' 
      : 'rgba(255, 255, 255, 0.95)',
    modal: Platform.OS === 'ios' 
      ? 'rgba(255, 255, 255, 0.9)' 
      : 'rgba(255, 255, 255, 0.98)',
    navigation: Platform.OS === 'ios' 
      ? 'rgba(0, 0, 0, 0.6)' 
      : 'rgba(0, 0, 0, 0.95)',
    header: Platform.OS === 'ios' 
      ? 'rgba(255, 255, 255, 0.8)' 
      : 'rgba(255, 255, 255, 1)',
  },

  // Border styles for glass surfaces
  border: {
    color: 'rgba(255, 255, 255, 0.8)',
    width: Platform.OS === 'ios' ? 0.5 : 0,
  },
};