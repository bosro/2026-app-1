export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Verification: { email: string; type: "signup" | "reset" };
  ForgotPassword: undefined;
  ResetPasswordVerification: { email: string };
  NewPassword: { email: string; otp: string };
};

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  Bookings: undefined;
  Learn: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  MainTabs: { screen?: keyof MainTabParamList };
  AllCategories: undefined;
  SalonDetails: { salonId: string };
  ServicesList: { salonId: string };
  BookAppointment: {
    salonId: string;
    service: {
      id: string;
      name: string;
      price: number;
      duration: string;
    };
  };
  BookingConfirmation: { bookingId: string };
  BookingDetails: { bookingId: string };
  Reviews: { salonId: string };
  LeaveReview: { salonId: string };
  Favorites: undefined;
  Notifications: undefined;
  ProfileSettings: undefined;
  ChangePassword: undefined;
  SearchResults: { query?: string };
  VirtualTryOn: undefined;
  SmartScheduling: { salonId: string; serviceId: string };
  ConversationalBooking: undefined;
  CourseDetails: { courseId: string };
  VideoLesson: { courseId: string; lessonId: string; lessonTitle: string };
  LearnSkill: undefined;
  MyCourses: undefined;
  CustomerService: undefined;
  PrivacyPolicy: undefined;
  TermsConditions: undefined;
  Referral: undefined;
  Promotions: undefined;
  NearYou: undefined;
  Profile: undefined;
  Settings: undefined;
  Bookings: undefined;
  Home: undefined;
  Wallet: undefined;
  EditProfile: undefined;
};

export type OnboardingStackParamList = {
  RoleSelection: undefined;
  OnboardingSlides: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};
