import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    songId: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    artist: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    audio: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;