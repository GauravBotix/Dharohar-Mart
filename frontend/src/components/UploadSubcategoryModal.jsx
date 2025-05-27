import React, { useEffect, useRef, useState } from "react";
import uploadProductImage from "../utils/uploadProductImage";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const UploadSubcategoryModal = ({
  fetchSubcategoryData,
  setOpenUploadSubCategory,
}) => {
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const allCategory = useSelector((state) => state.product.allcategory);

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

  console.log("selectedCategory", data);
  const handleRemoveCategorySelected = (id) => {
    const index = data.category.findIndex((elem) => elem._id === id);
    data.category.splice(index, 1);
    setData((prev) => {
      return { ...prev };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.add_subcategory,
        data: data,
      });
      console.log(response);
      const { data: responseData } = response;
      if (responseData.success) {
        document.getElementById("my_modal_1").close();
        fetchSubcategoryData();
        toast.success(responseData.message);
        setOpenUploadSubCategory(false);
      }
    } catch (error) {
      document.getElementById("my_modal_1").close();
      AxiosToastError(error);
    }
  };

  const modalRef = useRef();
  const inputRef = useRef();j
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);
  return (
    <section>
      <dialog ref={modalRef} id="my_modal_1" className="modal modal-middle">
        <div className="modal-box relative ">
          <h2 className="text-xl  font-bold text-center pb-5">
            Upload Sub-Category
          </h2>
          <button
            className="absolute top-[5px] right-[5px]"
            onClick={() => {
              modalRef.current.close();
              setOpenUploadSubCategory(false);
            }}
          >
            <IoCloseCircle size={25} />
          </button>
          <form
            onSubmit={handleSubmit}
            className="my-3 w-full  grid gap-9 pl-1 pt-5 "
          >
            <div className=" name min-w-full grid gap-2">
              <label htmlFor="subcategoryname" className="font-semibold">
                Name
              </label>
              <input
                id="subcategoryname"
                ref={inputRef}
                placeholder="Enter Sub-Category "
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

            <div className="grid gap-2   ">
              <label htmlFor="subcategory" className="font-semibold">
                Sub Category
              </label>
              <div className="flex flex-wrap  gap-2">
                {data.category.map((item, index) => {
                  return (
                    <p
                      key={item._id + "-" + item.name}
                      className="font-sans text-sm shadow-neutral-200  shadow-md rounded px-1 m-1 flex items-center gap-2"
                    >
                      {item.name}
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => {
                          handleRemoveCategorySelected(item._id);
                        }}
                      >
                        <IoClose size={15} />
                      </div>
                    </p>
                  );
                })}
              </div>
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (elem) => elem._id == value
                  );
                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                }}
                className="border-2 p-2 rounded "
              >
                <option value="" className="font-light bg-neutral-500 disabled">
                  Select category
                </option>

                {allCategory.map((category, index) => (
                  <option
                    value={category?._id}
                    key={category?._id + "-" + category?.name}
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={!data.name || !data.image || !data?.category[0]}
              type="submit"
              className={`w-full border-2  cursor-pointer p-2 rounded font-semibold ${
                !data?.name || !data?.image || !data?.category[0]
                  ? "bg-slate-500"
                  : "bg-yellow-300 hover:bg-yellow-400"
              }`}
            >
              {isLoading ? "Loading..." : "Add Sub-Category"}
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default UploadSubcategoryModal;
