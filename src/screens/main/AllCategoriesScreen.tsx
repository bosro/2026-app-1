import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { SearchBar } from '../../components/SearchBar';
import { CategoryCard } from '../../components/CategoryCard';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { Category } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type AllCategoriesScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'AllCategories'
>;

interface Props {
  navigation: AllCategoriesScreenNavigationProp;
}

export const AllCategoriesScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data
  const categories: Category[] = [
    { id: '1', name: 'Hair salon', icon: 'hair-salon' },
    { id: '2', name: 'Barbershop', icon: 'barbershop' },
    { id: '3', name: 'Makeup', icon: 'makeup' },
    { id: '4', name: 'Nail tech', icon: 'nail-tech' },
    { id: '5', name: 'Hair salon', icon: 'hair-salon' },
    { id: '6', name: 'Barbershop', icon: 'barbershop' },
    { id: '7', name: 'Makeup', icon: 'makeup' },
    { id: '8', name: 'Nail tech', icon: 'nail-tech' },
    { id: '9', name: 'Hair salon', icon: 'hair-salon' },
    { id: '10', name: 'Barbershop', icon: 'barbershop' },
    { id: '11', name: 'Makeup', icon: 'makeup' },
    { id: '12', name: 'Nail tech', icon: 'nail-tech' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header with Back Button */}
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.title}>All Categories</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Search Bar */}
          <SearchBar
            placeholder="Search for services near you.."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => console.log('Filter pressed')}
          />

          {/* Categories Grid */}
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                icon={category.icon}
                onPress={() => console.log('Category pressed:', category.id)}
              />
            ))}
          </View>

          {/* Go back to home button */}
          <CustomButton
            title="Go back to home"
            onPress={() => navigation.goBack()}
            variant="primary"
            style={styles.backToHomeButton}
          />
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
  scrollContent: {
    paddingTop: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.md,
  },
  backToHomeButton: {
    marginTop: Theme.spacing.xxl,
  },
});