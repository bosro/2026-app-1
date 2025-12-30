import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackParamList, MainTabParamList } from "../types/navigation";
import { HomeScreen } from "../screens/main/HomeScreen";
import { DiscoverScreen } from "../screens/main/DiscoverScreen";
import { BookingsScreen } from "../screens/main/BookingsScreen";
import { LearnScreen } from "../screens/main/LearnScreen";
import { ProfileScreen } from "../screens/main/ProfileScreen";
import { AllCategoriesScreen } from "../screens/main/AllCategoriesScreen";
import { SalonDetailsScreen } from "../screens/main/SalonDetailsScreen";
import { ServicesListScreen } from "../screens/main/ServicesListScreen";
import { BookAppointmentScreen } from "../screens/main/BookAppointmentScreen";
import { ReviewsScreen } from "../screens/main/ReviewsScreen";
import { LeaveReviewScreen } from "../screens/main/LeaveReviewScreen";
import { BookingConfirmationScreen } from "../screens/main/BookingConfirmationScreen";
import { BookingDetailsScreen } from "../screens/main/BookingDetailsScreen";
import { FavoritesScreen } from "../screens/main/FavoritesScreen";
import { NotificationsScreen } from "../screens/main/NotificationsScreen";
import { ProfileSettingsScreen } from "../screens/main/ProfileSettingsScreen";
import { SearchResultsScreen } from "../screens/main/SearchResultsScreen";
import { CustomTabBar } from "./CustomTabBar";
import { VirtualTryOnScreen } from "../screens/ai/VirtualTryOnScreen";
import { SmartSchedulingScreen } from "../screens/ai/SmartSchedulingScreen";
import { ConversationalBookingScreen } from "../screens/ai/ConversationalBookingScreen";
import { VideoLessonScreen } from "../screens/LearnSkillsFlow/VideoLessonScreen";
import { MyCoursesScreen } from "../screens/LearnSkillsFlow/MyCoursesScreen";
import { LearnSkillScreen } from "../screens/LearnSkillsFlow/LearnSkillScreen";
import { CourseDetailsScreen } from "../screens/LearnSkillsFlow/CourseDetailsScreen";
import { CustomerServiceScreen } from "../screens/main/CustomerServiceScreen";
import {SettingsScreen} from '../screens/main/'

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
      <Stack.Screen name="SalonDetails" component={SalonDetailsScreen} />
      <Stack.Screen name="ServicesList" component={ServicesListScreen} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
      <Stack.Screen name="Reviews" component={ReviewsScreen} />
      <Stack.Screen
        name="LeaveReview"
        component={LeaveReviewScreen}
        options={{
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
      />
      <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />   
      
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="VirtualTryOn" component={VirtualTryOnScreen} />
      <Stack.Screen name="SmartScheduling" component={SmartSchedulingScreen} />
      <Stack.Screen
        name="ConversationalBooking"
        component={ConversationalBookingScreen}
      />
      <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
      <Stack.Screen name="LearnSkill" component={LearnSkillScreen} />
      <Stack.Screen name="MyCourses" component={MyCoursesScreen} />
      <Stack.Screen name="VideoLesson" component={VideoLessonScreen} />
      <Stack.Screen name="CustomerService" component={CustomerServiceScreen} />
      <Stack.Screen name="PrivacyPolicy" component={CustomerServiceScreen} />
      <Stack.Screen name="TermsConditions" component={CustomerServiceScreen} />
      <Stack.Screen name="Promotions" component={CustomerServiceScreen} />
      <Stack.Screen name="NearYou" component={CustomerServiceScreen} />
      <Stack.Screen name="Referral" component={CustomerServiceScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      

    </Stack.Navigator>
  );
};
