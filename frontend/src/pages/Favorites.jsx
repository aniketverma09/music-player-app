import { Heart, Play, Trash2 } from "lucide-react";

import { usePlayer } from "../context/PlayerContext";

import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favorites, loading, removeFavorite } = useFavorites();

  const { playSong } = usePlayer();

  // LOADING
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-400">Loading favorites...</p>
      </div>
    );
  }

  // EMPTY
  if (favorites.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="bg-blue-600/10 p-5 rounded-full mb-4">
          <Heart size={40} className="text-blue-500" />
        </div>

        <h2 className="text-xl font-semibold">No Favorites Yet</h2>

        <p className="text-gray-400 text-sm mt-2">
          Add songs to your favorites and they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Favorites</h1>

        <p className="text-gray-400 text-sm mt-1">
          {favorites.length} favorite{" "}
          {favorites.length === 1 ? "song" : "songs"}
        </p>
      </div>

      {/* SONG GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favorites.map((song) => (
          <div
            key={song.songId}
            className="bg-[#0b0f19] border border-blue-500/10 rounded-2xl p-3"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={song.image}
                alt={song.title}
                className="w-full aspect-square object-cover rounded-xl"
              />

              {/* PLAY */}
              <button
                onClick={() => playSong(song, favorites)}
                className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition active:scale-90"
              >
                <Play size={17} fill="currentColor" />
              </button>
            </div>

            {/* INFO */}
            <div className="flex items-start justify-between gap-2 mt-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate">{song.title}</h3>

                <p className="text-xs text-gray-400 truncate mt-1">
                  {song.artist}
                </p>
              </div>

              {/* DELETE */}
              <button
                onClick={() => removeFavorite(song.songId)}
                title="Remove from favorites"
                className="shrink-0 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
