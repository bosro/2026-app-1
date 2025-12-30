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

type MyCoursesScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'MyCourses'
>;

interface Props {
  navigation: MyCoursesScreenNavigationProp;
}

interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  image: any;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessed: string;
}

export const MyCoursesScreen: React.FC<Props> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'inProgress' | 'completed'>('all');

  const courses: EnrolledCourse[] = [
    {
      id: '1',
      title: 'Professional Braiding Masterclass',
      instructor: 'Akosua Mensah',
      image: require('../../assets/images/course1.jpg'),
      progress: 35,
      lessonsCompleted: 8,
      totalLessons: 24,
      lastAccessed: '2 hours ago',
    },
    {
      id: '2',
      title: 'Complete Makeup Artistry Course',
      instructor: 'Ama Darko',
      image: require('../../assets/images/course2.jpg'),
      progress: 60,
      lessonsCompleted: 19,
      totalLessons: 32,
      lastAccessed: 'Yesterday',
    },
    {
      id: '3',
      title: 'Natural Hair Care & Styling',
      instructor: 'Yaa Asantewaa',
      image: require('../../assets/images/course3.jpg'),
      progress: 100,
      lessonsCompleted: 18,
      totalLessons: 18,
      lastAccessed: '3 days ago',
    },
  ];

  const filteredCourses = courses.filter((course) => {
    if (activeFilter === 'inProgress') return course.progress < 100;
    if (activeFilter === 'completed') return course.progress === 100;
    return true;
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>My Courses</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{courses.length}</Text>
            <Text style={styles.statLabel}>Enrolled</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {courses.filter(c => c.progress < 100).length}
            </Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {courses.filter(c => c.progress === 100).length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'all' && styles.filterTextActive,
              ]}
            >
              All Courses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'inProgress' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('inProgress')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'inProgress' && styles.filterTextActive,
              ]}
            >
              In Progress
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === 'completed' && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter('completed')}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === 'completed' && styles.filterTextActive,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredCourses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={require('../../assets/icons/graduation-cap.png')}
                style={styles.emptyIcon}
                resizeMode="contain"
              />
              <Text style={styles.emptyTitle}>No Courses Found</Text>
              <Text style={styles.emptyText}>
                {activeFilter === 'completed'
                  ? "You haven't completed any courses yet"
                  : "You don't have any courses in progress"}
              </Text>
            </View>
          ) : (
            filteredCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() =>
                  navigation.navigate('CourseDetails', { courseId: course.id })
                }
                activeOpacity={0.7}
              >
                <Image source={course.image} style={styles.courseImage} />
                <View style={styles.courseContent}>
                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {course.title}
                  </Text>

                  <View style={styles.instructorRow}>
                    <Image
                      source={require('../../assets/icons/user-icon.png')}
                      style={styles.instructorIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.instructorName}>{course.instructor}</Text>
                  </View>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressHeader}>
                      <Text style={styles.progressText}>
                        {course.lessonsCompleted} of {course.totalLessons} lessons
                      </Text>
                      <Text style={styles.progressPercentage}>
                        {course.progress}%
                      </Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${course.progress}%` },
                          ]}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.courseFooter}>
                    <Text style={styles.lastAccessed}>
                      Last accessed {course.lastAccessed}
                    </Text>
                    {course.progress === 100 ? (
                      <View style={styles.completedBadge}>
                        <Image
                          source={require('../../assets/icons/checkmark-icon.png')}
                          style={styles.completedIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.completedText}>Completed</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() =>
                          navigation.navigate('VideoLesson', {
                            courseId: course.id,
                            lessonId: '1-3',
                            lessonTitle: 'Current Lesson',
                          })
                        }
                      >
                        <Text style={styles.continueText}>Continue</Text>
                        <Image
                          source={require('../../assets/icons/arrow-right.png')}
                          style={styles.arrowIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    )}
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Theme.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundSecondary,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: Theme.colors.black,
  },
  filterText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.fontWeight.medium,
  },
  filterTextActive: {
    color: Theme.colors.white,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  courseCard: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 150,
  },
  courseContent: {
    padding: Theme.spacing.md,
  },
  courseTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  instructorIcon: {
    width: 16,
    height: 16,
    tintColor: Theme.colors.textSecondary,
    marginRight: 6,
  },
  instructorName: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  progressContainer: {
    marginBottom: Theme.spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  progressText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  progressPercentage: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.primary,
  },
  progressBarContainer: {
    height: 6,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: 3,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastAccessed: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textPlaceholder,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.sm,
  },
  continueText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.white,
    marginRight: 4,
  },
  arrowIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.white,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF5020',
    paddingVertical: Theme.spacing.xs,
    paddingHorizontal: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.sm,
  },
  completedIcon: {
    width: 14,
    height: 14,
    tintColor: '#4CAF50',
    marginRight: 4,
  },
  completedText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    color: '#4CAF50',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xxl * 2,
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