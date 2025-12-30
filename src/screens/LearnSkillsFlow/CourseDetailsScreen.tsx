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

type CourseDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'CourseDetails'
>;

type CourseDetailsScreenRouteProp = RouteProp<
  MainStackParamList,
  'CourseDetails'
>;

interface Props {
  navigation: CourseDetailsScreenNavigationProp;
  route: CourseDetailsScreenRouteProp;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export const CourseDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { courseId } = route.params;
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

  // Dummy data - replace with API call
  const course = {
    id: courseId,
    title: 'Professional Braiding Masterclass',
    instructor: 'Akosua Mensah',
    instructorImage: require('../../assets/images/instructor1.jpg'),
    image: require('../../assets/images/course1.jpg'),
    duration: '4h 30min',
    lessons: 24,
    level: 'Beginner',
    rating: 4.8,
    reviews: 1250,
    students: 1250,
    price: 'GHS 150',
    description:
      'Master the art of professional braiding with this comprehensive course. Learn various braiding techniques from basic to advanced, including box braids, cornrows, and protective styles. Perfect for beginners looking to start their journey in hairstyling.',
    whatYouLearn: [
      'Master 15+ different braiding techniques',
      'Understand hair types and proper hair care',
      'Learn professional client consultation',
      'Create beautiful protective styles',
      'Build your braiding business',
    ],
    requirements: [
      'No prior experience needed',
      'Basic hair styling tools',
      'Practice mannequin head (recommended)',
    ],
  };

  const modules: Module[] = [
    {
      id: '1',
      title: 'Introduction to Braiding',
      lessons: [
        { id: '1-1', title: 'Welcome to the Course', duration: '5:30', isCompleted: true, isLocked: false },
        { id: '1-2', title: 'Understanding Hair Types', duration: '12:45', isCompleted: true, isLocked: false },
        { id: '1-3', title: 'Essential Tools & Products', duration: '8:20', isCompleted: false, isLocked: false },
      ],
    },
    {
      id: '2',
      title: 'Basic Braiding Techniques',
      lessons: [
        { id: '2-1', title: 'Three-Strand Braids', duration: '15:00', isCompleted: false, isLocked: false },
        { id: '2-2', title: 'French Braids', duration: '18:30', isCompleted: false, isLocked: false },
        { id: '2-3', title: 'Dutch Braids', duration: '16:45', isCompleted: false, isLocked: true },
        { id: '2-4', title: 'Fishtail Braids', duration: '20:00', isCompleted: false, isLocked: true },
      ],
    },
    {
      id: '3',
      title: 'Advanced Protective Styles',
      lessons: [
        { id: '3-1', title: 'Box Braids - Part 1', duration: '25:00', isCompleted: false, isLocked: true },
        { id: '3-2', title: 'Box Braids - Part 2', duration: '22:30', isCompleted: false, isLocked: true },
        { id: '3-3', title: 'Cornrows Basics', duration: '28:15', isCompleted: false, isLocked: true },
        { id: '3-4', title: 'Advanced Cornrow Patterns', duration: '30:00', isCompleted: false, isLocked: true },
      ],
    },
  ];

  const reviews = [
    {
      id: '1',
      name: 'Abena Osei',
      rating: 5,
      date: '2 days ago',
      comment: 'Excellent course! The instructor explains everything clearly. I can now do box braids professionally.',
      avatar: require('../../assets/images/avatar1.jpg'),
    },
    {
      id: '2',
      name: 'Yaa Asantewaa',
      rating: 4,
      date: '1 week ago',
      comment: 'Great content and well-structured lessons. Would love more practice exercises.',
      avatar: require('../../assets/images/avatar2.jpg'),
    },
  ];

  const handleEnroll = () => {
    // Handle enrollment
    console.log('Enroll in course:', courseId);
  };

