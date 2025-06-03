import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <section className=" min-h-[70vh] ">
      <div className=" w-full max-w-md bg-red-200 p-4 py-5 rounded-lg  m-2 mx-auto flex flex-col justify-center items-center gap-5">
        <p className="text-red-800 font-bold text-lg text-center">
          Order Cancel
        </p>
        <Link
          to="/"
          className="border rounded-lg border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all px-4 py-1"
        >
          Go To Home
        </Link>
      </div>
    </section>
  );
};

export default Cancel;
