import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddress from "../components/EditAddress";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";
import { LuMapPinHouse } from "react-icons/lu";

import Nohome from "../components/Nohome";

const Address = () => {
  const addressList = useSelector((state) => state.address?.addressList);
  console.log('addressList', addressList);
  console.log('addressList[0]', addressList[0]);
  
  
  const [openAddress, setOpenAddress] = useState(false);
  const [OpenEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.delete_address,
        data: {
          _id: id,
        },
      });
      if (response.data.success) {
        toast.success("Address Remove");
        if (fetchAddress) {
          fetchAddress();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="min-h-[80vh] px-4 pl-4 pr-4">
      <div className="p-3 bg-white shadow-md shadow-neutral-300 rounded-lg mb-4 flex items-center justify-between ">
        <h1 className="font-semibold text-neutral-700 uppercase text-xl ">
          Address
        </h1>
        <button
          onClick={() => setOpenAddress(true)}
          className="text-sm cursor-pointer border border-yellow-200 bg-yellow-500 text-white hover:bg-white hover:text-yellow-500 font-semibold px-3 py-1 rounded ml-auto "
        >
          Add Address
        </button>
      </div>
      <div className="bg-neutral-100  grid gap-4">
        {addressList[0]?(
          <div className="grid gap-2">
            {addressList.map((address, index) => {
              return (
                <div
                  key={index+address._id}
                  className={`p-3 flex gap-3 w-full text-sm font-semibold bg-neutral-300 rounded-lg  py-5 px-4 ${
                    !address.status && "hidden"
                  }`}
                >
                  <div className="w-full">
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>
                      {address.country} - {address.pincode}
                    </p>
                    <p>{address.mobile}</p>
                  </div>
                  <div className=" flex gap-4 justify-evenly">
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        setEditData(address);
                      }}
                      className="   text-green-600 cursor-pointer px-1 hover:scale-103  "
                    >
                      <FaPencil className="text-lg lg:text-2xl " />
                    </button>
                    <button
                      onClick={() => handleDisableAddress(address._id)}
                      className=" text-red-600 px-2  cursor-pointer hover:scale-103   "
                    >
                      <FaTrashAlt className="text-lg lg:text-2xl " />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
            <div><Nohome /></div>
          
        )}

        <div
          onClick={() => setOpenAddress(true)}
          className="h-16 mt-30 bg-neutral-100 border-2 border-dashed font-semibold flex justify-center items-center cursor-pointer"
        >
          <LuMapPinHouse size={30} className="hover:scale-105" />
          Add address
        </div>
      </div>

      {openAddress && <AddAddress setOpenAddress={setOpenAddress} />}

      {OpenEdit && <EditAddress data={editData} setOpenEdit={setOpenEdit} />}
    </section>
  );
};

export default Address;
