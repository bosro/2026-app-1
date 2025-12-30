import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../../types/navigation";
import { CustomButton } from "../../components/CustomButton";
import { DateSelector } from "../../components/DateSelector";
import { TimeSelector } from "../../components/TimeSelector";
import { BackButton } from "../../components/BackButton";
import { Theme } from "../../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

type BookAppointmentScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "BookAppointment"
>;

type BookAppointmentScreenRouteProp = RouteProp<
  MainStackParamList,
  "BookAppointment"
>;

interface Props {
  navigation: BookAppointmentScreenNavigationProp;
  route: BookAppointmentScreenRouteProp;
}

export const BookAppointmentScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { service } = route.params;
  const [selectedDate, setSelectedDate] = useState("2024-12-08");
  const [selectedTime, setSelectedTime] = useState("10AM-12PM");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log("Booking created:", {
        service,
        date: selectedDate,
        time: selectedTime,
        contact,
        note,
      });
      // Navigate to confirmation or bookings screen
      navigation.navigate("MainTabs", { screen: "Bookings" });
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.title}>Book Appointment</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Service Details */}
          <View style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/icons/heart-outline.png")}
                  style={styles.favoriteIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.serviceDetails}>
              <View style={styles.serviceRating}>
                <Image
                  source={require("../../assets/icons/star.png")}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>4.2(200)</Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.price}>GHS {service.price.toFixed(2)}</Text>
                <Text style={styles.duration}>{service.duration}</Text>
              </View>
            </View>
          </View>

          {/* Duplicate Service Card */}
          <View style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceName}>Kids Afro cut</Text>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/icons/heart-outline.png")}
                  style={styles.favoriteIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.serviceDetails}>
              <View style={styles.serviceRating}>
                <Image
                  source={require("../../assets/icons/star.png")}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>4.2(200)</Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.price}>GHS 40.00</Text>
                <Text style={styles.duration}>45mins</Text>
              </View>
            </View>
          </View>

          {/* Smart Scheduling Banner */}
          <TouchableOpacity
            style={styles.smartScheduleBanner}
            onPress={() =>
              navigation.navigate("SmartScheduling", {
                salonId: route.params.salonId,
                serviceId: route.params.service.id,
              })
            }
            activeOpacity={0.8}
          >
            <View style={styles.smartScheduleContent}>
              <View style={styles.smartScheduleIconContainer}>
                <Image
                  source={require("../../assets/icons/ai-robot.png")}
                  style={styles.smartScheduleIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.smartScheduleTextContainer}>
                <Text style={styles.smartScheduleTitle}>
                  Let AI Find the Best Time
                </Text>
                <Text style={styles.smartScheduleSubtitle}>
                  Get personalized recommendations based on your schedule
                </Text>
              </View>
              <Image
                source={require("../../assets/icons/arrow-right.png")}
                style={styles.smartScheduleArrow}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Or Continue Manually Text */}
          <View style={styles.manualSelectionContainer}>
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>Or select manually</Text>
              <View style={styles.divider} />
            </View>
          </View>

          {/* Select Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select date</Text>
            <DateSelector
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </View>

          {/* Select Time */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select time</Text>
            <TimeSelector
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
            />
          </View>

          {/* Contact */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Input contact here"
              placeholderTextColor={Theme.colors.textPlaceholder}
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
            />
          </View>

          {/* Short Note */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Short note (Optional)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Write comment here"
              placeholderTextColor={Theme.colors.textPlaceholder}
              value={note}
              onChangeText={setNote}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Finish Button */}
        <View style={styles.finishButtonContainer}>
          <CustomButton
            title="Finish"
            onPress={handleFinish}
            variant="primary"
            loading={loading}
            disabled={!contact || !selectedDate || !selectedTime}
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
  scrollContent: {
    paddingTop: Theme.spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    flex: 1,
    textAlign: "center",
    marginHorizontal: Theme.spacing.md,
  },
  placeholder: {
    width: 40,
  },
  serviceCard: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.sm,
  },
  serviceName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
    flex: 1,
  },
  favoriteIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.textSecondary,
  },
  serviceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceRating: {
    flexDirection: "row",
    alignItems: "center",
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
  serviceInfo: {
    alignItems: "flex-end",
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
  section: {
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.white,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundSecondary,
    minHeight: 120,
  },
  bottomSpacer: {
    height: 100,
  },
  finishButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },

  smartScheduleBanner: {
    backgroundColor: "#E3F2FD",
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    borderWidth: 1,
    borderColor: "#90CAF9",
  },
  smartScheduleContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  smartScheduleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1976D2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Theme.spacing.md,
  },
  smartScheduleIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.white,
  },
  smartScheduleTextContainer: {
    flex: 1,
  },
  smartScheduleTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: "#1976D2",
    marginBottom: 4,
  },
  smartScheduleSubtitle: {
    fontSize: Theme.fontSize.sm,
    color: "#1565C0",
    lineHeight: 18,
  },
  smartScheduleArrow: {
    width: 20,
    height: 20,
    tintColor: "#1976D2",
  },
  manualSelectionContainer: {
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.border,
  },
  orText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.fontWeight.medium,
  },
});
