import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="mb-6">
      <div className="relative w-full md:w-1/3">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full
            pl-10 pr-4 py-2.5
            rounded-xl
            border border-gray-300
            bg-white
            text-gray-700
            placeholder-gray-400
            shadow-sm
            transition-all duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            focus:shadow-md
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;
