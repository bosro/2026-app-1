import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../types/navigation';
import { RoleSelectionScreen } from '../screens/onboarding/RoleSelectionScreen';
import { OnboardingSlidesScreen } from '../screens/onboarding/OnboardingSlidesScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="OnboardingSlides" // Changed to OnboardingSlides first
    >
      <Stack.Screen name="OnboardingSlides" component={OnboardingSlidesScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    </Stack.Navigator>
  );
};