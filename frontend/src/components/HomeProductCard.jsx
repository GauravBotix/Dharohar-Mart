import React, { useState } from "react";
import { Link } from "react-router-dom";
import validUrl from "../utils/validUrl";
import DisplayPrice from "../utils/DisplayPrice";
import discountPrice from "../utils/DiscountPrice";

import AddToCartButton from "./AddToCartButton";

const HomeProductCard = ({ item }) => {
  const url = `/product/${validUrl(item?.name)}-${item?._id}`;

  return (
    <Link to={url} >
      <div className="card bg-base-100 shadow-md  shadow-neutral-400 ">
        <figure className="">
          <img src={item?.image[0]} alt="" className="object-scale-down" />
        </figure>
        <div className="card-body">
          <div className="badge bg-green-200 ">10 min</div>
          <h2 className="card-title text-ellipsis line-clamp-1 text-sm">
            {item?.name}
          </h2>
          <div className="  badge ">{item?.unit}</div>

          <div className="card-actions justify-around">
            <div className="font-semibold">
              {DisplayPrice(discountPrice(item?.price, item?.discount))}
            </div>
            <div className={` `}>
              {item?.stock == 0 ? (
                <p className="text-red-600 font-bold pt-1 text-xs cursor-default text-center">Out Of Stock</p>
              ) : (
                <AddToCartButton item={item}  />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeProductCard;
