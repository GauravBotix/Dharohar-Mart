import React, {  useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useParams } from "react-router-dom";
import HomeProductCard from "../components/HomeProductCard";
import { useSelector } from "react-redux";
import validUrl from "../utils/validUrl";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [displaySubcategory, setDisplaySubcategory] = useState([]);
  const params = useParams();
  const subCategory = params?.subcategory?.split("-");

  const subcategoryName = subCategory
    ?.splice(0, subCategory?.length - 1)
    ?.join(" ")
    .replaceAll("___", " ")
    .replaceAll("__", " ")
    .replaceAll("_", " ");

  const allSubcategory = useSelector((state) => state.product?.subcategory);

  const categoryId = params?.category?.split("-").slice(-1)[0];
  const subcategoryId = params?.subcategory?.split("-").slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_product_by_category_subcategory,
        data: {
          categoryId: categoryId,
          subcategoryId: subcategoryId,
          page: 1,
          limit: 10,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const sub = allSubcategory.filter((subcat) => {
      const filterData = subcat?.category?.some((item) => {
        return item?._id == categoryId;
      });
      return filterData ? filterData : null;
    });

    setDisplaySubcategory(sub);
  }, [params, allSubcategory]);

  return (
    <section className="min-h-[70vh]  ">
      <div className=" container  grid grid-cols-[100px_1fr] gap-8 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] ">
        <div className=" mx-auto bg-neutral-100 min-h-[70vh] max-h-[70vh] grid gap-y-4 mt-4 px-4 overflow-y-scroll  ">
          {displaySubcategory.map((item, index) => {
            const url = `/${validUrl(item?.category[0]?.name)}-${
              item?.category[0]?._id
            }/${validUrl(item?.name)}-${item?._id}`;
            return (
              <Link
                to={url}
                key={item?._id + index}
                className={`w-full  border border-neutral-200  rounded-md  shadow-md  shadow-neutral-400 p-2 hover:bg-green-300 cursor-pointer ${
                  subcategoryId == item?._id
                    ? "bg-green-200 hover:text-green-500 hover:bg-neutral-200 border-2 border-green-300"
                    : "bg-neutral-200"
                }`}
              >
                <div className="w-full lg:grid lg:grid-cols-2 lg:items-center text-center text-sm">
                  <img
                    src={item?.image}
                    alt="subcategory"
                    className=" lg:w-14  w-full "
                  />
                  <p className=" -mt-7 lg:mt-0 text-center ">{item?.name}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* product */}
        <div className="w-full">
          <div className="p-2 m-4 bg-white rounded-lg shadow-md shadow-neutral-500   ">
            <h1 className="font-semibold text-center text-neutral-700 capitalize text-xl ">
              {subcategoryName}
            </h1>
          </div>
          <div className="max-h-[62vh] overflow-y-auto hide-scrollbar ">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-4  lg:gap-4  ">
              {data.map((item, index) => {
                return <HomeProductCard item={item} key={item + index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
