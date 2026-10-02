import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { PlayerProvider } from "./context/PlayerContext";
import { FavoritesProvider } from "./context/FavoritesContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayerProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </PlayerProvider>
  </React.StrictMode>
);