import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '../constants/theme';

interface ReviewCardProps {
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  userAvatar,
  rating,
  comment,
  date,
}) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Image
        key={index}
        source={
          index < rating
            ? require('../assets/icons/star-filled.png')
            : require('../assets/icons/star-outline.png')
        }
        style={styles.starIcon}
        resizeMode="contain"
      />
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarColors = [
    '#6366F1', // Indigo
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#EF4444', // Red
    '#14B8A6', // Teal
    '#8B5CF6', // Violet
    '#EC4899', // Pink
  ];

  const getAvatarColor = (name: string) => {
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userAvatar ? (
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: getAvatarColor(userName) },
            ]}
          >
            <Text style={styles.avatarText}>{getInitials(userName)}</Text>
          </View>
        )}
        <View style={styles.headerContent}>
          <Text style={styles.userName}>{userName}</Text>
          <View style={styles.ratingContainer}>{renderStars()}</View>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.sm,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 8,
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.white,
  },
  headerContent: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
  },
  userName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 14,
    height: 14,
    marginRight: 2,
  },
  date: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textPlaceholder,
  },
  comment: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    lineHeight: 20,
  },
});