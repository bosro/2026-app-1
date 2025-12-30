import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { BlurView } from './BlurView';
import { Theme } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface GlassHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  transparent?: boolean;
}

export const GlassHeader: React.FC<GlassHeaderProps> = ({
  title,
  onBackPress,
  rightComponent,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();

  const HeaderContent = (
    <View style={[styles.content, { paddingTop: insets.top + Theme.spacing.sm }]}>
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightContainer}>
        {rightComponent || <View style={styles.placeholder} />}
      </View>
    </View>
  );

  if (transparent && Platform.OS === 'ios') {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <BlurView
          intensity={100}
          tint="light"
          style={styles.container}
          fallbackColor="rgba(255, 255, 255, 0.95)"
        >
          {HeaderContent}
        </BlurView>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.container, styles.solidHeader]}>
        {HeaderContent}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
      },
      android: {
        backgroundColor: Theme.colors.white,
        elevation: 4,
      },
    }),
  },
  solidHeader: {
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: Theme.colors.textPrimary,
  },
  title: {
    flex: 1,
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  placeholder: {
    width: 40,
  },
});