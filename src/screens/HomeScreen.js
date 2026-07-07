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

const HomeScreen = ({ navigation }) => {
  const { songs, albums, currentSong, playSong, getLikedSongsList } = useMusic();

  const recentSongs = songs.slice(0, 6);
  const popularSongs = [...songs].sort(() => Math.random() - 0.5).slice(0, 5);
  const likedSongsList = getLikedSongsList();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Gunaydin';
    if (hour < 18) return 'Iyi gunler';
    return 'Iyi aksamlar';
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
          <View style={styles.quickAccess}>
            {recentSongs.slice(0, 6).map((song, index) => (
              <TouchableOpacity
                key={song.id}
                style={[
                  styles.quickItem,
                  currentSong?.id === song.id && styles.quickItemActive,
                ]}
                onPress={() => playSong(song)}
              >
                <View style={styles.quickItemContent}>
                  <Text style={styles.quickItemText} numberOfLines={1}>
                    {song.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Son Calinanlar */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Yakinda Calinan</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Tumunu Goster</Text>
              </TouchableOpacity>
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
                  onPress={(album) => {
                    // Album detayina git
                  }}
                />
              ))}
            </ScrollView>
          </View>

          {/* Populer Sarkilar */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Populer Sarkilar</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Tumunu Goster</Text>
              </TouchableOpacity>
            </View>
            {popularSongs.map((song, index) => (
              <SongListItem
                key={song.id}
                song={song}
                index={index + 1}
              />
            ))}
          </View>

          {/* Begenilen Sarkilar */}
          {likedSongsList.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Begenilen Sarkilar</Text>
                <TouchableOpacity>
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
            </View>
          )}

          {/* Tum Sarkilar */}
          <View style={styles.section}>
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
    backgroundColor: 'rgba(29, 185, 84, 0.15)',
  },
  quickItemContent: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  quickItemText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
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
    color: Colors.textSecondary,
    fontSize: 12,
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  bottomPadding: {
    height: 120,
  },
});

export default HomeScreen;
