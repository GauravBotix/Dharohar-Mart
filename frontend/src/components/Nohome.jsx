import React from "react";
import nohome from "../assets/nohome.png";
const Nohome = () => {
  return (
    <section className="col-span-full text-center ">
      <img
        src={nohome}
        alt="No products found"
        className="h-68 w-68 m-auto bg-transparent grid grid-center "
      />
      <div className="text-center  text-xl font-bold">
        <p className="text-red-600 text-3xl uppercase">Sorry!!!</p>
        "No Address found "
      </div>
    </section>
  );
};

export default Nohome;
