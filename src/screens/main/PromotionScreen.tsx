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

type PromotionsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Promotions'
>;

interface Props {
  navigation: PromotionsScreenNavigationProp;
}

interface Promotion {
  id: string;
  salonId: string;
  salonName: string;
  salonImage: any;
  discount: number;
  title: string;
  description: string;
  serviceName: string;
  originalPrice: number;
  discountedPrice: number;
  validUntil: string;
  daysLeft: number;
  location: string;
  distance: string;
  isNew: boolean;
  category: 'haircut' | 'makeup' | 'nails' | 'spa' | 'all';
}

export const PromotionsScreen: React.FC<Props> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'ending'>('all');
  const [activeCategory, setActiveCategory] = useState<'all' | 'haircut' | 'makeup' | 'nails' | 'spa'>('all');

  const promotions: Promotion[] = [
    {
      id: '1',
      salonId: '1',
      salonName: 'Bestman Barbershop',
      salonImage: require('../../assets/images/salon1.jpg'),
      discount: 30,
      title: 'Weekend Special Offer',
      description: 'Get 30% off on all haircut services',
      serviceName: "Men's Haircut",
      originalPrice: 60,
      discountedPrice: 42,
      validUntil: 'Dec 31, 2024',
      daysLeft: 5,
      location: 'City campus, Accra',
      distance: '2.1km',
      isNew: true,
      category: 'haircut',
    },
    {
      id: '2',
      salonId: '2',
      salonName: 'Premium Beauty Salon',
      salonImage: require('../../assets/images/salon2.jpg'),
      discount: 50,
      title: 'Flash Sale - 50% Off',
      description: 'Limited time offer on makeup services',
      serviceName: 'Bridal Makeup',
      originalPrice: 250,
      discountedPrice: 125,
      validUntil: 'Dec 28, 2024',
      daysLeft: 2,
      location: 'Mobibin, Accra',
      distance: '3.5km',
      isNew: false,
      category: 'makeup',
    },
    {
      id: '3',
      salonId: '3',
      salonName: 'Glam Studio',
      salonImage: require('../../assets/images/salon3.jpg'),
      discount: 25,
      title: 'New Customer Discount',
      description: 'First-time customers get 25% off',
      serviceName: 'Gel Nails',
      originalPrice: 80,
      discountedPrice: 60,
      validUntil: 'Jan 15, 2025',
      daysLeft: 20,
      location: 'Osu, Accra',
      distance: '5.2km',
      isNew: true,
      category: 'nails',
    },
    {
      id: '4',
      salonId: '4',
      salonName: 'Noble Makeup Parlour',
      salonImage: require('../../assets/images/salon4.jpg'),
      discount: 40,
      title: 'Holiday Season Special',
      description: 'Save big on spa packages',
      serviceName: 'Relaxation Spa Package',
      originalPrice: 200,
      discountedPrice: 120,
      validUntil: 'Dec 30, 2024',
      daysLeft: 4,
      location: 'Labone, Accra',
      distance: '4.8km',
      isNew: false,
      category: 'spa',
    },
    {
      id: '5',
      salonId: '1',
      salonName: 'Bestman Barbershop',
      salonImage: require('../../assets/images/salon1.jpg'),
      discount: 20,
      title: 'Student Discount',
      description: 'Show your student ID and save 20%',
      serviceName: 'Haircut & Styling',
      originalPrice: 70,
      discountedPrice: 56,
      validUntil: 'Dec 31, 2024',
      daysLeft: 5,
      location: 'City campus, Accra',
      distance: '2.1km',
      isNew: false,
      category: 'haircut',
    },
    {
      id: '6',
      salonId: '5',
      salonName: 'Luxury Nails & Spa',
      salonImage: require('../../assets/images/salon5.jpg'),
      discount: 35,
      title: 'Combo Deal',
      description: 'Manicure + Pedicure combo',
      serviceName: 'Mani-Pedi Combo',
      originalPrice: 150,
      discountedPrice: 97.5,
      validUntil: 'Jan 5, 2025',
      daysLeft: 10,
      location: 'East Legon, Accra',
      distance: '6.3km',
      isNew: true,
      category: 'nails',
    },
  ];

  const filteredPromotions = promotions.filter((promo) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'new' && promo.isNew) ||
      (activeFilter === 'ending' && promo.daysLeft <= 3);
    
    const matchesCategory =
      activeCategory === 'all' || promo.category === activeCategory;

    return matchesFilter && matchesCategory;
  });

  const handlePromotionPress = (promotion: Promotion) => {
    navigation.navigate('SalonDetails', { salonId: promotion.salonId });
  };

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft <= 2) return Theme.colors.error;
    if (daysLeft <= 5) return '#FF9800';
    return Theme.colors.success;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Promotions</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Stats Banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Image
              source={require('../../assets/icons/tag-icon.png')}
              style={styles.statIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.statNumber}>{promotions.length}</Text>
              <Text style={styles.statLabel}>Active Offers</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Image
              source={require('../../assets/icons/discount-icon.png')}
              style={styles.statIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.statNumber}>Up to 50%</Text>
              <Text style={styles.statLabel}>Max Discount</Text>
            </View>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Filters */}
          <View style={styles.filtersSection}>
            <Text style={styles.filterTitle}>Filter by:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeFilter === 'all' && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter('all')}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilter === 'all' && styles.filterChipTextActive,
                  ]}
                >
                  All Offers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeFilter === 'new' && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter('new')}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilter === 'new' && styles.filterChipTextActive,
                  ]}
                >
                  New Offers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeFilter === 'ending' && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter('ending')}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilter === 'ending' && styles.filterChipTextActive,
                  ]}
                >
                  Ending Soon
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Category Filters */}
          <View style={styles.filtersSection}>
            <Text style={styles.filterTitle}>Category:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeCategory === 'all' && styles.filterChipActive,
                ]}
                onPress={() => setActiveCategory('all')}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeCategory === 'all' && styles.filterChipTextActive,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeCategory === 'haircut' && styles.filterChipActive,
                ]}
                onPress={() => setActiveCategory('haircut')}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeCategory === 'haircut' && styles.filterChipTextActive,
                  ]}
                >
                  Haircut
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeCategory === 'makeup' && styles.filterChipActive,
                ]}
                onPress={() => setActiveCategory('makeup')}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeCategory === 'makeup' && styles.filterChipTextActive,
                  ]}
                >
                  Makeup
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeCategory === 'nails' && styles.filterChipActive,
                ]}
                onPress={() => setActiveCategory('nails')}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeCategory === 'nails' && styles.filterChipTextActive,
                  ]}
                >
                  Nails
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  activeCategory === 'spa' && styles.filterChipActive,
                ]}
                onPress={() => setActiveCategory('spa')}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeCategory === 'spa' && styles.filterChipTextActive,
                  ]}
                >
                  Spa
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Results Count */}
          <Text style={styles.resultsCount}>
            {filteredPromotions.length} promotion{filteredPromotions.length !== 1 ? 's' : ''} found
          </Text>

          {/* Promotions List */}
          {filteredPromotions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../../assets/icons/tag-icon.png')}
                style={styles.emptyIcon}
                resizeMode="contain"
              />
              <Text style={styles.emptyTitle}>No Promotions Found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your filters to see more offers
              </Text>
            </View>
          ) : (
            filteredPromotions.map((promotion) => (
              <TouchableOpacity
                key={promotion.id}
                style={styles.promotionCard}
                onPress={() => handlePromotionPress(promotion)}
                activeOpacity={0.7}
              >
                {/* Discount Badge */}
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{promotion.discount}%</Text>
                  <Text style={styles.discountLabel}>OFF</Text>
                </View>

                {/* New Badge */}
                {promotion.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                )}

                <View style={styles.promotionContent}>
                  <Image
                    source={promotion.salonImage}
                    style={styles.promotionImage}
                  />
                  <View style={styles.promotionInfo}>
                    <Text style={styles.promotionTitle} numberOfLines={1}>
                      {promotion.title}
                    </Text>
                    <Text style={styles.salonName} numberOfLines={1}>
                      {promotion.salonName}
                    </Text>
                    <Text style={styles.serviceName} numberOfLines={1}>
                      {promotion.serviceName}
                    </Text>

                    <View style={styles.priceRow}>
                      <Text style={styles.originalPrice}>
                        GHS {promotion.originalPrice.toFixed(2)}
                      </Text>
                      <Text style={styles.discountedPrice}>
                        GHS {promotion.discountedPrice.toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.promotionFooter}>
                      <View style={styles.locationRow}>
                        <Image
                          source={require('../../assets/icons/location-marker.png')}
                          style={styles.locationIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.distanceText}>{promotion.distance}</Text>
                      </View>

                      <View
                        style={[
                          styles.validityBadge,
                          { backgroundColor: `${getDaysLeftColor(promotion.daysLeft)}20` },
                        ]}
                      >
                        <Image
                          source={require('../../assets/icons/clock-icon.png')}
                          style={[
                            styles.validityIcon,
                            { tintColor: getDaysLeftColor(promotion.daysLeft) },
                          ]}
                          resizeMode="contain"
                        />
                        <Text
                          style={[
                            styles.validityText,
                            { color: getDaysLeftColor(promotion.daysLeft) },
                          ]}
                        >
                          {promotion.daysLeft} day{promotion.daysLeft !== 1 ? 's' : ''} left
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
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
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.primary,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  statIcon: {
    width: 32,
    height: 32,
    tintColor: Theme.colors.white,
  },
  statNumber: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  statLabel: {
    fontSize: Theme.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: Theme.spacing.md,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xxl,
  },
  filtersSection: {
    marginBottom: Theme.spacing.md,
  },
  filterTitle: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },
  filters: {
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  filterChip: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: '#F6F6F6',
  },
  filterChipActive: {
    backgroundColor: Theme.colors.black,
  },
  filterChipText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.fontWeight.medium,
  },
  filterChipTextActive: {
    color: Theme.colors.white,
  },
  resultsCount: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  promotionCard: {
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    left: Theme.spacing.sm,
    backgroundColor: Theme.colors.error,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
    zIndex: 1,
    alignItems: 'center',
  },
  discountText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
    lineHeight: 20,
  },
  discountLabel: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  newBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: '#4CAF50',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
    zIndex: 1,
  },
  newBadgeText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  promotionContent: {
    flexDirection: 'row',
    padding: Theme.spacing.md,
  },
  promotionImage: {
    width: 100,
    height: 120,
    borderRadius: Theme.borderRadius.md,
  },
  promotionInfo: {
    flex: 1,
    marginLeft: Theme.spacing.md,
    justifyContent: 'space-between',
  },
  promotionTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: 2,
  },
  salonName: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: 2,
  },
  serviceName: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  originalPrice: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary,
  },
  promotionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.textSecondary,
    marginRight: 4,
  },
  distanceText: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textSecondary,
  },
  validityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  validityIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  validityText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.semibold,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xxl * 2,
    paddingHorizontal: Theme.spacing.lg,
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