import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayPrice from "../utils/DisplayPrice";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import DiscountPrice from "../utils/DiscountPrice";
import imageEmpty from "../assets/imageEmpty.png";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";

const CartDrawerModal = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      if (close) {
        close();
      }
      return;
    }
    toast("Please Login");
  };
  return (
    <section className="z-10000 shadow-xl shadow-neutral-800 fixed top-0  bottom-0 right-0 left-0 bg-opacity-70 ">
      <div className="bg-neutral-100 w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-bold uppercase text-xl">Cart</h2>
          <Link
            to={"/"}
            className="hover:bg-black hover:text-white rounded-full cursor-pointer lg:hidden"
          >
            <IoClose size={20} />
          </Link>
          <button
            
            onClick={close}
            className="hover:bg-black hover:text-white rounded-full cursor-pointer hidden lg:block"
          >
            <IoClose size={20} />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-neutral-100  p-2 flex flex-col gap-4">
          {cartItem[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 shadow shadow-neutral-600  text-green-600 rounded-full">
                <p>Your total savings</p>
                <p>{DisplayPrice(notDiscountTotalPrice - totalPrice)}</p>
              </div>
              <div className="bg-neutral-100 font-bold text-sm rounded-lg px-4 py-1 grid gap-4 overflow-y-scroll hide-scrollbar">
                {cartItem[0] &&
                  cartItem.map((item, index) => {
                    return (
                      <div
                        key={item?._id + index}
                        className="flex  w-full gap-4 border bg-neutral-300 border-neutral-300 shadow-neutral-400 shadow-md rounded-lg p-3 "
                      >
                        <div className="w-16 h-16 min-h-16 min-w-16 bg-neutral-100  rounded">
                          <img
                            src={item?.productId?.image[0]}
                            className="object-scale-down rounded-lg "
                          />
                        </div>
                        <div className="w-full max-w-sm text-xs">
                          <p className="text-xs text-ellipsis line-clamp-2">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-500">
                            {item?.productId?.unit}
                          </p>
                          <p className="font-semibold text-sm">
                            {DisplayPrice(
                              DiscountPrice(
                                item?.productId?.price,
                                item?.productId?.discount
                              )
                            )}
                          </p>
                        </div>
                        <div className="my-auto">
                          <AddToCartButton item={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="bg-neutral-100 p-4  ">
                <h3 className="font-bold text-center text-green-600 underline  w-full text-xl ">
                  Bill details
                </h3>
                <div className="flex gap-4 justify-between mt-5 ml-1">
                  <p>Items Total</p>
                  <p className="flex items-center gap-2">
                    <span className="line-through text-neutral-400">
                      {DisplayPrice(notDiscountTotalPrice)}
                    </span>
                    <span>{DisplayPrice(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Total Quantity</p>
                  <p className="flex items-center gap-2">{totalQty} item</p>
                </div>
                <div className="flex gap-4 justify-between ml-1">
                  <p>Delivery Charge</p>
                  <p className="flex items-center gap-2">Free</p>
                </div>
                <div className="font-semibold flex items-center ml-1 justify-between gap-4">
                  <p>Grand total</p>
                  <p>{DisplayPrice(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-full text-center mt-10 bg-neutral-100 flex flex-col mb-auto justify-center  items-center">
              <img
                src={imageEmpty}
                alt="Empty cart"
                className="h-68 w-68  m-auto mt-10 bg-transparent grid grid-center rounded-full"
              />
              <div className="text-center mb-10 text-xl font-bold">
                <p className="text-red-600 text-3xl uppercase">Sorry!!!</p>
                'Your Cart Is Empty.'
              </div>
              <Link
                onClick={close}
                to={"/"}
                className="block bg-green-600 px-4 py-2 text-white rounded"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItem[0] && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div>{DisplayPrice(totalPrice)}</div>
              <button
                onClick={redirectToCheckoutPage}
                className="flex items-center gap-1 cursor-pointer"
              >
                Proceed
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartDrawerModal;
