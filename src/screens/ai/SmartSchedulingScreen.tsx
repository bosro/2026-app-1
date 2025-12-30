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
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type SmartSchedulingScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'SmartScheduling'
>;

type SmartSchedulingScreenRouteProp = RouteProp<
  MainStackParamList,
  'SmartScheduling'
>;

interface Props {
  navigation: SmartSchedulingScreenNavigationProp;
  route: SmartSchedulingScreenRouteProp;
}

interface TimeSlotRecommendation {
  time: string;
  date: string;
  dayName: string;
  popularity: 'low' | 'medium' | 'high';
  discount?: number;
  waitTime: string;
  aiReason: string;
}

export const SmartSchedulingScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const { salonId, serviceId } = route.params;
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const recommendations: TimeSlotRecommendation[] = [
    {
      time: '9:00 AM',
      date: '2024-12-18',
      dayName: 'Wednesday',
      popularity: 'low',
      discount: 15,
      waitTime: 'No wait',
      aiReason: 'Based on your booking history, morning slots work best for you',
    },
    {
      time: '2:00 PM',
      date: '2024-12-18',
      dayName: 'Wednesday',
      popularity: 'medium',
      waitTime: '5-10 min',
      aiReason: 'Popular time but good availability',
    },
    {
      time: '10:00 AM',
      date: '2024-12-19',
      dayName: 'Thursday',
      popularity: 'low',
      discount: 10,
      waitTime: 'No wait',
      aiReason: '40% less busy than usual',
    },
    {
      time: '4:00 PM',
      date: '2024-12-19',
      dayName: 'Thursday',
      popularity: 'high',
      waitTime: '15-20 min',
      aiReason: 'High demand - book early',
    },
    {
      time: '11:00 AM',
      date: '2024-12-20',
      dayName: 'Friday',
      popularity: 'medium',
      waitTime: '5 min',
      aiReason: 'Good time for a weekend prep',
    },
  ];

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'low':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'high':
        return '#F44336';
      default:
        return Theme.colors.textSecondary;
    }
  };

  const getPopularityText = (popularity: string) => {
    switch (popularity) {
      case 'low':
        return 'Low Traffic';
      case 'medium':
        return 'Moderate Traffic';
      case 'high':
        return 'High Traffic';
      default:
        return '';
    }
  };

  const handleBookSlot = () => {
    if (selectedSlot) {
      const slot = recommendations.find(
        (r) => `${r.date}-${r.time}` === selectedSlot
      );
      if (slot) {
        navigation.navigate('BookAppointment', {
          salonId,
          service: {
            id: serviceId,
            name: 'Men\'s low cut',
            price: 60.0,
            duration: '45mins',
          },
        });
      }
    }
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
            <Text style={styles.title}>Smart Scheduling</Text>
            <View style={styles.placeholder} />
          </View>

          {/* AI Badge */}
          <View style={styles.aiBadge}>
            <Image
              source={require('../../assets/icons/ai-robot.png')}
              style={styles.aiIcon}
              resizeMode="contain"
            />
            <Text style={styles.aiBadgeText}>AI-Powered Recommendations</Text>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Image
              source={require('../../assets/icons/lightbulb-icon.png')}
              style={styles.infoIcon}
              resizeMode="contain"
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Personalized for You</Text>
              <Text style={styles.infoText}>
                These times are recommended based on your booking history, salon
                traffic patterns, and current availability
              </Text>
            </View>
          </View>

          {/* Best Match Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Image
                  source={require('../../assets/icons/star-filled.png')}
                  style={styles.sectionTitleIcon}
                  resizeMode="contain"
                />
                <Text style={styles.sectionTitle}>Best Match</Text>
              </View>
              <View style={styles.bestMatchBadge}>
                <Text style={styles.bestMatchText}>AI Recommended</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.recommendationCard,
                styles.bestMatchCard,
                selectedSlot ===
                  `${recommendations[0].date}-${recommendations[0].time}` &&
                  styles.selectedCard,
              ]}
              onPress={() =>
                setSelectedSlot(
                  `${recommendations[0].date}-${recommendations[0].time}`
                )
              }
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.dayName}>{recommendations[0].dayName}</Text>
                  <Text style={styles.dateText}>
                    {new Date(recommendations[0].date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{recommendations[0].time}</Text>
                </View>
              </View>

              <View style={styles.cardDetails}>
                <View style={styles.detailRow}>
                  <View
                    style={[
                      styles.popularityBadge,
                      {
                        backgroundColor: `${getPopularityColor(
                          recommendations[0].popularity
                        )}20`,
                        borderColor: getPopularityColor(
                          recommendations[0].popularity
                        ),
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.popularityText,
                        {
                          color: getPopularityColor(
                            recommendations[0].popularity
                          ),
                        },
                      ]}
                    >
                      {getPopularityText(recommendations[0].popularity)}
                    </Text>
                  </View>
                  {recommendations[0].discount && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>
                        {recommendations[0].discount}% OFF
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.detailRow}>
                  <Image
                    source={require('../../assets/icons/clock-icon.png')}
                    style={styles.waitTimeIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.waitTimeText}>
                    {recommendations[0].waitTime}
                  </Text>
                </View>

                <View style={styles.aiReasonContainer}>
                  <Image
                    source={require('../../assets/icons/target-icon.png')}
                    style={styles.aiReasonIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.aiReasonText}>
                    {recommendations[0].aiReason}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Other Available Times */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Other Available Times</Text>

            {recommendations.slice(1).map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.recommendationCard,
                  selectedSlot === `${slot.date}-${slot.time}` &&
                    styles.selectedCard,
                ]}
                onPress={() => setSelectedSlot(`${slot.date}-${slot.time}`)}
              >
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.dayName}>{slot.dayName}</Text>
                    <Text style={styles.dateText}>
                      {new Date(slot.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{slot.time}</Text>
                  </View>
                </View>

                <View style={styles.cardDetails}>
                  <View style={styles.detailRow}>
                    <View
                      style={[
                        styles.popularityBadge,
                        {
                          backgroundColor: `${getPopularityColor(
                            slot.popularity
                          )}20`,
                          borderColor: getPopularityColor(slot.popularity),
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.popularityText,
                          { color: getPopularityColor(slot.popularity) },
                        ]}
                      >
                        {getPopularityText(slot.popularity)}
                      </Text>
                    </View>
                    {slot.discount && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                          {slot.discount}% OFF
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.detailRow}>
                    <Image
                      source={require('../../assets/icons/clock-icon.png')}
                      style={styles.waitTimeIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.waitTimeText}>{slot.waitTime}</Text>
                  </View>

                  <View style={styles.aiReasonContainer}>
                    <Image
                      source={require('../../assets/icons/chat-icon.png')}
                      style={styles.aiReasonIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.aiReasonText}>{slot.aiReason}</Text>
                  </View>
                </View>

                {selectedSlot === `${slot.date}-${slot.time}` && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Manual Selection Option */}
          <View style={styles.manualSelectionContainer}>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity
              style={styles.manualButton}
              onPress={() =>
                navigation.navigate('BookAppointment', {
                  salonId,
                  service: {
                    id: serviceId,
                    name: 'Men\'s low cut',
                    price: 60.0,
                    duration: '45mins',
                  },
                })
              }
            >
              <Text style={styles.manualButtonText}>
                Choose Time Manually
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Book Button */}
        <View style={styles.bookButtonContainer}>
          <CustomButton
            title="Book Selected Time"
            onPress={handleBookSlot}
            variant="primary"
            disabled={!selectedSlot}
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
    paddingBottom: Theme.spacing.xxl,
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
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    marginBottom: Theme.spacing.lg,
  },
  aiIcon: {
    width: 16,
    height: 16,
    tintColor: '#1976D2',
    marginRight: 6,
  },
  aiBadgeText: {
    fontSize: Theme.fontSize.sm,
    color: '#1976D2',
    fontWeight: Theme.fontWeight.semibold,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: Theme.spacing.md,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
  },
  infoIcon: {
    width: 20,
    height: 20,
    tintColor: '#F57C00',
    marginRight: Theme.spacing.sm,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  bestMatchBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  bestMatchText: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.bold,
  },
  recommendationCard: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  bestMatchCard: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  selectedCard: {
    borderColor: Theme.colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  dayName: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  dateText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  timeContainer: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
  },
  timeText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  cardDetails: {
    gap: Theme.spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  popularityBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
    borderWidth: 1,
  },
  popularityText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.semibold,
  },
  discountBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  discountText: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.bold,
  },
  waitTimeIcon: {
    width: 16,
    height: 16,
    tintColor: Theme.colors.textSecondary,
  },
  waitTimeText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  aiReasonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  aiReasonIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.primary,
    marginRight: 6,
    marginTop: 2,
  },
  aiReasonText: {
    flex: 1,
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
    lineHeight: 18,
  },
  selectedIndicator: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 16,
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.bold,
  },
  manualSelectionContainer: {
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.lg,
  },
  orText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  manualButton: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  manualButtonText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.primary,
    fontWeight: Theme.fontWeight.semibold,
  },
  bottomSpacer: {
    height: 100,
  },
  bookButtonContainer: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
});