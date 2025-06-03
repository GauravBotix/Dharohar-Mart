import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { FaArrowLeft } from "react-icons/fa";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const params = useLocation();
  const searchText = params?.search?.slice(3);
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);
  const [isMobile] = useMobile();

  const redirectToSearch = () => {
    navigate("/search");
  };

  const handlechange = () => {
    navigate("/");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };

  return (
    <>
      <label className="input w-full flex bg-neutral-100 rounded-full">
        {isMobile && isSearchPage ? (
          <FaArrowLeft
            onClick={(e) => {
              e.stopPropagation();
              handlechange();
            }}
          />
        ) : (
          ""
        )}

        {!isSearchPage ? (
          <>
            {" "}
            <div className="pl-4 font-normal">
              <TypeAnimation
                sequence={[
                  "Search 'milk' ",
                  1000,
                  "Search 'bread' ",
                  1000,
                  "Search 'sugar' ",
                  1000,
                  "Search 'diapers' ",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            <input type="search" onClick={redirectToSearch} />
          </>
        ) : (
          <input
            type="search"
            autoFocus
            default={searchText}
            placeholder="Search for Atta, Dal, Rice"
            className="pl-2"
            onChange={handleOnChange}
          />
        )}

        <div className="h-[1.5em]">
          <svg
            className="h-[1.5em] opacity-70  "
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
        </div>
      </label>
    </>
  );
};

export default Search;
