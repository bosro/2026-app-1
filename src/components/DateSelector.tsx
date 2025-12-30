import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Theme } from '../constants/theme';

interface DateSelectorProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const dates = [
    { day: 'Today', date: '8', fullDate: '2024-12-08' },
    { day: 'Tues', date: '9', fullDate: '2024-12-09' },
    { day: 'Wed', date: '10', fullDate: '2024-12-10' },
    { day: 'Thurs', date: '11', fullDate: '2024-12-11' },
    { day: 'More', date: '📅', fullDate: 'more' },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dateCard,
            selectedDate === item.fullDate && styles.dateCardActive,
          ]}
          onPress={() => onSelectDate(item.fullDate)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.day,
              selectedDate === item.fullDate && styles.dayActive,
            ]}
          >
            {item.day}
          </Text>
          <Text
            style={[
              styles.date,
              selectedDate === item.fullDate && styles.dateActive,
            ]}
          >
            {item.date}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.sm,
  },
  dateCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDE8E8',
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    minWidth: 70,
  },
  dateCardActive: {
    backgroundColor: Theme.colors.primary,
  },
  day: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  dayActive: {
    color: Theme.colors.white,
  },
  date: {
    fontSize: Theme.fontSize.xxl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
  },
  dateActive: {
    color: Theme.colors.white,
  },
});