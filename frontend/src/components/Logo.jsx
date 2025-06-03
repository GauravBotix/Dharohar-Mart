import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <>
      <div className="flex-row">
        <Link to='/' className="flex"><img src={logo}  alt="" className="h-30 items-center flex p-5 -mt-7 " /></Link>
      </div>
    </>
  );
};

export default Logo;
