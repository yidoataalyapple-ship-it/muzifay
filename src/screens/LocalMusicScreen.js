import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients } from '../theme/colors';
import { useMusic } from '../context/MusicContext';
import GradientBackground from '../components/GradientBackground';
import SongListItem from '../components/SongListItem';
import AdBanner from '../components/AdBanner';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';

const LocalMusicScreen = () => {
  const { localSongs, playSong, addLocalSong, removeLocalSong } = useMusic();
  const [loading, setLoading] = useState(false);

  const pickAndPlayAudio = useCallback(async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*'],
        copyToCacheDirectory: true,
      });

      if (result.canceled === false && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const newSong = {
          id: `local-${Date.now()}`,
          title: asset.name.replace(/\.[^/.]+$/, '') || 'Bilinmeyen Sarki',
          artist: 'Yerel Dosya',
          album: 'Cihazdan',
          duration: 0,
          cover: 'https://picsum.photos/400/400?random=99',
          url: asset.uri,
          genre: 'Yerel',
          year: '2024',
          isLocal: true,
        };

        await addLocalSong(newSong);
        await playSong(newSong);
      }
    } catch (error) {
      console.error('Dosya secme hatasi:', error);
      Alert.alert('Hata', 'Ses dosyasi secilirken bir hata olustu.');
    } finally {
      setLoading(false);
    }
  }, [addLocalSong, playSong]);

  const handleRemoveSong = useCallback((songId) => {
    Alert.alert(
      'Sarkiyi Sil',
      'Bu sarkiyi listeden kaldirmak istiyor musunuz?',
      [
        { text: 'Iptal', style: 'cancel' },
        { text: 'Sil', style: 'destructive', onPress: () => removeLocalSong(songId) },
      ]
    );
  }, [removeLocalSong]);

  return (
    <GradientBackground colors={Gradients.dark}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Ust Banner Reklam */}
        <AdBanner />

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Cihazdan Cal</Text>
            <Text style={styles.subtitle}>{localSongs.length} yerel sarki</Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Dosya Sec Butonu */}
          <Animated.View entering={FadeInUp.delay(100)} style={styles.addButtonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={pickAndPlayAudio}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={Gradients.main}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.addButtonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="add-circle" size={32} color="#FFFFFF" />
                    <Text style={styles.addButtonText}>Sarki Ekle</Text>
                    <Text style={styles.addButtonSubtext}>Cihazindan ses dosyasi sec</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Yardim Metni */}
          {localSongs.length === 0 && (
            <Animated.View entering={FadeIn.delay(200)} style={styles.emptyContainer}>
              <Ionicons name="musical-note" size={64} color={Colors.textMuted} />
              <Text style={styles.emptyTitle}>Henuz sarki yok</Text>
              <Text style={styles.emptyText}>
                Cihazindan ses dosyalari eklemek icin yukaridaki "Sarki Ekle" butonuna dokun.
              </Text>
            </Animated.View>
          )}

          {/* Yerel Sarki Listesi */}
          {localSongs.length > 0 && (
            <Animated.View entering={FadeInUp.delay(200)}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Yerel Sarkilarin</Text>
              </View>
              {localSongs.map((song, index) => (
                <View key={song.id} style={styles.songRow}>
                  <View style={styles.songItem}>
                    <SongListItem
                      song={song}
                      index={index + 1}
                      onOptionsPress={handleRemoveSong}
                    />
                  </View>
                </View>
              ))}
            </Animated.View>
          )}

          {/* Alt Banner Reklam */}
          <AdBanner size="ANCHORED_ADAPTIVE_BANNER" />

          <View style={styles.bottomPadding} />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  scrollContent: {
    paddingTop: 8,
  },
  addButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  addButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addButtonGradient: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  addButtonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  songItem: {
    flex: 1,
  },
  bottomPadding: {
    height: 80,
  },
});

export default LocalMusicScreen;
