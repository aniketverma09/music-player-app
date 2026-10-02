import express from "express";
import Favorite from "../models/Favorite.js";

const router = express.Router();

// GET ALL FAVORITES
router.get("/", async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      favorites,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch favorites",
    });
  }
});

// ADD FAVORITE
router.post("/", async (req, res) => {
  try {
    const { songId, title, artist, image, audio } = req.body;

    if (!songId || !title || !artist || !image || !audio) {
      return res.status(400).json({
        success: false,
        message: "All song details are required",
      });
    }

    const existingFavorite = await Favorite.findOne({
      songId: String(songId),
    });

    if (existingFavorite) {
      return res.json({
        success: true,
        message: "Song already in favorites",
        favorite: existingFavorite,
      });
    }

    const favorite = await Favorite.create({
      songId: String(songId),
      title,
      artist,
      image,
      audio,
    });

    res.status(201).json({
      success: true,
      message: "Song added to favorites",
      favorite,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add favorite",
    });
  }
});

// DELETE FAVORITE
router.delete("/:songId", async (req, res) => {
  try {
    const deletedFavorite = await Favorite.findOneAndDelete({
      songId: String(req.params.songId),
    });

    if (!deletedFavorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.json({
      success: true,
      message: "Favorite removed",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to remove favorite",
    });
  }
});

export default router;
