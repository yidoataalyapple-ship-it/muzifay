import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

const AlbumCard = ({ album, onPress, size = 'medium' }) => {
  const isLarge = size === 'large';

  return (
    <TouchableOpacity
      style={[styles.container, isLarge && styles.largeContainer]}
      onPress={() => onPress(album)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: album.cover }}
        style={[styles.cover, isLarge && styles.largeCover]}
      />
      <Text
        style={[styles.title, isLarge && styles.largeTitle]}
        numberOfLines={1}
      >
        {album.title}
      </Text>
      <Text style={styles.artist} numberOfLines={1}>
        {album.artist}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginRight: 16,
  },
  largeContainer: {
    width: 180,
  },
  cover: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  largeCover: {
    width: 180,
    height: 180,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  largeTitle: {
    fontSize: 14,
  },
  artist: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
});

export default AlbumCard;
