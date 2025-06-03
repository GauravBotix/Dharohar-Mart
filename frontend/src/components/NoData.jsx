import React from "react";
import nodata from "../assets/nodata.png";
const NoData = () => {
  return (
     <section className="col-span-full text-center mt-10">
          <img
            src={nodata}
            alt="No orders"
            className="h-68 w-68 m-auto bg-transparent grid grid-center rounded-full "
          />
          <div className="text-center  text-xl font-bold">
            <p className="text-red-600 text-3xl uppercase">Sorry!!!</p>
            "No orders Yet!!!"
          </div>
        </section>
  );
};

export default NoData;
