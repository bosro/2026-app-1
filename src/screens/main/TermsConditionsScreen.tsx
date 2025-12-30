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

type TermsConditionsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'TermsConditions'
>;

interface Props {
  navigation: TermsConditionsScreenNavigationProp;
}

export const TermsConditionsScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Terms & Conditions</Text>
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
              Welcome to Beauty App. These Terms and Conditions govern your use of our
              mobile application and services. By accessing or using our app, you agree
              to be bound by these terms.
            </Text>
            <Text style={styles.paragraph}>
              If you do not agree with any part of these terms, you may not use our
              services.
            </Text>
          </View>

          {/* Account Registration */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Account Registration</Text>
            <Text style={styles.paragraph}>
              To use certain features of our app, you must register for an account. You
              agree to:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>
                • Provide accurate, current, and complete information
              </Text>
              <Text style={styles.bulletItem}>
                • Maintain and update your information to keep it accurate
              </Text>
              <Text style={styles.bulletItem}>
                • Keep your password secure and confidential
              </Text>
              <Text style={styles.bulletItem}>
                • Accept responsibility for all activities under your account
              </Text>
              <Text style={styles.bulletItem}>
                • Notify us immediately of any unauthorized use
              </Text>
            </View>
          </View>

          {/* Service Usage */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Service Usage</Text>
            <Text style={styles.paragraph}>
              Beauty App provides a platform to connect users with beauty service
              providers. You agree to:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>
                • Use the service only for lawful purposes
              </Text>
              <Text style={styles.bulletItem}>
                • Not interfere with or disrupt the service
              </Text>
              <Text style={styles.bulletItem}>
                • Not attempt to gain unauthorized access
              </Text>
              <Text style={styles.bulletItem}>
                • Respect the rights of other users and service providers
              </Text>
            </View>
          </View>

          {/* Bookings and Payments */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Bookings and Payments</Text>
            <Text style={styles.subTitle}>4.1 Making Bookings</Text>
            <Text style={styles.paragraph}>
              When you make a booking through our app, you enter into a direct contract
              with the service provider. Beauty App acts as an intermediary platform.
            </Text>
            <Text style={styles.subTitle}>4.2 Payment Terms</Text>
            <Text style={styles.paragraph}>
              All payments must be made through the app using our secure payment
              system. Prices are displayed in Ghanaian Cedis (GHS) and include
              applicable taxes unless otherwise stated.
            </Text>
            <Text style={styles.subTitle}>4.3 Cancellation Policy</Text>
            <Text style={styles.paragraph}>
              Cancellation terms vary by service provider. Please review the specific
              cancellation policy before making a booking. Late cancellations may
              result in charges.
            </Text>
          </View>

          {/* User Content */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. User Content</Text>
            <Text style={styles.paragraph}>
              You retain ownership of content you submit to our app (reviews, photos,
              etc.). By submitting content, you grant us a worldwide, non-exclusive
              license to use, display, and distribute your content in connection with
              our services.
            </Text>
            <Text style={styles.paragraph}>
              You agree that your content will not:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>
                • Violate any laws or regulations
              </Text>
              <Text style={styles.bulletItem}>
                • Infringe on intellectual property rights
              </Text>
              <Text style={styles.bulletItem}>
                • Contain offensive or inappropriate material
              </Text>
              <Text style={styles.bulletItem}>
                • Include false or misleading information
              </Text>
            </View>
          </View>

          {/* Intellectual Property */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Intellectual Property</Text>
            <Text style={styles.paragraph}>
              The Beauty App platform, including its software, design, text, graphics,
              and other content, is owned by us and protected by copyright, trademark,
              and other intellectual property laws.
            </Text>
            <Text style={styles.paragraph}>
              You may not copy, modify, distribute, sell, or lease any part of our
              services without our written permission.
            </Text>
          </View>

          {/* Limitation of Liability */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
            <Text style={styles.paragraph}>
              Beauty App is not liable for:
            </Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>
                • The quality or outcome of services provided by beauty professionals
              </Text>
              <Text style={styles.bulletItem}>
                • Any disputes between users and service providers
              </Text>
              <Text style={styles.bulletItem}>
                • Any indirect, incidental, or consequential damages
              </Text>
              <Text style={styles.bulletItem}>
                • Loss of data or service interruptions
              </Text>
            </View>
          </View>

          {/* Termination */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Termination</Text>
            <Text style={styles.paragraph}>
              We reserve the right to suspend or terminate your account at any time for
              violations of these terms or for any other reason at our discretion.
            </Text>
            <Text style={styles.paragraph}>
              You may terminate your account at any time through the app settings.
            </Text>
          </View>

          {/* Changes to Terms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
            <Text style={styles.paragraph}>
              We may modify these Terms and Conditions at any time. We will notify you
              of significant changes through the app or via email. Your continued use
              of the service after changes constitutes acceptance of the new terms.
            </Text>
          </View>

          {/* Governing Law */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Governing Law</Text>
            <Text style={styles.paragraph}>
              These Terms and Conditions are governed by the laws of Ghana. Any
              disputes arising from these terms shall be subject to the exclusive
              jurisdiction of the courts of Ghana.
            </Text>
          </View>

          {/* Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Contact Us</Text>
            <Text style={styles.paragraph}>
              If you have any questions about these Terms and Conditions, please
              contact us:
            </Text>
            <View style={styles.contactCard}>
              <Text style={styles.contactText}>Email: support@beautyapp.com</Text>
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