import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Settings'
>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Image
                  source={require('../../assets/icons/notification-icon.png')}
                  style={styles.settingIcon}
                  resizeMode="contain"
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Push Notifications</Text>
                  <Text style={styles.settingSubtitle}>
                    Receive booking updates and offers
                  </Text>
                </View>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#E0E0E0', true: Theme.colors.primary }}
                thumbColor={Theme.colors.white}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Image
                  source={require('../../assets/icons/email-icon.png')}
                  style={styles.settingIcon}
                  resizeMode="contain"
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Email Notifications</Text>
                  <Text style={styles.settingSubtitle}>
                    Get promotional emails
                  </Text>
                </View>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#E0E0E0', true: Theme.colors.primary }}
                thumbColor={Theme.colors.white}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Image
                  source={require('../../assets/icons/phone-icon.png')}
                  style={styles.settingIcon}
                  resizeMode="contain"
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>SMS Notifications</Text>
                  <Text style={styles.settingSubtitle}>
                    Receive booking reminders via SMS
                  </Text>
                </View>
              </View>
              <Switch
                value={smsNotifications}
                onValueChange={setSmsNotifications}
                trackColor={{ false: '#E0E0E0', true: Theme.colors.primary }}
                thumbColor={Theme.colors.white}
              />
            </View>
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Image
                  source={require('../../assets/icons/location-marker.png')}
                  style={styles.settingIcon}
                  resizeMode="contain"
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Location Services</Text>
                  <Text style={styles.settingSubtitle}>
                    Find salons near you
                  </Text>
                </View>
              </View>
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: '#E0E0E0', true: Theme.colors.primary }}
                thumbColor={Theme.colors.white}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Image
                  source={require('../../assets/icons/moon-icon.png')}
                  style={styles.settingIcon}
                  resizeMode="contain"
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Dark Mode</Text>
                  <Text style={styles.settingSubtitle}>
                    Coming soon
                  </Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                disabled
                trackColor={{ false: '#E0E0E0', true: Theme.colors.primary }}
                thumbColor={Theme.colors.white}
              />
            </View>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => console.log('Language')}
            >
              <View style={styles.settingLeft}>
                <Image
                  source={require('../../assets/icons/language-icon.png')}
                  style={styles.settingIcon}
                  resizeMode="contain"
                />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Language</Text>
                  <Text style={styles.settingSubtitle}>English</Text>
                </View>
              </View>
              <Image
                source={require('../../assets/icons/arrow-right.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => console.log('Change Password')}
            >
              <View style={styles.settingLeft}>
                <Image
                  source={require('../../assets/icons/lock-icon.png')}
                  style={styles.settingIcon}
                  resizeMode="contain"
                />
                <Text style={styles.settingTitle}>Change Password</Text>
              </View>
              <Image
                source={require('../../assets/icons/arrow-right.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => console.log('Delete Account')}
            >
              <View style={styles.settingLeft}>
                <Image
                  source={require('../../assets/icons/trash-icon.png')}
                  style={[styles.settingIcon, { tintColor: Theme.colors.error }]}
                  resizeMode="contain"
                />
                <Text style={[styles.settingTitle, { color: Theme.colors.error }]}>
                  Delete Account
                </Text>
              </View>
              <Image
                source={require('../../assets/icons/arrow-right.png')}
                style={[styles.arrowIcon, { tintColor: Theme.colors.error }]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacer} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
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
  scrollContent: {
    paddingBottom: Theme.spacing.xxl,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
    marginRight: Theme.spacing.md,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  arrowIcon: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.textSecondary,
  },
  bottomSpacer: {
    height: Theme.spacing.xxl,
  },
});