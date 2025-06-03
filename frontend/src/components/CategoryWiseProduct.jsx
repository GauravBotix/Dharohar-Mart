import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import LoadingProductCard from "./LoadingProductCard";
import HomeProductCard from "./HomeProductCard";

import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import validUrl from "../utils/validUrl";

const CategoryWiseProduct = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_product_by_category,
        data: {
          id: id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const subcategoryData = useSelector((state) => state?.product?.subcategory);

  const handleRedirectToProduct = () => {
    const subcategory = subcategoryData.find((sub) => {
      const filterData = sub?.category?.some((cat) => {
        return cat?._id == id;
      });
      return filterData ? true : null;
    });
    const url = `/${validUrl(name)}-${id}/${validUrl(subcategory?.name)}-${
      subcategory?._id
    }`;
    return url;
  };

  const redirectUrl = handleRedirectToProduct();

  const loadingCardNumber = new Array(6).fill(null);
  const containerRef = useRef();

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  return (
    <section>
      <div className="container mx-auto px-12 pt-8 pb-0 min-w-full flex items-center justify-between gap-4">
        <h3 className="font-semibold  uppercase text-lg text-shadow-sm text-shadow-green-400 md:text-xl">{name}</h3>
        <Link to={redirectUrl} className="text-green-600 hover:underline hover:text-green-400">
          See All
        </Link>
      </div>

      <div className="flex mx-auto container min-w-full px-10 my-2  items-center ">
        <div
          ref={containerRef}
          className="flex gap-4 bg-neutral-100  overflow-x-scroll hide-scrollbar scroll-smooth"
        >
          {loading &&
            loadingCardNumber.map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
              >
                <LoadingProductCard />
              </div>
            ))}

          {data.map((p, index) => (
            <div
              key={p?._id + "CategorywiseProductDisplay" + index}
              className="flex-shrink-0 flex w-1/2 sm:w-1/3  py-2 md:w-1/4 lg:w-1/5"
            >
              <HomeProductCard item={p} />
            </div>
          ))}
        </div>

        {data.length > 0 ? (
          <div className="w-full left-0 right-0 px-5 absolute hidden lg:flex justify-between">
            <button
              onClick={handleScrollLeft}
              className="z-10 relative bg-green-500 cursor-pointer hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
            >
              <FaAngleDoubleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-1 relative  border-white border-2 hover:border-green-500 bg-green-500 cursor-pointer hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full"
            >
              <FaAngleDoubleRight />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default CategoryWiseProduct;
