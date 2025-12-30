import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LearnScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Learn a skill</Text>

        <View style={styles.content}>
          <Image
            source={require('../../assets/images/coming-soon-illustration.gif')}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.comingSoon}>Coming soon...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xxl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: 280,
    height: 280,
    marginBottom: Theme.spacing.xxl,
  },
  comingSoon: {
    fontSize: Theme.fontSize.lg,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.fontWeight.medium,
  },
});