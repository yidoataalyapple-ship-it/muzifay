import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients } from '../theme/colors';
import { useMusic } from '../context/MusicContext';
import GradientBackground from '../components/GradientBackground';

const LibraryScreen = ({ navigation }) => {
  const { playlists, getLikedSongsList, songs } = useMusic();
  const likedSongsList = getLikedSongsList();

  const libraryItems = [
    {
      id: 'liked',
      title: 'Begenilen Sarkilar',
      description: `${likedSongsList.length} sarki`,
      icon: 'heart',
      iconColor: Colors.primary,
      gradient: ['#1DB954', '#1ED760'],
      onPress: () => {},
    },
    {
      id: 'recent',
      title: 'Son Calinanlar',
      description: 'Yakinda dinlediklerin',
      icon: 'time',
      iconColor: '#3B82F6',
      gradient: ['#3B82F6', '#06B6D4'],
      onPress: () => {},
    },
    {
      id: 'songs',
      title: 'Sarkilar',
      description: `${songs.length} sarki`,
      icon: 'musical-note',
      iconColor: '#8B5CF6',
      gradient: ['#8B5CF6', '#EC4899'],
      onPress: () => {},
    },
  ];

  return (
    <GradientBackground colors={Gradients.dark}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Kitapligin</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Kitaplik Ogeleri */}
          <View style={styles.libraryList}>
            {libraryItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.libraryItem}
                onPress={item.onPress}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.libraryIcon,
                    { backgroundColor: item.gradient[0] },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color="#FFFFFF"
                  />
                </View>
                <View style={styles.libraryInfo}>
                  <Text style={styles.libraryTitle}>{item.title}</Text>
                  <Text style={styles.libraryDescription}>
                    {item.description}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Calma Listeleri */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Calma Listelerin</Text>
            {playlists.map((playlist) => (
              <TouchableOpacity
                key={playlist.id}
                style={styles.playlistItem}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: playlist.cover }}
                  style={styles.playlistCover}
                />
                <View style={styles.playlistInfo}>
                  <Text style={styles.playlistTitle}>{playlist.title}</Text>
                  <Text style={styles.playlistDescription}>
                    {playlist.description}
                  </Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color={Colors.textSecondary}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 4,
  },
  scrollContent: {
    paddingTop: 8,
  },
  libraryList: {
    paddingHorizontal: 20,
  },
  libraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  libraryIcon: {
    width: 56,
    height: 56,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  libraryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  libraryTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  libraryDescription: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playlistCover: {
    width: 64,
    height: 64,
    borderRadius: 4,
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 16,
  },
  playlistTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  playlistDescription: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
  bottomPadding: {
    height: 120,
  },
});

export default LibraryScreen;
