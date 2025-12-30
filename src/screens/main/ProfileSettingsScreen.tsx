import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProfileSettingsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'ProfileSettings'
>;

interface Props {
  navigation: ProfileSettingsScreenNavigationProp;
}

export const ProfileSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);

  const menuItems = [
  {
    icon: require('../assets/icons/gift-icon.png'),
    title: 'Referral Program',
    onPress: () => navigation.navigate('Referral'),
  },
  {
    icon: require('../assets/icons/help-icon.png'),
    title: 'Customer Service',
    onPress: () => navigation.navigate('CustomerService'),
  },
  {
    icon: require('../assets/icons/document-icon.png'),
    title: 'Terms & Conditions',
    onPress: () => navigation.navigate('TermsConditions'),
  },
  {
    icon: require('../assets/icons/shield-icon.png'),
    title: 'Privacy Policy',
    onPress: () => navigation.navigate('PrivacyPolicy'),
  },
];

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      updateUser(formData);
      setLoading(false);
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }, 1500);
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleChangeAvatar = () => {
    // Implement image picker
    Alert.alert('Change Avatar', 'Image picker not implemented yet');
  };

  const UserIcon = () => (
    <Image
      source={require('../../assets/icons/user-icon.png')}
      style={styles.inputIcon}
      resizeMode="contain"
    />
  );

  const EmailIcon = () => (
    <Image
      source={require('../../assets/icons/email-icon.png')}
      style={styles.inputIcon}
      resizeMode="contain"
    />
  );

  const PhoneIcon = () => (
    <Image
      source={require('../../assets/icons/phone-icon.png')}
      style={styles.inputIcon}
      resizeMode="contain"
    />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.title}>Profile Settings</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <Image
              source={
                user?.avatar
                  ? { uri: user.avatar }
                  : require('../../assets/images/default-avatar.jpg')
              }
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.changeAvatarButton}
              onPress={handleChangeAvatar}
            >
              <Image
                source={require('../../assets/icons/camera-icon.png')}
                style={styles.cameraIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <CustomInput
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              icon={<UserIcon />}
            />

            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<EmailIcon />}
            />

            <CustomInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
              icon={<PhoneIcon />}
            />

            {/* Change Password Button */}
            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.changePasswordText}>Change Password</Text>
              <Image
                source={require('../../assets/icons/chevron-right.png')}
                style={styles.chevronIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Save Button */}
            <CustomButton
              title="Save Changes"
              onPress={handleSave}
              variant="primary"
              loading={loading}
              style={styles.saveButton}
            />
          </View>
        </ScrollView>
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
  },
  scrollContent: {
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Theme.spacing.md,
  },
  placeholder: {
    width: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Theme.colors.primary,
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Theme.colors.white,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    // tintColor: Theme.colors.white,
  },
  form: {
    paddingHorizontal: Theme.spacing.lg,
  },
  inputIcon: {
    width: 20,
    height: 20,
    // tintColor: Theme.colors.primary,
  },
  changePasswordButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
  },
  changePasswordText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.medium,
  },
  chevronIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.textSecondary,
  },
  saveButton: {
    marginTop: Theme.spacing.md,
  },
});