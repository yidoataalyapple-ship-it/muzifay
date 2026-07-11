import { useState, useCallback, useEffect, useRef } from 'react';
import {
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const INTERSTITIAL_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-4492429510539065/5179858800';

const REWARDED_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-4492429510539065/18990893';

/**
 * AdMob reklam yonetimi hook'u
 * Interstitial ve Rewarded reklamlari yonetir
 */
export const useAds = () => {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [rewardedLoaded, setRewardedLoaded] = useState(false);
  const [rewardEarned, setRewardEarned] = useState(null);

  const interstitialRef = useRef(null);
  const rewardedRef = useRef(null);

  useEffect(() => {
    // Interstitial reklam olustur
    const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    });
    interstitialRef.current = interstitial;

    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('AdMob: Interstitial yuklendi');
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('AdMob: Interstitial kapandi, yeniden yukleniyor');
        setInterstitialLoaded(false);
        interstitial.load();
      }
    );

    const unsubscribeError = interstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.log('AdMob: Interstitial hata:', error);
        setInterstitialLoaded(false);
      }
    );

    interstitial.load();

    // Rewarded reklam olustur
    const rewarded = RewardedAd.createForAdRequest(REWARDED_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    });
    rewardedRef.current = rewarded;

    const unsubscribeRewardedLoaded = rewarded.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('AdMob: Rewarded yuklendi');
        setRewardedLoaded(true);
      }
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log('AdMob: Odul kazanildi:', reward);
        setRewardEarned(reward);
      }
    );

    const unsubscribeRewardedClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('AdMob: Rewarded kapandi, yeniden yukleniyor');
        setRewardEarned(null);
        setRewardedLoaded(false);
        rewarded.load();
      }
    );

    const unsubscribeRewardedError = rewarded.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.log('AdMob: Rewarded hata:', error);
        setRewardedLoaded(false);
      }
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
      unsubscribeRewardedLoaded();
      unsubscribeEarned();
      unsubscribeRewardedClosed();
      unsubscribeRewardedError();
    };
  }, []);

  const showInterstitial = useCallback(() => {
    if (interstitialRef.current && interstitialLoaded) {
      console.log('AdMob: Interstitial gosteriliyor');
      interstitialRef.current.show();
    } else {
      console.log('AdMob: Interstitial henuz yuklenmedi');
    }
  }, [interstitialLoaded]);

  const showRewarded = useCallback(() => {
    if (rewardedRef.current && rewardedLoaded) {
      console.log('AdMob: Rewarded gosteriliyor');
      rewardedRef.current.show();
    } else {
      console.log('AdMob: Rewarded henuz yuklenmedi');
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
