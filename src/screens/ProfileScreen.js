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
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { useMusic } from '../context/MusicContext';
import GradientBackground from '../components/GradientBackground';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const { songs, likedSongs, playlists } = useMusic();

  const menuItems = [
    {
      id: 'account',
      title: 'Hesap',
      description: 'Hesap ayarlarini yonet',
      icon: 'person-outline',
    },
    {
      id: 'notifications',
      title: 'Bildirimler',
      description: 'Bildirim tercihleriniz',
      icon: 'notifications-outline',
    },
    {
      id: 'privacy',
      title: 'Gizlilik',
      description: 'Gizlilik ve guvenlik',
      icon: 'shield-outline',
    },
    {
      id: 'storage',
      title: 'Depolama',
      description: 'Depolama ve veri kullanimi',
      icon: 'save-outline',
    },
    {
      id: 'about',
      title: 'Hakkinda',
      description: 'Muzifay v1.0.0',
      icon: 'information-circle-outline',
    },
  ];

  return (
    <GradientBackground colors={Gradients.dark}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profil Basligi */}
          <View style={styles.profileHeader}>
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
          </View>

          {/* Istatistikler */}
          <View style={styles.statsContainer}>
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
          </View>

          {/* Menu */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.menuItemLast,
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.menuIconContainer}>
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={Colors.textSecondary}
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
          </View>

          {/* Cikis Yap */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out-outline" size={20} color={Colors.error} />
            <Text style={styles.logoutText}>Cikis Yap</Text>
          </TouchableOpacity>

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
    color: Colors.textPrimary,
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
    color: Colors.textPrimary,
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
});

export default ProfileScreen;
