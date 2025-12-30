import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { Theme } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

type RoleSelectionScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'RoleSelection'
>;

interface Props {
  navigation: RoleSelectionScreenNavigationProp;
}

export const RoleSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const handleRoleSelection = async (role: 'beautician' | 'client') => {
    console.log('Selected role:', role);
    
    // Save onboarding status
    await AsyncStorage.setItem('@has_seen_onboarding', 'true');
    
    // You can also save the selected role if needed
    await AsyncStorage.setItem('@user_role', role);
    
    // Navigate to Auth screen
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Auth' as never }],
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>LOGO</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Find beauty services or grow your beauty business.{'\n'}
        Whether you need a service or provide one, we connect{'\n'}
        you to the right people.
      </Text>

      {/* Role Selection */}
      <Text style={styles.roleTitle}>Select your role</Text>

      <View style={styles.rolesContainer}>
        {/* Beautician Card */}
        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => handleRoleSelection('beautician')}
          activeOpacity={0.9}
        >
          <View style={styles.roleImageContainer}>
            <Image
              source={require('../../assets/images/beautician.gif')}
              style={styles.roleImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.roleContent}>
            <View style={styles.textContent}>
              <Text style={styles.roleCardTitle}>Beautician</Text>
              <Text style={styles.roleCardDescription}>
                Showcase your skills and get clients.
              </Text>
            </View>
            <View style={styles.arrowButton}>
              <Image
                source={require('../../assets/icons/arrow-right.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Client Card */}
        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => handleRoleSelection('client')}
          activeOpacity={0.9}
        >
          <View style={styles.roleImageContainer}>
            <Image
              source={require('../../assets/images/client.gif')}
              style={styles.roleImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.roleContent}>
            <View style={styles.textContent}>
              <Text style={styles.roleCardTitle}>Client</Text>
              <Text style={styles.roleCardDescription}>
                Find and book beauty services near you.
              </Text>
            </View>
            <View style={styles.arrowButton}>
              <Image
                source={require('../../assets/icons/arrow-right.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xxl * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xxl,
  },
  logoText: {
    fontSize: Theme.fontSize.xxxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  description: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Theme.spacing.xxl,
  },
  roleTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  rolesContainer: {
    gap: Theme.spacing.lg,
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.black,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.black,
    overflow: 'hidden',
    padding: Theme.spacing.sm,
    ...Theme.shadows.md,
  },
  roleImageContainer: {
    width: 170,
    height: 170,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.sm,
  },
  roleImage: {
    width: '100%',
    height: '100%',
  },
  roleContent: {
    flex: 1,
    paddingLeft: Theme.spacing.lg,
    paddingRight: Theme.spacing.sm,
    paddingVertical: Theme.spacing.sm,
    justifyContent: 'space-between',
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  roleCardTitle: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs,
  },
  roleCardDescription: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.white,
    lineHeight: 20,
  },
  arrowButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 25,
    height: 25,
    tintColor: Theme.colors.black,
  },
});