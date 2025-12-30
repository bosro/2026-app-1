import React, { useState } from 'react';
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

type BookingsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Bookings'
>;

interface Props {
  navigation: BookingsScreenNavigationProp;
}

interface Booking {
  id: string;
  salonName: string;
  salonImage: any;
  serviceName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  location: string;
}

export const BookingsScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const bookings: Booking[] = [
    {
      id: '1',
      salonName: 'Bestman Barbershop',
      salonImage: require('../../assets/images/salon1.jpg'),
      serviceName: "Men's Haircut",
      date: 'Dec 25, 2024',
      time: '10:00 AM',
      status: 'upcoming',
      price: 60,
      location: 'City campus, Accra',
    },
    {
      id: '2',
      salonName: 'Premium Beauty Salon',
      salonImage: require('../../assets/images/salon2.jpg'),
      serviceName: 'Makeup Session',
      date: 'Dec 28, 2024',
      time: '2:00 PM',
      status: 'upcoming',
      price: 120,
      location: 'Mobibin, Accra',
    },
    {
      id: '3',
      salonName: 'Noble Makeup Parlour',
      salonImage: require('../../assets/images/salon3.jpg'),
      serviceName: 'Facial Treatment',
      date: 'Dec 15, 2024',
      time: '11:00 AM',
      status: 'completed',
      price: 80,
      location: 'East Legon, Accra',
    },
    {
      id: '4',
      salonName: 'Glam Studio',
      salonImage: require('../../assets/images/salon4.jpg'),
      serviceName: 'Hair Braiding',
      date: 'Dec 10, 2024',
      time: '9:00 AM',
      status: 'completed',
      price: 150,
      location: 'Osu, Accra',
    },
  ];

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const completedBookings = bookings.filter(b => b.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#4CAF50';
      case 'completed':
        return '#9E9E9E';
      case 'cancelled':
        return '#F44336';
      default:
        return Theme.colors.textSecondary;
    }
  };

  const renderBookingCard = (booking: Booking) => (
    <TouchableOpacity
      key={booking.id}
      style={styles.bookingCard}
      onPress={() => console.log('View booking details:', booking.id)}
      activeOpacity={0.7}
    >
      <Image source={booking.salonImage} style={styles.bookingImage} />
      <View style={styles.bookingContent}>
        <View style={styles.bookingHeader}>
          <Text style={styles.salonName}>{booking.salonName}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(booking.status)}20` },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(booking.status) },
              ]}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Text>
          </View>
        </View>

        <Text style={styles.serviceName}>{booking.serviceName}</Text>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Image
              source={require('../../assets/icons/calendar-icon.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailText}>{booking.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Image
              source={require('../../assets/icons/clock-icon.png')}
              style={styles.detailIcon}
              resizeMode="contain"
            />
            <Text style={styles.detailText}>{booking.time}</Text>
          </View>
        </View>

        <View style={styles.bookingFooter}>
          <View style={styles.locationRow}>
            <Image
              source={require('../../assets/icons/location-marker.png')}
              style={styles.locationIcon}
              resizeMode="contain"
            />
            <Text style={styles.locationText} numberOfLines={1}>
              {booking.location}
            </Text>
          </View>
          <Text style={styles.priceText}>GHS {booking.price.toFixed(2)}</Text>
        </View>

        {booking.status === 'upcoming' && (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
              <Text style={[styles.actionButtonText, styles.cancelButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {booking.status === 'completed' && (
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Leave Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Bookings</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'upcoming' && styles.tabTextActive,
              ]}
            >
              Upcoming ({upcomingBookings.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
            onPress={() => setActiveTab('completed')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'completed' && styles.tabTextActive,
              ]}
            >
              Completed ({completedBookings.length})
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === 'upcoming' ? (
            upcomingBookings.length === 0 ? (
              <View style={styles.emptyState}>
                <Image
                  source={require('../../assets/icons/calendar-icon.png')}
                  style={styles.emptyIcon}
                  resizeMode="contain"
                />
                <Text style={styles.emptyTitle}>No Upcoming Bookings</Text>
                <Text style={styles.emptyText}>
                  Book your next appointment to get started
                </Text>
                <TouchableOpacity
                  style={styles.bookNowButton}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text style={styles.bookNowButtonText}>Browse Salons</Text>
                </TouchableOpacity>
              </View>
            ) : (
              upcomingBookings.map(renderBookingCard)
            )
          ) : completedBookings.length === 0 ? (
            <View style={styles.emptyState}>
              <Image
                source={require('../../assets/icons/checkmark-icon.png')}
                style={styles.emptyIcon}
                resizeMode="contain"
              />
              <Text style={styles.emptyTitle}>No Completed Bookings</Text>
              <Text style={styles.emptyText}>
                Your completed appointments will appear here
              </Text>
            </View>
          ) : (
            completedBookings.map(renderBookingCard)
          )}

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
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
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
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  bookingCard: {
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
  },
  bookingImage: {
    width: '100%',
    height: 120,
  },
  bookingContent: {
    padding: Theme.spacing.md,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  salonName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  statusText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.semibold,
  },
  serviceName: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  bookingDetails: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    width: 16,
    height: 16,
    tintColor: Theme.colors.primary,
    marginRight: 6,
  },
  detailText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.textSecondary,
    marginRight: 4,
  },
  locationText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    flex: 1,
  },
  priceText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.white,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.colors.error,
  },
  cancelButtonText: {
    color: Theme.colors.error,
  },
  reviewButton: {
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  reviewButtonText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.white,
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
    marginBottom: Theme.spacing.lg,
  },
  bookNowButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  bookNowButtonText: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.white,
  },
  bottomSpacer: {
    height: Theme.spacing.xxl,
  },
});

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import { BookingCard } from '../../components/BookingCard';
// import { Theme } from '../../constants/theme';
// import { Booking } from '../../types';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export const BookingsScreen: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<
//     'pending' | 'cancelled' | 'completed'
//   >('pending');

//   // Dummy data
//   const bookings: Booking[] = [
//     {
//       id: '1',
//       date: 'Dec 22',
//       time: '10:30am',
//       salonName: 'Bestman Barbershop',
//       salonImage: require('../../assets/images/salon1.jpg'),
//       location: 'City campus, Accra',
//       service: 'Shaving and dying',
//       status: 'pending',
//     },
//     {
//       id: '2',
//       date: 'Dec 22',
//       time: '10:30am',
//       salonName: 'Bestman Barbershop',
//       salonImage: require('../../assets/images/salon1.jpg'),
//       location: 'City campus, Accra',
//       service: 'Shaving and dying',
//       status: 'pending',
//     },
//     {
//       id: '3',
//       date: 'Dec 22',
//       time: '10:30am',
//       salonName: 'Bestman Barbershop',
//       salonImage: require('../../assets/images/salon1.jpg'),
//       location: 'City campus, Accra',
//       service: 'Shaving and dying',
//       status: 'pending',
//     },
//     {
//       id: '4',
//       date: 'Dec 22',
//       time: '10:30am',
//       salonName: 'Bestman Barbershop',
//       salonImage: require('../../assets/images/salon1.jpg'),
//       location: 'City campus, Accra',
//       service: 'Shaving and dying',
//       status: 'pending',
//     },
//   ];

//   const filteredBookings = bookings.filter(
//     (booking) => booking.status === activeTab
//   );

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top']}>
//       <View style={styles.container}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.title}>Bookings</Text>
//           </View>

//           {/* Tabs */}
//           <View style={styles.tabs}>
//             <TouchableOpacity
//               style={[
//                 styles.tab,
//                 activeTab === 'pending' && styles.tabActive,
//               ]}
//               onPress={() => setActiveTab('pending')}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'pending' && styles.tabTextActive,
//                 ]}
//               >
//                 Pending
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.tab,
//                 activeTab === 'cancelled' && styles.tabActive,
//               ]}
//               onPress={() => setActiveTab('cancelled')}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'cancelled' && styles.tabTextActive,
//                 ]}
//               >
//                 Cancelled
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[
//                 styles.tab,
//                 activeTab === 'completed' && styles.tabActive,
//               ]}
//               onPress={() => setActiveTab('completed')}
//             >
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === 'completed' && styles.tabTextActive,
//                 ]}
//               >
//                 Completed
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Bookings List */}
//           <View style={styles.bookingsContainer}>
//             {filteredBookings.length > 0 ? (
//               filteredBookings.map((booking) => (
//                 <BookingCard
//                   key={booking.id}
//                   {...booking}
//                   onCancel={() => console.log('Cancel booking:', booking.id)}
//                   onReschedule={() =>
//                     console.log('Reschedule booking:', booking.id)
//                   }
//                 />
//               ))
//             ) : (
//               <View style={styles.emptyState}>
//                 <Text style={styles.emptyText}>
//                   No {activeTab} bookings
//                 </Text>
//               </View>
//             )}
//           </View>

//           {/* Bottom spacing for tab bar */}
//           <View style={styles.bottomSpacer} />
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: Theme.colors.background,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: Theme.colors.background,
//   },
//   scrollContent: {
//     paddingTop: Theme.spacing.md,
//     paddingHorizontal: Theme.spacing.lg,
//   },
//   header: {
//     marginBottom: Theme.spacing.lg,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: Theme.fontSize.xxl,
//     fontWeight: Theme.fontWeight.bold,
//     color: Theme.colors.textPrimary,
//   },
//   tabs: {
//     flexDirection: 'row',
//     gap: Theme.spacing.sm,
//     marginBottom: Theme.spacing.lg,
//   },
//   tab: {
//     flex: 1,
//     paddingVertical: Theme.spacing.md,
//     borderRadius: Theme.borderRadius.lg,
//     backgroundColor: Theme.colors.backgroundSecondary,
//     alignItems: 'center',
//   },
//   tabActive: {
//     backgroundColor: Theme.colors.black,
//   },
//   tabText: {
//     fontSize: Theme.fontSize.md,
//     color: Theme.colors.textPrimary,
//     fontWeight: Theme.fontWeight.medium,
//   },
//   tabTextActive: {
//     color: Theme.colors.white,
//   },
//   bookingsContainer: {
//     marginTop: Theme.spacing.sm,
//   },
//   emptyState: {
//     padding: Theme.spacing.xxl,
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: Theme.fontSize.md,
//     color: Theme.colors.textSecondary,
//   },
//   bottomSpacer: {
//     height: 100,
//   },
// });