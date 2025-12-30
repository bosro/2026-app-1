import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../types/navigation';
import { CustomButton } from '../../components/CustomButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type BookingConfirmationScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'BookingConfirmation'
>;

type BookingConfirmationScreenRouteProp = RouteProp<
  MainStackParamList,
  'BookingConfirmation'
>;

interface Props {
  navigation: BookingConfirmationScreenNavigationProp;
  route: BookingConfirmationScreenRouteProp;
}

export const BookingConfirmationScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { bookingId } = route.params;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.successCircle}>
              <Image
                source={require('../../assets/icons/checkmark-icon.png')}
                style={styles.checkmarkIcon}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Success Message */}
          <Text style={styles.title}>Booking Confirmed!</Text>
          <Text style={styles.subtitle}>
            Your appointment has been successfully booked
          </Text>

          {/* Booking Details Card */}
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Booking ID</Text>
              <Text style={styles.detailValue}>#{bookingId}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Salon</Text>
              <Text style={styles.detailValue}>Bestman Barbershop</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>Men's low cut</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>Dec 8, 2024 - 10:00 AM</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={[styles.detailValue, styles.priceText]}>
                GHS 60.00
              </Text>
            </View>
          </View>

          {/* Info Message */}
          <View style={styles.infoBox}>
            <Image
              source={require('../../assets/icons/info-icon.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              A confirmation message has been sent to your email and phone number
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="View Booking"
            onPress={() =>
              navigation.navigate('BookingDetails', { bookingId })
            }
            variant="secondary"
            style={styles.button}
          />
          <CustomButton
            title="Back to Home"
            onPress={() =>
              navigation.navigate('MainTabs', { screen: 'Home' })
            }
            variant="primary"
            style={styles.button}
          />
        </View>
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
    flexGrow: 1,
    padding: Theme.spacing.lg,
    alignItems: 'center',
    paddingTop: Theme.spacing.xxl * 2,
  },
  iconContainer: {
    marginBottom: Theme.spacing.xl,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Theme.colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkIcon: {
    width: 50,
    height: 50,
    tintColor: Theme.colors.white,
  },
  title: {
    fontSize: Theme.fontSize.xxxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xxl,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  detailLabel: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
  },
  detailValue: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
  },
  priceText: {
    color: Theme.colors.primary,
    fontSize: Theme.fontSize.lg,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: Theme.spacing.xs,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    width: '100%',
  },
  infoIcon: {
    width: 20,
    height: 20,
    tintColor: '#1976D2',
    marginRight: Theme.spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
    lineHeight: 20,
  },
  buttonsContainer: {
    padding: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  button: {
    marginBottom: 0,
  },
});