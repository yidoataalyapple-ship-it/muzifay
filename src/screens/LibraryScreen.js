import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients } from '../theme/colors';
import { useMusic } from '../context/MusicContext';
import GradientBackground from '../components/GradientBackground';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const LibraryScreen = ({ navigation }) => {
  const { playlists, getLikedSongsList, songs, recentSongs } = useMusic();
  const likedSongsList = getLikedSongsList();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const libraryItems = [
    {
      id: 'liked',
      title: 'Begenilen Sarkilar',
      description: `${likedSongsList.length} sarki`,
      icon: 'heart',
      iconColor: '#EC4899',
      gradient: ['#EC4899', '#F43F5E'],
      onPress: () => navigation.navigate('LikedSongs'),
    },
    {
      id: 'recent',
      title: 'Son Calinanlar',
      description: `${recentSongs.length} sarki`,
      icon: 'time',
      iconColor: '#3B82F6',
      gradient: ['#3B82F6', '#06B6D4'],
      onPress: () => navigation.navigate('RecentSongs'),
    },
    {
      id: 'songs',
      title: 'Sarkilar',
      description: `${songs.length} sarki`,
      icon: 'musical-note',
      iconColor: '#8B5CF6',
      gradient: ['#8B5CF6', '#A78BFA'],
      onPress: () => navigation.navigate('Home'),
    },
  ];

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      // Playlist olusturma mantigi eklenebilir
      setNewPlaylistName('');
      setCreateModalVisible(false);
    }
  };

  return (
    <GradientBackground colors={Gradients.dark}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Kitapligin</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setCreateModalVisible(true)}
          >
            <Ionicons name="add" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Kitaplik Ogeleri */}
          <View style={styles.libraryList}>
            {libraryItems.map((item, index) => (
              <Animated.View key={item.id} entering={FadeInUp.delay(index * 100)}>
                <TouchableOpacity
                  style={styles.libraryItem}
                  onPress={item.onPress}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={item.gradient}
                    style={styles.libraryIcon}
                  >
                    <Ionicons
                      name={item.icon}
                      size={24}
                      color="#FFFFFF"
                    />
                  </LinearGradient>
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
              </Animated.View>
            ))}
          </View>

          {/* Calma Listeleri */}
          <Animated.View entering={FadeInUp.delay(300)} style={styles.section}>
            <Text style={styles.sectionTitle}>Calma Listelerin</Text>
            {playlists.map((playlist) => (
              <TouchableOpacity
                key={playlist.id}
                style={styles.playlistItem}
                activeOpacity={0.8}
                onPress={() => {
                  if (playlist.isLikedSongs) {
                    navigation.navigate('LikedSongs');
                  }
                }}
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
          </Animated.View>

          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Playlist Olusturma Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={createModalVisible}
          onRequestClose={() => setCreateModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Yeni Calma Listesi</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Calma listesi adi..."
                placeholderTextColor={Colors.textMuted}
                value={newPlaylistName}
                onChangeText={setNewPlaylistName}
                autoFocus
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => {
                    setNewPlaylistName('');
                    setCreateModalVisible(false);
                  }}
                >
                  <Text style={styles.modalCancelText}>Iptal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCreateButton}
                  onPress={handleCreatePlaylist}
                >
                  <LinearGradient
                    colors={Gradients.main}
                    style={styles.modalCreateGradient}
                  >
                    <Text style={styles.modalCreateText}>Olustur</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    borderRadius: 8,
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
    borderRadius: 8,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: Colors.textPrimary,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.divider,
    alignItems: 'center',
  },
  modalCancelText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  modalCreateButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalCreateGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCreateText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LibraryScreen;
