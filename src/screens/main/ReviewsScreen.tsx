import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../types/navigation';
import { ReviewCard } from '../../components/ReviewCard';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { Review } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type ReviewsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Reviews'
>;

type ReviewsScreenRouteProp = RouteProp<MainStackParamList, 'Reviews'>;

interface Props {
  navigation: ReviewsScreenNavigationProp;
  route: ReviewsScreenRouteProp;
}

export const ReviewsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { salonId } = route.params;

  // Dummy data - replace with actual data from API
  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Maddy Asamoah',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '2',
      userName: 'Opoku Isaac',
      rating: 3,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '3',
      userName: 'Brandon Vetrovs',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '4',
      userName: 'Makenna Workman',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '5',
      userName: 'Gretchen Rosser',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '6',
      userName: 'Ashlynn Bator',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
    },
    {
      id: '7',
      userName: 'Gustavo Dorwart',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      date: '3days ago',
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
            <BackButton />
            <Text style={styles.title}>Bestman Barbershop</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.tabText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigation.navigate('ServicesList', { salonId })}
            >
              <Text style={styles.tabText}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, styles.tabActive]}>
              <Text style={[styles.tabText, styles.tabTextActive]}>Reviews</Text>
            </TouchableOpacity>
          </View>

          {/* Reviews List */}
          <View style={styles.reviewsList}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Leave Review Button */}
        <View style={styles.leaveReviewButtonContainer}>
          <CustomButton
            title="Leave a review"
            onPress={() => navigation.navigate('LeaveReview', { salonId })}
            variant="primary"
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
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.backgroundSecondary,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Theme.colors.black,
  },
  tabText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.medium,
  },
  tabTextActive: {
    color: Theme.colors.white,
  },
  reviewsList: {
    paddingHorizontal: Theme.spacing.lg,
  },
  bottomSpacer: {
    height: 100,
  },
  leaveReviewButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
});