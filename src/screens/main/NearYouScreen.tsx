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
import { SalonCard } from '../../components/SalonCard';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Salon } from '../../types';

type NearYouScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'NearYou'
>;

interface Props {
  navigation: NearYouScreenNavigationProp;
}

export const NearYouScreen: React.FC<Props> = ({ navigation }) => {
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'popular'>('distance');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const salons: Salon[] = [
    {
      id: '1',
      name: 'Bestman Barbershop',
      image: require('../../assets/images/salon1.jpg'),
      location: 'City campus, Accra',
      distance: '2.1km',
      rating: 4.2,
      reviewCount: 200,
      isFavorite: false,
      isOpen: true,
      opensAt: '7:00 AM',
      closesAt: '7:00 PM',
    },
    {
      id: '2',
      name: 'Premium Beauty Salon',
      image: require('../../assets/images/salon2.jpg'),
      location: 'Mobibin, Accra',
      distance: '3.5km',
      rating: 4.5,
      reviewCount: 120,
      isFavorite: true,
      isOpen: true,
      opensAt: '8:00 AM',
      closesAt: '8:00 PM',
    },
    {
      id: '3',
      name: 'Noble Makeup Parlour',
      image: require('../../assets/images/salon3.jpg'),
      location: 'East Legon, Accra',
      distance: '4.2km',
      rating: 4.8,
      reviewCount: 350,
      isFavorite: false,
      isOpen: false,
      opensAt: '9:00 AM',
      closesAt: '6:00 PM',
    },
    {
      id: '4',
      name: 'Glam Studio',
      image: require('../../assets/images/salon4.jpg'),
      location: 'Osu, Accra',
      distance: '5.2km',
      rating: 4.6,
      reviewCount: 280,
      isFavorite: false,
      isOpen: true,
      opensAt: '7:30 AM',
      closesAt: '9:00 PM',
    },
    {
      id: '5',
      name: 'Style Lounge',
      image: require('../../assets/images/salon5.jpg'),
      location: 'Labone, Accra',
      distance: '5.8km',
      rating: 4.3,
      reviewCount: 150,
      isFavorite: false,
      isOpen: true,
      opensAt: '8:00 AM',
      closesAt: '7:00 PM',
    },
    {
      id: '6',
      name: 'Luxury Nails & Spa',
      image: require('../../assets/images/salon6.jpg'),
      location: 'Cantonments, Accra',
      distance: '6.3km',
      rating: 4.7,
      reviewCount: 190,
      isFavorite: true,
      isOpen: false,
      opensAt: '10:00 AM',
      closesAt: '8:00 PM',
    },
    {
      id: '7',
      name: 'Urban Cuts',
      image: require('../../assets/images/salon7.jpg'),
      location: 'Spintex, Accra',
      distance: '7.1km',
      rating: 4.1,
      reviewCount: 95,
      isFavorite: false,
      isOpen: true,
      opensAt: '7:00 AM',
      closesAt: '8:00 PM',
    },
    {
      id: '8',
      name: 'Beauty Haven',
      image: require('../../assets/images/salon8.jpg'),
      location: 'Tema, Accra',
      distance: '8.5km',
      rating: 4.4,
      reviewCount: 210,
      isFavorite: false,
      isOpen: true,
      opensAt: '8:00 AM',
      closesAt: '9:00 PM',
    },
  ];

  const sortedSalons = [...salons].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const handleSortChange = (sort: 'distance' | 'rating' | 'popular') => {
    setSortBy(sort);
    setShowSortMenu(false);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'distance':
        return 'Nearest First';
      case 'rating':
        return 'Highest Rated';
      case 'popular':
        return 'Most Popular';
      default:
        return 'Sort By';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Near You</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Location Banner */}
        <View style={styles.locationBanner}>
          <View style={styles.locationContent}>
            <Image
              source={require('../../assets/icons/location-marker.png')}
              style={styles.locationBannerIcon}
              resizeMode="contain"
            />
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>Your Location</Text>
              <Text style={styles.locationText}>Accra, Greater Accra, GH</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.changeLocationButton}>
            <Text style={styles.changeLocationText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Sort and Filter Bar */}
        <View style={styles.sortFilterBar}>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setShowSortMenu(!showSortMenu)}
          >
            <Image
              source={require('../../assets/icons/sort-icon.png')}
              style={styles.sortIcon}
              resizeMode="contain"
            />
            <Text style={styles.sortButtonText}>{getSortLabel()}</Text>
            <Image
              source={require('../../assets/icons/chevron-down.png')}
              style={[
                styles.chevronIcon,
                showSortMenu && styles.chevronIconRotated,
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.resultsBadge}>
            <Text style={styles.resultsText}>{salons.length} salons</Text>
          </View>
        </View>

        {/* Sort Menu */}
        {showSortMenu && (
          <View style={styles.sortMenu}>
            <TouchableOpacity
              style={[
                styles.sortOption,
                sortBy === 'distance' && styles.sortOptionActive,
              ]}
              onPress={() => handleSortChange('distance')}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === 'distance' && styles.sortOptionTextActive,
                ]}
              >
                Nearest First
              </Text>
              {sortBy === 'distance' && (
                <Image
                  source={require('../../assets/icons/checkmark-icon.png')}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortOption,
                sortBy === 'rating' && styles.sortOptionActive,
              ]}
              onPress={() => handleSortChange('rating')}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === 'rating' && styles.sortOptionTextActive,
                ]}
              >
                Highest Rated
              </Text>
              {sortBy === 'rating' && (
                <Image
                  source={require('../../assets/icons/checkmark-icon.png')}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortOption,
                sortBy === 'popular' && styles.sortOptionActive,
              ]}
              onPress={() => handleSortChange('popular')}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === 'popular' && styles.sortOptionTextActive,
                ]}
              >
                Most Popular
              </Text>
              {sortBy === 'popular' && (
                <Image
                  source={require('../../assets/icons/checkmark-icon.png')}
                  style={styles.checkIcon}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Salons List */}
          {sortedSalons.map((salon) => (
            <SalonCard
              key={salon.id}
              {...salon}
              glassEffect={true}
              showOpenStatus={true}
              onPress={() =>
                navigation.navigate('SalonDetails', { salonId: salon.id })
              }
              onFavoritePress={() => console.log('Favorite:', salon.id)}
            />
          ))}

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
  locationBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationBannerIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.white,
    marginRight: Theme.spacing.sm,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: Theme.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  locationText: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.white,
  },
  changeLocationButton: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: Theme.borderRadius.sm,
  },
  changeLocationText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.white,
  },
  sortFilterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.xs,
  },
  sortIcon: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.textPrimary,
  },
  sortButtonText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
  },
  chevronIcon: {
    width: 16,
    height: 16,
    tintColor: Theme.colors.textSecondary,
  },
  chevronIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  resultsBadge: {
    backgroundColor: Theme.colors.black,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
  resultsText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.white,
  },
  sortMenu: {
    backgroundColor: Theme.colors.white,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.sm,
  },
  sortOptionActive: {
    backgroundColor: '#F6F6F6',
  },
  sortOptionText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
  },
  sortOptionTextActive: {
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.primary,
  },
  checkIcon: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.primary,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  bottomSpacer: {
    height: Theme.spacing.xxl,
  },
});