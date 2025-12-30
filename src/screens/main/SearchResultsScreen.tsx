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
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../types/navigation';
import { SearchBar } from '../../components/SearchBar';
import { SalonCard } from '../../components/SalonCard';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { Salon } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type SearchResultsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'SearchResults'
>;

type SearchResultsScreenRouteProp = RouteProp<
  MainStackParamList,
  'SearchResults'
>;

interface Props {
  navigation: SearchResultsScreenNavigationProp;
  route: SearchResultsScreenRouteProp;
}

export const SearchResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [activeFilter, setActiveFilter] = useState<'all' | 'salons' | 'services'>('all');

  // Dummy data - replace with API call
  const results: Salon[] = [
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
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Perform search API call
    console.log('Searching for:', query);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder="Search for services or salons..."
              value={searchQuery}
              onChangeText={handleSearch}
              onFilterPress={() => console.log('Filter pressed')}
            />
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'all' && styles.filterTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'salons' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('salons')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'salons' && styles.filterTextActive,
              ]}
            >
              Salons
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'services' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('services')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'services' && styles.filterTextActive,
              ]}
            >
              Services
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.resultsCount}>
            {results.length} results found
          </Text>

          {results.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../../assets/icons/search-icon.png')}
                style={styles.emptyIcon}
                resizeMode="contain"
              />
              <Text style={styles.emptyTitle}>No Results Found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your search or filters to find what you're looking for
              </Text>
            </View>
          ) : (
            results.map((salon) => (
              <SalonCard
                key={salon.id}
                {...salon}
                glassEffect={true}
                onPress={() =>
                  navigation.navigate('SalonDetails', { salonId: salon.id })
                }
                onFavoritePress={() =>
                  console.log('Favorite pressed:', salon.id)
                }
              />
            ))
          )}
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
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
  },
  searchContainer: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  filterButton: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  filterButtonActive: {
    backgroundColor: Theme.colors.black,
  },
  filterText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  filterTextActive: {
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.medium,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  resultsCount: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.xxl,
    paddingTop: Theme.spacing.xxl * 2,
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
});