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

  const redirectToLogin = () => {
    navigate('/login');
  }
  // const redirectToSignup = () => {
  //   navigate('/signup');
  // }
  const isSearchPage = location.pathname === "/search";

  return (
    <header className="md:h-20 lg:shadow-sm items-center pt-2 fixed right-0 left-0 flex-col z-1 bg-neutral-100  font-semibold">
      {!(isSearchPage && isMobile) && (
        <nav className=" flex justify-between ">
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
                  <button onClick={redirectToLogin} className="text-md px-4 py-1 bg-blue-500 text-white cursor-pointer   hover:bg-blue-400 hover:text-white font-semibold    rounded">Login</button>
            
                  {/* <button onClick={redirectToSignup} className="text-md px-4 bg-blue-500 text-white cursor-pointer  py-1 hover:bg-blue-400 hover:text-white font-semibold    rounded">Signup</button> */}
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
        <div className="mx-auto md:hidden w-full px-4 mt-[-35px]">
          <Search />
        </div>
      )}
    </header>
  );
};

export default Header;
