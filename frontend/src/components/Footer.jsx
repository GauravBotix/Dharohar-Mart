import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
} from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="border-t-1 z-2 sticky h-full ">
      <div className="container mx-auto justify-center items-center lg:justify-between lg:flex-row flex-col  text-center flex gap-y-2 p-3 lg:p-3 ">
        <div>
          Copyright © {new Date().getFullYear()} - All right reserved by
          Dharohar Mart
        </div>

        <div className="flex justify-center items-center gap-x-4 text-2xl ">
          <a href="" className="hover:text-blue-700">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-pink-700">
            <FaInstagram />
          </a>
          <a href="" className="hover:text-blue-700">
            <FaLinkedin />
          </a>
          <a href="" className="hover:text-neutral-700">
            <FaSquareXTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
