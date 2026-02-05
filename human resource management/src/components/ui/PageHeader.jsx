import SearchBar from "../ui/SearchBar"; // adjust path if needed

const PageHeader = ({
  title,
  searchValue,
  onSearchChange,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

      {/* Search + Button Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
        {/* Search Bar */}
        {searchValue !== undefined && onSearchChange && (
          <div className="w-full md:w-1/2">
            <SearchBar
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchValue}
              onChange={onSearchChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        )}

        {/* Action Button */}
        {buttonText && (
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
