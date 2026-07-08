import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme/colors';
import { useMusic } from '../context/MusicContext';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

const MiniPlayer = () => {
  const navigation = useNavigation();
  const { currentSong, isPlaying, togglePlay, playNext, position, duration } = useMusic();

  if (!currentSong) return null;

  const handlePress = () => {
    navigation.navigate('Player');
  };

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.95}
      >
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>

        <View style={styles.content}>
          <Image source={{ uri: currentSong.cover }} style={styles.cover} />

          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {currentSong.artist}
            </Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              style={styles.playButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                playNext();
              }}
              style={styles.nextButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="play-forward"
                size={22}
                color={Colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.playerBackground,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  progressBar: {
    height: 2,
    backgroundColor: Colors.progressBarBackground,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cover: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
  },
  artist: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    padding: 4,
  },
  nextButton: {
    padding: 4,
  },
});

export default MiniPlayer;
