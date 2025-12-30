import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { Theme } from '../../constants/theme';
import { useAuth } from '../contexts/AuthContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      // Navigation will happen automatically via RootNavigator
    } catch (error) {
      console.error('Login error:', error);
      // Show error message to user
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Login or Sign up</Text>
          
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../assets/images/login-illustration.gif')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.subtitle}>For Client</Text>
          <Text style={styles.description}>
            Create an account or log in to discover premium{'\n'}
            beauticians and book appointment.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <CustomInput
            label="Email"
            placeholder="Enter your email address..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={
              <Image
                source={require('../../assets/icons/email-icon.png')}
                style={styles.inputIcon}
                resizeMode="contain"
              />
            }
          />

          <CustomInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon={
              <Image
                source={require('../../assets/icons/lock-icon.png')}
                style={styles.inputIcon}
                resizeMode="contain"
              />
            }
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <CustomButton
            title="Log in"
            onPress={handleLogin}
            variant="secondary"
            loading={loading}
            style={styles.loginButton}
          />

          <CustomButton
            title="Sign up"
            onPress={() => navigation.navigate('SignUp')}
            variant="primary"
            style={styles.signUpButton}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign In */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            activeOpacity={0.8}
          >
            <Image
              source={require('../../assets/icons/google-icon.png')}
              style={styles.googleIcon}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>Sign up with google</Text>
          </TouchableOpacity>

          {/* Sign in as beautician */}
          <TouchableOpacity 
            style={styles.beauticianLink}
            onPress={() => console.log('Navigate to beautician login')}
          >
            <Text style={styles.beauticianLinkText}>Sign in as beautician</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  illustration: {
    width: 200,
    height: 180,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  description: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Theme.spacing.sm,
  },
  form: {
    width: '100%',
  },
  inputIcon: {
    width: 20,
    height: 20,
    // tintColor: Theme.colors.primary,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Theme.spacing.md,
    marginTop: -Theme.spacing.xs,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: Theme.colors.textPlaceholder,
  },
  loginButton: {
    marginBottom: Theme.spacing.sm,
  },
  signUpButton: {
    marginBottom: Theme.spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: Theme.spacing.md,
    fontSize: 12,
    color: Theme.colors.textPlaceholder,
    fontWeight: '400',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingVertical: 14,
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: Theme.spacing.sm,
  },
  googleButtonText: {
    fontSize: 15,
    color: Theme.colors.textPrimary,
    fontWeight: '500',
  },
  beauticianLink: {
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  beauticianLinkText: {
    fontSize: 14,
    color: '#E87461', // Coral/salmon color from Figma
    fontWeight: '500',
  },
});