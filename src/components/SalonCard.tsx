import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Platform,
} from "react-native";
import { Theme } from "../constants/theme";
import { BlurView } from "./BlurView";

interface SalonCardProps {
  name: string;
  image: ImageSourcePropType | string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  isFavorite?: boolean;
  glassEffect?: boolean;
  showOpenStatus?: boolean;
  isOpen?: boolean;
  opensAt?: string;
  closesAt?: string;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

export const SalonCard: React.FC<SalonCardProps> = ({
  name,
  image,
  location,
  distance,
  rating,
  reviewCount,
  isFavorite = false,
  glassEffect = false,
  showOpenStatus = false,
  isOpen = true,
  opensAt,
  closesAt,
  onPress,
  onFavoritePress,
}) => {
  const CardContent = (
    <>
      <Image
        source={typeof image === "string" ? { uri: image } : image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.distance}>{distance}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Image
            source={require("../assets/icons/location-pin.png")}
            style={styles.locationIcon}
            resizeMode="contain"
          />
          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>
        </View>

        {/* Open/Closed Status */}
        {showOpenStatus && (
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, isOpen ? styles.statusDotOpen : styles.statusDotClosed]} />
            <Text style={[styles.statusText, isOpen ? styles.statusTextOpen : styles.statusTextClosed]}>
              {isOpen ? 'Open' : 'Closed'}
            </Text>
            {opensAt && closesAt && (
              <Text style={styles.hoursText}>
                • {isOpen ? `Closes ${closesAt}` : `Opens ${opensAt}`}
              </Text>
            )}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <Image
              source={require("../assets/icons/star.png")}
              style={styles.starIcon}
              resizeMode="contain"
            />
            <Text style={styles.rating}>
              {rating}({reviewCount})
            </Text>
          </View>
          <TouchableOpacity
            onPress={onFavoritePress}
            style={styles.favoriteButton}
            activeOpacity={0.7}
          >
            <Image
              source={
                isFavorite
                  ? require("../assets/icons/heart-filled.png")
                  : require("../assets/icons/heart-outline.png")
              }
              style={[
                styles.favoriteIcon,
                { tintColor: isFavorite ? Theme.colors.primary : "#999999" },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  if (glassEffect && Platform.OS === "ios") {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <BlurView
          intensity={80}
          tint="light"
          style={[styles.container, styles.glassContainer]}
          fallbackColor="rgba(246, 246, 246, 0.95)"
        >
          {CardContent}
        </BlurView>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {CardContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    overflow: "hidden",
    marginBottom: Theme.spacing.md,
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: Theme.borderRadius.md,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.md,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
  },
  distance: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.sm,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.primary,
    marginRight: 4,
  },
  location: {
    flex: 1,
    fontSize: 13,
    color: Theme.colors.textSecondary,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusDotOpen: {
    backgroundColor: "#4CAF50",
  },
  statusDotClosed: {
    backgroundColor: "#F44336",
  },
  statusText: {
    fontSize: 12,
    fontWeight: Theme.fontWeight.medium,
  },
  statusTextOpen: {
    color: "#4CAF50",
  },
  statusTextClosed: {
    color: "#F44336",
  },
  hoursText: {
    fontSize: 11,
    color: Theme.colors.textSecondary,
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  rating: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
  },
  favoriteButton: {
    padding: 4,
  },
  favoriteIcon: {
    width: 22,
    height: 22,
  },
  glassContainer: {
    backgroundColor: "rgba(246, 246, 246, 0.7)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
});