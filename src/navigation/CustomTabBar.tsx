import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Theme } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '../components/BlurView';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const getIcon = (routeName: string) => {
    let iconSource;
    switch (routeName) {
      case 'Home':
        iconSource = require('../assets/icons/home-icon.png');
        break;
      case 'Discover':
        iconSource = require('../assets/icons/discover-icon.png');
        break;
      case 'Bookings':
        iconSource = require('../assets/icons/bookings-icon.png');
        break;
      case 'Learn':
        iconSource = require('../assets/icons/learn-icon.png');
        break;
      case 'Profile':
        iconSource = require('../assets/icons/profile-icon.png');
        break;
      default:
        return null;
    }

    return (
      <Image
        source={iconSource}
        style={styles.icon}
        resizeMode="contain"
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 16,
        },
      ]}
    >
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={100}
          tint="dark"
          style={styles.tabBar}
          fallbackColor="rgba(0, 0, 0, 0.95)"
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    isFocused && styles.iconContainerActive,
                  ]}
                >
                  {getIcon(route.name)}
                </View>
              </TouchableOpacity>
            );
          })}
        </BlurView>
      ) : (
        <View style={[styles.tabBar, styles.androidTabBar]}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    isFocused && styles.iconContainerActive,
                  ]}
                >
                  {getIcon(route.name)}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Theme.spacing.lg,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Platform.OS === 'ios' 
      ? 'rgba(0, 0, 0, 0.75)' 
      : 'rgba(0, 0, 0, 0.95)',
    borderRadius: 35,
    height: 65,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Theme.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      android: {
        elevation: 8,
      },
    }),
  },
  androidTabBar: {
    backgroundColor: '#000000',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    backgroundColor: '#E88B7B', // Coral/salmon color from the image
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
});