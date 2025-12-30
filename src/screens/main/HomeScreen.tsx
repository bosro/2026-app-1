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
import { SalonCard } from '../../components/SalonCard';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Salon } from '../../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface Promotion {
  id: string;
  title: string;
  discount: string;
  image: any;
  salonName: string;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // AI Features Data
  const aiFeatures = [
    {
      id: '1',
      title: 'Virtual Try-On',
      subtitle: 'See how you look',
      icon: require('../../assets/icons/camera-icon.png'),
      onPress: () => navigation.navigate('VirtualTryOn'),
    },
    {
      id: '2',
      title: 'Smart Scheduling',
      subtitle: 'AI-powered booking',
      icon: require('../../assets/icons/calendar-icon.png'),
      onPress: () => navigation.navigate('SmartScheduling', { 
        salonId: '1', 
        serviceId: '1' 
      }),
    },
    {
      id: '3',
      title: 'Style Assistant',
      subtitle: 'Get recommendations',
      icon: require('../../assets/icons/ai-robot.png'),
      onPress: () => console.log('Style Assistant - Coming Soon'),
    },
  ];

  // Near You Salons
  const nearYouSalons: Salon[] = [
    {
      id: '1',
      name: 'Bestman Barbershop',
      image: require('../../assets/images/salon1.jpg'),
      location: 'City campus, Accra',
      distance: '2.1km',
      rating: 4.2,
      reviewCount: 200,
      isFavorite: false,
      isOpen: true,
      opensAt: '7:00 AM',
      closesAt: '7:00 PM',
    },
    {
      id: '2',
      name: 'Premium Beauty Salon',
      image: require('../../assets/images/salon2.jpg'),
      location: 'Mobibin, Accra',
      distance: '3.5km',
      rating: 4.5,
      reviewCount: 120,
      isFavorite: true,
      isOpen: true,
      opensAt: '8:00 AM',
      closesAt: '8:00 PM',
    },
    {
      id: '3',
      name: 'Noble Makeup Parlour',
      image: require('../../assets/images/salon3.jpg'),
      location: 'East Legon, Accra',
      distance: '4.2km',
      rating: 4.8,
      reviewCount: 350,
      isFavorite: false,
      isOpen: false,
      opensAt: '9:00 AM',
      closesAt: '6:00 PM',
    },
  ];

  // Promotions Data
  const promotions: Promotion[] = [
    {
      id: '1',
      title: 'Weekend Special',
      discount: '30% OFF',
      image: require('../../assets/images/salon1.jpg'),
      salonName: 'Bestman Barbershop',
    },
    {
      id: '2',
      title: 'New Customer Deal',
      discount: '50% OFF',
      image: require('../../assets/images/salon2.jpg'),
      salonName: 'Premium Beauty',
    },
    {
      id: '3',
      title: 'Flash Sale',
      discount: '25% OFF',
      image: require('../../assets/images/salon3.jpg'),
      salonName: 'Glam Studio',
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', { query: searchQuery });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>Luxury! 👋</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Image
              source={require('../../assets/icons/notification-icon.png')}
              style={styles.notificationIcon}
              resizeMode="contain"
            />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image
            source={require('../../assets/icons/search-icon.png')}
            style={styles.searchIcon}
            resizeMode="contain"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search salons, services..."
            placeholderTextColor={Theme.colors.textPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Image
              source={require('../../assets/icons/filter-icon.png')}
              style={styles.filterIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* AI Features Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Image
                source={require('../../assets/icons/ai-robot.png')}
                style={styles.aiHeaderIcon}
                resizeMode="contain"
              />
              <Text style={styles.sectionTitle}>AI-Powered Features</Text>
            </View>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.aiFeaturesContainer}
          >
            {aiFeatures.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={styles.aiFeatureCard}
                onPress={feature.onPress}
                activeOpacity={0.8}
              >
                <View style={styles.aiFeatureIconContainer}>
                  <Image
                    source={feature.icon}
                    style={styles.aiFeatureIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.aiFeatureTitle}>{feature.title}</Text>
                <Text style={styles.aiFeatureSubtitle}>{feature.subtitle}</Text>
                <View style={styles.aiFeatureBadge}>
                  <Text style={styles.aiFeatureBadgeText}>AI</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Promotions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Promotions')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promotionsContainer}
          >
            {promotions.map((promo) => (
              <TouchableOpacity
                key={promo.id}
                style={styles.promotionCard}
                onPress={() => navigation.navigate('SalonDetails', { salonId: promo.id })}
                activeOpacity={0.8}
              >
                <Image
                  source={promo.image}
                  style={styles.promotionImage}
                />
                <View style={styles.promotionOverlay}>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{promo.discount}</Text>
                  </View>
                  <View style={styles.promotionInfo}>
                    <Text style={styles.promotionTitle}>{promo.title}</Text>
                    <Text style={styles.promotionSalon}>{promo.salonName}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Near You Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Near You</Text>
            <TouchableOpacity onPress={() => navigation.navigate('NearYou')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.salonsContainer}>
            {nearYouSalons.map((salon) => (
              <SalonCard
                key={salon.id}
                {...salon}
                glassEffect={false}
                showOpenStatus={true}
                onPress={() => navigation.navigate('SalonDetails', { salonId: salon.id })}
                onFavoritePress={() => console.log('Favorite:', salon.id)}
              />
            ))}
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            {[
              { name: 'Haircut', icon: require('../../assets/icons/haircut-icon.png') },
              { name: 'Makeup', icon: require('../../assets/icons/makeup-icon.png') },
              { name: 'Nails', icon: require('../../assets/icons/nails-icon.png') },
              { name: 'Spa', icon: require('../../assets/icons/spa-icon.png') },
            ].map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('SearchResults', { query: category.name })}
              >
                <View style={styles.categoryIconContainer}>
                  <Image
                    source={category.icon}
                    style={styles.categoryIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  greeting: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
  },
  userName: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.textPrimary,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Theme.colors.error,
    borderWidth: 2,
    borderColor: Theme.colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.textSecondary,
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    paddingVertical: Theme.spacing.md,
  },
  filterButton: {
    padding: Theme.spacing.sm,
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.textPrimary,
  },
  section: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiHeaderIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
    marginRight: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  viewAll: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.primary,
    fontWeight: Theme.fontWeight.medium,
  },
  aiFeaturesContainer: {
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  aiFeatureCard: {
    width: 140,
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.md,
    position: 'relative',
  },
  aiFeatureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.sm,
  },
  aiFeatureIcon: {
    width: 28,
    height: 28,
    tintColor: Theme.colors.primary,
  },
  aiFeatureTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  aiFeatureSubtitle: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  aiFeatureBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.sm,
  },
  aiFeatureBadgeText: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.bold,
  },
  promotionsContainer: {
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  promotionCard: {
    width: 280,
    height: 160,
    borderRadius: Theme.borderRadius.lg,
    overflow: 'hidden',
  },
  promotionImage: {
    width: '100%',
    height: '100%',
  },
  promotionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: Theme.spacing.md,
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Theme.colors.error,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
  },
  discountText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  promotionInfo: {
    gap: 4,
  },
  promotionTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.white,
  },
  promotionSalon: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.white,
  },
  salonsContainer: {
    paddingHorizontal: Theme.spacing.lg,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: '#F6F6F6',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.sm,
  },
  categoryIcon: {
    width: 30,
    height: 30,
    tintColor: Theme.colors.primary,
  },
  categoryName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
  },
  bottomSpacer: {
    height: 100,
  },
});



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   StatusBar,
// } from "react-native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { MainStackParamList } from "../../types/navigation";
// import { SearchBar } from "../../components/SearchBar";
// import { CategoryCard } from "../../components/CategoryCard";
// import { SalonCard } from "../../components/SalonCard";
// import { Theme } from "../../constants/theme";
// import { Salon, Category, Promotion } from "../../types";
// import { FloatingAIButton } from "../../components/FloatingAIButton";
// import { SafeAreaView } from "react-native-safe-area-context";

