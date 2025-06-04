import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

import DisplayPrice from "../utils/DisplayPrice";
import discountPrice from "../utils/DiscountPrice";
import AddToCartButton from "../components/AddToCartButton";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_product_detail,
        data: {
          productId: productId,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
        // setImage(responseData.data.image[0]);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [params]);
  console.log("data", data);

  

  return (
    <section className="container min-h-[70vh] mx-auto p-4 grid lg:grid-cols-2">
      {/* left part */}
      <div className="">
        <div className="bg-neutral-100 lg:min-h-[60vh] lg:max-h-[60vh] min-h-56 max-h-56 h-full w-full">
          <img
            src={data?.image[image]}
            className="w-full h-full object-scale-down"
            onClick={() => {
              setImageUrl(item);
              document.getElementById("my_modal_1").showModal();
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-3  my-2">
          {data?.image.map((img, index) => {
            return (
              <div
                key={img + index + "point"}
                className={`bg-neutral-300 w-1 h-1 lg:w-3 lg:h-3 rounded-full ${
                  index === image && "bg-neutral-500"
                }`}
              ></div>
            );
          })}
        </div>
        <div className="grid relative">
          <div
            className="flex gap-4  relative justify-center w-full overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, index) => {
              return (
                <div
                  className="w-20 h-20 min-h-20 min-w-20 gap-x-1 my-2 cursor-pointer "
                  key={img + index}
                >
                  <img
                    src={img}
                    alt="min-product"
                    onClick={() => {
                      setImage(index);
                    }}
                    className="w-full rounded shadow-md  shadow-neutral-500 h-full object-scale-down"
                  />
                </div>
              );
            })}
          </div>{" "}
         
        </div>

        <div className="my-4  hidden lg:grid gap-3 ">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data?.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data?.unit}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className="font-semibold">{element}</p>
                  <p className="text-base">{data?.more_details[element]}</p>
                </div>
              );
            })}
        </div>
      </div>
      {imageUrl && <ViewImage url={imageUrl} />}

      {/* right part */}
      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 rounded-lg">10 Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data?.name}</h2>
        <p className="">{data?.unit}</p>
        <div className="p-[0.5px] bg-neutral-300 my-2"></div>
        <div>
          <p className="">Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-600 px-4 py-2 rounded text-white bg-green-700 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {DisplayPrice(discountPrice(data?.price, data?.discount))}
              </p>
            </div>
            {data?.discount ? (
              <p className="line-through font-semibold">
                {DisplayPrice(data?.price)}
              </p>
            ) : (
              ""
            )}
            {data?.discount ? (
              <p className="font-bold text-green-600 lg:text-2xl">
                {data?.discount}%{" "}
                <span className="text-base text-neutral-500">Discount</span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        {data?.stock === 0 ? (
          <p className="text-lg font-semibold text-red-500 my-2">
            Out of Stock
          </p>
        ) : (
          <div className="my-4 w-20">
            <AddToCartButton item={data} />
          </div>
        )}

        <h2 className="font-semibold">Why shop from Dharohar Mart? </h2>
        <div>
          <div className="flex  items-center gap-4 my-4">
            <img src={image1} alt="superfast delivery" className="w-20 h-20 shadow-lg rounded-full shadow-neutral-400" />
            <div className="text-sm">
              <div className="font-semibold">Superfast Delivery</div>
              <p>
                Get your orer delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>
          <div className="flex  items-center gap-4 my-4">
            <img src={image2} alt="Best prices offers" className="w-20 h-20 shadow-lg rounded-full shadow-neutral-400" />
            <div className="text-sm">
              <div className="font-semibold">Best Prices & Offers</div>
              <p>
                Best price destination with offers directly from the
                nanufacturers.
              </p>
            </div>
          </div>
          <div className="flex  items-center gap-4 my-4">
            <img src={image3} alt="Wide Assortment" className="w-20 h-20 shadow-lg rounded-full shadow-neutral-400" />
            <div className="text-sm">
              <div className="font-semibold">Wide Assortment</div>
              <p>
                Choose from 5000+ products across food personal care, household
                & other categories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* mobile design */}
      <div className="my-4 grid gap-3 lg:hidden ">
        <div>
          <p className="font-semibold">Description</p>
          <p className="text-base">{data?.description}</p>
        </div>
        <div>
          <p className="font-semibold">Unit</p>
          <p className="text-base">{data?.unit}</p>
        </div>
        {data?.more_details &&
          Object.keys(data?.more_details).map((element, index) => {
            return (
              <div>
                <p className="font-semibold">{element}</p>
                <p className="text-base">{data?.more_details[element]}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default ProductDisplayPage;