  const handleLessonPress = (lesson: Lesson) => {
    if (!lesson.isLocked) {
      navigation.navigate('VideoLesson', {
        courseId: course.id,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>Course Details</Text>
          <TouchableOpacity>
            <Image
              source={require('../../assets/icons/share-icon.png')}
              style={styles.shareIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Course Image */}
          <Image source={course.image} style={styles.courseImage} />

          {/* Course Info */}
          <View style={styles.content}>
            <Text style={styles.courseTitle}>{course.title}</Text>

            <View style={styles.metaRow}>
              <View style={styles.ratingContainer}>
                <Image
                  source={require('../../assets/icons/star-filled.png')}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>{course.rating}</Text>
                <Text style={styles.reviewsText}>
                  ({course.reviews.toLocaleString()} reviews)
                </Text>
              </View>
              <Text style={styles.studentsText}>
                {course.students.toLocaleString()} students
              </Text>
            </View>

            {/* Instructor */}
            <View style={styles.instructorCard}>
              <Image
                source={course.instructorImage}
                style={styles.instructorAvatar}
              />
              <View style={styles.instructorInfo}>
                <Text style={styles.instructorLabel}>Instructor</Text>
                <Text style={styles.instructorName}>{course.instructor}</Text>
              </View>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Image
                  source={require('../../assets/icons/clock-icon.png')}
                  style={styles.statIcon}
                  resizeMode="contain"
                />
                <Text style={styles.statValue}>{course.duration}</Text>
                <Text style={styles.statLabel}>Duration</Text>
              </View>
              <View style={styles.statBox}>
                <Image
                  source={require('../../assets/icons/play-icon.png')}
                  style={styles.statIcon}
                  resizeMode="contain"
                />
                <Text style={styles.statValue}>{course.lessons}</Text>
                <Text style={styles.statLabel}>Lessons</Text>
              </View>
              <View style={styles.statBox}>
                <Image
                  source={require('../../assets/icons/level-icon.png')}
                  style={styles.statIcon}
                  resizeMode="contain"
                />
                <Text style={styles.statValue}>{course.level}</Text>
                <Text style={styles.statLabel}>Level</Text>
              </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
                onPress={() => setActiveTab('overview')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'overview' && styles.tabTextActive,
                  ]}
                >
                  Overview
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'curriculum' && styles.tabActive]}
                onPress={() => setActiveTab('curriculum')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'curriculum' && styles.tabTextActive,
                  ]}
                >
                  Curriculum
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'reviews' && styles.tabActive]}
                onPress={() => setActiveTab('reviews')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'reviews' && styles.tabTextActive,
                  ]}
                >
                  Reviews
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <View style={styles.tabContent}>
                <Text style={styles.sectionTitle}>About this course</Text>
                <Text style={styles.description}>{course.description}</Text>

                <Text style={styles.sectionTitle}>What you'll learn</Text>
                {course.whatYouLearn.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <Image
                      source={require('../../assets/icons/checkmark-icon.png')}
                      style={styles.checkIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.listText}>{item}</Text>
                  </View>
                ))}

                <Text style={styles.sectionTitle}>Requirements</Text>
                {course.requirements.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.listText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'curriculum' && (
              <View style={styles.tabContent}>
                {modules.map((module) => (
                  <View key={module.id} style={styles.moduleCard}>
                    <Text style={styles.moduleTitle}>{module.title}</Text>
                    {module.lessons.map((lesson) => (
                      <TouchableOpacity
                        key={lesson.id}
                        style={styles.lessonRow}
                        onPress={() => handleLessonPress(lesson)}
                        disabled={lesson.isLocked}
                      >
                        <View style={styles.lessonLeft}>
                          {lesson.isCompleted ? (
                            <Image
                              source={require('../../assets/icons/checkmark-circle.png')}
                              style={styles.lessonStatusIcon}
                              resizeMode="contain"
                            />
                          ) : lesson.isLocked ? (
                            <Image
                              source={require('../../assets/icons/lock-icon.png')}
                              style={styles.lessonStatusIcon}
                              resizeMode="contain"
                            />
                          ) : (
                            <Image
                              source={require('../../assets/icons/play-circle.png')}
                              style={styles.lessonStatusIcon}
                              resizeMode="contain"
                            />
                          )}
                          <Text
                            style={[
                              styles.lessonTitle,
                              lesson.isLocked && styles.lessonTitleLocked,
                            ]}
                          >
                            {lesson.title}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.lessonDuration,
                            lesson.isLocked && styles.lessonDurationLocked,
                          ]}
                        >
                          {lesson.duration}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'reviews' && (
              <View style={styles.tabContent}>
                {reviews.map((review) => (
                  <View key={review.id} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <Image source={review.avatar} style={styles.reviewAvatar} />
                      <View style={styles.reviewHeaderInfo}>
                        <Text style={styles.reviewName}>{review.name}</Text>
                        <View style={styles.reviewRating}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                              key={index}
                              source={
                                index < review.rating
                                  ? require('../../assets/icons/star-filled.png')
                                  : require('../../assets/icons/star-outline.png')
                              }
                              style={styles.reviewStar}
                              resizeMode="contain"
                            />
                          ))}
                          <Text style={styles.reviewDate}>{review.date}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Enroll Button */}
        <View style={styles.enrollContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>{course.price}</Text>
          </View>
          <CustomButton
            title="Enroll Now"
            onPress={handleEnroll}
            variant="primary"
            style={styles.enrollButton}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
  },
  headerTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Theme.spacing.md,
  },
  shareIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.textPrimary,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xxl,
  },
  courseImage: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  courseTitle: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  ratingText: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  studentsText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
  },
  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Theme.spacing.md,
  },
  instructorInfo: {
    flex: 1,
  },
  instructorLabel: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: 2,
  },
  instructorName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  statIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
    marginBottom: Theme.spacing.sm,
  },
  statValue: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textSecondary,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    marginBottom: Theme.spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Theme.colors.primary,
  },
  tabText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
  },
  tabTextActive: {
    color: Theme.colors.primary,
    fontWeight: Theme.fontWeight.semibold,
  },
  tabContent: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.md,
  },
  description: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: Theme.spacing.lg,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.success,
    marginRight: Theme.spacing.sm,
    marginTop: 2,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.colors.textSecondary,
    marginRight: Theme.spacing.sm,
    marginTop: 8,
  },
  listText: {
    flex: 1,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    lineHeight: 22,
  },
  moduleCard: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  moduleTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  lessonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonStatusIcon: {
    width: 20,
    height: 20,
    marginRight: Theme.spacing.sm,
    tintColor: Theme.colors.primary,
  },
  lessonTitle: {
    flex: 1,
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
  },
  lessonTitleLocked: {
    color: Theme.colors.textPlaceholder,
  },
  lessonDuration: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  lessonDurationLocked: {
    color: Theme.colors.textPlaceholder,
  },
  reviewCard: {
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.sm,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Theme.spacing.sm,
  },
  reviewHeaderInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewStar: {
    width: 14,
    height: 14,
    marginRight: 2,
  },
  reviewDate: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.sm,
  },
  reviewComment: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 100,
  },
  enrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    gap: Theme.spacing.md,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary,
  },
  enrollButton: {
    flex: 1.5,
  },
});