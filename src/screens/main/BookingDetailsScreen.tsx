import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../types/navigation';
import { CustomButton } from '../../components/CustomButton';
import { Theme } from '../../constants/theme';

type BookingDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'BookingDetails'
>;

type BookingDetailsScreenRouteProp = RouteProp<
  MainStackParamList,
  'BookingDetails'
>;

interface Props {
  navigation: BookingDetailsScreenNavigationProp;
  route: BookingDetailsScreenRouteProp;
}

type BookingStatus = "pending" | "completed" | "cancelled"

export const BookingDetailsScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { bookingId } = route.params;
  const [loading, setLoading] = useState(false);

  // Dummy data - replace with API call
  const booking = {
    id: bookingId,
    status: 'pending' as BookingStatus,
    date: 'Dec 22, 2024',
    time: '10:30 AM',
    salon: {
      name: 'Bestman Barbershop',
      image: 'https://via.placeholder.com/100',
      location: 'City campus, Accra',
      phone: '0575540404',
      rating: 4.2,
      reviewCount: 200,
    },
    service: {
      name: 'Men\'s low cut',
      duration: '45mins',
      price: 60.0,
    },
    contact: '0244123456',
    note: 'Please use beard trimmer for the edges',
    bookingDate: 'Dec 15, 2024',
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
              setLoading(false);
              navigation.navigate('MainTabs', { screen: 'Bookings' });
            }, 1500);
          },
        },
      ]
    );
  };

  const handleReschedule = () => {
    navigation.navigate('BookAppointment', {
      salonId: '1',
      service: {
        id: '1',
        name: booking.service.name,
        price: booking.service.price,
        duration: booking.service.duration,
      },
    });
  };

  const handleCall = () => {
    Linking.openURL(`tel:${booking.salon.phone}`);
  };

  const handleGetDirections = () => {
    // Open Google Maps or Apple Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      booking.salon.location
    )}`;
    Linking.openURL(url);
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case 'pending':
        return Theme.colors.warning;
      case 'cancelled':
        return Theme.colors.error;
      case 'completed':
        return Theme.colors.success;
      default:
        return Theme.colors.textSecondary;
    }
  };

  const getStatusBadgeStyle = () => ({
    backgroundColor: `${getStatusColor()}20`,
    borderColor: getStatusColor(),
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Booking Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Status Badge */}
        <View style={[styles.statusBadge, getStatusBadgeStyle()]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {booking.status.toUpperCase()}
          </Text>
        </View>

        {/* Booking Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Booking ID</Text>
            <Text style={styles.infoValue}>#{booking.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>{booking.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>{booking.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Booked on</Text>
            <Text style={styles.infoValue}>{booking.bookingDate}</Text>
          </View>
        </View>

        {/* Salon Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Salon Details</Text>
          <View style={styles.salonInfo}>
            <Image
              source={{ uri: booking.salon.image }}
              style={styles.salonImage}
            />
            <View style={styles.salonDetails}>
              <Text style={styles.salonName}>{booking.salon.name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.star}>⭐</Text>
                <Text style={styles.ratingText}>
                  {booking.salon.rating}({booking.salon.reviewCount})
                </Text>
              </View>
              <View style={styles.locationContainer}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.locationText}>
                  {booking.salon.location}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.salonActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <Text style={styles.actionIcon}>📞</Text>
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleGetDirections}
            >
              <Text style={styles.actionIcon}>🗺️</Text>
              <Text style={styles.actionText}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate('SalonDetails', { salonId: '1' })
              }
            >
              <Text style={styles.actionIcon}>ℹ️</Text>
              <Text style={styles.actionText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Service Details</Text>
          <View style={styles.serviceInfo}>
            <View style={styles.serviceRow}>
              <Text style={styles.serviceName}>{booking.service.name}</Text>
              <Text style={styles.servicePrice}>
                GHS {booking.service.price.toFixed(2)}
              </Text>
            </View>
            <Text style={styles.serviceDuration}>
              Duration: {booking.service.duration}
            </Text>
          </View>
        </View>

        {/* Contact Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${booking.contact}`)}>
              <Text style={[styles.infoValue, styles.linkText]}>
                {booking.contact}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notes Card */}
        {booking.note && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Notes</Text>
            <Text style={styles.noteText}>{booking.note}</Text>
          </View>
        )}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Action Buttons */}
      {booking.status === 'pending' && (
        <View style={styles.actionsContainer}>
          <CustomButton
            title="Cancel Booking"
            onPress={handleCancel}
            variant="secondary"
            style={styles.actionBtn}
            loading={loading}
          />
          <CustomButton
            title="Reschedule"
            onPress={handleReschedule}
            variant="primary"
            style={styles.actionBtn}
          />
        </View>
      )}

      {booking.status === 'completed' && (
        <View style={styles.actionsContainer}>
          <CustomButton
            title="Leave a Review"
            onPress={() => navigation.navigate('LeaveReview', { salonId: '1' })}
            variant="primary"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: Theme.colors.textPrimary,
  },
  title: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    marginBottom: Theme.spacing.lg,
  },
  statusText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.bold,
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  cardTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  infoLabel: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
  },
  linkText: {
    color: Theme.colors.primary,
  },
  salonInfo: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
  },
  salonImage: {
    width: 80,
    height: 80,
    borderRadius: Theme.borderRadius.md,
  },
  salonDetails: {
    flex: 1,
    marginLeft: Theme.spacing.md,
    justifyContent: 'center',
  },
  salonName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    flex: 1,
  },
  salonActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  actionButton: {
    alignItems: 'center',
    padding: Theme.spacing.sm,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
  },
  serviceInfo: {
    paddingVertical: Theme.spacing.sm,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
  },
  servicePrice: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary,
  },
  serviceDuration: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  noteText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 100,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  actionBtn: {
    flex: 1,
  },
});