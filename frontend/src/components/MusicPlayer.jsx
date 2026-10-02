import { useEffect, useRef, useState } from "react";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
} from "lucide-react";

import { usePlayer } from "../context/PlayerContext";

function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    pauseSong,
    resumeSong,
    playNext,
    playPrevious,
  } = usePlayer();

  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // ==========================================
  // LOAD CURRENT SONG
  // ==========================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentSong?.audio) {
      console.log("❌ No audio/current song");
      return;
    }

    console.log("================================");
    console.log("🎵 CURRENT SONG:", currentSong.title);
    console.log("👤 ARTIST:", currentSong.artist);
    console.log("🔊 AUDIO URL:", currentSong.audio);
    console.log("================================");

    setProgress(0);
    setDuration(0);

    audio.pause();
    audio.currentTime = 0;

    // Force volume
    audio.volume = 1;
    audio.muted = false;

    // Set source
    audio.src = currentSong.audio;

    console.log("🔗 AUDIO SRC SET:", audio.src);
    console.log("🔊 VOLUME:", audio.volume);
    console.log("🔇 MUTED:", audio.muted);

    audio.load();

    // Automatically play new song
    if (isPlaying) {
      const playAudio = async () => {
        try {
          console.log("▶️ TRYING NEW SONG PLAY...");

          await audio.play();

          console.log("✅ NEW SONG PLAYING");
          console.log("▶️ PAUSED:", audio.paused);
          console.log("🔊 VOLUME:", audio.volume);
          console.log("⏱️ CURRENT TIME:", audio.currentTime);
        } catch (error) {
          console.error("❌ AUTO PLAY ERROR:", error);
          pauseSong();
        }
      };

      playAudio();
    }

    return () => {
      audio.pause();
    };
  }, [currentSong]);

  // ==========================================
  // PLAY / PAUSE STATE
  // ==========================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentSong?.audio) return;

    console.log("🎧 PLAY STATE:", isPlaying);

    if (isPlaying) {
      console.log("▶️ Trying to play...");
      console.log("🔊 VOLUME:", audio.volume);
      console.log("🔇 MUTED:", audio.muted);
      console.log("▶️ PAUSED:", audio.paused);
      console.log("⏱️ CURRENT TIME:", audio.currentTime);

      audio
        .play()
        .then(() => {
          console.log("✅ AUDIO PLAYING SUCCESSFULLY");
          console.log("▶️ PAUSED AFTER PLAY:", audio.paused);
        })
        .catch((error) => {
          console.error("❌ PLAY ERROR:", error);
          pauseSong();
        });
    } else {
      audio.pause();
      console.log("⏸️ PAUSED");
    }
  }, [isPlaying]);

  // ==========================================
  // TIME UPDATE
  // ==========================================

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setProgress(audio.currentTime);
  };

  // ==========================================
  // METADATA / DURATION
  // ==========================================

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;

    if (!audio) return;

    console.log("⏱️ Duration:", audio.duration);

    setDuration(audio.duration || 0);
  };

  // ==========================================
  // CAN PLAY
  // ==========================================

  const handleCanPlay = () => {
    console.log("✅ AUDIO CAN PLAY");

    const audio = audioRef.current;

    if (!audio) return;

    console.log("🔊 CAN PLAY VOLUME:", audio.volume);
    console.log("🔇 CAN PLAY MUTED:", audio.muted);
    console.log("▶️ CAN PLAY PAUSED:", audio.paused);

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("❌ CAN PLAY ERROR:", error);
      });
    }
  };

  // ==========================================
  // SONG ENDED
  // ==========================================

  const handleEnded = () => {
    console.log("🎵 SONG ENDED");

    setProgress(0);

    playNext();
  };

  // ==========================================
  // AUDIO ERROR
  // ==========================================

  const handleAudioError = (event) => {
    const audio = event.currentTarget;

    console.error("================================");
    console.error("❌ AUDIO ERROR");
    console.error("URL:", audio.currentSrc);
    console.error("ERROR:", audio.error);
    console.error("================================");

    pauseSong();
  };

  // ==========================================
  // PROGRESS BAR
  // ==========================================

  const handleProgress = (event) => {
    const value = Number(event.target.value);

    setProgress(value);

    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  // ==========================================
  // REWIND 10 SECONDS
  // ==========================================

  const rewind = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.max(0, audio.currentTime - 10);

    setProgress(audio.currentTime);

    console.log("↩️ Rewind 10 seconds");
  };

  // ==========================================
  // FORWARD 10 SECONDS
  // ==========================================

  const forward = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.min(
      audio.duration || 0,
      audio.currentTime + 10
    );

    setProgress(audio.currentTime);

    console.log("↪️ Forward 10 seconds");
  };

  // ==========================================
  // VOLUME
  // ==========================================

  const handleVolume = (event) => {
    const value = Number(event.target.value);

    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value;
      audioRef.current.muted = value === 0;
    }

    console.log("🔊 VOLUME CHANGED:", value);
  };

  // ==========================================
  // PLAY / PAUSE BUTTON
  // ==========================================

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio || !currentSong?.audio) {
      console.error("❌ No audio available");
      return;
    }

    console.log("================================");
    console.log("🖱️ PLAY BUTTON CLICKED");
    console.log("🎵 SONG:", currentSong.title);
    console.log("🔊 AUDIO:", audio.currentSrc);
    console.log("🔊 VOLUME:", audio.volume);
    console.log("🔇 MUTED:", audio.muted);
    console.log("▶️ PAUSED:", audio.paused);
    console.log("⏱️ CURRENT TIME:", audio.currentTime);
    console.log("================================");

    if (isPlaying) {
      audio.pause();

      pauseSong();

      console.log("⏸️ PAUSED");

      return;
    }

    try {
      // Make sure audio is audible
      audio.volume = volume;
      audio.muted = volume === 0;

      console.log("▶️ TRYING TO PLAY...");

      await audio.play();

      resumeSong();

      console.log("✅ PLAYING SUCCESSFULLY");
      console.log("▶️ PAUSED:", audio.paused);
      console.log("🔊 VOLUME:", audio.volume);
      console.log("🔇 MUTED:", audio.muted);
      console.log("⏱️ CURRENT TIME:", audio.currentTime);
    } catch (error) {
      console.error("❌ PLAY BUTTON ERROR:", error);

      pauseSong();
    }
  };

  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // ==========================================
  // NO SONG
  // ==========================================

  if (!currentSong) {
    return null;
  }

  return (
    <>
      {/* ======================================
          HTML AUDIO
          TESTING CONTROLS ENABLED
      ====================================== */}

      <audio
        ref={audioRef}
        preload="auto"
        controls
        autoPlay
        volume={1}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onEnded={handleEnded}
        onError={handleAudioError}
      />

      {/* ======================================
          PLAYER
      ====================================== */}

      <div className="fixed bottom-0 left-0 right-0 z-40 md:left-64 bg-[#080b12]/95 backdrop-blur-xl border-t border-blue-500/10 px-3 sm:px-5 lg:px-7 py-3">
        <div className="max-w-[1600px] mx-auto">

          {/* PROGRESS */}

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={progress}
            onChange={handleProgress}
            className="w-full h-1 accent-blue-600 cursor-pointer mb-3"
          />

          <div className="flex items-center gap-3 sm:gap-4">

            {/* SONG INFO */}

            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={currentSong.image}
                alt={currentSong.title}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg object-cover shrink-0"
              />

              <div className="min-w-0">
                <h3 className="text-sm font-semibold truncate">
                  {currentSong.title}
                </h3>

                <p className="text-xs text-gray-500 truncate">
                  {currentSong.artist}
                </p>
              </div>
            </div>

            {/* CONTROLS */}

            <div className="flex items-center gap-1 sm:gap-2">

              {/* PREVIOUS */}

              <button
                onClick={playPrevious}
                type="button"
                className="p-2 text-gray-400 hover:text-white transition"
                title="Previous"
              >
                <SkipBack size={19} />
              </button>

              {/* REWIND */}

              <button
                onClick={rewind}
                type="button"
                className="hidden sm:flex p-2 text-gray-400 hover:text-white transition"
                title="Rewind 10 seconds"
              >
                <RotateCcw size={18} />
              </button>

              {/* PLAY / PAUSE */}

              <button
                onClick={togglePlay}
                type="button"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition active:scale-90"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={18} fill="currentColor" />
                ) : (
                  <Play size={18} fill="currentColor" />
                )}
              </button>

              {/* FORWARD */}

              <button
                onClick={forward}
                type="button"
                className="hidden sm:flex p-2 text-gray-400 hover:text-white transition"
                title="Forward 10 seconds"
              >
                <RotateCw size={18} />
              </button>

              {/* NEXT */}

              <button
                onClick={playNext}
                type="button"
                className="p-2 text-gray-400 hover:text-white transition"
                title="Next"
              >
                <SkipForward size={19} />
              </button>
            </div>

            {/* VOLUME */}

            <div className="hidden sm:flex items-center gap-4 min-w-[170px] justify-end">

              <span className="text-xs text-gray-500">
                {formatTime(progress)}
                {" / "}
                {formatTime(duration)}
              </span>

              <div className="flex items-center gap-2">

                {volume === 0 ? (
                  <VolumeX size={18} className="text-gray-400" />
                ) : (
                  <Volume2 size={18} className="text-gray-400" />
                )}

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolume}
                  className="w-16 accent-blue-600"
                />

              </div>
            </div>
          </div>

          {/* MOBILE TIME */}

          <div className="flex sm:hidden justify-end mt-1">
            <span className="text-[10px] text-gray-600">
              {formatTime(progress)}
              {" / "}
              {formatTime(duration)}
            </span>
          </div>

        </div>
      </div>
    </>
  );
}

export default MusicPlayer;