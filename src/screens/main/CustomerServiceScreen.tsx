import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { BackButton } from '../../components/BackButton';
import { CustomButton } from '../../components/CustomButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type CustomerServiceScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'CustomerService'
>;

interface Props {
  navigation: CustomerServiceScreenNavigationProp;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const CustomerServiceScreen: React.FC<Props> = ({ navigation }) => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'contact' | 'faq'>('contact');

  const contactMethods = [
    {
      id: '1',
      title: 'Call Us',
      subtitle: '+233 50 123 4567',
      icon: require('../../assets/icons/phone-icon.png'),
      action: () => Linking.openURL('tel:+233501234567'),
    },
    {
      id: '2',
      title: 'Email Us',
      subtitle: 'support@beautyapp.com',
      icon: require('../../assets/icons/email-icon.png'),
      action: () => Linking.openURL('mailto:support@beautyapp.com'),
    },
    {
      id: '3',
      title: 'WhatsApp',
      subtitle: 'Chat with us',
      icon: require('../../assets/icons/whatsapp-icon.png'),
      action: () => Linking.openURL('whatsapp://send?phone=233501234567'),
    },
    {
      id: '4',
      title: 'Live Chat',
      subtitle: 'Available 24/7',
      icon: require('../../assets/icons/chat-icon.png'),
      action: () => Alert.alert('Live Chat', 'Live chat feature coming soon!'),
    },
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I book an appointment?',
      answer:
        'To book an appointment, browse salons in your area, select a service, choose your preferred date and time, and confirm your booking. You\'ll receive a confirmation notification.',
      category: 'Booking',
    },
    {
      id: '2',
      question: 'Can I cancel or reschedule my booking?',
      answer:
        'Yes, you can cancel or reschedule bookings from the "My Bookings" section. Please note that cancellation policies vary by salon. Some may charge a fee for late cancellations.',
      category: 'Booking',
    },
    {
      id: '3',
      question: 'What payment methods are accepted?',
      answer:
        'We accept Mobile Money, credit/debit cards (Visa, Mastercard), and bank transfers. All payments are processed securely through our payment partners.',
      category: 'Payment',
    },
    {
      id: '4',
      question: 'How do I get a refund?',
      answer:
        'Refunds are processed according to each salon\'s cancellation policy. If you\'re eligible for a refund, it will be credited back to your original payment method within 5-7 business days.',
      category: 'Payment',
    },
    {
      id: '5',
      question: 'How do I leave a review?',
      answer:
        'After your appointment, you can leave a review by going to "My Bookings", selecting the completed booking, and tapping "Leave a Review". Your feedback helps other users!',
      category: 'Reviews',
    },
    {
      id: '6',
      question: 'Are my personal details safe?',
      answer:
        'Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your consent. Read our Privacy Policy for more details.',
      category: 'Security',
    },
    {
      id: '7',
      question: 'How does the referral program work?',
      answer:
        'Share your unique referral code with friends. When they sign up and complete their first booking, you both receive GHS 20 credit. Check the Referral section for more details.',
      category: 'Rewards',
    },
    {
      id: '8',
      question: 'Can I change my profile information?',
      answer:
        'Yes, go to Profile > Profile Settings to update your name, email, phone number, and profile picture. Make sure to save your changes.',
      category: 'Account',
    },
  ];

  const handleSendMessage = () => {
    if (message.trim() === '') {
      Alert.alert('Error', 'Please enter a message');
      return;
    }
    Alert.alert(
      'Message Sent',
      'Thank you for contacting us. We\'ll respond within 24 hours.',
      [{ text: 'OK', onPress: () => setMessage('') }]
    );
  };

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const renderContact = () => (
    <View>
      {/* Contact Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get in Touch</Text>
        <View style={styles.contactGrid}>
          {contactMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.contactCard}
              onPress={method.action}
              activeOpacity={0.7}
            >
              <View style={styles.contactIconContainer}>
                <Image
                  source={method.icon}
                  style={styles.contactIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.contactTitle}>{method.title}</Text>
              <Text style={styles.contactSubtitle}>{method.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Send Message */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Send Us a Message</Text>
        <View style={styles.messageCard}>
          <TextInput
            style={styles.messageInput}
            placeholder="Describe your issue or question..."
            placeholderTextColor={Theme.colors.textPlaceholder}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <CustomButton
            title="Send Message"
            onPress={handleSendMessage}
            variant="primary"
            style={styles.sendButton}
          />
        </View>
      </View>

      {/* Operating Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Operating Hours</Text>
        <View style={styles.hoursCard}>
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Monday - Friday</Text>
            <Text style={styles.hoursTime}>8:00 AM - 8:00 PM</Text>
          </View>
          <View style={styles.hoursDivider} />
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Saturday</Text>
            <Text style={styles.hoursTime}>9:00 AM - 6:00 PM</Text>
          </View>
          <View style={styles.hoursDivider} />
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Sunday</Text>
            <Text style={styles.hoursTime}>10:00 AM - 4:00 PM</Text>
          </View>
        </View>
      </View>

      {/* Social Media */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://facebook.com')}
          >
            <Image
              source={require('../../assets/icons/facebook-icon.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://twitter.com')}
          >
            <Image
              source={require('../../assets/icons/twitter-icon.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://instagram.com')}
          >
            <Image
              source={require('../../assets/icons/instagram-icon.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => Linking.openURL('https://tiktok.com')}
          >
            <Image
              source={require('../../assets/icons/tiktok-icon.png')}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFAQ = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      {faqs.map((faq) => (
        <TouchableOpacity
          key={faq.id}
          style={styles.faqCard}
          onPress={() => toggleFAQ(faq.id)}
          activeOpacity={0.7}
        >
          <View style={styles.faqHeader}>
            <View style={styles.faqCategoryBadge}>
              <Text style={styles.faqCategoryText}>{faq.category}</Text>
            </View>
            <Image
              source={require('../../assets/icons/chevron-down.png')}
              style={[
                styles.faqChevron,
                expandedFAQ === faq.id && styles.faqChevronExpanded,
              ]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.faqQuestion}>{faq.question}</Text>
          {expandedFAQ === faq.id && (
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Customer Service</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'contact' && styles.tabActive]}
            onPress={() => setActiveTab('contact')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'contact' && styles.tabTextActive,
              ]}
            >
              Contact Us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'faq' && styles.tabActive]}
            onPress={() => setActiveTab('faq')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'faq' && styles.tabTextActive,
              ]}
            >
              FAQ
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === 'contact' ? renderContact() : renderFAQ()}

          {/* Help Center Banner */}
          <View style={styles.helpBanner}>
            <Image
              source={require('../../assets/icons/help-icon.png')}
              style={styles.helpIcon}
              resizeMode="contain"
            />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Need More Help?</Text>
              <Text style={styles.helpText}>
                Visit our Help Center for detailed guides and tutorials
              </Text>
            </View>
            <TouchableOpacity style={styles.helpButton}>
              <Image
                source={require('../../assets/icons/arrow-right.png')}
                style={styles.helpArrow}
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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Theme.colors.black,
  },
  tabText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.medium,
  },
  tabTextActive: {
    color: Theme.colors.white,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xxl,
  },
  section: {
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  contactCard: {
    width: '48.5%',
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  contactIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.sm,
  },
  contactIcon: {
    width: 28,
    height: 28,
    tintColor: Theme.colors.primary,
  },
  contactTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  contactSubtitle: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  messageCard: {
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
  },
  messageInput: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    minHeight: 120,
    marginBottom: Theme.spacing.md,
  },
  sendButton: {
    marginBottom: 0,
  },
  hoursCard: {
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  hoursDay: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.medium,
  },
  hoursTime: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
  },
  hoursDivider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: Theme.spacing.xs,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    justifyContent: 'center',
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 28,
    height: 28,
    tintColor: Theme.colors.primary,
  },
  faqCard: {
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  faqCategoryBadge: {
    backgroundColor: Theme.colors.primary + '20',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  faqCategoryText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.primary,
  },
  faqChevron: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.textSecondary,
  },
  faqChevronExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  faqQuestion: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },
  faqAnswer: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    lineHeight: 22,
    marginTop: Theme.spacing.xs,
  },
  helpBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
  },
  helpIcon: {
    width: 40,
    height: 40,
    tintColor: Theme.colors.white,
    marginRight: Theme.spacing.md,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
    marginBottom: 4,
  },
  helpText: {
    fontSize: Theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  helpButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpArrow: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.white,
  },
  bottomSpacer: {
    height: Theme.spacing.xxl,
  },
});