import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type LearnSkillScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'LearnSkill'
>;

interface Props {
  navigation: LearnSkillScreenNavigationProp;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  image: any;
  duration: string;
  lessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  students: number;
  price: string;
  category: string;
}

export const LearnSkillScreen: React.FC<Props> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Courses', icon: require('../../assets/icons/grid-icon.png') },
    { id: 'hair', name: 'Hair Styling', icon: require('../../assets/icons/hair-icon.png') },
    { id: 'makeup', name: 'Makeup', icon: require('../../assets/icons/makeup-icon.png') },
    { id: 'nails', name: 'Nail Art', icon: require('../../assets/icons/nail-icon.png') },
    { id: 'skincare', name: 'Skincare', icon: require('../../assets/icons/skincare-icon.png') },
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Professional Braiding Masterclass',
      instructor: 'Akosua Mensah',
      image: require('../../assets/images/course1.jpg'),
      duration: '4h 30min',
      lessons: 24,
      level: 'Beginner',
      rating: 4.8,
      students: 1250,
      price: 'GHS 150',
      category: 'hair',
    },
    {
      id: '2',
      title: 'Complete Makeup Artistry Course',
      instructor: 'Ama Darko',
      image: require('../../assets/images/course2.jpg'),
      duration: '6h 15min',
      lessons: 32,
      level: 'Intermediate',
      rating: 4.9,
      students: 2100,
      price: 'GHS 250',
      category: 'makeup',
    },
    {
      id: '3',
      title: 'Natural Hair Care & Styling',
      instructor: 'Yaa Asantewaa',
      image: require('../../assets/images/course3.jpg'),
      duration: '3h 45min',
      lessons: 18,
      level: 'Beginner',
      rating: 4.7,
      students: 890,
      price: 'GHS 120',
      category: 'hair',
    },
    {
      id: '4',
      title: 'Advanced Nail Art Techniques',
      instructor: 'Efya Boateng',
      image: require('../../assets/images/course4.jpg'),
      duration: '5h 20min',
      lessons: 28,
      level: 'Advanced',
      rating: 4.8,
      students: 670,
      price: 'GHS 200',
      category: 'nails',
    },
    {
      id: '5',
      title: 'Bridal Makeup Masterclass',
      instructor: 'Nana Ama',
      image: require('../../assets/images/course5.jpg'),
      duration: '4h 10min',
      lessons: 20,
      level: 'Intermediate',
      rating: 4.9,
      students: 1560,
      price: 'GHS 280',
      category: 'makeup',
    },
    {
      id: '6',
      title: 'Skincare Fundamentals',
      instructor: 'Dr. Abena Osei',
      image: require('../../assets/images/course6.jpg'),
      duration: '2h 30min',
      lessons: 12,
      level: 'Beginner',
      rating: 4.6,
      students: 980,
      price: 'GHS 100',
      category: 'skincare',
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return '#4CAF50';
      case 'Intermediate':
        return '#FF9800';
      case 'Advanced':
        return '#F44336';
      default:
        return Theme.colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.title}>Learn a Skill</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Image
              source={require('../../assets/icons/search-icon.png')}
              style={styles.searchIcon}
              resizeMode="contain"
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses..."
              placeholderTextColor={Theme.colors.textPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Image
                  source={require('../../assets/icons/close-icon.png')}
                  style={styles.clearIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  activeCategory === category.id && styles.categoryButtonActive,
                ]}
                onPress={() => setActiveCategory(category.id)}
              >
                <Image
                  source={category.icon}
                  style={[
                    styles.categoryIcon,
                    activeCategory === category.id && styles.categoryIconActive,
                  ]}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category.id && styles.categoryTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Stats Banner */}
          <View style={styles.statsBanner}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5,000+</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>30+</Text>
              <Text style={styles.statLabel}>Instructors</Text>
            </View>
          </View>

          {/* Courses Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {activeCategory === 'all' ? 'All Courses' : `${categories.find(c => c.id === activeCategory)?.name} Courses`}
            </Text>
            <Text style={styles.resultsCount}>
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
            </Text>

            {filteredCourses.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Image
                  source={require('../../assets/icons/search-icon.png')}
                  style={styles.emptyIcon}
                  resizeMode="contain"
                />
                <Text style={styles.emptyTitle}>No Courses Found</Text>
                <Text style={styles.emptyText}>
                  Try adjusting your search or category filter
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
                    <View style={styles.courseHeader}>
                      <Text style={styles.courseTitle} numberOfLines={2}>
                        {course.title}
                      </Text>
                      <View
                        style={[
                          styles.levelBadge,
                          { backgroundColor: `${getLevelColor(course.level)}20` },
                        ]}
                      >
                        <Text
                          style={[
                            styles.levelText,
                            { color: getLevelColor(course.level) },
                          ]}
                        >
                          {course.level}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.instructorRow}>
                      <Image
                        source={require('../../assets/icons/user-icon.png')}
                        style={styles.instructorIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.instructorName}>{course.instructor}</Text>
                    </View>

                    <View style={styles.courseInfo}>
                      <View style={styles.infoItem}>
                        <Image
                          source={require('../../assets/icons/clock-icon.png')}
                          style={styles.infoIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.infoText}>{course.duration}</Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Image
                          source={require('../../assets/icons/play-icon.png')}
                          style={styles.infoIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.infoText}>{course.lessons} lessons</Text>
                      </View>
                    </View>

                    <View style={styles.courseFooter}>
                      <View style={styles.ratingContainer}>
                        <Image
                          source={require('../../assets/icons/star-filled.png')}
                          style={styles.starIcon}
                          resizeMode="contain"
                        />
                        <Text style={styles.ratingText}>{course.rating}</Text>
                        <Text style={styles.studentsText}>
                          ({course.students.toLocaleString()})
                        </Text>
                      </View>
                      <Text style={styles.priceText}>{course.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

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
  searchContainer: {
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    height: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.textPlaceholder,
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
  },
  clearIcon: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.textSecondary,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xxl,
  },
  categories: {
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundSecondary,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: Theme.colors.black,
  },
  categoryIcon: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.textSecondary,
  },
  categoryIconActive: {
    tintColor: Theme.colors.white,
  },
  categoryText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.fontWeight.medium,
  },
  categoryTextActive: {
    color: Theme.colors.white,
  },
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.primary,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  statItem: {
    flex: 1,
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
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: Theme.spacing.md,
  },
  section: {
    paddingHorizontal: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  resultsCount: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  courseCard: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 180,
  },
  courseContent: {
    padding: Theme.spacing.md,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  courseTitle: {
    flex: 1,
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginRight: Theme.spacing.sm,
  },
  levelBadge: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  levelText: {
    fontSize: Theme.fontSize.xs,
    fontWeight: Theme.fontWeight.semibold,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
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
  courseInfo: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.textSecondary,
    marginRight: 4,
  },
  infoText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginRight: 4,
  },
  studentsText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  priceText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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