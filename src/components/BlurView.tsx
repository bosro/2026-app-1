import React from 'react';
import {
  Platform,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { BlurView as ExpoBlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface BlurViewProps {
  children: React.ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  style?: StyleProp<ViewStyle>; // ✅ FIXED
  fallbackColor?: string;
}

export const BlurView: React.FC<BlurViewProps> = ({
  children,
  intensity = 80,
  tint = 'light',
  style,
  fallbackColor = 'rgba(255, 255, 255, 0.9)',
}) => {
  if (Platform.OS === 'ios') {
    return (
      <ExpoBlurView
        intensity={intensity}
        tint={tint}
        style={[styles.blur, style]}
      >
        {children}
      </ExpoBlurView>
    );
  }

  // Android fallback
  return (
    <LinearGradient
      colors={[fallbackColor, fallbackColor]}
      style={[styles.blur, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  blur: {
    overflow: 'hidden',
  },
});
