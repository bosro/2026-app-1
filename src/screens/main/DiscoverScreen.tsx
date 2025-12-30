import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SearchBar } from '../../components/SearchBar';
import { SalonCard } from '../../components/SalonCard';
import { Theme } from '../../constants/theme';
import { Salon } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

export const DiscoverScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data
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
    },
    {
      id: '2',
      name: 'Premium Beauty Salon',
      image: require('../../assets/images/salon2.jpg'),
      location: 'Mobibin, Accra',
      distance: '3.5km',
      rating: 3.2,
      reviewCount: 120,
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Noble Makeup Parlour',
      image: require('../../assets/images/salon3.jpg'),
      location: 'Mobibin, Accra',
      distance: '3.5km',
      rating: 3.2,
      reviewCount: 120,
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Bestman Barbershop',
      image: require('../../assets/images/salon1.jpg'),
      location: 'City campus, Accra',
      distance: '2.1km',
      rating: 4.2,
      reviewCount: 200,
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Premium Beauty Salon',
      image: require('../../assets/images/salon2.jpg'),
      location: 'Mobibin, Accra',
      distance: '3.5km',
      rating: 3.2,
      reviewCount: 120,
      isFavorite: true,
    },
    {
      id: '6',
      name: 'Noble Makeup Parlour',
      image: require('../../assets/images/salon3.jpg'),
      location: 'Mobibin, Accra',
      distance: '3.5km',
      rating: 3.2,
      reviewCount: 120,
      isFavorite: false,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Discover</Text>
          </View>

          {/* Search Bar */}
          <SearchBar
            placeholder="Search for services near you.."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => console.log('Filter pressed')}
          />

          {/* View on map */}
          <TouchableOpacity style={styles.mapButton}>
            <Image
              source={require('../../assets/icons/location-pin.png')}
              style={styles.mapIcon}
              resizeMode="contain"
            />
            <Text style={styles.mapText}>View on map</Text>
          </TouchableOpacity>

          {/* Salons List */}
          <View style={styles.salonsContainer}>
            {salons.map((salon) => (
              <SalonCard
                key={salon.id}
                {...salon}
                glassEffect={true}
                onPress={() => console.log('Salon pressed:', salon.id)}
                onFavoritePress={() =>
                  console.log('Favorite pressed:', salon.id)
                }
              />
            ))}
          </View>

          {/* Bottom spacing for tab bar */}
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
  scrollContent: {
    paddingTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  header: {
    marginBottom: Theme.spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  mapIcon: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.primary,
    marginRight: Theme.spacing.sm,
  },
  mapText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.medium,
  },
  salonsContainer: {
    marginTop: Theme.spacing.sm,
  },
  bottomSpacer: {
    height: 100,
  },
});