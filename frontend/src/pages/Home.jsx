import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SongCard from "../components/SongCard";

import {
  searchSongs,
  saveSearchHistory,
} from "../services/musicApi";

function Home() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      setLoading(true);

      const results = await searchSongs(query);

      setSongs(results);

      await saveSearchHistory(query);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">

      {/* Header */}
      <div className="mb-7 sm:mb-9">
        <p className="text-blue-500 font-medium text-sm">
          MUSIC PLAYER
        </p>

        <h1 className="
          text-2xl
          sm:text-3xl
          lg:text-4xl
          font-bold
          mt-2
        ">
          Find Your Music 🎵
        </h1>

        <p className="
          text-gray-400
          text-sm
          sm:text-base
          mt-2
          max-w-xl
        ">
          Search your favorite singer or song and start listening.
        </p>
      </div>

      {/* Search */}
      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />

      {/* Loading */}
      {loading && (
        <div className="mt-8 text-blue-400 text-sm">
          Searching songs...
        </div>
      )}

      {/* Results */}
      {!loading && songs.length > 0 && (
        <section className="mt-9 sm:mt-12">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-semibold">
              Search Results
            </h2>

            <span className="text-xs sm:text-sm text-gray-500">
              {songs.length} songs
            </span>
          </div>

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-3
              sm:gap-4
              lg:gap-5
            "
          >
         {songs.map((song) => (
  <SongCard
    key={song.id}
    song={song}
    songs={songs}
  />
))}
          </div>

        </section>
      )}

      {/* Empty State */}
      {!loading && songs.length === 0 && (
        <div className="
          mt-12
          sm:mt-16
          text-center
          px-4
        ">
          <div className="text-5xl mb-4">
            🎧
          </div>

          <h2 className="text-lg sm:text-xl font-semibold">
            Search for your favorite music
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Try searching for an artist or song.
          </p>
        </div>
      )}

    </div>
  );
}

export default Home;