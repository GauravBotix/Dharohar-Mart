import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import uploadProductImage from "../utils/uploadProductImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";

const UploadCategorymodal = ({ fetchCategoryData, setOpenUploadCategory }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await Axios({
        ...SummaryApi.add_category,
        data: data,
      });
      const { data: responseData } = response;
      console.log("response", response);
      console.log("response.data", responseData);

      if (responseData.success) {
        document.getElementById("my_modal_1").close();
        toast.success("Category added Successfully");
        fetchCategoryData();
        setOpenUploadCategory(false);
      } else {
        toast.error(responseData.message || "Some error Occured");
      }
    } catch (error) {
      document.getElementById("my_modal_1").close();
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryImage = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const uploadCategoryImage = await uploadProductImage(file);
    const { data: ImageResponse } = uploadCategoryImage;
    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
    setIsLoading(false);
  };

  const modalRef = useRef();
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal(); // Open the dialog
    }
  }, []);

  return (
    <section>
      <dialog ref={modalRef} id="my_modal_1" className="modal modal-middle">
        <div className="modal-box relative ">
          <h2 className="text-xl  font-bold text-center pb-5">
            Upload Category
          </h2>
          <button
            className="absolute top-[5px] right-[5px]"
            onClick={() => {
              modalRef.current.close();
              setOpenUploadCategory(false);
            }}
          >
            <IoCloseCircle size={25} />
          </button>
          <form
            onSubmit={handleSubmit}
            className="my-3 w-full  grid gap-9 pl-1 pt-5 "
          >
            <div className=" name min-w-full grid gap-2">
              <label htmlFor="categoryname" className="font-semibold">
                Name
              </label>
              <input
                id="categoryname"
                placeholder="Enter Category Name"
                type="text"
                name="name"
                autoFocus
                className=" border-2 rounded h-10 px-5 text-black"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid ">
              <p className="font-semibold mb-2">Image</p>
              <div className="flex lg:flex-row flex-col items-center gap-y-3 ">
                <div className="lg:w-36 w-full h-36 border-2  rounded font-bold bg-neutral-100 content-center text-center ">
                  {data.image ? (
                    <img
                      src={data.image}
                      className="w-full h-full object-scale-down "
                    />
                  ) : (
                    "No Image"
                  )}
                </div>

                <label
                  className={`${
                    !data.name
                      ? "bg-slate-500"
                      : " cursor-pointer bg-yellow-400 hover:bg-yellow-500 "
                  }   mx-3 border rounded-sm px-3 py-1 uppercase font-medium `}
                >
                  {!isLoading ? "Upload" : "Loading..."}
                  <input
                    disabled={!data.name}
                    type="file"
                    name="categoryImage"
                    id="categoryImage"
                    hidden
                    onChange={handleCategoryImage}
                  />
                </label>
              </div>
            </div>

            <button
              disabled={!data.name || !data.image}
              type="submit"
              className={`w-full hover:border-2 cursor-pointer p-2 rounded ${
                !data.name || !data.image ? "bg-slate-500" : "bg-yellow-200"
              }`}
            >
              {isLoading ? "Loading..." : "Add Category"}
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default UploadCategorymodal;
