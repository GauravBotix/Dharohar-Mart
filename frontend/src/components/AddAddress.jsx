import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";

const AddAddress = ({ setOpenAddress }) => {
  const { fetchAddress } = useGlobalContext();

  const { register, handleSubmit, reset, setFocus } = useForm();
  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      const response = await Axios({
        ...SummaryApi.add_address,
        data: {
          address_line: data.addressline,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        modalRef.current.close();
        setOpenAddress(false);
        fetchAddress();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const modalRef = useRef();

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
    setTimeout(() => {
      setFocus("addressline");
    }, 50);
  }, []);
  return (
    <section>
      <dialog ref={modalRef} id="my_modal_3" className="modal modal-middle">
        <div className="modal-box relative ">
          <div className="p-3 bg-white rounded-lg shadow-md shadow-neutral-300 mb-4 flex items-center justify-between ">
            <h1 className="font-semibold mx-auto  text-neutral-700 uppercase text-xl ">
              Add Address
              <button
                className="absolute ml-30 cursor-pointer items-center "
                onClick={() => {
                  modalRef.current.close();
                  setOpenAddress(false);
                }}
              >
                <IoCloseCircle size={25} />
              </button>
            </h1>
          </div>
          <div>
            <form
              className="mt-4 grid bg-neutral-300 p-4 rounded-lg gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid gap-1">
                <label htmlFor="addressline" className="font-semibold">
                  Address Line :
                </label>
                <input
                  type="text"
                  id="addressline"
                  placeholder="Enter Your delivery address"
                  className="border-1 border-neutral-300 bg-neutral-100 p-2 rounded"
                  {...register("addressline", { required: true })}
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="city" className="font-semibold">
                  City :
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter Your current city"
                  className="border-1 border-neutral-300 bg-neutral-100 p-2 rounded"
                  {...register("city", { required: true })}
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="state" className="font-semibold">
                  State :
                </label>
                <input
                  type="text"
                  placeholder="Enter Your State"
                  id="state"
                  className="border-1 border-neutral-300 bg-neutral-100 p-2 rounded"
                  {...register("state", { required: true })}
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="pincode" className="font-semibold">
                  Pincode :
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Postal code"
                  id="pincode"
                  className="border-1 border-neutral-300 bg-neutral-100 p-2 rounded"
                  {...register("pincode", { required: true })}
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="country" className="font-semibold">
                  Country :
                </label>
                <input
                  type="text"
                  id="country"
                  placeholder="Your Country"
                  className="border-1 border-neutral-300 bg-neutral-100 p-2 rounded "
                  {...register("country", { required: true })}
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="mobile" className="font-semibold">
                  Mobile No. :
                </label>
                <input
                  type="text"
                  id="mobile"
                  placeholder="Enter Your Contact Number"
                  className="border-1 border-neutral-300 bg-neutral-100 p-2 rounded"
                  {...register("mobile", { required: true })}
                />
              </div>

              <button
                type="submit"
                className="bg-green-500 rounded-lg uppercase cursor-pointer border-2 border-green-500 text-neutral-100 w-full  py-2 font-semibold mt-4 hover:bg-neutral-100 hover:text-green-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default AddAddress;