// const { width } = Dimensions.get("window");
// const PROMO_WIDTH = width - Theme.spacing.lg * 2;

// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   MainStackParamList,
//   "MainTabs"
// >;

// interface Props {
//   navigation: HomeScreenNavigationProp;
// }

// export const HomeScreen: React.FC<Props> = ({ navigation }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

//   // Dummy data
//   const categories: Category[] = [
//     { id: "1", name: "Hair salon", icon: "hair-salon" },
//     { id: "2", name: "Barbershop", icon: "barbershop" },
//     { id: "3", name: "Makeup", icon: "makeup" },
//     { id: "4", name: "Nail tech", icon: "nail-tech" },
//   ];

//   const promotions: Promotion[] = [
//     {
//       id: "1",
//       image: require("../../assets/images/promo1.png"),
//       title: "Beauty Salon Promo",
//     },
//     {
//       id: "2",
//       image: require("../../assets/images/promo1.png"),
//       title: "Spa Treatment",
//     },
//   ];

//   const nearYouSalons: Salon[] = [
//     {
//       id: "1",
//       name: "Bestman Barbershop",
//       image: require("../../assets/images/salon1.jpg"),
//       location: "City campus, Accra",
//       distance: "2.1km",
//       rating: 4.2,
//       reviewCount: 200,
//       isFavorite: false,
//     },
//     {
//       id: "2",
//       name: "Premium Beauty Salon",
//       image: require("../../assets/images/salon2.jpg"),
//       location: "Mobibin, Accra",
//       distance: "3.5km",
//       rating: 3.2,
//       reviewCount: 120,
//       isFavorite: true,
//     },
//     {
//       id: "3",
//       name: "Noble Makeup Parlour",
//       image: require("../../assets/images/salon3.jpg"),
//       location: "Mobibin, Accra",
//       distance: "3.5km",
//       rating: 3.2,
//       reviewCount: 120,
//       isFavorite: false,
//     },
//   ];

