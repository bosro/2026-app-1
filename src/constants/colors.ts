export const Colors = {
  // Primary Colors
  primary: '#E07665',
  primaryDark: '#C85D4D',
  primaryLight: '#F08C7A',
  
  // Neutral Colors
  black: '#000000',
  white: '#FFFFFF',
  background: '#FFFFFF',
  backgroundSecondary: '#F6F6F6',
  backgroundTertiary: '##EEEEEE',
  
  // Text Colors
  textPrimary: '#000000',
  textSecondary: '#666666',
  textPlaceholder: '#B0B0B0',
  
  // Border Colors
  border: '#E5E5E5',
  borderFocused: '#E07665',
  
  // Status Colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Background Variants
  inputBackground: '#FAFAFA',
  cardBackground: '#FFFFFF',
  
  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Google Button
  googleBorder: '#DDDDDD',
  googleText: '#757575',
} as const;

export type ColorKey = keyof typeof Colors;