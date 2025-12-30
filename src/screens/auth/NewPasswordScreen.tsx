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
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type NewPasswordScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'NewPassword'
>;

type NewPasswordScreenRouteProp = RouteProp<
  AuthStackParamList,
  'NewPassword'
>;

interface Props {
  navigation: NewPasswordScreenNavigationProp;
  route: NewPasswordScreenRouteProp;
}

export const NewPasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const { email, otp } = route.params;
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      // Show error
      console.log('Passwords do not match');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log('Password reset successful');
      // Navigate to login
      navigation.navigate('Login');
    }, 1500);
  };

  const LockIcon = () => (
    <Image
      source={require('../../assets/icons/lock-icon.png')}
      style={styles.icon}
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
            <Text style={styles.title}>New password</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <CustomInput
              label="New Password"
              placeholder="Password"
              value={formData.newPassword}
              onChangeText={(text) =>
                setFormData({ ...formData, newPassword: text })
              }
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
              title="Complete"
              onPress={handleComplete}
              variant="primary"
              loading={loading}
              disabled={!formData.newPassword || !formData.confirmPassword}
              style={styles.completeButton}
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
    marginBottom: Theme.spacing.xxl,
    alignItems: 'center',
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  form: {
    width: '100%',
    flex: 1,
  },
  completeButton: {
    marginTop: Theme.spacing.xl,
  },
  icon: {
    width: 20,
    height: 20,
    // tintColor: Theme.colors.primary,
  },
});