import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../constants/theme';

interface TimeSelectorProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedTime,
  onSelectTime,
}) => {
  const timeSlots = [
    '8AM-10AM',
    '10AM-12PM',
    '12PM- 2PM',
    '2PM-4PM',
    '4PM-6PM',
    '6PM-8PM',
  ];

  return (
    <View style={styles.container}>
      {timeSlots.map((time, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.timeSlot,
            selectedTime === time && styles.timeSlotActive,
          ]}
          onPress={() => onSelectTime(time)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.timeText,
              selectedTime === time && styles.timeTextActive,
            ]}
          >
            {time}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
  },
  timeSlot: {
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.backgroundSecondary,
    minWidth: 110,
    alignItems: 'center',
  },
  timeSlotActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  timeText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    fontWeight: Theme.fontWeight.medium,
  },
  timeTextActive: {
    color: Theme.colors.white,
  },
});