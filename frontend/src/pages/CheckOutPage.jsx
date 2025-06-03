import React, { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayPrice from "../utils/DisplayPrice";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { LuMapPinHouse } from "react-icons/lu";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";

const CheckOutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCart, fetchOrder } =
    useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state?.address?.addressList);
  const [selectAddress, setSelectAddress] = useState(0);
  const cartItemsList = useSelector((state) => state?.cart?.cart);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.cash_on_delivery,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCart) {
          fetchCart();
        }
        if (fetchOrder) {
          fetchOrder();
        }
        navigate("/success", {
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
      navigate("/dashboard/address");
    }
  };

  const handleOnlinePayment = async () => {
    try {
      toast.loading("Loading...");
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey);
      const response = await Axios({
        ...SummaryApi.online_payment,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });
      const { data: responseData } = response;
      toast.dismiss();
      fetchCart();
      fetchOrder();
      stripePromise.redirectToCheckout({ sessionId: responseData?.id });
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-neutral-100 min-h-[100vh] ">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between">
        <div className="w-full">
          {/***address***/}
          <h3 className={`text-xl font-bold text-center uppercase mb-3`}>
            {!addressList[0] ? " Add Address" : " Choose Address"}
          </h3>
          <div
            className={` ${
              !addressList[0] ? "bg-neutral-100" : "bg-neutral-300"
            } p-4 grid gap-4 rounded-lg`}
          >
            {addressList.map((address, index) => {
              return (
                <label
                  htmlFor={"address" + index}
                  key={"add-" + index}
                  className={!address.status && "hidden"}
                >
                  <div className="border rounded p-3 flex gap-3 bg-neutral-100">
                    <div>
                      <input
                        id={"address" + index}
                        type="radio"
                        value={index}
                        onChange={(e) =>
                          setSelectAddress(Number(e.target.value))
                        }
                        name="address"
                      />
                    </div>
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>
                        {address.country} - {address.pincode}
                      </p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-neutral-100 font-semibold  border-2 border-dashed flex gap-2 justify-center items-center cursor-pointer"
            >
              <LuMapPinHouse size={30} className="hover:scale-105" />
              Add address
            </div>
          </div>
        </div>

        <div className="w-full max-h-[50vh]  mt-10  max-w-md bg-neutral-100 border border-neutral-300 rounded-lg p-5">
          <div className="bg-neutral-100 p-4">
            <h3 className="font-bold text-xl  text-green-600 uppercase underline text-center -mt-1 mb-10">
              Billing details
            </h3>
            <div className="flex gap-4  justify-between ">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {DisplayPrice(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPrice(totalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ">
              <p>Quntity total</p>
              <p className="flex items-center gap-2">{totalQty} item</p>
            </div>
            <div className="flex gap-4 justify-between ">
              <p>Delivery Charge</p>
              <p className="flex items-center gap-2">Free</p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{DisplayPrice(totalPrice)}</p>
            </div>
          </div>

          <div className="grid gap-4 mt-9 w-full">
            <button
              className={`py-2 px-4 hover:bg-white border-2 border-green-700 bg-green-700 hover:text-green-700 text-white cursor-pointer rounded  font-semibold $`}
              onClick={handleOnlinePayment}
            >
              Online Payment
            </button>

            <button
              className="py-2 px-4 cursor-pointer  font-semibold rounded hover:bg-white border-2 border-green-700 bg-green-700 hover:text-green-700 text-white "
              onClick={handleCashOnDelivery}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress setOpenAddress={setOpenAddress} />}
    </section>
  );
};

export default CheckOutPage;
