import React from "react";
import Search from "./Search";
import Cart from "./Cart";
import Logo from "./Logo";
import useMobile from "../hooks/useMobile";
import {  useLocation, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <header className="md:h-20 lg:shadow-sm items-center z-10000 pt-2 fixed right-0 left-0 flex-col  bg-neutral-100  font-semibold">
      {!(isSearchPage && isMobile) && (
        <nav className=" flex justify-between  ">
          {/* logo */}
          <div>
            <Logo />
          </div>
          {/* search */}
          <div className="md:block hidden py-3 min-w-lg">
            <Search />
          </div>
          {/* avatar  and cart */}
          <div className="flex justify-evenly gap-1 md:gap-4 pt-2">
            <div className="md:block hidden">
              <Cart />
            </div>
            <div className="pr-2">
              {user?._id ? (
                <Avatar />
              ) : (
                <div className="flex my-2 gap-x-1 cursor-pointer">
                  <button
                    onClick={redirectToLogin}
                    className="text-md px-4 py-1 bg-blue-500 text-white cursor-pointer   hover:bg-blue-400 hover:text-white font-semibold    rounded"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}

      {isSearchPage ? (
        <div className="mx-auto md:hidden w-full px-4 py-4">
          <Search />
        </div>
      ) : (
        <div className="mx-auto md:hidden w-full px-4 mt-[-15px]">
          <Search />
        </div>
      )}
    </header>
  );
};

export default Header;
