import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { FaCartShopping } from "react-icons/fa6";
import DisplayPrice from "../utils/DisplayPrice";
import { Link } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";


const CartMobile = ({close}) => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cart.cart);

  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 p-2">
          <div className="bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden">
            <div className="flex items-center gap-2">
              <Link to='/cart'  className="p-2 bg-green-600  text-white text-lg rounded cursor-pointer  ">
                <FaCartShopping  className="animate-bounce"/>
              </Link>
              <div className="text-xs">
                <p>{totalQty} items</p>
                <p>{DisplayPrice(totalPrice)}</p>
              </div>
            </div>

            <Link to={"/Cart"} className="flex items-center gap-1">
              <span className="text-sm">View Cart</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobile;
