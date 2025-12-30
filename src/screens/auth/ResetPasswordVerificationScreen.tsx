import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../types/navigation';
import { CustomButton } from '../../components/CustomButton';
import { OTPInput } from '../../components/OTPInput';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type ResetPasswordVerificationScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'ResetPasswordVerification'
>;

type ResetPasswordVerificationScreenRouteProp = RouteProp<
  AuthStackParamList,
  'ResetPasswordVerification'
>;

interface Props {
  navigation: ResetPasswordVerificationScreenNavigationProp;
  route: ResetPasswordVerificationScreenRouteProp;
}

export const ResetPasswordVerificationScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleComplete = async (otpValue: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log('OTP Verified:', otpValue);
      navigation.navigate('NewPassword', { email, otp: otpValue });
    }, 1500);
  };

  const handleContinue = () => {
    if (otp.length === 6) {
      handleComplete(otp);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <BackButton />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Verification</Text>

            {/* Illustration */}
            <View style={styles.illustrationContainer}>
              <Image
                source={require('../../assets/images/verification-illustration.gif')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.subtitle}>Enter OTP</Text>
            <Text style={styles.description}>
              Enter the 6-digits code sent to your email address in the spaces
              provided
            </Text>
          </View>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            <OTPInput
              length={6}
              onComplete={handleComplete}
              onChangeText={setOtp}
            />
          </View>

          {/* Continue Button */}
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            loading={loading}
            disabled={otp.length !== 6}
            style={styles.continueButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xl,
  },
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  illustration: {
    width: 220,
    height: 220,
  },
  subtitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },
  description: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: Theme.spacing.md,
  },
  otpContainer: {
    marginBottom: Theme.spacing.xxl,
  },
  continueButton: {
    marginTop: 'auto',
  },
});