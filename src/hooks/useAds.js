import { useState, useCallback, useEffect } from 'react';

/**
 * AdMob reklam yonetimi mock hook'u
 * Build testi icin gecici olarak mock'lanmistir
 */
export const useAds = () => {
  const [interstitialLoaded] = useState(false);
  const [rewardedLoaded] = useState(false);

  useEffect(() => {
    console.log('AdMob: Mock mod aktif');
  }, []);

  const showInterstitial = useCallback(() => {
    console.log('AdMob: Interstitial reklam gosterimi (mock)');
  }, []);

  const showRewarded = useCallback(() => {
    console.log('AdMob: Rewarded reklam gosterimi (mock)');
  }, []);

  return {
    interstitialLoaded,
    rewardedLoaded,
    rewardEarned: null,
    showInterstitial,
    showRewarded,
  };
};

export default useAds;
