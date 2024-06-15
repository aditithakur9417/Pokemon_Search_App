// /components/SearchForm.js
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Select from 'react-select'

const SearchForm = ({ types, onSearch, filterByType }) => {
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    // Handle search click
    e.preventDefault();
    onSearch(type, search, false);
  };

  const handleTypeChange = (value) => {
    // handle pokemon type change

    setType(value);
    setSearch("");
    filterByType(value, '');
  };

  const clearSearch = (e) => {
    // clear input
    e.preventDefault();
    setSearch("");
    onSearch(type, "", true);
  };
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start space-y-4"
    >

<Select
      value={type ? { label: type, value: type } : null}
      onChange={(selectedOption) => handleTypeChange(selectedOption.value)}
      options={types.map((type) => ({ label: type, value: type }))}
      className="w-full sm:w-48 md:w-64 lg:w-80 xl:w-96"
      
      placeholder="Select"
    />
      <div className="flex">
        <div className="relative min-w-6 w-3/4">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch(type, e.target.value, true);
            }}
            placeholder="Search..."
            className=" border-gray-300 border-none rounded-l-[5px] pl-8 pr-4 py-2 w-full"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoIosSearch className="text-gray-400" />
          </div>
        </div>
        <button
          type="submit"
          className="p-2 bg-[#004368] text-white rounded-r-md"
        >
          Search
        </button>
        &nbsp;
        <button
          onClick={clearSearch}
          className="p-2 bg-[#2d6800] text-white rounded-md"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
