# Build Status

## Son Duzeltmeler (2026-07-11)
- **app.json**: react-native-google-mobile-ads config plugin geri eklendi
  - iOS infoPlist'teki GADApplicationIdentifier kaldirildi (plugin ayarliyor)
  - Android config'deki googleMobileAdsAppId kaldirildi (plugin ayarliyor)
  - Cift tanimlama build hatasi onlendi
- **eas.json**: iOS image (macos-sonoma-xcode-16.4) ve lockfile ayarlari guncellendi

## Hata Analizi ve Cozum
**Sorun**: AdMob plugin kaldirildiginda `react-native-google-mobile-ads` kutuphanesi native config'i cozemiyordu.
**Cozum**: Config plugin app.json'a geri eklendi, manuel tanimlamalar kaldirildi.

## Build Takibi
- Yeni build GitHub Actions ile otomatik tetikleniyor
- Android APK (preview) + iOS Simulator (preview) build edilecek
