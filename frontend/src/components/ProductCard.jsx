import React from "react";

const ProductCard = ({ data }) => {
  return (
    <div className="card bg-base-100 shadow-xl shadow-gray-300">
      <figure>
        <img src={data?.image[0]} alt={data?.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-ellipsis line-clamp-2 font-medium text-md ">
          {data?.name}
        </h2>
        <p className="text-neutral-500">{data.unit}</p>
      </div>
    </div>
  );
};

export default ProductCard;
