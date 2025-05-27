import React, { useState } from "react";

import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import uploadProductImage from "../utils/uploadProductImage";
import ViewImage from "../components/viewImage";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import OpenAddModal from "../components/OpenAddModal";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";
import successAlert from "../utils/SuccessAlert";
const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: 0,
    price: 0,
    discount: 0,
    description: "",
    more_details: {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const allCategory = useSelector((state) => state.product.allcategory);
  const allSubcategory = useSelector((state) => state.product.subcategory);
  const [openAdd, setOpenAdd] = useState(false);
  const [fieldName, setFieldName] = useState("");

 

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
      const response = await Axios({
        ...SummaryApi.add_product,
        data: data,
      });
      console.log("response", response);

      const { data: responseData } = response;
      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: 0,
          price: 0,
          discount: 0,
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleProductImage = async (e) => {
    setImageLoading(true);
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const uploadCategoryImage = await uploadProductImage(file);
    const { data: ImageResponse } = uploadCategoryImage;
    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, ImageResponse.data.url],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        // image: prev.image.filter((_, i) => i !== index),
      };
    });
  };

  const handleRemoveCategorySelected = (id) => {
    const index = data.category.findIndex((elem) => elem._id === id);
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        // category: prev.category.filter((_, i) => i !== index),
      };
    });
  };

  const handleRemoveSubCategorySelected = (id) => {
    const index = data.subCategory.findIndex((elem) => elem._id === id);
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        // subCategory: prev.subCategory.filter((_, i) => i !== index),
      };
    });
  };

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAdd(false);
  };
  return (
    <section className="px-4 pl-4 pr-4">
      <div className="p-3 bg-white rounded-lg shadow-md shadow-neutral-300 mb-4 flex items-center justify-between ">
        <h1 className="font-semibold text-neutral-700 uppercase text-xl ">
          Upload Product
        </h1>
      </div>
      <div className="">
        <form
          onSubmit={handleSubmit}
          className=" w-full bg-neutral-300 rounded-lg grid gap-y-3 py-5 px-4 "
        >
          <div className=" name min-w-full grid gap-1">
            Name
            <label className="input min-w-full" htmlFor="name">
              <input
                id="name"
                type="text"
                required
                name="name"
                autoFocus
                placeholder="Enter Product Name"
                minLength="3"
                title="Only letters, numbers or dash"
                value={data.name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="  min-w-full grid gap-1 ">
            Description
            <label className="textarea  min-w-full" htmlFor="description">
              <textarea
                type="text"
                required
                name="description"
                row={4}
                placeholder="Enter Product description"
                value={data.description}
                onChange={handleChange}
                className="w-full h-full min-h-25"
              />
            </label>
          </div>

          <div className=" min-w-full grid gap-1">
            <p className="">Image</p>
            <div>
              <label
                className=" min-w-full validator border-1 cursor-pointer h-20 rounded border-neutral-300 flex bg-white justify-center items-center "
                htmlFor="file"
              >
                <div className="flex flex-col justify-center items-center text-center">
                  {!imageLoading ? (
                    <>
                      {" "}
                      <FaCloudUploadAlt size={40} />
                      <p className="font-semibold text-neutral-600">
                        Upload Image
                      </p>
                    </>
                  ) : (
                    <p className=" text-center text-3xl text-yellow-300 font-semibold">
                      Loading...
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  required
                  name="file"
                  id="file"
                  onChange={handleProductImage}
                  className="w-full h-full hidden"
                />
              </label>
              <div className="flex my-1 flex-wrap">
                {data.image.map((item, index) => {
                  return (
                    <div
                      key={item + index}
                      className="flex w-30 rounded h-30 m-1 bg-neutral-500 justify-center items-center relative group"
                    >
                      <img
                        src={item}
                        className="w-full h-full object-scale-down cursor-pointer rounded"
                        onClick={() => {
                          setImageUrl(item);
                          document.getElementById("my_modal_1").showModal();
                        }}
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="hidden group-hover:inline-flex text-red-800  absolute bottom-1 right-1  items-center justify-center p-2 border-2 border-white rounded-full bg-red-600"
                      >
                        <FaTrashAlt className="text-sm lg:text-md text-white cursor-pointer" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1 ">
            <label htmlFor="category">Category</label>
            <div>
              <select
                required
                onChange={(e) => {
                  const value = e.target.value;
                  
                  const categoryDetails = allCategory.find(
                    (elem) => elem._id === value
                  );
                  
                  setData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                  
                  
                }}
                className="border-1 p-2 rounded w-full  bg-white border-neutral-300 "
              >
                <option
                  disabled
                  selected
                  className="font-light bg-neutral-500 disabled"
                >
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
            <div className="flex flex-wrap  gap-1">
              {data.category.map((item, index) => {
                return (
                  <p
                    key={item._id + "-" + item.name}
                    className="font-sans text-sm shadow-gray-700 bg-white text-black  shadow-md rounded pl-2 m-0.5 flex items-center gap-1"
                  >
                    {item.name}
                    <div
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleRemoveCategorySelected(item._id)}
                    >
                      <IoClose size={15} />
                    </div>
                  </p>
                );
              })}
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="subcategory">Sub-Category</label>
            <div>
              <select
                required
                value=''
                onChange={(e) => {
                  const value = e.target.value;   
                  const SubcategoryDetails = allSubcategory.find(
                    (elem) => elem._id === value
                  );
                  setData((prev) => {
                    return {
                      ...prev,
                      subCategory: [...prev.subCategory, SubcategoryDetails],
                    };
                  });
                  
                  
                }}
                className="border-1 p-2 rounded w-full bg-white border-neutral-300 "
              >
                <option
                  value=''
                  className="font-light bg-neutral-500 disabled "
                >
                  Select Sub-category
                </option>
                {allSubcategory.map((Subcategory, index) => (
                  <option
                    value={Subcategory?._id}
                    key={Subcategory?._id + "-" + Subcategory?.name}
                  >
                    {Subcategory?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap  gap-1">
              {data.subCategory.map((item, index) => {
                return (
                  <p
                    key={index + item._id + "-" + item.name}
                    className="font-sans text-sm shadow-gray-700 bg-white text-black  shadow-md rounded pl-2 m-0.5 flex items-center gap-1"
                  >
                    {item.name}
                    <div
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => handleRemoveSubCategorySelected(item._id)}
                    >
                      <IoClose size={15} />
                    </div>
                  </p>
                );
              })}
            </div>
          </div>

          <div className=" unit min-w-full grid gap-1">
            Unit
            <label className="input min-w-full " htmlFor="unit">
              <input
                type="text"
                required
                id="unit"
                name="unit"
                placeholder="Enter total Units"
                value={data.unit}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className=" stock min-w-full grid gap-1">
            Stock
            <label className="input min-w-full" htmlFor="stock">
              <input
                id="stock"
                type="number"
                name="stock"
                placeholder="Enter total stocks"
                value={data.stock}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className=" price min-w-full grid gap-1">
            Price
            <label className="input min-w-full" htmlFor="price">
              <span className="text-lg font-semibold text-neutral-700">
                Rs.
              </span>
              <input
                id="price"
                type="number"
                required
                name="price"
                placeholder="Enter product price."
                value={data.price}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className=" discount min-w-full grid gap-1">
            Discount
            <label className="input min-w-full" htmlFor="discount">
              <span className="text-lg font-semibold text-neutral-700 ">
                Rs.
              </span>
              <input
                id="discount"
                type="number"
                name="discount"
                placeholder="Enter discount price."
                value={data.discount}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="min-w-full grid gap-1">
            {Object?.keys(data?.more_details).map((item, index) => {
              return (
                <div className=" discount min-w-full grid gap-1">
                  {item}
                  <label className="input min-w-full" htmlFor={item}>
                    <input
                      id={item}
                      type="text"
                      value={data?.more_details[item]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((prev) => {
                          return {
                            ...prev,
                            more_details: {
                              ...prev.more_details,
                              [item]: value,
                            },
                          };
                        });
                      }}
                    />
                  </label>
                </div>
              );
            })}
          </div>

          

          <div className="flex justify-between">
            <div
              onClick={() => {
                setOpenAdd(true);
                document.getElementById("my_modal_1").showModal();
              }}
              className=" grid gap-1 font-semibold  px-4 py-2 h-10 cursor-pointer text-center  items-center bg-yellow-500 text-white border border-yellow-200 rounded hover:bg-white hover:text-yellow-500  "
            >
              Add More
            </div>

            <button className="grid  font-semibold gap-1 cursor-pointer text-white px-5 py-2 h-10 text-center items-center bg-green-400 border border-green-400 rounded hover:bg-white hover:text-green-500">
              Submit
            </button>
          </div>
        </form>
      </div>

      {imageUrl && <ViewImage url={imageUrl} />}
      {openAdd && (
        <OpenAddModal
          setOpenAdd={setOpenAdd}
          value={fieldName}
          onChange={(e) => {
            setFieldName(e.target.value);
          }}
          onSubmit={handleAddField}
        />
      )}
    </section>
  );
};

export default UploadProduct;
