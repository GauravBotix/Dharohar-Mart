import React from "react";

const LoadingProductCard = () => {
  return (
    <div className="flex flex-col gap-4 w-50 ">
      <div className="skeleton h-32 w-full  bg-neutral-300"></div>
      <div className="skeleton h-4 w-28  bg-neutral-300"></div>
      <div className="skeleton h-4 w-full  bg-neutral-300"></div>
      <div className="skeleton h-4 w-full  bg-neutral-300"></div>
    </div>
  );
};

export default LoadingProductCard;
