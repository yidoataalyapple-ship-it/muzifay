import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Gradients } from '../theme/colors';
import { useMusic } from '../context/MusicContext';
import SongListItem from '../components/SongListItem';
import GradientBackground from '../components/GradientBackground';

const GENRES = [
  { name: 'Pop', color: ['#E91E63', '#F48FB1'] },
  { name: 'Rock', color: ['#F44336', '#EF9A9A'] },
  { name: 'Jazz', color: ['#FF9800', '#FFCC80'] },
  { name: 'Electronic', color: ['#9C27B0', '#CE93D8'] },
  { name: 'Classical', color: ['#3F51B5', '#9FA8DA'] },
  { name: 'Hip Hop', color: ['#00BCD4', '#80DEEA'] },
  { name: 'R&B', color: ['#4CAF50', '#A5D6A7'] },
  { name: 'Indie', color: ['#FF5722', '#FFAB91'] },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchSongs } = useMusic();

  const searchResults = searchSongs(searchQuery);
  const isSearching = searchQuery.length > 0;

  return (
    <GradientBackground colors={Gradients.dark}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Ara</Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={Colors.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Sarki, sanatci veya album ara..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {isSearching ? (
            /* Arama Sonuclari */
            <View style={styles.resultsContainer}>
              {searchResults.length > 0 ? (
                <>
                  <Text style={styles.resultsTitle}>
                    {searchResults.length} sonuc bulundu
                  </Text>
                  {searchResults.map((song, index) => (
                    <SongListItem
                      key={song.id}
                      song={song}
                      index={index + 1}
                    />
                  ))}
                </>
              ) : (
                <View style={styles.noResults}>
                  <Ionicons
                    name="musical-note"
                    size={48}
                    color={Colors.textMuted}
                  />
                  <Text style={styles.noResultsText}>
                    Sonuc bulunamadi
                  </Text>
                  <Text style={styles.noResultsSubtext}>
                    Baska bir arama terimi deneyin
                  </Text>
                </View>
              )}
            </View>
          ) : (
            /* Turler */
            <>
              <Text style={styles.sectionTitle}>Hepsine goz at</Text>
              <View style={styles.genresGrid}>
                {GENRES.map((genre, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.genreCard,
                      { backgroundColor: genre.color[0] },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.genreText}>{genre.name}</Text>
                    <View
                      style={[
                        styles.genreAccent,
                        { backgroundColor: genre.color[1] },
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 14,
    paddingVertical: 12,
  },
  clearButton: {
    padding: 4,
  },
  scrollContent: {
    paddingTop: 8,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  genresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  genreCard: {
    width: '47%',
    height: 100,
    borderRadius: 8,
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  genreText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  genreAccent: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    transform: [{ rotate: '45deg' }],
    opacity: 0.6,
  },
  resultsContainer: {
    paddingTop: 8,
  },
  resultsTitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  noResultsText: {
    color: Colors.textSecondary,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  noResultsSubtext: {
    color: Colors.textMuted,
    fontSize: 14,
    marginTop: 8,
  },
  bottomPadding: {
    height: 120,
  },
});

export default SearchScreen;
