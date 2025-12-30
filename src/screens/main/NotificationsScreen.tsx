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
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type NotificationsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Notifications'
>;

interface Props {
  navigation: NotificationsScreenNavigationProp;
}

interface Notification {
  id: string;
  type: 'booking' | 'promotion' | 'reminder' | 'review';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  image?: any;
  actionType?: 'booking' | 'salon';
  actionId?: string;
}

export const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your appointment at Bestman Barbershop has been confirmed for Dec 22, 10:30 AM',
      time: '2 hours ago',
      isRead: false,
      image: require('../../assets/images/salon1.jpg'),
      actionType: 'booking',
      actionId: 'BK123',
    },
    {
      id: '2',
      type: 'promotion',
      title: '50% Off This Weekend!',
      message: 'Premium Beauty Salon is offering 50% off on all services this weekend. Book now!',
      time: '5 hours ago',
      isRead: false,
      image: require('../../assets/images/salon2.jpg'),
      actionType: 'salon',
      actionId: '2',
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Upcoming Appointment',
      message: 'You have an appointment tomorrow at 10:30 AM at Bestman Barbershop',
      time: '1 day ago',
      isRead: true,
      image: require('../../assets/images/salon1.jpg'),
      actionType: 'booking',
      actionId: 'BK124',
    },
    {
      id: '4',
      type: 'review',
      title: 'How was your experience?',
      message: 'Please leave a review for your recent visit to Noble Makeup Parlour',
      time: '2 days ago',
      isRead: true,
      image: require('../../assets/images/salon3.jpg'),
      actionType: 'salon',
      actionId: '3',
    },
  ]);

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );

    // Navigate based on action type
    if (notification.actionType === 'booking' && notification.actionId) {
      navigation.navigate('BookingDetails', { bookingId: notification.actionId });
    } else if (notification.actionType === 'salon' && notification.actionId) {
      navigation.navigate('SalonDetails', { salonId: notification.actionId });
    }
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return require('../../assets/icons/calendar-icon.png');
      case 'promotion':
        return require('../../assets/icons/promotion-icon.png');
      case 'reminder':
        return require('../../assets/icons/reminder-icon.png');
      case 'review':
        return require('../../assets/icons/star.png');
      default:
        return require('../../assets/icons/notification-bell.png');
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Notifications</Text>
          <TouchableOpacity onPress={handleMarkAllRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../assets/icons/notification-bell.png')}
              style={styles.emptyIcon}
              resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyText}>
              You're all caught up! Check back later for updates.
            </Text>
          </View>
        ) : (
          <>
            {unreadCount > 0 && (
              <View style={styles.unreadBanner}>
                <Text style={styles.unreadText}>
                  You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                </Text>
                <TouchableOpacity onPress={handleClearAll}>
                  <Text style={styles.clearAllText}>Clear all</Text>
                </TouchableOpacity>
              </View>
            )}

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationCard,
                    !notification.isRead && styles.unreadCard,
                  ]}
                  onPress={() => handleNotificationPress(notification)}
                  activeOpacity={0.7}
                >
                  <View style={styles.notificationIcon}>
                    {notification.image ? (
                      <Image
                        source={notification.image}
                        style={styles.notificationImage}
                      />
                    ) : (
                      <Image
                        source={getNotificationIcon(notification.type)}
                        style={styles.iconImage}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>
                  {!notification.isRead && <View style={styles.unreadDot} />}
                </TouchableOpacity>
              ))}

              <View style={styles.bottomSpacer} />
            </ScrollView>
          </>
        )}
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
  markAllText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.primary,
    fontWeight: Theme.fontWeight.medium,
  },
  unreadBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  unreadText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.medium,
  },
  clearAllText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.primary,
    fontWeight: Theme.fontWeight.medium,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  unreadCard: {
    backgroundColor: '#F0F9FF',
    // borderLeftWidth: 3,
    // borderLeftColor: Theme.colors.primary,
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
    overflow: 'hidden',
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textPlaceholder,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.primary,
    marginLeft: Theme.spacing.sm,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.xxl,
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
    lineHeight: 22,
  },
  bottomSpacer: {
    height: Theme.spacing.xxl,
  },
});