import React from "react";
import  personalCare  from "../assets/personalCare.jpg";
import  dairy  from "../assets/dairy.jpg";
import  fruits  from "../assets/fruits.jpg";
import  grains  from "../assets/grains.jpg";
import  grocerry  from "../assets/grocerry.jpg";

const BannerCarousel = () => {
  return (
    <div>
      <div className="carousel w-full lg:h-130  rounded-lg">
        <div id="item1" className="carousel-item w-full">
          <img
            src={grocerry}
            className="w-full"
          />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img
            src={fruits}
            className="w-full"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src={grains}
            className="w-full"
          />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img
            src={dairy}
            className="w-full"
          />
        </div>
        <div id="item5" className="carousel-item w-full">
          <img
            src={personalCare}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2 ">
        <a href="#item1" className="border text-center  text-sm rounded-full w-5  h-5 font-semibold active:bg-neutral-500 active:text-red-500 bg-neutral-400 text-white  ">
          1
        </a>
        <a href="#item2" className="border text-center  text-sm rounded-full w-5  h-5 font-semibold active:bg-neutral-500 active:text-red-500 bg-neutral-400 text-white  ">
          2
        </a>
        <a href="#item3" className="border text-center  text-sm rounded-full w-5  h-5 font-semibold active:bg-neutral-500 active:text-red-500 bg-neutral-400 text-white  ">
          3
        </a>
        <a href="#item4" className="border text-center  text-sm rounded-full w-5  h-5 font-semibold active:bg-neutral-500 active:text-red-500 bg-neutral-400 text-white  ">
          4
        </a>
        <a href="#item5" className="border text-center  text-sm rounded-full w-5  h-5 font-semibold active:bg-neutral-500 active:text-red-500 bg-neutral-400 text-white  ">
          5
        </a>
      </div>
    </div>
  );
};

export default BannerCarousel;
