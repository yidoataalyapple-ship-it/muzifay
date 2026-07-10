import { useEffect, useRef, useState, useCallback } from 'react';
import mobileAds, {
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
} from 'react-native-google-mobile-ads';

// ==================== REKLAM BIRIM ID'LERI ====================
const INTERSTITIAL_ID = 'ca-app-pub-4492429510539065/5179858800';
const REWARDED_ID = 'ca-app-pub-4492429510539065/1899089349';

// Test ID'leri (gelistirme sirasinda kullanin)
// const INTERSTITIAL_ID = 'ca-app-pub-3940256099942544/1033173712';
// const REWARDED_ID = 'ca-app-pub-3940256099942544/5224354917';

// ==================== REKLAM NESNELERI ====================
const interstitialAd = InterstitialAd.createForAdRequest(INTERSTITIAL_ID, {
  requestNonPersonalizedAdsOnly: true,
});

const rewardedAd = RewardedAd.createForAdRequest(REWARDED_ID, {
  requestNonPersonalizedAdsOnly: true,
});

/**
 * AdMob reklam yonetimi hook'u
 * Interstitial ve Rewarded reklamlarin yuklenmesi/gosterilmesini yonetir
 * Banner reklamlar icin BannerAdComponent kullanin
 */
export const useAds = () => {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [rewardedLoaded, setRewardedLoaded] = useState(false);
  const [rewardEarned, setRewardEarned] = useState(null);
  const interstitialShown = useRef(false);

  // AdMob baslatma
  useEffect(() => {
    mobileAds()
      .initialize()
      .then((adapterStatuses) => {
        console.log('AdMob basarili sekilde baslatildi:', adapterStatuses);
      })
      .catch((error) => {
        console.error('AdMob baslatma hatasi:', error);
      });
  }, []);

  // Interstitial reklam olay dinleyicileri
  useEffect(() => {
    const unsubscribeLoaded = interstitialAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('Interstitial reklam yuklendi');
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitialAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('Interstitial reklam kapandi');
        setInterstitialLoaded(false);
        interstitialShown.current = false;
        interstitialAd.load();
      }
    );

    const unsubscribeError = interstitialAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.log('Interstitial reklam hatasi:', error);
        setInterstitialLoaded(false);
        setTimeout(() => interstitialAd.load(), 30000);
      }
    );

    interstitialAd.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  // Rewarded reklam olay dinleyicileri
  useEffect(() => {
    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('Rewarded reklam yuklendi');
        setRewardedLoaded(true);
      }
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log('Kullanici odul kazandi:', reward);
        setRewardEarned(reward);
      }
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('Rewarded reklam kapandi');
        setRewardedLoaded(false);
        setRewardEarned(null);
        rewardedAd.load();
      }
    );

    const unsubscribeError = rewardedAd.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.log('Rewarded reklam hatasi:', error);
        setRewardedLoaded(false);
        setTimeout(() => rewardedAd.load(), 30000);
      }
    );

    rewardedAd.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  // Interstitial reklami goster
  const showInterstitial = useCallback(() => {
    if (interstitialLoaded && !interstitialShown.current) {
      interstitialAd.show();
      interstitialShown.current = true;
    } else {
      console.log('Interstitial reklam hazir degil, yukleniyor...');
      interstitialAd.load();
    }
  }, [interstitialLoaded]);

  // Rewarded reklami goster
  const showRewarded = useCallback(() => {
    if (rewardedLoaded) {
      rewardedAd.show();
    } else {
      console.log('Rewarded reklam hazir degil, yukleniyor...');
      rewardedAd.load();
    }
  }, [rewardedLoaded]);

  return {
    interstitialLoaded,
    rewardedLoaded,
    rewardEarned,
    showInterstitial,
    showRewarded,
  };
};

export default useAds;
