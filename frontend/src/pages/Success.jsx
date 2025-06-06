import React from "react";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();

  // console.log("location");
  return (
    <section className="min-h-[70vh] ">
      <div className=" w-full max-w-md m-2 mx-auto bg-green-200 p-4 py-5 rounded-lg  flex flex-col justify-center items-center gap-5">
        <p className="text-green-800 font-bold text-lg text-center">
          {Boolean(location?.state?.text) ? location?.state?.text : "Payment"}{" "}
          Successfully
        </p>
        <Link
          to="/"
          className=" rounded-lg border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1"
        >
          Go To Home
        </Link>
      </div>
    </section>
  );
};

export default Success;
