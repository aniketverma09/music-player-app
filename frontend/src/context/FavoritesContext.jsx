import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "../services/musicApi";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // LOAD FAVORITES FROM MONGODB
  // ===============================

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);

      const data = await getFavorites();

      setFavorites(data || []);
    } catch (error) {
      console.error(
        "Failed to load favorites:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // CHECK FAVORITE
  // ===============================

  const isFavorite = (songId) => {
    return favorites.some(
      (item) =>
        String(item.songId) === String(songId)
    );
  };

  // ===============================
  // ADD / REMOVE FAVORITE
  // ===============================

  const toggleFavorite = async (song) => {
    try {
      const alreadyFavorite = isFavorite(song.id);

      // REMOVE
      if (alreadyFavorite) {
        await deleteFavorite(song.id);

        setFavorites((prev) =>
          prev.filter(
            (item) =>
              String(item.songId) !==
              String(song.id)
          )
        );

        return;
      }

      // ADD
      const data = await addFavorite(song);

      if (data.favorite) {
        setFavorites((prev) => [
          data.favorite,
          ...prev,
        ]);
      }
    } catch (error) {
      console.error(
        "Favorite error:",
        error
      );
    }
  };

  // ===============================
  // REMOVE FROM FAVORITES PAGE
  // ===============================

  const removeFavorite = async (songId) => {
    try {
      await deleteFavorite(songId);

      setFavorites((prev) =>
        prev.filter(
          (item) =>
            String(item.songId) !==
            String(songId)
        )
      );
    } catch (error) {
      console.error(
        "Remove favorite error:",
        error
      );
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        isFavorite,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}