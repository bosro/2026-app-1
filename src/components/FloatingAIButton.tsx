import React from 'react';
import { TouchableOpacity, StyleSheet, View, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from './BlurView';
import { Theme } from '../constants/theme';

export const FloatingAIButton: React.FC = () => {
  const navigation = useNavigation();

  const ButtonContent = (
    <View style={styles.content}>
      <Image
        source={require('../assets/icons/ai-robot.png')}
        style={styles.icon}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        // @ts-ignore
        navigation.navigate('ConversationalBooking');
      }}
      activeOpacity={0.9}
    >
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={80}
          tint="light"
          style={styles.button}
          fallbackColor="rgba(224, 118, 101, 0.95)"
        >
          {ButtonContent}
        </BlurView>
      ) : (
        <View style={[styles.button, styles.androidButton]}>
          {ButtonContent}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: Theme.spacing.lg,
    zIndex: 1000,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(224, 118, 101, 0.85)',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
    }),
  },
  androidButton: {
    backgroundColor: Theme.colors.primary,
    elevation: 8,
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
  },
});





// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Theme } from '../constants/theme';

// export const FloatingAIButton: React.FC = () => {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity
//       style={styles.container}
//       onPress={() => {
//         // @ts-ignore
//         navigation.navigate('ConversationalBooking');
//       }}
//       activeOpacity={0.9}
//     >
//       <View style={styles.iconContainer}>
//         <Text style={styles.icon}>🤖</Text>
//       </View>
//       <View style={styles.badge}>
//         <Text style={styles.badgeText}>AI</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 100,
//     right: Theme.spacing.lg,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: Theme.colors.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...Theme.shadows.md,
//   },
//   iconContainer: {
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   icon: {
//     fontSize: 30,
//   },
//   badge: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: '#4CAF50',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: Theme.colors.white,
//   },
//   badgeText: {
//     fontSize: 10,
//     fontWeight: Theme.fontWeight.bold,
//     color: Theme.colors.white,
//   },
// });