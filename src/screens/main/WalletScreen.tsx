import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { BackButton } from '../../components/BackButton';
import { CustomButton } from '../../components/CustomButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type WalletScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Wallet'
>;

interface Props {
  navigation: WalletScreenNavigationProp;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

export const WalletScreen: React.FC<Props> = ({ navigation }) => {
  const [balance] = useState(180.50);
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'topup' | 'history'>('topup');

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      description: 'Referral bonus from Akosua Mensah',
      amount: 20,
      date: 'Dec 28, 2024',
      status: 'completed',
    },
    {
      id: '2',
      type: 'debit',
      description: 'Payment for Bestman Barbershop',
      amount: -60,
      date: 'Dec 25, 2024',
      status: 'completed',
    },
    {
      id: '3',
      type: 'credit',
      description: 'Wallet top-up',
      amount: 100,
      date: 'Dec 20, 2024',
      status: 'completed',
    },
    {
      id: '4',
      type: 'debit',
      description: 'Payment for Premium Beauty Salon',
      amount: -120,
      date: 'Dec 15, 2024',
      status: 'completed',
    },
    {
      id: '5',
      type: 'credit',
      description: 'Promotional credit',
      amount: 50,
      date: 'Dec 10, 2024',
      status: 'completed',
    },
  ];

  const handleTopUp = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }
    Alert.alert('Top Up', `Top up GHS ${amount}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: () => {
          Alert.alert('Success', 'Wallet topped up successfully');
          setAmount('');
        },
      },
    ]);
  };

  const renderTopUp = () => (
    <View style={styles.tabContent}>
      {/* Quick Amount Buttons */}
      <Text style={styles.sectionTitle}>Quick Amount</Text>
      <View style={styles.quickAmounts}>
        {[50, 100, 200, 500].map((value) => (
          <TouchableOpacity
            key={value}
            style={styles.quickAmountButton}
            onPress={() => setAmount(value.toString())}
          >
            <Text style={styles.quickAmountText}>GHS {value}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Amount */}
      <Text style={styles.sectionTitle}>Or Enter Amount</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>GHS</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="0.00"
          placeholderTextColor={Theme.colors.textPlaceholder}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
      </View>

      {/* Payment Methods */}
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <TouchableOpacity style={styles.paymentMethod}>
        <Image
          source={require('../../assets/icons/credit-card-icon.png')}
          style={styles.paymentIcon}
          resizeMode="contain"
        />
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentName}>Credit/Debit Card</Text>
          <Text style={styles.paymentSubtext}>Visa, Mastercard</Text>
        </View>
        <Image
          source={require('../../assets/icons/arrow-right.png')}
          style={styles.paymentArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentMethod}>
        <Image
          source={require('../../assets/icons/mobile-money-icon.png')}
          style={styles.paymentIcon}
          resizeMode="contain"
        />
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentName}>Mobile Money</Text>
          <Text style={styles.paymentSubtext}>MTN, Vodafone, AirtelTigo</Text>
        </View>
        <Image
          source={require('../../assets/icons/arrow-right.png')}
          style={styles.paymentArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <CustomButton
        title="Top Up Wallet"
        onPress={handleTopUp}
        variant="primary"
        style={styles.topUpButton}
      />
    </View>
  );

  const renderHistory = () => (
    <View style={styles.tabContent}>
      {transactions.length === 0 ? (
        <View style={styles.emptyState}>
          <Image
            source={require('../../assets/icons/wallet-icon.png')}
            style={styles.emptyIcon}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>No Transactions</Text>
          <Text style={styles.emptyText}>
            Your transaction history will appear here
          </Text>
        </View>
      ) : (
        transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View
              style={[
                styles.transactionIconContainer,
                {
                  backgroundColor:
                    transaction.type === 'credit'
                      ? '#4CAF5020'
                      : '#F4433620',
                },
              ]}
            >
              <Image
                source={
                  transaction.type === 'credit'
                    ? require('../../assets/icons/arrow-down-icon.png')
                    : require('../../assets/icons/arrow-up-icon.png')
                }
                style={[
                  styles.transactionIcon,
                  {
                    tintColor:
                      transaction.type === 'credit' ? '#4CAF50' : '#F44336',
                  },
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={styles.transactionContent}>
              <Text style={styles.transactionDescription}>
                {transaction.description}
              </Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                {
                  color:
                    transaction.type === 'credit'
                      ? '#4CAF50'
                      : Theme.colors.textPrimary,
                },
              ]}
            >
              {transaction.type === 'credit' ? '+' : ''}GHS {Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </View>
        ))
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Wallet</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>GHS {balance.toFixed(2)}</Text>
            <View style={styles.balanceActions}>
              <TouchableOpacity
                style={styles.balanceAction}
                onPress={() => setActiveTab('topup')}
              >
                <Image
                  source={require('../../assets/icons/plus-icon.png')}
                  style={styles.balanceActionIcon}
                  resizeMode="contain"
                />
                <Text style={styles.balanceActionText}>Top Up</Text>
              </TouchableOpacity>
              <View style={styles.balanceActionDivider} />
              <TouchableOpacity
                style={styles.balanceAction}
                onPress={() => setActiveTab('history')}
              >
                <Image
                  source={require('../../assets/icons/history-icon.png')}
                  style={styles.balanceActionIcon}
                  resizeMode="contain"
                />
                <Text style={styles.balanceActionText}>History</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'topup' && styles.tabActive]}
              onPress={() => setActiveTab('topup')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'topup' && styles.tabTextActive,
                ]}
              >
                Top Up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'history' && styles.tabActive]}
              onPress={() => setActiveTab('history')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'history' && styles.tabTextActive,
                ]}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'topup' ? renderTopUp() : renderHistory()}

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
  balanceCard: {
    backgroundColor: Theme.colors.primary,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.xl,
    marginBottom: Theme.spacing.lg,
  },
  balanceLabel: {
    fontSize: Theme.fontSize.md,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.lg,
  },
  balanceActions: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
  },
  balanceAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  balanceActionIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.white,
  },
  balanceActionText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.medium,
  },
  balanceActionDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: Theme.spacing.sm,
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
  tabContent: {
    paddingHorizontal: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  quickAmounts: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.xl,
  },
  quickAmountButton: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  quickAmountText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  currencySymbol: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginRight: Theme.spacing.sm,
  },
  amountInput: {
    flex: 1,
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    paddingVertical: Theme.spacing.md,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  paymentIcon: {
    width: 32,
    height: 32,
    marginRight: Theme.spacing.md,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
    marginBottom: 2,
  },
  paymentSubtext: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  paymentArrow: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.textSecondary,
  },
  topUpButton: {
    marginTop: Theme.spacing.lg,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  transactionIcon: {
    width: 20,
    height: 20,
  },
  transactionContent: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  transactionAmount: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xxl * 2,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    tintColor: Theme.colors.textPlaceholder,
    marginBottom: Theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },
  emptyText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: Theme.spacing.xxl,
  },
});