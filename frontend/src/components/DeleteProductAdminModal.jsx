import React, { useEffect, useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
const DeleteProductAdminModal = ({
  deleteProduct,
  fetchProductData,
  setOpenDelete,
}) => {
  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.delete_product,
        data: deleteProduct,
      });
      console.log(response);
      const { data: responseData } = response;
      if (responseData.success) {
        document.getElementById("my_modal_3").close();
        toast.success(responseData.message);
        fetchProductData();
      } else {
        toast.error(responseData.message || "Some error Occured");
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
  }, []);
  return (
    <section>
      <dialog ref={modalRef} id="my_modal_3" className="modal modal-middle">
        <div className="modal-box relative ">
          <h2 className="text-xl font-bold text-center pb-5">
            Permanently Delete Product
          </h2>
          <button
            className="absolute top-[5px] right-[5px]"
            onClick={() => {
              modalRef.current.close();
              setOpenDelete(false);
            }}
          >
            <IoCloseCircle size={25} />
          </button>
          <p className="mt-2 text-center">
            Are you sure want to delete this product {" "}
            <span className="text-red-500 font-semibold capitalize">
              Permanently?
            </span>
          </p>
          <div className="flex justify-end mr-10 mt-8 ">
            {" "}
            <button
              className="border border-red-500 rounded p-1 mr-3 font-semibold text-black hover:bg-red-500 hover:text-white"
              onClick={() => {
                document.getElementById("my_modal_3").close();
                setOpenDelete(false);
              }}
            >
              Close
            </button>
            <button
              className="ml-3 border rounded font-semibold text-black hover:text-white hover:bg-green-500 border-green-500 p-1"
              onClick={handleDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
};
export default DeleteProductAdminModal;
