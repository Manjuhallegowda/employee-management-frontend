export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-6 relative max-w-md mx-auto">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search employees by name..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
      />
      {/* Search icon */}
      <svg
        className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" strokeWidth="2" />
        <line x1="16.65" y1="16.65" x2="21" y2="21" strokeWidth="2" />
      </svg>

      {/* Clear search button */}
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  );
}