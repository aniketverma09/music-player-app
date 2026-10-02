import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import { searchSongs } from "../services/musicApi";

function Discover() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState("Trending");

  const genres = [
    "Trending",
    "Bollywood",
    "Punjabi",
    "Romantic",
    "Lo-fi",
    "Party",
  ];

  const loadSongs = async (genre) => {
    try {
      setLoading(true);

      const query = genre === "Trending" ? "popular songs" : `${genre} songs`;

      const results = await searchSongs(query);

      setSongs(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error("Discover error:", error);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSongs("Trending");
  }, []);

  const handleGenre = (genre) => {
    setActiveGenre(genre);
    loadSongs(genre);
  };

  return (
    <main className="discover-page">
      {/* HERO */}
      <section className="discover-hero">
        <div>
          <span className="discover-small-title">DISCOVER</span>

          <h1>
            Find your next
            <span> favorite song</span>
          </h1>

          <p>
            Explore trending music, new releases and songs you'll love listening
            to.
          </p>
        </div>

        <div className="discover-hero-icon">🎧</div>
      </section>

      {/* CATEGORIES */}
      <section className="discover-categories">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-pill ${activeGenre === genre ? "active" : ""}`}
            onClick={() => handleGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </section>

      {/* SONGS */}
      <section className="discover-songs">
        <div className="discover-section-header">
          <div>
            <h2>{activeGenre}</h2>
            <p>Music picked for you</p>
          </div>

          <span className="song-count">{songs.length} songs</span>
        </div>

        {loading ? (
          <div className="discover-loading">
            <div className="loading-spinner"></div>
            <p>Finding music for you...</p>
          </div>
        ) : songs.length > 0 ? (
          <div className="discover-grid">
            {songs.map((song, index) => (
              <div
                className="discover-card-wrapper"
                key={song.id ?? song.songId ?? index}
              >
                <SongCard song={song} songs={songs} />
              </div>
            ))}
          </div>
        ) : (
          <div className="discover-empty">
            <div>🎵</div>
            <h3>No songs found</h3>
            <p>Try another category.</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Discover;
