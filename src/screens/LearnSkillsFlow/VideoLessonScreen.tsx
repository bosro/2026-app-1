import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../types/navigation';
import { CustomButton } from '../../components/CustomButton';
import { Theme } from '../../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type VideoLessonScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  'VideoLesson'
>;

type VideoLessonScreenRouteProp = RouteProp<
  MainStackParamList,
  'VideoLesson'
>;

interface Props {
  navigation: VideoLessonScreenNavigationProp;
  route: VideoLessonScreenRouteProp;
}

interface Note {
  id: string;
  timestamp: string;
  content: string;
  time: number;
}

export const VideoLessonScreen: React.FC<Props> = ({ navigation, route }) => {
  const { courseId, lessonId, lessonTitle } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(912); // 15:12 in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      timestamp: '3:45',
      content: 'Important: Always start with clean, detangled hair',
      time: 225,
    },
    {
      id: '2',
      timestamp: '7:20',
      content: 'Use moisturizer before sectioning',
      time: 440,
    },
  ]);

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  const handleAddNote = () => {
    // In real app, show text input modal
    const newNote: Note = {
      id: Date.now().toString(),
      timestamp: formatTime(currentTime),
      content: 'New note at ' + formatTime(currentTime),
      time: currentTime,
    };
    setNotes([...notes, newNote]);
  };

  const handleNotePress = (note: Note) => {
    setCurrentTime(note.time);
  };

  const handleComplete = () => {
    // Mark lesson as complete and navigate back
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Video Player */}
        <View style={styles.videoContainer}>
          {/* Video Placeholder */}
          <View style={styles.videoPlaceholder}>
            <Image
              source={require('../../assets/images/video-thumbnail.jpg')}
              style={styles.videoThumbnail}
            />
            
            {/* Play Overlay */}
            {!isPlaying && (
              <View style={styles.playOverlay}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={handlePlayPause}
                >
                  <Image
                    source={require('../../assets/icons/play-icon.png')}
                    style={styles.playButtonIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* Video Controls Overlay */}
            <View style={styles.controlsOverlay}>
              {/* Top Controls */}
              <View style={styles.topControls}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack()}
                >
                  <Image
                    source={require('../../assets/icons/back-arrow.png')}
                    style={styles.controlIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text style={styles.videoTitle} numberOfLines={1}>
                    {lessonTitle}
                  </Text>
                </View>
              </View>

              {/* Bottom Controls */}
              <View style={styles.bottomControls}>
                <TouchableOpacity onPress={handlePlayPause}>
                  <Image
                    source={
                      isPlaying
                        ? require('../../assets/icons/pause-icon.png')
                        : require('../../assets/icons/play-icon.png')
                    }
                    style={styles.controlIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                <Text style={styles.timeText}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </Text>

                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${(currentTime / duration) * 100}%` },
                      ]}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.speedButton}
                  onPress={() => setShowSpeedMenu(!showSpeedMenu)}
                >
                  <Text style={styles.speedText}>{playbackSpeed}x</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image
                    source={require('../../assets/icons/fullscreen-icon.png')}
                    style={styles.controlIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Speed Menu */}
          {showSpeedMenu && (
            <View style={styles.speedMenu}>
              {speedOptions.map((speed) => (
                <TouchableOpacity
                  key={speed}
                  style={[
                    styles.speedOption,
                    playbackSpeed === speed && styles.speedOptionActive,
                  ]}
                  onPress={() => handleSpeedChange(speed)}
                >
                  <Text
                    style={[
                      styles.speedOptionText,
                      playbackSpeed === speed && styles.speedOptionTextActive,
                    ]}
                  >
                    {speed}x
                  </Text>
                  {playbackSpeed === speed && (
                    <Image
                      source={require('../../assets/icons/checkmark-icon.png')}
                      style={styles.checkIcon}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Lesson Title */}
          <View style={styles.lessonHeader}>
            <Text style={styles.lessonTitle}>{lessonTitle}</Text>
            <Text style={styles.lessonMeta}>Lesson 3 of 24 • 15:12</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAddNote}>
              <Image
                source={require('../../assets/icons/note-icon.png')}
                style={styles.actionIcon}
                resizeMode="contain"
              />
              <Text style={styles.actionText}>Add Note</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Image
                source={require('../../assets/icons/download-icon.png')}
                style={styles.actionIcon}
                resizeMode="contain"
              />
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Image
                source={require('../../assets/icons/share-icon.png')}
                style={styles.actionIcon}
                resizeMode="contain"
              />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
              onPress={() => setActiveTab('overview')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'overview' && styles.tabTextActive,
                ]}
              >
                Overview
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'notes' && styles.tabActive]}
              onPress={() => setActiveTab('notes')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'notes' && styles.tabTextActive,
                ]}
              >
                Notes ({notes.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'resources' && styles.tabActive]}
              onPress={() => setActiveTab('resources')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'resources' && styles.tabTextActive,
                ]}
              >
                Resources
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <View style={styles.tabContent}>
              <Text style={styles.description}>
                In this lesson, you'll learn the fundamental techniques for
                sectioning hair properly before braiding. This is a crucial step
                that will ensure your braids are neat, uniform, and long-lasting.
                We'll cover different sectioning patterns and the tools you'll need.
              </Text>

              <Text style={styles.sectionTitle}>Key Takeaways</Text>
              <View style={styles.takeawayItem}>
                <Image
                  source={require('../../assets/icons/checkmark-icon.png')}
                  style={styles.takeawayIcon}
                  resizeMode="contain"
                />
                <Text style={styles.takeawayText}>
                  Proper sectioning techniques for different braid styles
                </Text>
              </View>
              <View style={styles.takeawayItem}>
                <Image
                  source={require('../../assets/icons/checkmark-icon.png')}
                  style={styles.takeawayIcon}
                  resizeMode="contain"
                />
                <Text style={styles.takeawayText}>
                  Essential tools: rat tail comb, clips, and bands
                </Text>
              </View>
              <View style={styles.takeawayItem}>
                <Image
                  source={require('../../assets/icons/checkmark-icon.png')}
                  style={styles.takeawayIcon}
                  resizeMode="contain"
                />
                <Text style={styles.takeawayText}>
                  How to maintain even tension throughout
                </Text>
              </View>
            </View>
          )}

          {activeTab === 'notes' && (
            <View style={styles.tabContent}>
              {notes.length === 0 ? (
                <View style={styles.emptyState}>
                  <Image
                    source={require('../../assets/icons/note-icon.png')}
                    style={styles.emptyIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.emptyTitle}>No notes yet</Text>
                  <Text style={styles.emptyText}>
                    Add notes while watching to remember important points
                  </Text>
                </View>
              ) : (
                notes.map((note) => (
                  <TouchableOpacity
                    key={note.id}
                    style={styles.noteCard}
                    onPress={() => handleNotePress(note)}
                  >
                    <View style={styles.noteHeader}>
                      <Text style={styles.noteTimestamp}>{note.timestamp}</Text>
                      <TouchableOpacity>
                        <Image
                          source={require('../../assets/icons/trash-icon.png')}
                          style={styles.deleteIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.noteContent}>{note.content}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}

          {activeTab === 'resources' && (
            <View style={styles.tabContent}>
              <TouchableOpacity style={styles.resourceCard}>
                <Image
                  source={require('../../assets/icons/pdf-icon.png')}
                  style={styles.resourceIcon}
                  resizeMode="contain"
                />
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceName}>Sectioning Guide.pdf</Text>
                  <Text style={styles.resourceSize}>2.4 MB</Text>
                </View>
                <Image
                  source={require('../../assets/icons/download-icon.png')}
                  style={styles.downloadIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.resourceCard}>
                <Image
                  source={require('../../assets/icons/link-icon.png')}
                  style={styles.resourceIcon}
                  resizeMode="contain"
                />
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceName}>Recommended Tools</Text>
                  <Text style={styles.resourceSize}>External Link</Text>
                </View>
                <Image
                  source={require('../../assets/icons/external-link.png')}
                  style={styles.downloadIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <CustomButton
            title="Previous Lesson"
            onPress={() => console.log('Previous')}
            variant="secondary"
            style={styles.navButton}
          />
          <CustomButton
            title="Mark Complete"
            onPress={handleComplete}
            variant="primary"
            style={styles.navButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonIcon: {
    width: 30,
    height: 30,
    tintColor: Theme.colors.primary,
    marginLeft: 4,
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    padding: Theme.spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
  },
  videoTitle: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.white,
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    gap: Theme.spacing.sm,
  },
  controlIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.white,
  },
  timeText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.white,
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: 2,
  },
  speedButton: {
    paddingHorizontal: Theme.spacing.sm,
  },
  speedText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.white,
    fontWeight: Theme.fontWeight.medium,
  },
  speedMenu: {
    position: 'absolute',
    bottom: 60,
    right: 80,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.sm,
    minWidth: 100,
  },
  speedOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
  },
  speedOptionActive: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.sm,
  },
  speedOptionText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
  },
  speedOptionTextActive: {
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.primary,
  },
  checkIcon: {
    width: 16,
    height: 16,
    tintColor: Theme.colors.primary,
  },
  content: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  lessonHeader: {
    padding: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  lessonTitle: {
    fontSize: Theme.fontSize.xl,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  lessonMeta: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    gap: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  actionText: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textPrimary,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    paddingHorizontal: Theme.spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Theme.colors.primary,
  },
  tabText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
  },
  tabTextActive: {
    color: Theme.colors.primary,
    fontWeight: Theme.fontWeight.semibold,
  },
  tabContent: {
    padding: Theme.spacing.lg,
  },
  description: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    lineHeight: 24,
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.md,
  },
  takeawayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  takeawayIcon: {
    width: 20,
    height: 20,
    tintColor: Theme.colors.success,
    marginRight: Theme.spacing.sm,
    marginTop: 2,
  },
  takeawayText: {
    flex: 1,
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xxl * 2,
  },
  emptyIcon: {
    width: 60,
    height: 60,
    tintColor: Theme.colors.textPlaceholder,
    marginBottom: Theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: Theme.fontSize.lg,
    fontWeight: Theme.fontWeight.bold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.xs,
  },
  emptyText: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },
  noteCard: {
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.sm,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  noteTimestamp: {
    fontSize: Theme.fontSize.sm,
    fontWeight: Theme.fontWeight.semibold,
    color: Theme.colors.primary,
  },
  deleteIcon: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.error,
  },
  noteContent: {
    fontSize: Theme.fontSize.md,
    color: Theme.colors.textPrimary,
    lineHeight: 20,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundSecondary,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.sm,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    marginRight: Theme.spacing.md,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceName: {
    fontSize: Theme.fontSize.md,
    fontWeight: Theme.fontWeight.medium,
    color: Theme.colors.textPrimary,
    marginBottom: 2,
  },
  resourceSize: {
    fontSize: Theme.fontSize.sm,
    color: Theme.colors.textSecondary,
  },
  downloadIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
  },
  bottomSpacer: {
    height: 100,
  },
  navigationContainer: {
    flexDirection: 'row',
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
    gap: Theme.spacing.sm,
  },
  navButton: {
    flex: 1,
  },
});