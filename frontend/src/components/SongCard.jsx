import { Heart, Play, Pause } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { useFavorites } from "../context/FavoritesContext";

function SongCard({ song, songs }) {
  const { playSong, pauseSong, resumeSong, currentSong, isPlaying } =
    usePlayer();

  const { isFavorite, toggleFavorite } = useFavorites();

  // Check favorite
  const favorite = isFavorite(song.id);

  // Check if this is the currently selected song
  const isCurrentSong =
    currentSong?.id != null &&
    song?.id != null &&
    String(currentSong.id) === String(song.id);

  // ==========================================
  // PLAY / PAUSE
  // ==========================================

  const handlePlayPause = () => {
    // No song
    if (!song) return;

    // Same song
    if (isCurrentSong) {
      if (isPlaying) {
        pauseSong();
      } else {
        resumeSong();
      }

      return;
    }

    // Different song
    playSong(song, songs);
  };

  // ==========================================
  // FAVORITE
  // ==========================================

  const handleFavorite = () => {
    toggleFavorite(song);
  };

  return (
    <div className="bg-[#0b0f19] border border-blue-500/10 rounded-2xl p-3 transition hover:border-blue-500/40">
      {/* ======================================
          IMAGE
      ====================================== */}

      <div className="relative">
        <img
          src={song.image}
          alt={song.title}
          className="w-full aspect-square object-cover rounded-xl"
        />

        {/* ====================================
            PLAY / PAUSE BUTTON
        ==================================== */}

        <button
          type="button"
          onClick={handlePlayPause}
          className="
            absolute
            bottom-3
            right-3
            bg-blue-600
            hover:bg-blue-700
            p-3
            rounded-full
            shadow-lg
            transition
            active:scale-90
            flex
            items-center
            justify-center
          "
          title={isCurrentSong && isPlaying ? "Pause" : "Play"}
        >
          {isCurrentSong && isPlaying ? (
            <Pause size={17} fill="currentColor" />
          ) : (
            <Play size={17} fill="currentColor" />
          )}
        </button>
      </div>

      {/* ======================================
          SONG INFO
      ====================================== */}

      <div className="flex items-start justify-between gap-2 mt-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-sm sm:text-base truncate">
            {song.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-400 truncate mt-1">
            {song.artist}
          </p>
        </div>

        {/* ====================================
            FAVORITE BUTTON
        ==================================== */}

        <button
          type="button"
          onClick={handleFavorite}
          className={`
            shrink-0
            transition
            p-1
            rounded-full
            ${favorite ? "text-blue-500" : "text-gray-500 hover:text-blue-500"}
          `}
          title={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={19} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}

export default SongCard;