//   const handleSalonPress = (salonId: string) => {
//     navigation.navigate("SalonDetails", { salonId });
//   };

//   return (
//     <SafeAreaView style={styles.safeArea} edges={["top"]}>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor={Theme.colors.background}
//       />
//       <View style={styles.container}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             <View style={styles.locationContainer}>
//               <Image
//                 source={require("../../assets/icons/location-pin.png")}
//                 style={styles.locationIcon}
//                 resizeMode="contain"
//               />
//               <View>
//                 <Text style={styles.locationLabel}>Location</Text>
//                 <Text style={styles.locationText}>Adabraka, Accra</Text>
//               </View>
//             </View>
//             <View style={styles.headerActions}>
//               <TouchableOpacity
//                 style={styles.iconButton}
//                 onPress={() => navigation.navigate("Notifications")}
//                 activeOpacity={0.7}
//               >
//                 <Image
//                   source={require("../../assets/icons/notification-bell.png")}
//                   style={styles.headerIcon}
//                   resizeMode="contain"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.iconButton}
//                 onPress={() => navigation.navigate("Favorites")}
//                 activeOpacity={0.7}
//               >
//                 <Image
//                   source={require("../../assets/icons/heart.png")}
//                   style={styles.headerIcon}
//                   resizeMode="contain"
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Search Bar */}
//           <SearchBar
//             placeholder="Search for services near you.."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             onFilterPress={() => console.log("Filter pressed")}
//           />

