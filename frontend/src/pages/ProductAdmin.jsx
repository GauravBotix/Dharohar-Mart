import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import SearchProduct from "../components/SearchProduct";
import noData from "../assets/nodata.png";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_product,
        data: {
          page: page,
          limit: 10,
          search: search,
        },
      });
      const { data: responseData } = response;
      console.log("responseData", responseData);

      if (responseData.success) {
        setProductData(responseData.data);
        setTotalCount(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  useEffect(() => {
    let flag = true;
    const timer = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const handleNext = () => {
    if (page === totalCount) return;
    else setPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (page <= 1) return;
    setPage((prev) => prev - 1);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  return (
    <section className="px-4 pl-4 pr-4 ">
      <div className="p-3 bg-white rounded-lg shadow-md shadow-neutral-300 mb-4 gap-4 flex items-center justify-between ">
        <h1 className="font-semibold text-neutral-700 uppercase lg:text-xl">
          Products
        </h1>
        <SearchProduct handleSearch={handleSearch} search={search} />
      </div>

      {loading && <Loading />}
      <div>
        <div className="min-h-[65vh]">
          <div className="grid grid-cols-2  sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-1 my-2   ">
            {productData.length > 0
              ? productData.map((item) => (
                  <ProductCard data={item} key={item._id} />
                ))
              : !loading && (
                  <div className="col-span-full text-center mt-10">
                    <img
                      src={noData} 
                      alt="No products found"
                      className="h-68 w-68 m-auto mt-10 bg-transparent grid grid-center rounded-full"
                    />
                    <p className="text-center  text-xl font-bold">
                      <div className="text-red-600 text-3xl uppercase">
                        Sorry!!
                      </div>
                      No products found for "{search}"
                    </p>
                  </div>
                )}
          </div>
        </div>
        {productData.length > 0 && (
          <div
            className={`join justify-center items-center flex mt-10 gap-x-2 `}
          >
            <button
              onClick={handlePrev}
              disabled={page <= 1}
              className={`join-item btn  hover:bg-green-600 border border-neutral-500 rounded font-bold text-3xl`}
            >
              «
            </button>
            <button
              disabled
              className="join-item btn border border-neutral-500 font-bold text-black text-xl rounded"
            >
              {page} / {totalCount}
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalCount}
              className="join-item btn hover:bg-green-600 border border-neutral-500 rounded font-bold text-3xl"
            >
              »
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductAdmin;
