import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Theme } from '../constants/theme';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChangeText,
  onFilterPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require('../assets/icons/search-icon.png')}
          style={styles.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Theme.colors.textPlaceholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity 
        style={styles.filterButton} 
        onPress={onFilterPress}
        activeOpacity={0.8}
      >
        <Image
          source={require('../assets/icons/filter-icon.png')}
          style={styles.filterIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.md,
    height: 50,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: Theme.spacing.sm,
    // tintColor: Theme.colors.primary,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.textPrimary,
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: Theme.colors.black,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    width: 22,
    height: 22,
    tintColor: Theme.colors.white,
  },
});


// import React from 'react';
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import { Theme } from '../constants/theme';

// interface SearchBarProps {
//   placeholder?: string;
//   onFilterPress?: () => void;
//   showFilter?: boolean;
//   value?: string;
//   onChangeText?: (text: string) => void;
// }

// export const SearchBar: React.FC<SearchBarProps> = ({
//   placeholder = 'Search for services near you..',
//   onFilterPress,
//   showFilter = true,
//   value,
//   onChangeText,
// }) => {
//   const SearchIcon = () => (
//     <Text style={styles.searchIcon}>🔍</Text>
//   );

//   const FilterIcon = () => (
//     <Text style={styles.filterIcon}>☰</Text>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <SearchIcon />
//         <TextInput
//           style={styles.input}
//           placeholder={placeholder}
//           placeholderTextColor={Theme.colors.textPlaceholder}
//           value={value}
//           onChangeText={onChangeText}
//         />
//       </View>
//       {showFilter && (
//         <TouchableOpacity
//           style={styles.filterButton}
//           onPress={onFilterPress}
//           activeOpacity={0.8}
//         >
//           <FilterIcon />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     gap: Theme.spacing.sm,
//   },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     borderRadius: Theme.borderRadius.md,
//     paddingHorizontal: Theme.spacing.md,
//     height: 56,
//   },
//   searchIcon: {
//     fontSize: 20,
//     marginRight: Theme.spacing.sm,
//     color: Theme.colors.primary,
//   },
//   input: {
//     flex: 1,
//     fontSize: Theme.fontSize.md,
//     color: Theme.colors.textPrimary,
//   },
//   filterButton: {
//     width: 56,
//     height: 56,
//     backgroundColor: Theme.colors.black,
//     borderRadius: Theme.borderRadius.md,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   filterIcon: {
//     fontSize: 20,
//     color: Theme.colors.white,
//   },
// });