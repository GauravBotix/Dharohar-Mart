import React, { useEffect, useRef } from "react";

import DisplayPrice from "../utils/DisplayPrice";
import { useSelector } from "react-redux";
import { useGlobalContext } from "../provider/GlobalProvider";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartDrawerModal from "./CartDrawerModal";

const Cart = () => {
  const cartItem = useSelector((state) => state.cart.cart);
  const { totalPrice, totalQty } = useGlobalContext();
  const [cartOpenModal, setCartOpenModal] = useState(false);

  const handleCloseCartModal = () => {
    setCartOpenModal(false);
  };

  return (
    <>
      <div className=" dropdown dropdown-end text-base ">
        <div
          tabIndex={0}
          role="button"
          className="pr-4 pt-2 hover:animate-bounce drop-shadow-xl "
        >
          {/*  btn btn-ghost btn-circle*/}
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7  "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />{" "}
            </svg>
            <span className="badge badge-sm indicator-item rounded-full h-5 w-5 bg-green-900 text-white">
              {cartItem[0] ? totalQty : 0}
            </span>
          </div>
        </div>
        <div
          tabIndex={0}
          className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
        >
          <div className="card-body ">
            <span className="font-bold">{totalQty} Items</span>
            <span className="text-info text-md capitalize">
              Subtotal:{" "}
              <span className="pl-2 text-lg text-green-600">
                {DisplayPrice(totalPrice)}
              </span>
            </span>
            <div className="card-actions">
              <button
                onClick={() => {
                  setCartOpenModal(true);
                }}
                className="btn btn-primary btn-block"
              >
                View cart
              </button>
            </div>
          </div>
        </div>

        {cartOpenModal && <CartDrawerModal close={handleCloseCartModal} />}
      </div>
    </>
  );
};

export default Cart;
