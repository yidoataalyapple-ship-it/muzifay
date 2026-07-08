import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Gradients } from '../theme/colors';
import { useMusic } from '../context/MusicContext';
import GradientBackground from '../components/GradientBackground';
import SongListItem from '../components/SongListItem';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const RecentSongsScreen = () => {
  const navigation = useNavigation();
  const { recentSongs, playSong } = useMusic();

  const handlePlayAll = () => {
    if (recentSongs.length > 0) {
      playSong(recentSongs[0], recentSongs);
    }
  };

  return (
    <GradientBackground colors={Gradients.dark}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Kapak */}
          <Animated.View entering={FadeIn.delay(100)} style={styles.coverSection}>
            <LinearGradient
              colors={Gradients.blue}
              style={styles.coverGradient}
            >
              <Ionicons name="time" size={64} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.title}>Son Calinanlar</Text>
            <Text style={styles.count}>{recentSongs.length} sarki</Text>
          </Animated.View>

          {/* Butonlar */}
          {recentSongs.length > 0 && (
            <Animated.View entering={FadeInUp.delay(200)} style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={handlePlayAll}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={Gradients.main}
                  style={styles.playButtonGradient}
                >
                  <Ionicons name="play" size={24} color="#FFFFFF" />
                  <Text style={styles.playButtonText}>Oynat</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Liste */}
          {recentSongs.length === 0 ? (
            <Animated.View entering={FadeIn.delay(300)} style={styles.emptyContainer}>
              <Ionicons name="time-outline" size={64} color={Colors.textMuted} />
              <Text style={styles.emptyTitle}>Henüz sarki calinmadi</Text>
              <Text style={styles.emptyText}>
                Sarki caldiginda burada listelenecek.
              </Text>
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInUp.delay(300)}>
              {recentSongs.map((song, index) => (
                <SongListItem
                  key={`${song.id}-${index}`}
                  song={song}
                  index={index + 1}
                />
              ))}
            </Animated.View>
          )}

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
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backButton: {
    padding: 8,
    width: 44,
  },
  scrollContent: {
    paddingTop: 8,
  },
  coverSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  coverGradient: {
    width: 160,
    height: 160,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  count: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  playButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  playButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  bottomPadding: {
    height: 120,
  },
});

export default RecentSongsScreen;
