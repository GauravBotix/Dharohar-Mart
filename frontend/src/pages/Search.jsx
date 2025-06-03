import React, { useEffect, useState } from "react";

import LoadingProductCard from "../components/LoadingProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import nodata from "../assets/nodata.png";
import HomeProductCard from "../components/HomeProductCard";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosError";

const Search = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  const searchText = params?.search?.slice(3);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.search_product,
        data: {
          search: searchText,
          page: page,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((preve) => {
            return [...preve, ...responseData.data];
          });
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((preve) => preve + 1);
    }
  };

  return (
    <section className="bg-neutral-100 min-h-[70vh]">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length} </p>

        <InfiniteScroll
          dataLength={data?.length}
          hasMore={true}
          next={handleFetchMore}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 px-2 pt-5 gap-2">
            {data.map((p, index) => {
              return (
                <HomeProductCard
                  item={p}
                  key={p?._id + "searchProduct" + index}
                />
              );
            })}

            {/***loading data */}
            {loading &&
              loadingArrayCard.map((_, index) => {
                return <LoadingProductCard key={"loadingsearchpage" + index} />;
              })}
          </div>
        </InfiniteScroll>

        {!data[0] && !loading && (
          <div className="col-span-full text-center mt-10">
            <img
              src={nodata}
              alt="No products found"
              className="h-68 w-68 m-auto mt-10 bg-transparent grid grid-center rounded-full"
            />
            <p className="text-center  text-xl font-bold ">
              <div className="text-red-600 text-3xl uppercase mb-2">
                Sorry!!!
              </div>
              No search result found for{" "}
              <span className="text-red-600 capitalize ">"{searchText}"</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
export default Search;
