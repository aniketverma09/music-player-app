import express from "express";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        query,
      )}&media=music&entity=song&limit=20`,
    );

    if (!response.ok) {
      throw new Error("Music API request failed");
    }

    const data = await response.json();

    const songs = data.results
      .filter((song) => song.previewUrl)
      .map((song) => ({
        id: song.trackId,
        title: song.trackName,
        artist: song.artistName,
        album: song.collectionName,
        image: song.artworkUrl100,
        audio: song.previewUrl,
        duration: song.trackTimeMillis,
        url: song.trackViewUrl,
      }));

    res.json({
      success: true,
      songs,
    });
  } catch (error) {
    console.error("Music search error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to search songs",
    });
  }
});

export default router;
