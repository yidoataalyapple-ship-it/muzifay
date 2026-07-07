import React, { createContext, useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MusicContext = createContext({});

// Demo muzik verileri
const DEMO_SONGS = [
  {
    id: '1',
    title: 'Gece Modu',
    artist: 'Mert Demir',
    album: 'Istanbul Geceleri',
    duration: 184,
    cover: 'https://picsum.photos/400/400?random=1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    genre: 'Pop',
    year: '2024',
  },
  {
    id: '2',
    title: 'Yolculuk',
    artist: 'Zeynep Aksu',
    album: 'Yolculuk Albümü',
    duration: 226,
    cover: 'https://picsum.photos/400/400?random=2',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    genre: 'Rock',
    year: '2024',
  },
  {
    id: '3',
    title: 'Ruya',
    artist: 'Can Yilmaz',
    album: 'Ruyalar',
    duration: 195,
    cover: 'https://picsum.photos/400/400?random=3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    genre: 'Electronic',
    year: '2023',
  },
  {
    id: '4',
    title: 'Deniz Kenari',
    artist: 'Elif Gunay',
    album: 'Yaz Sarkilari',
    duration: 210,
    cover: 'https://picsum.photos/400/400?random=4',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    genre: 'Pop',
    year: '2024',
  },
  {
    id: '5',
    title: 'Firtina',
    artist: 'Kaya Erdem',
    album: 'Dogann Sesi',
    duration: 245,
    cover: 'https://picsum.photos/400/400?random=5',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    genre: 'Rock',
    year: '2023',
  },
  {
    id: '6',
    title: 'Sehir Isiklari',
    artist: 'Mert Demir',
    album: 'Istanbul Geceleri',
    duration: 198,
    cover: 'https://picsum.photos/400/400?random=6',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    genre: 'Electronic',
    year: '2024',
  },
  {
    id: '7',
    title: 'Gunes Dogusu',
    artist: 'Ayse Kaya',
    album: 'Sabahlar',
    duration: 175,
    cover: 'https://picsum.photos/400/400?random=7',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    genre: 'Jazz',
    year: '2024',
  },
  {
    id: '8',
    title: 'Kardelen',
    artist: 'Burak Yilmaz',
    album: 'Kis Sarkilari',
    duration: 230,
    cover: 'https://picsum.photos/400/400?random=8',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    genre: 'Classical',
    year: '2023',
  },
];

const DEMO_ALBUMS = [
  {
    id: '1',
    title: 'Istanbul Geceleri',
    artist: 'Mert Demir',
    cover: 'https://picsum.photos/400/400?random=10',
    year: '2024',
    songs: ['1', '6'],
  },
  {
    id: '2',
    title: 'Yolculuk Albümü',
    artist: 'Zeynep Aksu',
    cover: 'https://picsum.photos/400/400?random=11',
    year: '2024',
    songs: ['2'],
  },
  {
    id: '3',
    title: 'Ruyalar',
    artist: 'Can Yilmaz',
    cover: 'https://picsum.photos/400/400?random=12',
    year: '2023',
    songs: ['3'],
  },
  {
    id: '4',
    title: 'Yaz Sarkilari',
    artist: 'Elif Gunay',
    cover: 'https://picsum.photos/400/400?random=13',
    year: '2024',
    songs: ['4'],
  },
];

const DEMO_PLAYLISTS = [
  {
    id: 'liked',
    title: 'Begenilen Sarkilar',
    description: 'En sevdigin sarkilar',
    cover: 'https://picsum.photos/400/400?random=20',
    songs: [],
    isLikedSongs: true,
  },
  {
    id: 'recent',
    title: 'Son Calinanlar',
    description: 'Yakin zamanda calinan sarkilar',
    cover: 'https://picsum.photos/400/400?random=21',
    songs: [],
  },
];

export const MusicProvider = ({ children }) => {
  const [songs] = useState(DEMO_SONGS);
  const [albums] = useState(DEMO_ALBUMS);
  const [playlists, setPlaylists] = useState(DEMO_PLAYLISTS);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [likedSongs, setLikedSongs] = useState([]);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // none, one, all

  // Begenilen sarkilari yukle
  useEffect(() => {
    loadLikedSongs();
  }, []);

  const loadLikedSongs = async () => {
    try {
      const saved = await AsyncStorage.getItem('likedSongs');
      if (saved) {
        setLikedSongs(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Begenilen sarkilar yuklenemedi:', error);
    }
  };

  const saveLikedSongs = async (newLikedSongs) => {
    try {
      await AsyncStorage.setItem('likedSongs', JSON.stringify(newLikedSongs));
    } catch (error) {
      console.error('Begenilen sarkilar kaydedilemedi:', error);
    }
  };

  const toggleLike = async (songId) => {
    const newLikedSongs = likedSongs.includes(songId)
      ? likedSongs.filter(id => id !== songId)
      : [...likedSongs, songId];
    
    setLikedSongs(newLikedSongs);
    await saveLikedSongs(newLikedSongs);
  };

  const isLiked = (songId) => likedSongs.includes(songId);

  const getLikedSongsList = () => {
    return songs.filter(song => likedSongs.includes(song.id));
  };

  const playSong = async (song, songQueue = null) => {
    try {
      // Mevcut sesi durdur
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setCurrentSong(song);
      setIsPlaying(true);
      setPosition(0);

      if (songQueue) {
        setQueue(songQueue);
        const index = songQueue.findIndex(s => s.id === song.id);
        setQueueIndex(index >= 0 ? index : 0);
      } else {
        setQueue(songs);
        const index = songs.findIndex(s => s.id === song.id);
        setQueueIndex(index >= 0 ? index : 0);
      }
    } catch (error) {
      console.error('Sarki calma hatasi:', error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);

      if (status.didJustFinish) {
        handleSongFinish();
      }
    }
  };

  const handleSongFinish = () => {
    if (repeatMode === 'one') {
      replayCurrent();
    } else {
      playNext();
    }
  };

  const togglePlay = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const playNext = async () => {
    if (queue.length === 0) return;

    let nextIndex;
    if (shuffleMode) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = queueIndex + 1;
      if (nextIndex >= queue.length) {
        if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          return;
        }
      }
    }

    const nextSong = queue[nextIndex];
    await playSong(nextSong, queue);
  };

  const playPrevious = async () => {
    if (queue.length === 0) return;

    let prevIndex = queueIndex - 1;
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }

    const prevSong = queue[prevIndex];
    await playSong(prevSong, queue);
  };

  const replayCurrent = async () => {
    if (!sound) return;
    await sound.setPositionAsync(0);
    await sound.playAsync();
  };

  const seekTo = async (seconds) => {
    if (!sound) return;
    await sound.setPositionAsync(seconds * 1000);
    setPosition(seconds);
  };

  const toggleShuffle = () => {
    setShuffleMode(!shuffleMode);
  };

  const toggleRepeat = () => {
    const modes = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const getSongsByAlbum = (albumId) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return [];
    return songs.filter(song => album.songs.includes(song.id));
  };

  const getSongsByArtist = (artistName) => {
    return songs.filter(song => song.artist === artistName);
  };

  const searchSongs = (query) => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return songs.filter(song =>
      song.title.toLowerCase().includes(lowerQuery) ||
      song.artist.toLowerCase().includes(lowerQuery) ||
      song.album.toLowerCase().includes(lowerQuery) ||
      song.genre.toLowerCase().includes(lowerQuery)
    );
  };

  const value = {
    songs,
    albums,
    playlists,
    currentSong,
    isPlaying,
    position,
    duration,
    likedSongs,
    shuffleMode,
    repeatMode,
    queue,
    playSong,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    toggleLike,
    isLiked,
    getLikedSongsList,
    toggleShuffle,
    toggleRepeat,
    formatTime,
    getSongsByAlbum,
    getSongsByArtist,
    searchSongs,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

export const useMusic = () => useContext(MusicContext);
