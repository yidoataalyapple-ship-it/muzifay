# Build Status

## Son Duzeltmeler (2026-07-11)
- **Expo SDK 51 yukseltmesi**: SDK 50 -> 51 gecisi yapildi
  - expo: ~50.0.0 -> ~51.0.0
  - react-native: 0.73.6 -> 0.74.5
  - Tum expo paketleri SDK 51 versiyonlarina guncellendi
- **AdMob**: react-native-google-mobile-ads ^13.6.0 (SDK 51 uyumlu)
  - expo.plugins formati kullaniliyor
- **eas.json**: Xcode 16.1 image ayarlandi (Apple zorunlu kildi)

## Hata Analizi ve Cozum Gecmisi
1. **Sorun**: AdMob plugin kaldirildiginda native config cozulemiyordu
2. **Sorun**: react-native-google-mobile-ads ^13.6.0 Expo SDK 50 ile uyumsuzdu
3. **Cozum**: Expo SDK 51'e yukseltme yapildi

## Build Takibi
- Yeni build GitHub Actions ile otomatik tetikleniyor
- Android APK (preview) + iOS Simulator (preview) build edilecek
