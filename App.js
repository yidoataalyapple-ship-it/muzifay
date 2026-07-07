import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { Audio } from 'expo-av';

// Context'ler
import { AuthProvider } from './src/context/AuthContext';
import { MusicProvider } from './src/context/MusicContext';

// Navigation
import AppNavigator from './src/navigation/AppNavigator';

// Tema
import { Colors } from './src/theme/colors';

// Splash screen'i gosterme
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Audio modunu ayarla
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        // Simulasyon: 1.5 saniye bekle
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <AuthProvider>
        <MusicProvider>
          <View style={styles.container}>
            <AppNavigator />
          </View>
        </MusicProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
