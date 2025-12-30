import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { SalonCard } from '../../components/SalonCard';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { Salon } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Favorites'
>;

interface Props {
  navigation: FavoritesScreenNavigationProp;
}

export const FavoritesScreen: React.FC<Props> = ({ navigation }) => {
  const [favorites, setFavorites] = useState<Salon[]>([
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
      id: '4',
      name: 'Glam Studio',
      image: require('../../assets/images/salon3.jpg'),
      location: 'Osu, Accra',
      distance: '5.2km',
      rating: 4.5,
      reviewCount: 350,
      isFavorite: true,
    },
  ]);

  const handleRemoveFavorite = (salonId: string) => {
    setFavorites(favorites.filter((salon) => salon.id !== salonId));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.title}>Favorites</Text>
            <View style={styles.placeholder} />
          </View>

          {favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../../assets/icons/heart-outline.png')}
                style={styles.emptyIcon}
                resizeMode="contain"
              />
              <Text style={styles.emptyTitle}>No Favorites Yet</Text>
              <Text style={styles.emptyText}>
                Start adding salons to your favorites to see them here
              </Text>
            </View>
          ) : (
            <View style={styles.favoritesList}>
              {favorites.map((salon) => (
                <SalonCard
                  key={salon.id}
                  {...salon}
                  glassEffect={true}
                  onPress={() =>
                    navigation.navigate('SalonDetails', { salonId: salon.id })
                  }
                  onFavoritePress={() => handleRemoveFavorite(salon.id)}
                />
              ))}
            </View>
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
  scrollContent: {
    paddingTop: Theme.spacing.md,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
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
  favoritesList: {
    paddingHorizontal: Theme.spacing.lg,
  },
  emptyContainer: {
    flex: 1,
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