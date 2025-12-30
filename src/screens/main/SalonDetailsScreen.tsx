import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../types/navigation';
import { CustomButton } from '../../components/CustomButton';
import { ServiceCard } from '../../components/ServiceCard';
import { ReviewCard } from '../../components/ReviewCard';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Service, Review } from '../../types';

type SalonDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'SalonDetails'
>;

type SalonDetailsScreenRouteProp = RouteProp<
  MainStackParamList,
  'SalonDetails'
>;

interface Props {
  navigation: SalonDetailsScreenNavigationProp;
  route: SalonDetailsScreenRouteProp;
}

type TabType = 'about' | 'services' | 'reviews';
type CategoryFilter = 'all' | 'female' | 'male';

export const SalonDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [serviceFilter, setServiceFilter] = useState<CategoryFilter>('all');

  const salon = {
    id: route.params.salonId,
    name: 'Bestman Barbershop',
    isVerified: true,
    rating: 4.2,
    reviewCount: 200,
    location: 'City campus, Accra',
    isOpen: true,
    openingHours: '7am - 7pm',
    gallery: [
      require('../../assets/images/salon1.jpg'),
      require('../../assets/images/salon2.jpg'),
      require('../../assets/images/salon3.jpg'),
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    workingHours: {
      weekdays: 'Monday - Friday : 8am - 8pm',
      saturdays: 'Saturdays : 10am - 9pm',
      sundays: 'Sundays : 2pm - 10pm',
      holidays: 'Holidays : Closed',
    },
    contacts: {
      address: 'City campus, Accra',
      phone: ['0575540404', '0546785054'],
      website: 'www.mywebsite.com',
      snapchat: 'doncephas',
      tiktok: 'doncephas001',
      instagram: 'doncephas014',
    },
    organizationType: 'Organization - Accept Shop and Home services',
  };

  const services: Service[] = [
    {
      id: '1',
      name: "Men's low cut",
      price: 60.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'male',
      isPopular: true,
    },
    {
      id: '2',
      name: "Men's low cut + Dye + Perm",
      price: 120.0,
      duration: '60mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'male',
    },
    {
      id: '3',
      name: 'Women low cut',
      price: 60.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'female',
    },
    {
      id: '4',
      name: 'Kids Afro cut',
      price: 40.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'all',
      isPopular: true,
    },
    {
      id: '5',
      name: 'Women low cut + Dye',
      price: 100.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'female',
    },
    {
      id: '6',
      name: "Men's low cut + Dye + Perm",
      price: 120.0,
      duration: '60mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'male',
    },
    {
      id: '7',
      name: 'Women low cut',
      price: 60.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'female',
    },
    {
      id: '8',
      name: "Men's low cut",
      price: 60.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'male',
      isPopular: true,
    },
  ];

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Maddy Asamoah',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '2',
      userName: 'Opoku Isaac',
      rating: 3,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '3',
      userName: 'Brandon Vetrovs',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '4',
      userName: 'Makenna Workman',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '5',
      userName: 'Gretchen Rosser',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '6',
      userName: 'Ashlynn Bator',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '7',
      userName: 'Gustavo Dorwart',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
  ];

  const filteredServices =
    serviceFilter === 'all'
      ? services
      : services.filter((service) => service.category === serviceFilter);

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWebsite = (url: string) => {
    Linking.openURL(`https://${url}`);
  };

  const handleServicePress = (service: Service) => {
    navigation.navigate('BookAppointment', {
      salonId: salon.id,
      service: {
        id: service.id,
        name: service.name,
        price: service.price,
        duration: service.duration,
      },
    });
  };

  const handleLeaveReview = () => {
    navigation.navigate('LeaveReview', { salonId: salon.id });
  };

  const handleBookAppointment = () => {
    setActiveTab('services');
  };

  const renderAbout = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Summary</Text>
      <Text style={styles.description}>{salon.description}</Text>

      <Text style={styles.sectionTitle}>Working Hours</Text>
      <View style={styles.workingHoursContainer}>
        <Text style={styles.workingHoursText}>{salon.workingHours.weekdays}</Text>
        <Text style={styles.workingHoursText}>{salon.workingHours.sundays}</Text>
      </View>
      <View style={styles.workingHoursContainer}>
        <Text style={styles.workingHoursText}>{salon.workingHours.saturdays}</Text>
        <Text style={styles.workingHoursText}>{salon.workingHours.holidays}</Text>
      </View>

      <Text style={styles.sectionTitle}>Contacts</Text>
      <View style={styles.contactsContainer}>
        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Image
              source={require('../../assets/icons/location-marker.png')}
              style={styles.contactIcon}
              resizeMode="contain"
            />
            <Text style={styles.contactText}>{salon.contacts.address}</Text>
          </View>
          <View style={styles.contactItem}>
            <Image
              source={require('../../assets/icons/snapchat-icon.png')}
              style={styles.contactIcon}
              resizeMode="contain"
            />
            <Text style={styles.contactText}>{salon.contacts.snapchat}</Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Image
              source={require('../../assets/icons/phone-icon.png')}
              style={styles.contactIcon}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={() => handleCall(salon.contacts.phone[0])}>
              <Text style={[styles.contactText, styles.contactLink]}>
                {salon.contacts.phone[0]} / {salon.contacts.phone[1]}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactItem}>
            <Image
              source={require('../../assets/icons/tiktok-icon.png')}
              style={styles.contactIcon}
              resizeMode="contain"
            />
            <Text style={styles.contactText}>{salon.contacts.tiktok}</Text>
          </View>
        </View>

        <View style={styles.contactRow}>
          <View style={styles.contactItem}>
            <Image
              source={require('../../assets/icons/website-icon.png')}
              style={styles.contactIcon}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={() => handleWebsite(salon.contacts.website!)}>
              <Text style={[styles.contactText, styles.contactLink]}>
                {salon.contacts.website}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactItem}>
            <Image
              source={require('../../assets/icons/instagram-icon.png')}
              style={styles.contactIcon}
              resizeMode="contain"
            />
            <Text style={styles.contactText}>{salon.contacts.instagram}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderServices = () => (
    <View style={styles.tabContent}>
      {/* Category Filters */}
      <View style={styles.filters}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            serviceFilter === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setServiceFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              serviceFilter === 'all' && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            serviceFilter === 'female' && styles.filterButtonActive,
          ]}
          onPress={() => setServiceFilter('female')}
        >
          <Text
            style={[
              styles.filterText,
              serviceFilter === 'female' && styles.filterTextActive,
            ]}
          >
            Females
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            serviceFilter === 'male' && styles.filterButtonActive,
          ]}
          onPress={() => setServiceFilter('male')}
        >
          <Text
            style={[
              styles.filterText,
              serviceFilter === 'male' && styles.filterTextActive,
            ]}
          >
            Males
          </Text>
        </TouchableOpacity>
      </View>

      {/* Services List */}
      <View style={styles.servicesList}>
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            {...service}
            onPress={() => handleServicePress(service)}
          />
        ))}
      </View>
    </View>
  );

  const renderReviews = () => (
    <View style={styles.tabContent}>
      {/* Reviews List */}
      <View style={styles.reviewsList}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </View>
    </View>
  );

  const getButtonTitle = () => {
    switch (activeTab) {
      case 'about':
        return 'Book Appointment';
      case 'services':
        return 'Continue';
      case 'reviews':
        return 'Leave a review';
      default:
        return 'Book Appointment';
    }
  };

  const handleButtonPress = () => {
    switch (activeTab) {
      case 'about':
        handleBookAppointment();
        break;
      case 'services':
        // Handle continue with selected services
        break;
      case 'reviews':
        handleLeaveReview();
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Image with Rounded Container */}
          <View style={styles.imageWrapper}>
            <View style={styles.imageContainer}>
              <Image
                source={salon.gallery[currentImageIndex]}
                style={styles.headerImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.2)', 'transparent']}
                style={styles.gradientOverlay}
              />
              <View style={styles.imageOverlay}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Image
                    source={require('../../assets/icons/arrow-left.png')}
                    style={styles.backIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Service Profile</Text>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => setIsFavorite(!isFavorite)}
                >
                  <Image
                    source={
                      isFavorite
                        ? require('../../assets/icons/heart-filled.png')
                        : require('../../assets/icons/heart-outline.png')
                    }
                    style={[
                      styles.favoriteIcon,
                      { tintColor: isFavorite ? Theme.colors.primary : '#FFFFFF' },
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.imageCounter}>
                <Text style={styles.imageCounterText}>
                  {currentImageIndex + 1}/{salon.gallery.length}
                </Text>
              </View>
            </View>
          </View>

          {/* Salon Info Card */}
          <View style={styles.infoCard}>
            <Image
              source={require('../../assets/images/salon-avatar.jpg')}
              style={styles.salonAvatar}
            />
            <View style={styles.salonInfo}>
              <View style={styles.salonHeader}>
                <Text style={styles.salonName}>{salon.name}</Text>
                {salon.isVerified && (
                  <Image
                    source={require('../../assets/icons/verified-badge.png')}
                    style={styles.verifiedBadge}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={styles.salonMeta}>
                <Image
                  source={require('../../assets/icons/star.png')}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>
                  {salon.rating}({salon.reviewCount})
                </Text>
              </View>
              <View style={styles.salonLocation}>
                <Image
                  source={require('../../assets/icons/location-marker.png')}
                  style={styles.locationIcon}
                  resizeMode="contain"
                />
                <Text style={styles.locationText}>{salon.location}</Text>
                <Text style={[styles.statusBadge, salon.isOpen && styles.statusBadgeOpen]}>
                  {salon.isOpen ? 'Opened' : 'Closed'}
                </Text>
                <Text style={styles.hoursText}>{salon.openingHours}</Text>
              </View>
              <Text style={styles.organizationType}>{salon.organizationType}</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'about' && styles.tabActive]}
              onPress={() => setActiveTab('about')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'about' && styles.tabTextActive,
                ]}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'services' && styles.tabActive]}
              onPress={() => setActiveTab('services')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'services' && styles.tabTextActive,
                ]}
              >
                Services
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'reviews' && styles.tabActive]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'reviews' && styles.tabTextActive,
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'about' && renderAbout()}
          {activeTab === 'services' && renderServices()}
          {activeTab === 'reviews' && renderReviews()}

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title={getButtonTitle()}
            onPress={handleButtonPress}
            variant="primary"
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
  imageWrapper: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.sm,
  },
  imageContainer: {
    position: 'relative',
    height: 250,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.textPrimary,
  },
  headerTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    width: 24,
    height: 24,
  },
  imageCounter: {
    position: 'absolute',
    bottom: Theme.spacing.md,
    right: Theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  imageCounterText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSize.sm,
  },
  infoCard: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.white,
    marginTop: -30,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
  },
  salonAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Theme.colors.white,
  },
  salonInfo: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  salonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  salonName: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginRight: 6,
  },
  verifiedBadge: {
    width: 18,
    height: 18,
  },
  salonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  salonLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.primary,
    marginRight: 4,
  },
  locationText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginRight: Theme.spacing.sm,
  },
  statusBadge: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.medium,
    marginRight: Theme.spacing.sm,
    color: Theme.colors.textSecondary,
  },
  statusBadgeOpen: {
    color: '#4CAF50',
  },
  hoursText: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textSecondary,
  },
  organizationType: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textPlaceholder,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundSecondary,
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
    paddingTop: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  description: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    lineHeight: 22,
    paddingHorizontal: Theme.spacing.lg,
  },
  workingHoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
  },
  workingHoursText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
    flex: 1,
  },
  contactsContainer: {
    gap: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
  },
  contactRow: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  contactItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  contactIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    tintColor: Theme.colors.primary,
  },
  contactText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
    flex: 1,
  },
  contactLink: {
    color: Theme.colors.primary,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  filterButton: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  filterButtonActive: {
    borderBottomColor: Theme.colors.primary,
  },
  filterText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  filterTextActive: {
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.semibold,
  },
  servicesList: {
    paddingHorizontal: Theme.spacing.lg,
  },
  reviewsList: {
    paddingHorizontal: Theme.spacing.lg,
  },
  bottomSpacer: {
    height: 100,
  },
  buttonContainer: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
});