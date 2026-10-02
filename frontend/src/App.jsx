import "./App.css";
import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Menu, Music2 } from "lucide-react";

import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Favorites from "./pages/Favorites";
import History from "./pages/History";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main
        className="
          min-h-screen
          bg-[#05070d]
          text-white

          ml-0
          md:ml-64

          pb-32
        "
      >
        {/* Mobile Header */}
        <header
          className="
          sticky
          top-0
          z-30
          md:hidden

          flex
          items-center
          justify-between

          px-4
          py-3

          bg-[#05070d]/95
          backdrop-blur

          border-b
          border-blue-500/10
        "
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2rounded-lg bg-[#0b0f19] border border-blue-500/10 "
          >
            <Menu size={21} />
          </button>

          <div className="flex items-center gap-2">
            <div className="   bg-blue-600   p-1.5  rounded-lg">
              <Music2 size={17} />
            </div>

            <span className="font-semibold text-sm">Music Player</span>
          </div>

          <div className="w-9" />
        </header>

        {/* Pages */}
        <div className="  p-4 sm:p-6 lg:p-8  xl:p-10">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/discover" element={<Discover />} />
            <Route path="/favorites" element={<Favorites />} />

            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </main>

      <MusicPlayer />
    </BrowserRouter>
  );
}

export default App;
