import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

// AdMob
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

// Ekranlar
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlayerScreen from '../screens/PlayerScreen';
import LocalMusicScreen from '../screens/LocalMusicScreen';
import LikedSongsScreen from '../screens/LikedSongsScreen';
import RecentSongsScreen from '../screens/RecentSongsScreen';

// Komponentler
import MiniPlayer from '../components/MiniPlayer';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const INTERSTITIAL_ID = 'ca-app-pub-4492429510539065/5179858800';

const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.tabInactive,
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '600',
  },
  headerShown: false,
};

// Interstitial reklam nesnesi
const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
  requestNonPersonalizedAdsOnly: true,
});

const TabNavigator = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={tabBarOptions}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Ana Sayfa',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: 'Ara',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="LocalMusic"
          component={LocalMusicScreen}
          options={{
            tabBarLabel: 'Cihazdan',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="folder-open" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{
            tabBarLabel: 'Kitapligin',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      <MiniPlayer />
    </View>
  );
};

const AppNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  const interstitialLoaded = useRef(false);
  const lastAdShowTime = useRef(0);

  // Interstitial reklam olay dinleyicileri
  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitialLoaded.current = true;
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        interstitialLoaded.current = false;
        interstitial.load();
      }
    );

    const unsubscribeError = interstitial.addAdEventListener(
      AdEventType.ERROR,
      () => {
        interstitialLoaded.current = false;
        setTimeout(() => interstitial.load(), 30000);
      }
    );

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  // Navigation degisimlerinde interstitial reklam goster
  const handleStateChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (
      previousRouteName !== currentRouteName &&
      previousRouteName !== undefined
    ) {
      // Sayfa gecislerinde interstitial goster (60 saniye aralikla)
      const now = Date.now();
      if (interstitialLoaded.current && (now - lastAdShowTime.current > 60000)) {
        // Stack ekran gecislerinde (Player, LikedSongs, RecentSongs) reklam goster
        const stackScreens = ['Player', 'LikedSongs', 'RecentSongs'];
        if (stackScreens.includes(currentRouteName)) {
          interstitial.show();
          interstitialLoaded.current = false;
          lastAdShowTime.current = now;
        }
      }
    }

    routeNameRef.current = currentRouteName;
  };

  return (
    <NavigationContainer ref={navigationRef} onStateChange={handleStateChange}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            presentation: 'modal',
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="LikedSongs"
          component={LikedSongsScreen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="RecentSongs"
          component={RecentSongsScreen}
          options={{
            animationEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default AppNavigator;
