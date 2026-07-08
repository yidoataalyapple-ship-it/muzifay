import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients } from '../theme/colors';
import { useMusic } from '../context/MusicContext';
import SongListItem from '../components/SongListItem';
import AlbumCard from '../components/AlbumCard';
import GradientBackground from '../components/GradientBackground';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';

const HomeScreen = ({ navigation }) => {
  const { songs, albums, currentSong, playSong, getLikedSongsList, recentSongs } = useMusic();

  const recentSongsList = songs.slice(0, 6);
  const popularSongs = [...songs].sort(() => Math.random() - 0.5).slice(0, 5);
  const likedSongsList = getLikedSongsList();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Gunaydin';
    if (hour < 18) return 'Iyi gunler';
    return 'Iyi aksamlar';
  };

  const handleAlbumPress = (album) => {
    // Albumdeki sarkilari cal
    const albumSongs = songs.filter(s => album.songs.includes(s.id));
    if (albumSongs.length > 0) {
      playSong(albumSongs[0], albumSongs);
    }
  };

  return (
    <GradientBackground colors={Gradients.dark}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting()}</Text>
            <Text style={styles.subtitle}>Muzifay'a hos geldin</Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="settings-outline" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hizli Erisim */}
          <Animated.View entering={FadeIn.delay(100)}>
            <View style={styles.quickAccess}>
              {recentSongsList.slice(0, 6).map((song, index) => (
                <TouchableOpacity
                  key={song.id}
                  style={[
                    styles.quickItem,
                    currentSong?.id === song.id && styles.quickItemActive,
                  ]}
                  onPress={() => playSong(song)}
                  activeOpacity={0.7}
                >
                  <View style={styles.quickItemContent}>
                    <Ionicons 
                      name={currentSong?.id === song.id ? "volume-medium" : "musical-note"} 
                      size={14} 
                      color={currentSong?.id === song.id ? Colors.primary : Colors.textSecondary}
                      style={styles.quickIcon}
                    />
                    <Text style={styles.quickItemText} numberOfLines={1}>
                      {song.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Son Calinanlar */}
          {recentSongs.length > 0 && (
            <Animated.View entering={FadeInUp.delay(150)} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Yakinda Calinan</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RecentSongs')}>
                  <Text style={styles.seeAll}>Tumunu Goster</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              >
                {recentSongs.slice(0, 10).map((song) => (
                  <TouchableOpacity
                    key={`recent-${song.id}`}
                    style={styles.recentCard}
                    onPress={() => playSong(song)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.recentCardContent}>
                      <Ionicons name="musical-note" size={24} color={Colors.primary} />
                      <Text style={styles.recentCardTitle} numberOfLines={1}>{song.title}</Text>
                      <Text style={styles.recentCardArtist} numberOfLines={1}>{song.artist}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          )}

          {/* Albumler */}
          <Animated.View entering={FadeInUp.delay(200)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Albumler</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  onPress={handleAlbumPress}
                />
              ))}
            </ScrollView>
          </Animated.View>

          {/* Populer Sarkilar */}
          <Animated.View entering={FadeInUp.delay(250)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Populer Sarkilar</Text>
            </View>
            {popularSongs.map((song, index) => (
              <SongListItem
                key={song.id}
                song={song}
                index={index + 1}
              />
            ))}
          </Animated.View>

          {/* Begenilen Sarkilar */}
          {likedSongsList.length > 0 && (
            <Animated.View entering={FadeInUp.delay(300)} style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Begenilen Sarkilar</Text>
                <TouchableOpacity onPress={() => navigation.navigate('LikedSongs')}>
                  <Text style={styles.seeAll}>Tumunu Goster</Text>
                </TouchableOpacity>
              </View>
              {likedSongsList.slice(0, 5).map((song, index) => (
                <SongListItem
                  key={song.id}
                  song={song}
                  index={index + 1}
                />
              ))}
            </Animated.View>
          )}

          {/* Tum Sarkilar */}
          <Animated.View entering={FadeInUp.delay(350)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tum Sarkilar</Text>
            </View>
            {songs.map((song, index) => (
              <SongListItem
                key={song.id}
                song={song}
                index={index + 1}
              />
            ))}
          </Animated.View>

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
  greeting: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  settingsButton: {
    padding: 8,
    backgroundColor: Colors.surface,
    borderRadius: 20,
  },
  scrollContent: {
    paddingTop: 8,
  },
  quickAccess: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 24,
  },
  quickItem: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  quickItemActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  quickItemContent: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickIcon: {
    marginRight: 8,
  },
  quickItemText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '600',
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  recentCard: {
    width: 140,
    height: 140,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    justifyContent: 'center',
  },
  recentCardContent: {
    alignItems: 'center',
  },
  recentCardTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  recentCardArtist: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 120,
  },
});

export default HomeScreen;
