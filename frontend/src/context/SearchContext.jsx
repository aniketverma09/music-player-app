import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider
      value={{
        songs,
        setSongs,
        query,
        setQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}