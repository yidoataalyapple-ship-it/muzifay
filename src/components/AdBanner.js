import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';

/**
 * Mock Banner Reklam bileseni
 * Build testi icin gecici olarak mock'lanmistir
 */
const AdBanner = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* AdMob devre disi - build stabilitesi */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 0,
    backgroundColor: Colors.background,
  },
});

export default AdBanner;
