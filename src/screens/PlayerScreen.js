import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients } from '../theme/colors';
import { useMusic } from '../context/MusicContext';
import PlayerControls from '../components/PlayerControls';
import GradientBackground from '../components/GradientBackground';

const { width } = Dimensions.get('window');
const COVER_SIZE = width * 0.75;

const PlayerScreen = () => {
  const navigation = useNavigation();
  const {
    currentSong,
    isPlaying,
    position,
    duration,
    isLiked,
    toggleLike,
    togglePlay,
    seekTo,
    formatTime,
  } = useMusic();

  if (!currentSong) {
    return (
      <GradientBackground colors={Gradients.player}>
        <SafeAreaView style={styles.container}>
          <View style={styles.emptyContainer}>
            <Ionicons
              name="musical-note"
              size={64}
              color={Colors.textMuted}
            />
            <Text style={styles.emptyText}>Sarki secilmedi</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Geri Don</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  const handleSeek = (event) => {
    const { locationX } = event.nativeEvent;
    const percentage = locationX / (width - 64);
    const newPosition = percentage * duration;
    seekTo(newPosition);
  };

  return (
    <GradientBackground colors={Gradients.player}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerButton}
          >
            <Ionicons name="chevron-down" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Simdi Caliyor</Text>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Kapak Fotografi */}
        <View style={styles.coverContainer}>
          <LinearGradient
            colors={Gradients.main}
            style={styles.coverGradient}
          >
            <Image
              source={{ uri: currentSong.cover }}
              style={styles.cover}
              resizeMode="cover"
            />
          </LinearGradient>
        </View>

        {/* Sarki Bilgisi */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {currentSong.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {currentSong.artist}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => toggleLike(currentSong.id)}
              style={styles.likeButton}
            >
              <Ionicons
                name={isLiked(currentSong.id) ? 'heart' : 'heart-outline'}
                size={28}
                color={isLiked(currentSong.id) ? Colors.primary : Colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <TouchableOpacity
            style={styles.progressBarBackground}
            onPress={handleSeek}
            activeOpacity={1}
          >
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` },
                ]}
              />
              <View
                style={[
                  styles.progressThumb,
                  { left: `${progress}%` },
                ]}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* Kontroller */}
        <View style={styles.controlsContainer}>
          <PlayerControls size="large" />
        </View>

        {/* Alt Butonlar */}
        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons
              name="share-outline"
              size={22}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons
              name="list-outline"
              size={22}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons
              name="timer-outline"
              size={22}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 18,
    marginTop: 16,
  },
  backButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderRadius: 24,
  },
  backButtonText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerButton: {
    padding: 8,
    width: 44,
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  coverContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  coverGradient: {
    padding: 3,
    borderRadius: 16,
  },
  cover: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    borderRadius: 14,
  },
  infoContainer: {
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  artist: {
    color: Colors.textSecondary,
    fontSize: 16,
    marginTop: 4,
  },
  likeButton: {
    padding: 8,
    marginLeft: 8,
  },
  progressContainer: {
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 24,
    justifyContent: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.progressBarBackground,
    borderRadius: 2,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: -5,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.textPrimary,
    marginLeft: -7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeText: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 48,
    marginBottom: 32,
  },
  footerButton: {
    padding: 8,
  },
});

export default PlayerScreen;
