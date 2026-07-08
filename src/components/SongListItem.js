import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { useMusic } from '../context/MusicContext';
import Animated, { FadeInUp } from 'react-native-reanimated';

const SongListItem = ({ song, index, showIndex = true, onOptionsPress }) => {
  const { currentSong, isPlaying, playSong, isLiked, toggleLike } = useMusic();
  const isCurrentSong = currentSong?.id === song.id;

  const handlePress = () => {
    playSong(song);
  };

  return (
    <Animated.View entering={FadeInUp.delay(index * 30)}>
      <TouchableOpacity
        style={[styles.container, isCurrentSong && styles.activeContainer]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {showIndex && (
          <View style={styles.indexContainer}>
            {isCurrentSong && isPlaying ? (
              <View style={styles.playingIndicator}>
                <View style={[styles.bar, styles.bar1]} />
                <View style={[styles.bar, styles.bar2]} />
                <View style={[styles.bar, styles.bar3]} />
              </View>
            ) : (
              <Text style={[styles.index, isCurrentSong && styles.activeText]}>
                {index}
              </Text>
            )}
          </View>
        )}

        <Image source={{ uri: song.cover }} style={styles.cover} />

        <View style={styles.info}>
          <Text
            style={[styles.title, isCurrentSong && styles.activeText]}
            numberOfLines={1}
          >
            {song.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {song.artist}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => toggleLike(song.id)}
            style={styles.likeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isLiked(song.id) ? 'heart' : 'heart-outline'}
              size={20}
              color={isLiked(song.id) ? Colors.primary : Colors.textSecondary}
            />
          </TouchableOpacity>

          {onOptionsPress && (
            <TouchableOpacity
              onPress={() => onOptionsPress(song.id)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={18}
                color={Colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  indexContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  index: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  playingIndicator: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 18,
    gap: 2,
  },
  bar: {
    width: 3,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  bar1: {
    height: 8,
    animationName: 'pulse',
    animationDuration: '0.6s',
    animationIterationCount: 'infinite',
  },
  bar2: {
    height: 14,
    animationName: 'pulse',
    animationDuration: '0.8s',
    animationIterationCount: 'infinite',
  },
  bar3: {
    height: 10,
    animationName: 'pulse',
    animationDuration: '0.7s',
    animationIterationCount: 'infinite',
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginLeft: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  artist: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  activeText: {
    color: Colors.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  likeButton: {
    padding: 4,
  },
});

export default SongListItem;