//           {/* Promotions */}
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Promotions</Text>
//               <TouchableOpacity onPress={() => navigation.navigate('Promotions')}>
//                 <Text style={styles.viewAll}>View all</Text>
//               </TouchableOpacity>
//             </View>
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               pagingEnabled
//               snapToInterval={PROMO_WIDTH}
//               decelerationRate="fast"
//               contentContainerStyle={styles.promoScrollContent}
//               onMomentumScrollEnd={(event) => {
//                 const index = Math.round(
//                   event.nativeEvent.contentOffset.x / PROMO_WIDTH
//                 );
//                 setCurrentPromoIndex(index);
//               }}
//             >
//               {promotions.map((promo) => (
//                 <View key={promo.id} style={styles.promotionCard}>
//                   <Image
//                     source={
//                       typeof promo.image === "string"
//                         ? { uri: promo.image }
//                         : promo.image
//                     }
//                     style={styles.promotionImage}
//                     resizeMode="cover"
//                   />
//                   {/* <Image
//                   source={{ uri: promo.image }}
//                   style={styles.promotionImage}
//                   resizeMode="cover"
//                 /> */}
//                 </View>
//               ))}
//             </ScrollView>
//             {/* Pagination dots */}
//             <View style={styles.paginationContainer}>
//               {promotions.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[
//                     styles.paginationDot,
//                     index === currentPromoIndex && styles.paginationDotActive,
//                   ]}
//                 />
//               ))}
//             </View>
//           </View>

//           {/* Categories */}
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Categories</Text>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("AllCategories")}
//               >
//                 <Text style={styles.viewAll}>View all</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.categoriesGrid}>
//               {categories.map((category) => (
//                 <CategoryCard
//                   key={category.id}
//                   name={category.name}
//                   icon={category.icon}
//                   onPress={() => console.log("Category pressed:", category.id)}
//                 />
//               ))}
//             </View>
//           </View>

//           {/* Near You */}
//           <View style={styles.section}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Near you</Text>
//               <TouchableOpacity  onPress={() => navigation.navigate('NearYou')}>
//                 <Text style={styles.viewAll}>View all</Text>
//               </TouchableOpacity>
//             </View>
//             {nearYouSalons.map((salon) => (
//               <SalonCard
//                 key={salon.id}
//                 {...salon}
//                 glassEffect={true}
//                 onPress={() => handleSalonPress(salon.id)}
//                 onFavoritePress={() =>
//                   console.log("Favorite pressed:", salon.id)
//                 }
//               />
//             ))}
//           </View>

//           {/* Bottom spacing for tab bar */}
//           <View style={styles.bottomSpacer} />
//         </ScrollView>

//         <FloatingAIButton />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: Theme.colors.background,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: Theme.colors.background,
//   },
//   scrollContent: {
//     paddingTop: Theme.spacing.md,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: Theme.spacing.lg,
//     marginBottom: Theme.spacing.lg,
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: Theme.spacing.xs,
//   },
//   locationIcon: {
//     width: 24,
//     height: 24,
//     tintColor: Theme.colors.primary,
//   },
//   locationLabel: {
//     fontSize: 11,
//     color: Theme.colors.textSecondary,
//   },
//   locationText: {
//     fontSize: 14,
//     fontWeight: Theme.fontWeight.semibold,
//     color: Theme.colors.textPrimary,
//   },
//   headerActions: {
//     flexDirection: "row",
//     gap: Theme.spacing.sm,
//   },
//   iconButton: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: Theme.colors.backgroundSecondary, // Changed from #F8F8F8
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerIcon: {
//     width: 20,
//     height: 20,
//     tintColor: Theme.colors.primary,
//   },
//   section: {
//     paddingHorizontal: Theme.spacing.lg,
//     marginTop: Theme.spacing.lg,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: Theme.spacing.md,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: Theme.fontWeight.bold,
//     color: Theme.colors.textPrimary,
//   },
//   viewAll: {
//     fontSize: 13,
//     color: Theme.colors.primary,
//     fontWeight: Theme.fontWeight.medium,
//   },
//   promoScrollContent: {
//     paddingRight: Theme.spacing.lg,
//   },
//   promotionCard: {
//     width: PROMO_WIDTH,
//     height: 160,
//     borderRadius: Theme.borderRadius.lg,
//     overflow: "hidden",
//     marginRight: Theme.spacing.md,
//   },
//   promotionImage: {
//     width: "100%",
//     height: "100%",
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: Theme.spacing.md,
//     gap: 6,
//   },
//   paginationDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#D9D9D9",
//   },
//   paginationDotActive: {
//     backgroundColor: Theme.colors.primary,
//     width: 20,
//   },
//   categoriesGrid: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//   },
//   bottomSpacer: {
//     height: 100,
//   },
// });
