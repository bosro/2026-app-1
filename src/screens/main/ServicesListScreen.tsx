import React, { useState } from 'react';
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
import { ServiceCard } from '../../components/ServiceCard';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { Service } from '../../types';
import { SafeAreaView } from 'react-native-safe-area-context';

type ServicesListScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'ServicesList'
>;

type ServicesListScreenRouteProp = RouteProp<
  MainStackParamList,
  'ServicesList'
>;

interface Props {
  navigation: ServicesListScreenNavigationProp;
  route: ServicesListScreenRouteProp;
}

type CategoryFilter = 'all' | 'female' | 'male';

export const ServicesListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { salonId } = route.params;
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Dummy data - replace with actual data from API
  const services: Service[] = [
    {
      id: '1',
      name: "Men's low cut",
      price: 60.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'male',
      isPopular: true,
    },
    {
      id: '2',
      name: "Men's low cut + Dye + Perm",
      price: 120.0,
      duration: '60mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'male',
    },
    {
      id: '3',
      name: 'Women low cut',
      price: 60.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'female',
    },
    {
      id: '4',
      name: 'Kids Afro cut',
      price: 40.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'all',
      isPopular: true,
    },
    {
      id: '5',
      name: 'Women low cut + Dye',
      price: 100.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'female',
    },
    {
      id: '6',
      name: "Men's low cut + Dye + Perm",
      price: 120.0,
      duration: '60mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'male',
    },
    {
      id: '7',
      name: 'Women low cut',
      price: 60.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'female',
    },
    {
      id: '8',
      name: "Men's low cut",
      price: 60.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'male',
      isPopular: true,
    },
    {
      id: '9',
      name: 'Kids Afro cut',
      price: 40.0,
      duration: '45mins',
      rating: 4.2,
      reviewCount: 200,
      category: 'all',
      isPopular: true,
    },
  ];

  const filteredServices =
    activeFilter === 'all'
      ? services
      : services.filter((service) => service.category === activeFilter);

  const handleServicePress = (service: Service) => {
    navigation.navigate('BookAppointment', {
      salonId,
      service: {
        id: service.id,
        name: service.name,
        price: service.price,
        duration: service.duration,
      },
    });
  };

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      // Navigate to booking with selected services
      console.log('Selected services:', selectedServices);
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
            <TouchableOpacity style={[styles.tab, styles.tabActive]}>
              <Text style={[styles.tabText, styles.tabTextActive]}>
                Services
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigation.navigate('Reviews', { salonId })}
            >
              <Text style={styles.tabText}>Reviews</Text>
            </TouchableOpacity>
          </View>

          {/* Category Filters */}
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
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'female' && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter('female')}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === 'female' && styles.filterTextActive,
                ]}
              >
                Females
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === 'male' && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter('male')}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === 'male' && styles.filterTextActive,
                ]}
              >
                Males
              </Text>
            </TouchableOpacity>
          </View>

          {/* Services List */}
          <View style={styles.servicesList}>
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                onPress={() => handleServicePress(service)}
              />
            ))}
          </View>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.continueButtonContainer}>
          <CustomButton
            title="Continue"
            onPress={handleContinue}
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
  filters: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  filterButton: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  filterButtonActive: {
    borderBottomColor: Theme.colors.primary,
  },
  filterText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  filterTextActive: {
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.semibold,
  },
  servicesList: {
    paddingHorizontal: Theme.spacing.lg,
  },
  bottomSpacer: {
    height: 100,
  },
  continueButtonContainer: {
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