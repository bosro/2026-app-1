import { Platform } from 'react-native';
import { Colors } from './colors';

export const Theme = {
  colors: Colors,
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
  },
  
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
glass: {
    card: {
      backgroundColor: Platform.OS === 'ios' 
        ? 'rgba(255, 255, 255, 0.7)' 
        : 'rgba(255, 255, 255, 0.95)',
      borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
      borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    navigation: {
      backgroundColor: Platform.OS === 'ios' 
        ? 'rgba(0, 0, 0, 0.6)' 
        : 'rgba(0, 0, 0, 0.95)',
      borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    modal: {
      backgroundColor: Platform.OS === 'ios' 
        ? 'rgba(255, 255, 255, 0.9)' 
        : 'rgba(255, 255, 255, 0.98)',
      borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
      borderColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
} as const;