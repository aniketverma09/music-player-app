const API_URL = "http://localhost:5000";

// ===============================
// SEARCH SONGS
// ===============================

export async function searchSongs(query) {
  const response = await fetch(
    `${API_URL}/api/music/search?query=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search songs");
  }

  const data = await response.json();

  return data.songs;
}

// ===============================
// SEARCH HISTORY
// ===============================

export async function getSearchHistory() {
  const response = await fetch(`${API_URL}/api/history`);

  if (!response.ok) {
    throw new Error("Failed to fetch history");
  }

  const data = await response.json();

  return data.history;
}

export async function saveSearchHistory(query) {
  const response = await fetch(`${API_URL}/api/history`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save history");
  }

  return response.json();
}

// ===============================
// FAVORITES
// ===============================

// Get favorites
export async function getFavorites() {
  const response = await fetch(`${API_URL}/api/favorites`);

  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }

  const data = await response.json();

  return data.favorites;
}

// Add favorite
export async function addFavorite(song) {
  const response = await fetch(`${API_URL}/api/favorites`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      songId: String(song.id),
      title: song.title,
      artist: song.artist,
      image: song.image,
      audio: song.audio,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add favorite");
  }

  return response.json();
}

// Delete favorite
export async function deleteFavorite(songId) {
  const response = await fetch(
    `${API_URL}/api/favorites/${encodeURIComponent(String(songId))}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to remove favorite");
  }

  return response.json();
}
