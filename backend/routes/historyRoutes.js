import express from "express";
import SearchHistory from "../models/SearchHistory.js";

const router = express.Router();

// Add search history
router.post("/", async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const history = await SearchHistory.create({
      query: query.trim(),
    });

    res.status(201).json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save search history",
    });
  }
});

// Get search history
router.get("/", async (req, res) => {
  try {
    const history = await SearchHistory.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch search history",
    });
  }
});

// Delete history item
router.delete("/:id", async (req, res) => {
  try {
    await SearchHistory.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "History deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete history",
    });
  }
});

export default router;