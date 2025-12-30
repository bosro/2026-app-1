import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../types/navigation';
import { CustomButton } from '../../components/CustomButton';
import { Theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

type OnboardingSlidesScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'OnboardingSlides'
>;

interface Props {
  navigation: OnboardingSlidesScreenNavigationProp;
}

interface OnboardingSlide {
  id: string;
  image: any;
  title: string;
  description: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    image: require('../../assets/images/onboarding.gif'),
    title: 'Beauty Made Simple for Everyone',
    description:
      'Whether you need a service or offer one — booking and managing appointments is effortless.',
  },
  {
    id: '2',
    image: require('../../assets/images/onboarding1.gif'),
    title: 'Grow Your Beauty Business',
    description:
      'Beauticians can showcase their work, gain clients, and manage bookings easily.',
  },
  {
    id: '3',
    image: require('../../assets/images/onboarding3.gif'),
    title: 'Connecting You to Top Beauty Professionals',
    description:
      'Discover salons, barbers, nail techs & more — all around you.',
  },
];

export const OnboardingSlidesScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Navigate to role selection after last slide
      navigation.navigate('RoleSelection');
    }
  };

  const handleSkip = () => {
    // Skip directly to role selection
    navigation.navigate('RoleSelection');
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.backButton}>
          {/* Empty view to maintain layout balance */}
        </View>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      {/* Next Button */}
      <View style={styles.footer}>
        <CustomButton
          title={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          variant="secondary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
  },
  skipText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
  },
  image: {
    width: '100%',
    height: '50%',
    marginTop: Theme.spacing.xxl,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.spacing.md,
  },
  title: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },
  description: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: Theme.colors.primary,
  },
  footer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
});