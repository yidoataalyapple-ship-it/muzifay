import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Colors } from '../theme/colors';

const BANNER_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-4492429510539065/5179858800';

/**
 * Banner Reklam bileseni
 * Ekranin altinda sabit banner reklam gosterir
 */
const AdBanner = ({ style, size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER }) => {
  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={BANNER_UNIT_ID}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onPaid={(event) => {
          console.log('AdMob Banner: Odeme alindi', event);
        }}
        onFailedToLoad={(error) => {
          console.log('AdMob Banner: Yukleme hatasi', error);
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
    minHeight: 50,
  },
});

export default AdBanner;
