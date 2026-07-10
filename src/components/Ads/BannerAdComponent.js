import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { Colors } from '../../theme/colors';

// ==================== BANNER REKLAM ID ====================
// Kendi AdMob Banner ID'nizi buraya ekleyin
// Test ID: ca-app-pub-3940256099942544/6300978111
const BANNER_AD_UNIT_ID = 'ca-app-pub-4492429510539065/5179858800';

/**
 * BannerAdComponent - Sayfalarin altinda gosterilen banner reklam
 * 
 * Kullanim:
 * <BannerAdComponent size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
 * 
 * Desteklenen boyutlar:
 * - BannerAdSize.BANNER (320x50)
 * - BannerAdSize.LARGE_BANNER (320x100)
 * - BannerAdSize.MEDIUM_RECTANGLE (300x250)
 * - BannerAdSize.ANCHORED_ADAPTIVE_BANNER (ekran genisligine uyumlu)
 */
const BannerAdComponent = ({ 
  size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  containerStyle,
  onAdLoaded,
  onAdFailedToLoad,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <BannerAd
        unitId={BANNER_AD_UNIT_ID}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => {
          console.log('Banner reklam yuklendi');
          onAdLoaded?.();
        }}
        onAdFailedToLoad={(error) => {
          console.log('Banner reklam yukleme hatasi:', error);
          onAdFailedToLoad?.(error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.divider || '#2A2344',
  },
});

export default BannerAdComponent;
