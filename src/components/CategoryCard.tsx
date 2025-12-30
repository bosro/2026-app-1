import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { Theme } from "../constants/theme";

interface CategoryCardProps {
  name: string;
  icon: string;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  icon,
  onPress,
}) => {
  const getIconSource = (iconName: string) => {
    switch (iconName) {
      case "hair-salon":
        return require("../assets/icons/hair-salon-icon.png");
      case "barbershop":
        return require("../assets/icons/barbershop-icon.png");
      case "makeup":
        return require("../assets/icons/makeup-icon.png");
      case "nail-tech":
        return require("../assets/icons/nail-tech-icon.png");
      default:
        return require("../assets/icons/hair-salon-icon.png");
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Image
          source={getIconSource(icon)}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "23%",
    aspectRatio: 0.85,
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.xs,
    marginBottom: Theme.spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.xs,
    padding: 10,
    backgroundColor: Theme.colors.backgroundTertiary,
    borderRadius: 24,
  },

  icon: {
    width: 25,
    height: 25,
    tintColor: Theme.colors.primary,
  },
  name: {
    fontSize: 12,
    color: Theme.colors.textPrimary,
    textAlign: "center",
    fontWeight: "500",
  },
});