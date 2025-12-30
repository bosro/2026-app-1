import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Profile'
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

interface MenuItem {
  icon: any;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showBadge?: boolean;
  badgeText?: string;
}

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const menuItems: MenuItem[] = [
    {
      icon: require('../../assets/icons/user-icon.png'),
      title: 'Profile Settings',
      subtitle: 'Update your information',
      onPress: () => navigation.navigate('ProfileSettings'),
    },
    {
      icon: require('../../assets/icons/courses-icon.png'),
      title: 'My Courses',
      subtitle: 'Continue learning',
      onPress: () => navigation.navigate('MyCourses'),
    },
    {
      icon: require('../../assets/icons/gift-icon.png'),
      title: 'Referral Program',
      subtitle: 'Earn rewards by referring friends',
      onPress: () => navigation.navigate('Referral'),
      showBadge: true,
      badgeText: 'New',
    },
    {
      icon: require('../../assets/icons/help-icon.png'),
      title: 'Customer Service',
      subtitle: 'Get help and support',
      onPress: () => navigation.navigate('CustomerService'),
    },
    {
      icon: require('../../assets/icons/document-icon.png'),
      title: 'Terms & Conditions',
      onPress: () => navigation.navigate('TermsConditions'),
    },
    {
      icon: require('../../assets/icons/shield-icon.png'),
      title: 'Privacy Policy',
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
  ];

  const quickActions = [
    {
      icon: require('../../assets/icons/bookings-icon.png'),
      title: 'My Bookings',
      count: 3,
      onPress: () => navigation.navigate('Bookings'),
    },
    {
      icon: require('../../assets/icons/heart-filled.png'),
      title: 'Favorites',
      count: 8,
      onPress: () => navigation.navigate('Favorites'),
    },
    // {
    //   icon: require('../../assets/icons/wallet-icon.png'),
    //   title: 'Wallet',
    //   onPress: () => navigation.navigate('Wallet'),
    // },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Image
              source={require('../../assets/icons/settings-icon.png')}
              style={styles.settingsIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={require('../../assets/images/avatar.jpg')}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Luxury Developer</Text>
            <Text style={styles.profileEmail}>luxury@example.com</Text>
            <Text style={styles.profilePhone}>+233 50 123 4567</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('ProfileSettings')}
          >
            <Image
              source={require('../../assets/icons/edit-icon.png')}
              style={styles.editIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionCard}
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.quickActionIconContainer}>
                  <Image
                    source={action.icon}
                    style={styles.quickActionIcon}
                    resizeMode="contain"
                  />
                  {action.count && (
                    <View style={styles.countBadge}>
                      <Text style={styles.countText}>{action.count}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Image
                    source={item.icon}
                    style={styles.menuIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  {item.subtitle && (
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
              </View>
              <View style={styles.menuItemRight}>
                {item.showBadge && item.badgeText && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>{item.badgeText}</Text>
                  </View>
                )}
                <Image
                  source={require('../../assets/icons/arrow-right.png')}
                  style={styles.menuArrow}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => console.log('Logout')}
        >
          <Image
            source={require('../../assets/icons/logout-icon.png')}
            style={styles.logoutIcon}
            resizeMode="contain"
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  headerTitle: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.textPrimary,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: Theme.spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIcon: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.white,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Theme.colors.border,
    marginHorizontal: Theme.spacing.md,
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
  quickActionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  quickActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.sm,
    position: 'relative',
  },
  quickActionIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
  },
  countBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  quickActionTitle: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.medium,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.primary,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  newBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  newBadgeText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  menuArrow: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginTop: Theme.spacing.lg,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.error,
    marginRight: Theme.spacing.sm,
  },
  logoutText: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.error,
  },
  versionText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPlaceholder,
    textAlign: 'center',
    marginTop: Theme.spacing.lg,
  },
  bottomSpacer: {
    height: 100,
  },
});