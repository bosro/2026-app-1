import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Clipboard,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { BackButton } from '../../components/BackButton';
import { CustomButton } from '../../components/CustomButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type ReferralScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Referral'
>;

interface Props {
  navigation: ReferralScreenNavigationProp;
}

interface ReferralHistory {
  id: string;
  name: string;
  status: 'pending' | 'completed' | 'rewarded';
  date: string;
  reward: number;
}

export const ReferralScreen: React.FC<Props> = ({ navigation }) => {
  const [copied, setCopied] = useState(false);

  const referralCode = 'BEAUTY2024XYZ';
  const referralLink = `https://beautyapp.com/ref/${referralCode}`;
  
  const stats = {
    totalReferrals: 12,
    pendingRewards: 3,
    totalEarned: 180,
  };

  const referralHistory: ReferralHistory[] = [
    {
      id: '1',
      name: 'Akosua Mensah',
      status: 'rewarded',
      date: '2 days ago',
      reward: 20,
    },
    {
      id: '2',
      name: 'Yaa Asantewaa',
      status: 'completed',
      date: '5 days ago',
      reward: 20,
    },
    {
      id: '3',
      name: 'Ama Darko',
      status: 'pending',
      date: '1 week ago',
      reward: 20,
    },
    {
      id: '4',
      name: 'Efya Boateng',
      status: 'rewarded',
      date: '2 weeks ago',
      reward: 20,
    },
  ];

  const handleCopyCode = () => {
    Clipboard.setString(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join me on Beauty App and get GHS 20 off your first booking! Use my code: ${referralCode}\n\n${referralLink}`,
        title: 'Join Beauty App',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rewarded':
        return '#4CAF50';
      case 'completed':
        return '#FF9800';
      case 'pending':
        return Theme.colors.textSecondary;
      default:
        return Theme.colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'rewarded':
        return 'Rewarded';
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Referral Program</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Card */}
          <View style={styles.heroCard}>
            <Image
              source={require('../../assets/icons/gift-icon.png')}
              style={styles.heroIcon}
              resizeMode="contain"
            />
            <Text style={styles.heroTitle}>Refer & Earn</Text>
            <Text style={styles.heroSubtitle}>
              Share Beauty App with friends and earn GHS 20 for each successful referral!
            </Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Image
                source={require('../../assets/icons/users-icon.png')}
                style={styles.statIcon}
                resizeMode="contain"
              />
              <Text style={styles.statNumber}>{stats.totalReferrals}</Text>
              <Text style={styles.statLabel}>Total Referrals</Text>
            </View>
            <View style={styles.statCard}>
              <Image
                source={require('../../assets/icons/clock-icon.png')}
                style={styles.statIcon}
                resizeMode="contain"
              />
              <Text style={styles.statNumber}>{stats.pendingRewards}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statCard}>
              <Image
                source={require('../../assets/icons/wallet-icon.png')}
                style={styles.statIcon}
                resizeMode="contain"
              />
              <Text style={styles.statNumber}>GHS {stats.totalEarned}</Text>
              <Text style={styles.statLabel}>Total Earned</Text>
            </View>
          </View>

          {/* Referral Code Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Referral Code</Text>
            <View style={styles.codeCard}>
              <View style={styles.codeContent}>
                <Text style={styles.codeLabel}>Referral Code</Text>
                <Text style={styles.codeText}>{referralCode}</Text>
              </View>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={handleCopyCode}
              >
                <Image
                  source={
                    copied
                      ? require('../../assets/icons/checkmark-icon.png')
                      : require('../../assets/icons/copy-icon.png')
                  }
                  style={styles.copyIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Share Buttons */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Share via</Text>
            <View style={styles.shareButtons}>
              <CustomButton
                title="Share Link"
                onPress={handleShare}
                variant="primary"
                style={styles.shareButton}
              />
            </View>
          </View>

          {/* How It Works */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Share Your Code</Text>
                <Text style={styles.stepDescription}>
                  Send your unique referral code to friends and family
                </Text>
              </View>
            </View>

            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Friend Signs Up</Text>
                <Text style={styles.stepDescription}>
                  They use your code to create an account and get GHS 20 off
                </Text>
              </View>
            </View>

            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>You Both Win</Text>
                <Text style={styles.stepDescription}>
                  After their first booking, you both receive GHS 20 credit
                </Text>
              </View>
            </View>
          </View>

          {/* Referral History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Referral History</Text>
            {referralHistory.length === 0 ? (
              <View style={styles.emptyState}>
                <Image
                  source={require('../../assets/icons/users-icon.png')}
                  style={styles.emptyIcon}
                  resizeMode="contain"
                />
                <Text style={styles.emptyTitle}>No Referrals Yet</Text>
                <Text style={styles.emptyText}>
                  Start sharing your code to earn rewards!
                </Text>
              </View>
            ) : (
              referralHistory.map((referral) => (
                <View key={referral.id} style={styles.historyCard}>
                  <View style={styles.historyAvatar}>
                    <Image
                      source={require('../../assets/icons/user-icon.png')}
                      style={styles.historyAvatarIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.historyContent}>
                    <Text style={styles.historyName}>{referral.name}</Text>
                    <Text style={styles.historyDate}>{referral.date}</Text>
                  </View>
                  <View style={styles.historyRight}>
                    <Text
                      style={[
                        styles.historyStatus,
                        { color: getStatusColor(referral.status) },
                      ]}
                    >
                      {getStatusText(referral.status)}
                    </Text>
                    <Text style={styles.historyReward}>
                      +GHS {referral.reward}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Terms */}
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms & Conditions</Text>
            <Text style={styles.termsText}>
              • Referral rewards are credited after the referred user completes their first booking
            </Text>
            <Text style={styles.termsText}>
              • Both referrer and referee must be active users
            </Text>
            <Text style={styles.termsText}>
              • Rewards cannot be exchanged for cash
            </Text>
            <Text style={styles.termsText}>
              • Beauty App reserves the right to modify or cancel the program at any time
            </Text>
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
    paddingBottom: Theme.spacing.xxl,
  },
  heroCard: {
    backgroundColor: Theme.colors.primary,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  heroIcon: {
    width: 60,
    height: 60,
    tintColor: Theme.colors.white,
    marginBottom: Theme.spacing.md,
  },
  heroTitle: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.sm,
  },
  heroSubtitle: {
    fontSize: Theme.fontSize.md,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  statIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
    marginBottom: Theme.spacing.sm,
  },
  statNumber: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  codeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
  },
  codeContent: {
    flex: 1,
  },
  codeLabel: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  codeText: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary,
    letterSpacing: 2,
  },
  copyButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.white,
  },
  shareButtons: {
    gap: Theme.spacing.sm,
  },
  shareButton: {
    marginBottom: 0,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  stepNumberText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    lineHeight: 20,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  historyAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  historyAvatarIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
  },
  historyContent: {
    flex: 1,
  },
  historyName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 2,
  },
  historyDate: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyStatus: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    marginBottom: 2,
  },
  historyReward: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xxl,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    tintColor: Theme.colors.textPlaceholder,
    marginBottom: Theme.spacing.md,
  },
  emptyTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  emptyText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  termsSection: {
    backgroundColor: '#FFF3E0',
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
  },
  termsTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },
  termsText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: Theme.spacing.xs,
  },
  bottomSpacer: {
    height: Theme.spacing.xxl,
  },
});