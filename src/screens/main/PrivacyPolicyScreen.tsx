import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'PrivacyPolicy'
>;

interface Props {
  navigation: PrivacyPolicyScreenNavigationProp;
}

export const PrivacyPolicyScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Privacy Policy</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Last Updated */}
          <View style={styles.updateBanner}>
            <Text style={styles.updateText}>Last updated: December 30, 2024</Text>
          </View>

          {/* Introduction */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Introduction</Text>
            <Text style={styles.paragraph}>
              At Beauty App, we respect your privacy and are committed to protecting
              your personal data. This Privacy Policy explains how we collect, use,
              store, and protect your information when you use our mobile application.
            </Text>
            <Text style={styles.paragraph}>
              By using Beauty App, you agree to the collection and use of information
              in accordance with this policy.
            </Text>
          </View>

          {/* Information We Collect */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Information We Collect</Text>
            
            <Text style={styles.subTitle}>2.1 Personal Information</Text>
            <Text style={styles.paragraph}>
              When you register and use our app, we may collect:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Name and contact information</Text>
              <Text style={styles.bulletItem}>• Email address</Text>
              <Text style={styles.bulletItem}>• Phone number</Text>
              <Text style={styles.bulletItem}>• Profile picture</Text>
              <Text style={styles.bulletItem}>• Payment information</Text>
              <Text style={styles.bulletItem}>• Booking history</Text>
            </View>

            <Text style={styles.subTitle}>2.2 Location Data</Text>
            <Text style={styles.paragraph}>
              We collect your location data to show nearby salons and provide
              location-based services. You can control location permissions through
              your device settings.
            </Text>

            <Text style={styles.subTitle}>2.3 Usage Data</Text>
            <Text style={styles.paragraph}>
              We automatically collect information about how you use our app, including:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Device information</Text>
              <Text style={styles.bulletItem}>• IP address</Text>
              <Text style={styles.bulletItem}>• App usage statistics</Text>
              <Text style={styles.bulletItem}>• Search queries</Text>
              <Text style={styles.bulletItem}>• Crash reports</Text>
            </View>
          </View>

          {/* How We Use Your Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
            <Text style={styles.paragraph}>
              We use your information to:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>
                • Provide and maintain our services
              </Text>
              <Text style={styles.bulletItem}>
                • Process your bookings and payments
              </Text>
              <Text style={styles.bulletItem}>
                • Send you notifications and updates
              </Text>
              <Text style={styles.bulletItem}>
                • Improve our app and user experience
              </Text>
              <Text style={styles.bulletItem}>
                • Provide customer support
              </Text>
              <Text style={styles.bulletItem}>
                • Detect and prevent fraud
              </Text>
              <Text style={styles.bulletItem}>
                • Comply with legal obligations
              </Text>
            </View>
          </View>

          {/* Sharing Your Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Sharing Your Information</Text>
            <Text style={styles.paragraph}>
              We may share your information with:
            </Text>
            
            <Text style={styles.subTitle}>4.1 Service Providers</Text>
            <Text style={styles.paragraph}>
              We share necessary information with beauty professionals to facilitate
              your bookings.
            </Text>

            <Text style={styles.subTitle}>4.2 Payment Processors</Text>
            <Text style={styles.paragraph}>
              Payment information is shared with secure payment processors to complete
              transactions.
            </Text>

            <Text style={styles.subTitle}>4.3 Analytics Services</Text>
            <Text style={styles.paragraph}>
              We use third-party analytics services to understand app usage and improve
              our services.
            </Text>

            <Text style={styles.subTitle}>4.4 Legal Requirements</Text>
            <Text style={styles.paragraph}>
              We may disclose your information if required by law or to protect our
              rights and safety.
            </Text>
          </View>

          {/* Data Security */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Data Security</Text>
            <Text style={styles.paragraph}>
              We implement appropriate security measures to protect your personal
              information, including:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Encryption of sensitive data</Text>
              <Text style={styles.bulletItem}>• Secure data storage</Text>
              <Text style={styles.bulletItem}>• Regular security audits</Text>
              <Text style={styles.bulletItem}>• Access controls</Text>
            </View>
            <Text style={styles.paragraph}>
              However, no method of transmission over the internet is 100% secure. We
              cannot guarantee absolute security.
            </Text>
          </View>

          {/* Your Rights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Your Rights</Text>
            <Text style={styles.paragraph}>
              You have the right to:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>
                • Access your personal information
              </Text>
              <Text style={styles.bulletItem}>
                • Correct inaccurate information
              </Text>
              <Text style={styles.bulletItem}>
                • Request deletion of your data
              </Text>
              <Text style={styles.bulletItem}>
                • Object to data processing
              </Text>
              <Text style={styles.bulletItem}>
                • Export your data
              </Text>
              <Text style={styles.bulletItem}>
                • Withdraw consent at any time
              </Text>
            </View>
          </View>

          {/* Data Retention */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Data Retention</Text>
            <Text style={styles.paragraph}>
              We retain your personal information for as long as necessary to provide
              our services and comply with legal obligations. When you delete your
              account, we will delete or anonymize your personal data within 30 days.
            </Text>
          </View>

          {/* Children's Privacy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Children's Privacy</Text>
            <Text style={styles.paragraph}>
              Our services are not intended for children under 18. We do not knowingly
              collect personal information from children. If you believe we have
              collected information from a child, please contact us immediately.
            </Text>
          </View>

          {/* Cookies and Tracking */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Cookies and Tracking</Text>
            <Text style={styles.paragraph}>
              We use cookies and similar tracking technologies to improve your
              experience. You can control cookie preferences through your device
              settings.
            </Text>
          </View>

          {/* Changes to Privacy Policy */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Changes to This Policy</Text>
            <Text style={styles.paragraph}>
              We may update this Privacy Policy from time to time. We will notify you
              of significant changes through the app or via email. The updated policy
              will be effective immediately upon posting.
            </Text>
          </View>

          {/* Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Contact Us</Text>
            <Text style={styles.paragraph}>
              If you have questions about this Privacy Policy or want to exercise your
              rights, please contact us:
            </Text>
            <View style={styles.contactCard}>
              <Text style={styles.contactText}>Email: privacy@beautyapp.com</Text>
              <Text style={styles.contactText}>Phone: +233 50 123 4567</Text>
              <Text style={styles.contactText}>
                Address: Accra, Greater Accra, Ghana
              </Text>
            </View>
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
    marginBottom: Theme.spacing.md,
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
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  updateBanner: {
    backgroundColor: '#E3F2FD',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
  },
  updateText: {
    fontSize: Theme.fontSize.sm,
    color: '#1976D2',
    fontWeight: Theme.fontWeight.medium,
    textAlign: 'center',
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  subTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  paragraph: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: Theme.spacing.md,
  },
  bulletList: {
    marginLeft: Theme.spacing.sm,
  },
  bulletItem: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: Theme.spacing.xs,
  },
  contactCard: {
    backgroundColor: '#F6F6F6',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginTop: Theme.spacing.sm,
  },
  contactText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  bottomSpacer: {
    height: Theme.spacing.xxl,
  },
});