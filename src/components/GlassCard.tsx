import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { BlurView } from './BlurView';
import { Theme } from '../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  bordered?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 80,
  bordered = true,
}) => {
  return (
    <BlurView
      intensity={intensity}
      tint="light"
      style={[styles.container, bordered && styles.bordered, style]}
      fallbackColor="rgba(255, 255, 255, 0.95)"
    >
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.lg,
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        ...Theme.shadows.md,
      },
      android: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        elevation: 4,
      },
    }),
  },
  bordered: {
    borderWidth: Platform.OS === 'ios' ? 0.5 : 0,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
});