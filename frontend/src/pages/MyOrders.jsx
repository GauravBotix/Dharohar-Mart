import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrders = () => {
  const orders = useSelector((state) => state.order?.order);

  return (
    <section className=" min-h-[70vh] px-4 pl-4 pr-4 ">
      <div className="p-3 bg-white shadow-md  shadow-neutral-300 mb-4 rounded-lg flex items-center justify-between ">
        <h1 className="font-semibold text-neutral-700 uppercase text-xl ">
          Orders
        </h1>
      </div>

      {!orders[0] && <NoData />}
      {orders?.map((order, index) => {
        return (
          <div
            key={order._id + index + "order"}
            className=" my-2 p-4 w-full text-sm  bg-neutral-300 rounded-lg grid gap-y-3 py-5 px-4"
          >
            <p className="font-semibold">Order No :<span className="text-green-600 font-semibold pl-3">{order?.orderId}</span> </p>
            <div className="flex gap-3">
              <img
                src={order?.product_details?.image[0]}
                className="w-14 h-14  rounded-md "
              />
              <p className="font-semibold text-sm mt-4 uppercase">{order?.product_details?.name}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default MyOrders;
