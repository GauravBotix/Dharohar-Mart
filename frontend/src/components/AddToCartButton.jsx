import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";
import { useState } from "react";
import Axios from "../utils/Axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ item }) => {
  const { fetchCart, updateCartItem, deleteCartItem } = useGlobalContext();
  const cartItem = useSelector((state) => state.cart.cart);
  const [isAvailbleCart, setIsAvailableCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemDetails, setCartItemDetails] = useState();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.add_to_cart,
        data: {
          productId: item?._id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCart) {
          fetchCart();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAvailability = cartItem.some(
      (pro) => pro?.productId?._id === item?._id
    );
    setIsAvailableCart(checkAvailability);

    const product = cartItem.find((ele) => ele?.productId?._id === item?._id);
    setQty(product?.quantity);
    setCartItemDetails(product);
  }, [item, cartItem]);

  const increaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await updateCartItem(cartItemDetails?._id, qty + 1);

    if (response.success) {
      toast.success("Item added");
    }
  };
  const decreaseQty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) {
      deleteCartItem(cartItemDetails?._id);
    } else {
      const response = await updateCartItem(cartItemDetails?._id, qty - 1);
      if (response.success) {
        toast.success("Item removed");
      }
    }
  };
  return (
    <div >
      {isAvailbleCart ? (
        <div className="flex w-full h-full">
          <button
            onClick={decreaseQty}
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white   p-1 rounded flex items-center justify-center"
          >
            <FaMinus />
          </button>

          <p className="flex-1   font-semibold px-1 flex items-center justify-center">
            {qty}
          </p>

          <button
            onClick={increaseQty}
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white p-1 rounded flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className=" border border-green-500 items-center  px-2 rounded bg-green-500 hover:bg-green-600 cursor-pointer"
        >
          Add
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
