import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCart } from "../store/cartProductSlice";
import AxiosToastError from "../utils/AxiosError";

import discountPrice from "../utils/DiscountPrice";
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cartItem = useSelector((state) => state.cart.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_Cart,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(handleAddCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.update_Cart,
        data: {
          _id: id,
          qty: qty,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        fetchCart();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.delete_Cart,
        data: {
          _id: id,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        fetchCart();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_address,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_order_items,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setOrder(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const qty = cartItem.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    setTotalQty(qty);
    const price = cartItem.reduce((prev, curr) => {
      return (
        prev +
        discountPrice(curr?.productId?.price, curr?.productId?.discount) *
          curr?.quantity
      );
    }, 0);
    setTotalPrice(price);
    const notDiscountPrice = cartItem.reduce((preve, curr) => {
      return preve + curr?.productId?.price * curr.quantity;
    }, 0);
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(handleAddCart([]));
  };

  useEffect(() => {
    fetchCart();
    fetchAddress();
    fetchOrder();
  }, [user]);

  // useEffect(() => {
  //   fetchCart();
  //   fetchAddress();
  //   fetchOrder();
  // }, []);

  return (
    <GlobalContext.Provider
      value={{
        fetchCart,
        updateCartItem,
        deleteCartItem,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
        handleLogOut,
        fetchAddress,
        fetchOrder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
