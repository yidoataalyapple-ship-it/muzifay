import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';
import GradientBackground from '../components/GradientBackground';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';

const ProfileScreen = () => {
  const { user, logout, updateProfile } = useAuth();
  const { songs, likedSongs, playlists, recentSongs } = useMusic();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const menuItems = [
    {
      id: 'account',
      title: 'Hesap',
      description: 'Hesap ayarlarini yonet',
      icon: 'person-outline',
      onPress: () => setEditModalVisible(true),
    },
    {
      id: 'liked',
      title: 'Begenilen Sarkilar',
      description: `${likedSongs.length} begenilen sarki`,
      icon: 'heart-outline',
      onPress: () => {
        // Navigation handled by parent
      },
    },
    {
      id: 'storage',
      title: 'Depolama',
      description: `${songs.length + recentSongs.length} sarki kayitli`,
      icon: 'save-outline',
      onPress: () => {
        Alert.alert(
          'Depolama Bilgisi',
          `Demo sarkilar: ${songs.length}\nSon calinanlar: ${recentSongs.length}\nBegenilenler: ${likedSongs.length}`,
          [{ text: 'Tamam' }]
        );
      },
    },
    {
      id: 'about',
      title: 'Hakkinda',
      description: 'Muzifay v1.0.0 - Modern muzik calar',
      icon: 'information-circle-outline',
      onPress: () => {
        Alert.alert(
          'Muzifay',
          'Modern muzik calar uygulamasi\n\nSurum: 1.0.0\n\nGelistirici: Muzifay Team',
          [{ text: 'Tamam' }]
        );
      },
    },
  ];

  const handleSaveProfile = () => {
    if (displayName.trim()) {
      // Profil guncelleme
      setEditModalVisible(false);
      Alert.alert('Basarili', 'Profiliniz guncellendi.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cikis Yap',
      'Hesabinizdan cikis yapmak istediginize emin misiniz?',
      [
        { text: 'Iptal', style: 'cancel' },
        { text: 'Cikis Yap', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <GradientBackground colors={Gradients.dark}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profil Basligi */}
          <Animated.View entering={FadeIn.delay(100)} style={styles.profileHeader}>
            <LinearGradient
              colors={Gradients.main}
              style={styles.avatarContainer}
            >
              <Text style={styles.avatarText}>
                {user?.displayName?.charAt(0)?.toUpperCase() || 'M'}
              </Text>
            </LinearGradient>
            <Text style={styles.displayName}>
              {user?.displayName || 'Misafir Kullanici'}
            </Text>
            <Text style={styles.email}>
              {user?.email || 'Giris yapmadiniz'}
            </Text>
          </Animated.View>

          {/* Istatistikler */}
          <Animated.View entering={FadeInUp.delay(150)} style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{songs.length}</Text>
              <Text style={styles.statLabel}>Sarki</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{likedSongs.length}</Text>
              <Text style={styles.statLabel}>Begenilen</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{playlists.length}</Text>
              <Text style={styles.statLabel}>Playlist</Text>
            </View>
          </Animated.View>

          {/* Menu */}
          <Animated.View entering={FadeInUp.delay(200)} style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.menuItemLast,
                ]}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View style={styles.menuIconContainer}>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={Colors.primaryLight}
                  />
                </View>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDescription}>
                    {item.description}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.textMuted}
                />
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Tema Bilgisi */}
          <Animated.View entering={FadeInUp.delay(250)} style={styles.themeContainer}>
            <View style={styles.themeInfo}>
              <Ionicons name="color-palette" size={20} color={Colors.primary} />
              <View style={styles.themeTextContainer}>
                <Text style={styles.themeTitle}>Mor Tema</Text>
                <Text style={styles.themeDescription}>Aktif tema</Text>
              </View>
            </View>
            <View style={styles.themeBadge}>
              <LinearGradient
                colors={Gradients.main}
                style={styles.themeBadgeGradient}
              >
                <Text style={styles.themeBadgeText}>Premium</Text>
              </LinearGradient>
            </View>
          </Animated.View>

          {/* Cikis Yap */}
          <Animated.View entering={FadeInUp.delay(300)}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Ionicons name="log-out-outline" size={20} color={Colors.error} />
              <Text style={styles.logoutText}>Cikis Yap</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Profil Duzenleme Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Profili Duzenle</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Gorunur adiniz..."
                placeholderTextColor={Colors.textMuted}
                value={displayName}
                onChangeText={setDisplayName}
                autoFocus
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => {
                    setDisplayName(user?.displayName || '');
                    setEditModalVisible(false);
                  }}
                >
                  <Text style={styles.modalCancelText}>Iptal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalCreateButton}
                  onPress={handleSaveProfile}
                >
                  <LinearGradient
                    colors={Gradients.main}
                    style={styles.modalCreateGradient}
                  >
                    <Text style={styles.modalCreateText}>Kaydet</Text>
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
  scrollContent: {
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  displayName: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.divider,
  },
  statNumber: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 36,
    alignItems: 'center',
  },
  menuInfo: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  menuDescription: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 24,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeTextContainer: {
    marginLeft: 12,
  },
  themeTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  themeDescription: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  themeBadge: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  themeBadgeGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  themeBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 24,
    gap: 8,
  },
  logoutText: {
    color: Colors.error,
    fontSize: 15,
    fontWeight: '600',
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

export default ProfileScreen;
