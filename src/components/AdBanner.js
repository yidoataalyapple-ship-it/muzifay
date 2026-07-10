import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { Colors } from '../theme/colors';

// ==================== REKLAM BIRIM ID'LERI ====================
const BANNER_ID = 'ca-app-pub-4492429510539065/5179858800';

/**
 * Yeniden kullanilabilir Banner Reklam bileseni
 * @param {string} size - Banner boyutu (varsayilan: FULL_BANNER)
 * @param {object} style - Ek stil objesi
 */
const AdBanner = ({ size = BannerAdSize.FULL_BANNER, style }) => {
  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={BANNER_ID}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner reklam yuklendi');
        }}
        onAdFailedToLoad={(error) => {
          console.log('Banner reklam yuklenemedi:', error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 4,
  },
});

export default AdBanner;
