# Muzifay

Modern, kullanici dostu muzik calar uygulamasi. React Native + Expo + Firebase teknolojileriyle gelistirilmistir.

## Ozellikler

- **Muzik Calma**: Yuksek kaliteli ses ile muzik calma, duraklatma, ileri/geri sarma
- **Calma Listeleri**: Kendi calma listelerinizi olusturma ve yonetme
- **Favoriler**: Sevdiginiz sarkilari begenme ve hizli erisim
- **Arama**: Sarki, sanatci veya album arama
- **Kullanici Girisi**: Firebase Authentication ile guvenli giris
- **Arka Planda Calma**: Uygulama arka plandayken muzik calmaya devam etme
- **Profil Yonetimi**: Kullanici profili ve istatistikler
- **Karistirma & Tekrar**: Muzik calma secenekleri

## Teknolojiler

- React Native
- Expo SDK 50
- Firebase (Auth, Firestore, Storage)
- React Navigation
- Expo AV (Ses)
- EAS Build

## Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Expo CLI
- Firebase hesabi

### Adimlar

1. Projeyi klonlayin:
```bash
git clone https://github.com/yidoataalyapple-ship-it/muzifay.git
cd muzifay
```

2. Bagimliliklari yukleyin:
```bash
npm install
```

3. Firebase yapilandirmasi:
   - `src/firebase/config.js` dosyasini acin
   - Kendi Firebase proje bilgilerinizi girin

4. Uygulamayi baslatin:
```bash
npx expo start
```

## EAS Build Yapilandirmasi

### Gelistirme Build'i
```bash
eas build --profile development
```

### Preview Build'i (APK)
```bash
eas build --profile preview
```

### Production Build'i
```bash
eas build --profile production
```

### App Store Submit
```bash
# Android
eas submit --platform android

# iOS
eas submit --platform ios
```

## Proje Yapisi

```
muzifay/
├── src/
│   ├── components/     # Yeniden kullanilabilir bilesenler
│   ├── context/        # React Context (Auth, Music)
│   ├── firebase/       # Firebase yapilandirmasi
│   ├── navigation/     # Navigation yapilandirmasi
│   ├── screens/        # Uygulama ekranlari
│   └── theme/          # Tema ve renkler
├── App.js              # Ana uygulama girisi
├── app.json            # Expo yapilandirmasi
├── eas.json            # EAS Build yapilandirmasi
└── package.json        # Bagimliliklar
```

## Ekran Goruntuleri

- **Ana Sayfa**: Hizli erisim, populer sarkilar, albumler
- **Ara**: Sarki, sanatci ve tur arama
- **Kitapligin**: Calma listeleri, begenilen sarkilar
- **Profil**: Kullanici bilgileri ve istatistikler
- **Player**: Tam ekran muzik calar

## Katkida Bulunma

1. Fork yapin
2. Feature branch olusturun (`git checkout -b feature/yeni-ozellik`)
3. Degisikliklerinizi commit edin (`git commit -am 'Yeni ozellik ekle'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request acin

## Lisans

MIT Lisansi

---

**Muzifay** - Muzik dinlemek hic bu kadar keyifli olmamisti!
