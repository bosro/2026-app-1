import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { BlurView } from './BlurView';
import { Theme } from '../constants/theme';

const { height } = Dimensions.get('window');

interface GlassBottomSheetProps {
  children: React.ReactNode;
  height?: number;
}

export const GlassBottomSheet: React.FC<GlassBottomSheetProps> = ({
  children,
  height: sheetHeight = 300,
}) => {
  return (
    <View style={styles.overlay}>
      <BlurView
        intensity={100}
        tint="light"
        style={[styles.sheet, { height: sheetHeight }]}
        fallbackColor="rgba(255, 255, 255, 0.98)"
      >
        <View style={styles.handle} />
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: Theme.borderRadius.xl,
    borderTopRightRadius: Theme.borderRadius.xl,
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderTopWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.9)',
      },
      android: {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
      },
    }),
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
});