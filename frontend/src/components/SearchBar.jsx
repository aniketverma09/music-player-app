import { Search } from "lucide-react";

function SearchBar({ query, setQuery, onSearch }) {
  return (
    <form
      onSubmit={onSearch}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl"
    >
      <div className="relative flex-1">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search singer or song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            bg-[#0b0f19]
            border border-blue-500/20
            rounded-xl
            py-3.5
            pl-12
            pr-4
            text-sm sm:text-base
            text-white
            placeholder:text-gray-600
            outline-none
            focus:border-blue-500
            transition
          "
        />
      </div>

      <button
        type="submit"
        className="
          w-full
          sm:w-auto
          px-7
          py-3.5
          rounded-xl
          bg-blue-600
          hover:bg-blue-700
          active:scale-95
          transition
          font-medium
          text-sm sm:text-base
        "
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;