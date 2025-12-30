import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Theme } from '../constants/theme';

interface ServiceCardProps {
  name: string;
  price: number;
  duration: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  onPress?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  price,
  duration,
  rating,
  reviewCount,
  isPopular = false,
  onPress,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Image
              source={require('../assets/icons/star.png')}
              style={styles.starIcon}
              resizeMode="contain"
            />
            <Text style={styles.rating}>
              {rating}({reviewCount})
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>GHS {price.toFixed(2)}</Text>
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
          activeOpacity={0.7}
        >
          <Image
            source={
              isFavorite
                ? require('../assets/icons/heart-filled.png')
                : require('../assets/icons/heart-outline.png')
            }
            style={[
              styles.favoriteIcon,
              { tintColor: isFavorite ? Theme.colors.primary : '#999999' },
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {isPopular && (
          <View style={styles.popularBadge}>
            <View style={styles.popularDot} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 14,
    height: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.primary,
    marginBottom: 2,
  },
  duration: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
  },
  popularBadge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  popularDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.primary,
  },
});