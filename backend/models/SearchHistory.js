import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SearchHistory = mongoose.model(
  "SearchHistory",
  searchHistorySchema
);

export default SearchHistory;