import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { useMusic } from '../context/MusicContext';

const PlayerControls = ({ size = 'normal' }) => {
  const {
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    shuffleMode,
    repeatMode,
    toggleShuffle,
    toggleRepeat,
  } = useMusic();

  const isLarge = size === 'large';
  const iconSize = isLarge ? 32 : 24;
  const playIconSize = isLarge ? 48 : 36;

  const getRepeatIcon = () => {
    if (repeatMode === 'one') return 'repeat-once';
    return 'repeat';
  };

  return (
    <View style={[styles.container, isLarge && styles.largeContainer]}>
      <TouchableOpacity
        onPress={toggleShuffle}
        style={styles.button}
      >
        <Ionicons
          name="shuffle"
          size={iconSize * 0.7}
          color={shuffleMode ? Colors.primary : Colors.textSecondary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={playPrevious}
        style={styles.button}
      >
        <Ionicons
          name="play-skip-back"
          size={iconSize}
          color={Colors.textPrimary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={togglePlay}
        style={[styles.playButton, isLarge && styles.largePlayButton]}
      >
        <Ionicons
          name={isPlaying ? 'pause-circle' : 'play-circle'}
          size={playIconSize}
          color={Colors.textPrimary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={playNext}
        style={styles.button}
      >
        <Ionicons
          name="play-skip-forward"
          size={iconSize}
          color={Colors.textPrimary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toggleRepeat}
        style={styles.button}
      >
        <Ionicons
          name={getRepeatIcon()}
          size={iconSize * 0.7}
          color={repeatMode !== 'none' ? Colors.primary : Colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  largeContainer: {
    gap: 28,
  },
  button: {
    padding: 8,
  },
  playButton: {
    padding: 4,
  },
  largePlayButton: {
    padding: 8,
  },
});

export default PlayerControls;
