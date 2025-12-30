import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../types/navigation';
import { CustomButton } from '../../components/CustomButton';
import { BlurView } from '../../components/BlurView';
import { Theme } from '../../constants/theme';

type LeaveReviewScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'LeaveReview'
>;

type LeaveReviewScreenRouteProp = RouteProp<
  MainStackParamList,
  'LeaveReview'
>;

interface Props {
  navigation: LeaveReviewScreenNavigationProp;
  route: LeaveReviewScreenRouteProp;
}

export const LeaveReviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { salonId } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Review submitted:', { salonId, rating, comment });
      navigation.goBack();
    }, 1500);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setRating(index + 1)}
        activeOpacity={0.8}
      >
        <Image
          source={
            index < rating
              ? require('../../assets/icons/star.png')
              : require('../../assets/icons/star-outline.png')
          }
          style={styles.starIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ));
  };

  const ModalContent = (
    <View style={styles.modalContent}>
      <Text style={styles.title}>Leave a review</Text>

      <View style={styles.ratingSection}>
        <Text style={styles.ratingTitle}>Ratings</Text>
        <View style={styles.starsContainer}>{renderStars()}</View>
      </View>

      <TextInput
        style={styles.textArea}
        placeholder="Write comment here"
        placeholderTextColor={Theme.colors.textPlaceholder}
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <CustomButton
        title="Submit"
        onPress={handleSubmit}
        variant="primary"
        loading={loading}
        disabled={rating === 0}
      />
    </View>
  );

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={() => navigation.goBack()}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => navigation.goBack()}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          {Platform.OS === 'ios' ? (
            <BlurView
              intensity={100}
              tint="light"
              style={styles.blurContainer}
              fallbackColor="rgba(255, 255, 255, 0.98)"
            >
              {ModalContent}
            </BlurView>
          ) : (
            <View style={[styles.blurContainer, styles.androidModal]}>
              {ModalContent}
            </View>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.lg,
  },
  blurContainer: {
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 400,
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
    }),
  },
  androidModal: {
    backgroundColor: Theme.colors.white,
    elevation: 10,
  },
  modalContent: {
    padding: Theme.spacing.xxl,
    maxWidth: 400,
    minWidth: 330,
    width: '100%',
  },
  title: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xxl,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  ratingTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  starIcon: {
    width: 25,
    height: 25,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    backgroundColor: Platform.OS === 'ios' 
      ? 'rgba(246, 246, 246, 0.6)' 
      : Theme.colors.backgroundSecondary,
    minHeight: 150,
    marginBottom: Theme.spacing.xl,
  },
});