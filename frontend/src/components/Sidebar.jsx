import { NavLink } from "react-router-dom";
import { Home, Compass, Heart, History, Music2, X } from "lucide-react";

function Sidebar({ isOpen, setIsOpen }) {
  const links = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Discover",
      path: "/discover",
      icon: Compass,
    },
    {
      name: "Favorites",
      path: "/favorites",
      icon: Heart,
    },
    {
      name: "History",
      path: "/history",
      icon: History,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-64
          bg-[#080b12]
          border-r border-blue-500/10
          p-5
          transition-transform
          duration-300
          
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Music2 size={21} />
            </div>

            <h1 className="text-lg font-bold">Music Player</h1>
          </div>

          {/* Mobile Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-blue-500/10 hover:text-white"
                  }
                  `
                }
              >
                <Icon size={19} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-6 left-5 text-xs text-gray-600">
          React Music Player
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
