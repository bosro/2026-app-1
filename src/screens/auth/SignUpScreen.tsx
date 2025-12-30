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
import { AuthStackParamList } from '../../types/navigation';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SignUp'
>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

export const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Verification', { email: formData.email, type: 'signup' });
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    console.log('Google Sign Up');
  };

  const UserIcon = () => (
    <Image
      source={require('../../assets/icons/user-icon.png')}
      style={styles.icon}
      resizeMode="contain"
    />
  );

  const PhoneIcon = () => (
    <Image
      source={require('../../assets/icons/phone-icon.png')}
      style={styles.icon}
      resizeMode="contain"
    />
  );

  const EmailIcon = () => (
    <Image
      source={require('../../assets/icons/email-icon.png')}
      style={styles.icon}
      resizeMode="contain"
    />
  );

  const LockIcon = () => (
    <Image
      source={require('../../assets/icons/lock-icon.png')}
      style={styles.icon}
      resizeMode="contain"
    />
  );

  const GoogleIcon = () => (
    <Image
      source={require('../../assets/icons/google-icon.png')}
      style={styles.googleIcon}
      resizeMode="contain"
    />
  );

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
            <Text style={styles.title}>Create an account</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <CustomInput
              label="Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              icon={<UserIcon />}
            />

            <CustomInput
              label="Phone number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
              icon={<PhoneIcon />}
            />

            <CustomInput
              label="Email"
              placeholder="Enter your email address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<EmailIcon />}
            />

            <CustomInput
              label="Password"
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
              icon={<LockIcon />}
            />

            <CustomInput
              label="Confirm Password"
              placeholder="Password"
              value={formData.confirmPassword}
              onChangeText={(text) =>
                setFormData({ ...formData, confirmPassword: text })
              }
              secureTextEntry
              icon={<LockIcon />}
            />

            <CustomButton
              title="Sign up"
              onPress={handleSignUp}
              variant="primary"
              loading={loading}
              style={styles.signUpButton}
            />

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Sign Up */}
            <CustomButton
              title="Sign up with google"
              onPress={handleGoogleSignUp}
              variant="outline"
              icon={<GoogleIcon />}
            />
          </View>
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
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  form: {
    width: '100%',
  },
  signUpButton: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.border,
  },
  dividerText: {
    marginHorizontal: Theme.spacing.md,
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPlaceholder,
  },
  icon: {
    width: 20,
    height: 20,
    // tintColor: Theme.colors.primary,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
});