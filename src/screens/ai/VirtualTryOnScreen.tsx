import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { CustomButton } from '../../components/CustomButton';
import { BackButton } from '../../components/BackButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type VirtualTryOnScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'VirtualTryOn'
>;

interface Props {
  navigation: VirtualTryOnScreenNavigationProp;
}

interface Hairstyle {
  id: string;
  name: string;
  image: any;
  category: 'trending' | 'classic' | 'braids' | 'short';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedPrice: string;
}

export const VirtualTryOnScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedHairstyle, setSelectedHairstyle] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('trending');

  const hairstyles: Hairstyle[] = [
    {
      id: '1',
      name: 'Pixie Cut',
      image: require('../../assets/images/hairstyle1.jpg'),
      category: 'short',
      difficulty: 'easy',
      estimatedPrice: 'GHS 50-80',
    },
    {
      id: '2',
      name: 'Box Braids',
      image: require('../../assets/images/hairstyle2.jpg'),
      category: 'braids',
      difficulty: 'hard',
      estimatedPrice: 'GHS 150-250',
    },
    {
      id: '3',
      name: 'Bob Cut',
      image: require('../../assets/images/hairstyle3.jpg'),
      category: 'classic',
      difficulty: 'medium',
      estimatedPrice: 'GHS 60-100',
    },
    {
      id: '4',
      name: 'Cornrows',
      image: require('../../assets/images/hairstyle4.jpg'),
      category: 'braids',
      difficulty: 'medium',
      estimatedPrice: 'GHS 80-120',
    },
  ];

  const handleUploadPhoto = () => {
    Alert.alert(
      'Upload Photo',
      'Choose a photo to try on hairstyles',
      [
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Gallery', onPress: () => console.log('Open gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleTryOn = () => {
    if (!selectedImage) {
      Alert.alert('No Photo', 'Please upload a photo first');
      return;
    }
    if (!selectedHairstyle) {
      Alert.alert('No Style Selected', 'Please select a hairstyle to try on');
      return;
    }
    Alert.alert('AI Processing', 'This feature will be available soon!');
  };

  const handleFindSalons = () => {
    if (selectedHairstyle) {
      const style = hairstyles.find(h => h.id === selectedHairstyle);
      navigation.navigate('SearchResults', { 
        query: style?.name 
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.title}>Virtual Try-On</Text>
            <View style={styles.placeholder} />
          </View>

          {/* AI Badge */}
          <View style={styles.aiBadge}>
            <Image
              source={require('../../assets/icons/ai-robot.png')}
              style={styles.aiIcon}
              resizeMode="contain"
            />
            <Text style={styles.aiBadgeText}>Powered by AI</Text>
          </View>

          {/* Upload Photo Section */}
          <View style={styles.uploadSection}>
            {selectedImage ? (
              <View style={styles.imagePreview}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.previewImage}
                />
                <TouchableOpacity
                  style={styles.changePhotoButton}
                  onPress={handleUploadPhoto}
                >
                  <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadPlaceholder}
                onPress={handleUploadPhoto}
              >
                <Image
                  source={require('../../assets/icons/camera-icon.png')}
                  style={styles.uploadIcon}
                  resizeMode="contain"
                />
                <Text style={styles.uploadText}>Upload Your Photo</Text>
                <Text style={styles.uploadSubtext}>
                  Take a selfie or choose from gallery
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Image
              source={require('../../assets/icons/lightbulb-icon.png')}
              style={styles.infoIconImage}
              resizeMode="contain"
            />
            <Text style={styles.infoText}>
              Our AI will analyze your face shape and suggest the best hairstyles for you
            </Text>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explore Styles</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
            >
              {['trending', 'classic', 'braids', 'short'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    activeCategory === category && styles.categoryButtonActive,
                  ]}
                  onPress={() => setActiveCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      activeCategory === category && styles.categoryTextActive,
                    ]}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Hairstyles Grid */}
          <View style={styles.hairstylesGrid}>
            {hairstyles
              .filter((style) => activeCategory === 'trending' || style.category === activeCategory)
              .map((style) => (
                <TouchableOpacity
                  key={style.id}
                  style={[
                    styles.hairstyleCard,
                    selectedHairstyle === style.id && styles.hairstyleCardSelected,
                  ]}
                  onPress={() => setSelectedHairstyle(style.id)}
                >
                  <Image
                    source={style.image}
                    style={styles.hairstyleImage}
                  />
                  <View style={styles.hairstyleInfo}>
                    <Text style={styles.hairstyleName}>{style.name}</Text>
                    <Text style={styles.hairstylePrice}>{style.estimatedPrice}</Text>
                    <View style={styles.difficultyBadge}>
                      <Text style={styles.difficultyText}>
                        {style.difficulty.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  {selectedHairstyle === style.id && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <CustomButton
            title="Try On with AR"
            onPress={handleTryOn}
            variant="secondary"
            style={styles.actionButton}
            disabled={!selectedImage || !selectedHairstyle}
          />
          <CustomButton
            title="Find Salons"
            onPress={handleFindSalons}
            variant="primary"
            style={styles.actionButton}
            disabled={!selectedHairstyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Theme.spacing.md,
  },
  placeholder: {
    width: 40,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    marginBottom: Theme.spacing.lg,
  },
  aiIcon: {
    width: 16,
    height: 16,
    tintColor: '#1976D2',
    marginRight: 6,
  },
  aiBadgeText: {
    fontSize: Theme.fontSize.sm,
    color: '#1976D2',
    fontWeight: Theme.fontWeight.semibold,
  },
  uploadSection: {
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  uploadPlaceholder: {
    height: 250,
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    width: 50,
    height: 50,
    tintColor: Theme.colors.primary,
    marginBottom: Theme.spacing.md,
  },
  uploadText: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  imagePreview: {
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 250,
    borderRadius: Theme.borderRadius.lg,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: Theme.spacing.md,
    right: Theme.spacing.md,
    backgroundColor: Theme.colors.white,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
  },
  changePhotoText: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: Theme.spacing.md,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
  },
  infoIconImage: {
    width: 20,
    height: 20,
    tintColor: '#F57C00',
    marginRight: Theme.spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
    lineHeight: 20,
  },
  section: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    paddingHorizontal: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
  },
  categories: {
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.sm,
  },
  categoryButton: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  categoryButtonActive: {
    backgroundColor: Theme.colors.black,
  },
  categoryText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.fontWeight.medium,
  },
  categoryTextActive: {
    color: Theme.colors.white,
  },
  hairstylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Theme.spacing.lg,
    gap: Theme.spacing.md,
  },
  hairstyleCard: {
    width: '48%',
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  hairstyleCardSelected: {
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  hairstyleImage: {
    width: '100%',
    height: 150,
  },
  hairstyleInfo: {
    padding: Theme.spacing.sm,
  },
  hairstyleName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  hairstylePrice: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.primary,
    marginBottom: 4,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.sm,
  },
  difficultyText: {
    fontSize: Theme.fontSize.xs,
    color: Theme.colors.textSecondary,
    fontWeight: Theme.fontWeight.medium,
  },
  selectedBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 16,
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.bold,
  },
  bottomSpacer: {
    height: 100,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.sm,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  actionButton: {
    flex: 1,
  },
});