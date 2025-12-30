import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Theme } from "../constants/theme";
import { CustomButton } from "./CustomButton";

interface BookingCardProps {
  date: string;
  time: string;
  salonName: string;
  salonImage: ImageSourcePropType | string;
  location: string;
  service: string;
  status: "pending" | "cancelled" | "completed";
  onCancel?: () => void;
  onReschedule?: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  date,
  time,
  salonName,
  salonImage,
  location,
  service,
  status,
  onCancel,
  onReschedule,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return Theme.colors.primary;
      case "cancelled":
        return Theme.colors.error;
      case "completed":
        return Theme.colors.success;
      default:
        return Theme.colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Image
            source={require("../assets/icons/calendar-icon.png")}
            style={styles.dateIcon}
            resizeMode="contain"
          />
          <Text style={styles.dateText}>
            {date} - {time}
          </Text>
        </View>
        <Text style={[styles.status, { color: getStatusColor() }]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>

      <View style={styles.content}>
        <Image
          source={
            typeof salonImage === "string" ? { uri: salonImage } : salonImage
          }
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <Text style={styles.salonName}>{salonName}</Text>
          <View style={styles.locationContainer}>
            <Image
              source={require("../assets/icons/location-marker.png")}
              style={styles.locationIcon}
              resizeMode="contain"
            />
            <Text style={styles.location}>{location}</Text>
          </View>
          <Text style={styles.service}>{service}</Text>
        </View>
      </View>

      {status === "pending" && (
        <View style={styles.actions}>
          {onCancel && (
            <CustomButton
              title="Cancel"
              onPress={onCancel}
              variant="secondary"
              style={styles.cancelButton}
            />
          )}

          {onReschedule && (
            <CustomButton
              title="Reschedule"
              onPress={onReschedule}
              variant="primary"
              style={styles.rescheduleButton}
            />
          )}
        </View>
      )}
    </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateIcon: {
    width: 16,
    height: 16,
    tintColor: Theme.colors.primary,
    marginRight: 6,
  },
  dateText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
  },
  status: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
  },
  content: {
    flexDirection: "row",
    marginBottom: Theme.spacing.md,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Theme.borderRadius.md,
  },
  details: {
    flex: 1,
    marginLeft: Theme.spacing.md,
    justifyContent: "center",
  },
  salonName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.primary,
    marginRight: 4,
  },
  location: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  service: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.primary,
  },
  actions: {
    flexDirection: "row",
    gap: Theme.spacing.sm,
  },
  cancelButton: {
    flex: 1,
  },
  rescheduleButton: {
    flex: 1,
  },
});