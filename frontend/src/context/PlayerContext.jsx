import { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

const getSongId = (song) => {
  return song?.id ?? song?.songId;
};

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);

  // ===============================
  // PLAY SONG
  // ===============================

  const playSong = (song, songs = []) => {
    if (!song) return;

    // Check audio URL
    if (!song.audio) {
      console.error("❌ No audio URL found:", song);
      return;
    }

    const normalizedSong = {
      ...song,
      id: song.id ?? song.songId,
    };

    const normalizedQueue = songs.map((item) => ({
      ...item,
      id: item.id ?? item.songId,
    }));

    console.log("🎵 Playing song:", normalizedSong);
    console.log("🔊 Audio URL:", normalizedSong.audio);

    setCurrentSong(normalizedSong);
    setQueue(normalizedQueue);
    setIsPlaying(true);
  };

  // ===============================
  // PAUSE
  // ===============================

  const pauseSong = () => {
    setIsPlaying(false);
  };

  // ===============================
  // RESUME
  // ===============================

  const resumeSong = () => {
    setIsPlaying(true);
  };

  // ===============================
  // NEXT
  // ===============================

  const playNext = () => {
    if (!currentSong || queue.length === 0) return;

    const currentIndex = queue.findIndex(
      (song) => String(getSongId(song)) === String(getSongId(currentSong)),
    );

    if (currentIndex === -1) return;

    const nextIndex = currentIndex === queue.length - 1 ? 0 : currentIndex + 1;

    const nextSong = queue[nextIndex];

    console.log("⏭️ Next song:", nextSong);

    setCurrentSong(nextSong);
    setIsPlaying(true);
  };

  // ===============================
  // PREVIOUS
  // ===============================

  const playPrevious = () => {
    if (!currentSong || queue.length === 0) return;

    const currentIndex = queue.findIndex(
      (song) => String(getSongId(song)) === String(getSongId(currentSong)),
    );

    if (currentIndex === -1) return;

    const previousIndex =
      currentIndex === 0 ? queue.length - 1 : currentIndex - 1;

    const previousSong = queue[previousIndex];

    console.log("⏮️ Previous song:", previousSong);

    setCurrentSong(previousSong);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        queue,
        playSong,
        pauseSong,
        resumeSong,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
