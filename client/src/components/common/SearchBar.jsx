import { Search } from "lucide-react";
import { useState } from "react";


const SearchBar = ({ toggleSearchBar, setSearchOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Search Term:  ${searchTerm}`);
    setSearchOpen(false);
  }

  return (
    <form onSubmit={handleSearch} className={`w-full p-1 bg-white rounded-full h-full flex items-center shadow z-4000! overflow-hidden`}>
      {/* <div className="relative flex w-full h-full"> */}
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value)}}
          className="bg-gray-200 rounded-l-full h-full w-full px-4 py-2 pl-6 md:pl-10 focus:outline-none"
          placeholder="Search"
          />
        <button type="submit" className="bg-gray-900 text-white h-full px-4 pl-3 rounded-r-full flex items-center gap-2 text-sm md:text-base cursor-pointer">
          <Search size={18} className="-mt-px" />
          <span className="hidden md:inline-block"> Search </span>
        </button>
    </form>
  )
}

export default SearchBar;