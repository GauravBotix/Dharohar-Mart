import React, { useEffect, useRef } from "react";

const SearchProduct = ({ handleSearch, search }) => {
  const inputRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);

  return (
    <div>
      <label htmlFor=""></label>
      <label className="input rounded-full " htmlFor="search">
        <input
          type="search"
          ref={inputRef}
          id="search"
          required
          placeholder="Search"
          className="text-md font-semibold  text-neutral-700 pl-1 "
          value={search}
          onChange={handleSearch}
        />
        <svg
          className="lg:h-[1.5em] h-[1em] opacity-70"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      </label>
    </div>
  );
};

export default SearchProduct;
