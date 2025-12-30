import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { Theme } from '../constants/theme';

interface CustomInputProps extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  containerStyle?: object;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  error,
  containerStyle,
  secureTextEntry,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={styles.input}
          placeholderTextColor={Theme.colors.textPlaceholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIconButton}
            activeOpacity={0.7}
          >
            <Image
              source={
                isPasswordVisible
                  ? require('../assets/icons/eye-open.png')
                  : require('../assets/icons/eye-closed.png')
              }
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  label: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.md,
    height: 56,
  },
  inputContainerFocused: {
    borderColor: Theme.colors.borderFocused,
  },
  inputContainerError: {
    borderColor: Theme.colors.error,
  },
  iconContainer: {
    marginRight: Theme.spacing.sm,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    padding: 0,
  },
  eyeIconButton: {
    padding: Theme.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: Theme.colors.textSecondary,
  },
  errorText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.error,
    marginTop: Theme.spacing.xs,
  },
});