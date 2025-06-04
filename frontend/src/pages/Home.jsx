import React from "react";
import BannerCarousel from "../components/BannerCarousel";
import { useSelector } from "react-redux";
import validUrl from "../utils/validUrl";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CategoryWiseProduct from "../components/CategoryWiseProduct";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allcategory);
  const subcategoryData = useSelector((state) => state.product.subcategory);
  const navigate = useNavigate();

  const handleRedirectToProduct = (id, name) => {
    console.log("id: ", id);
    const subcategory = subcategoryData.find((sub) => {
      const filterData = sub.category.some((cat) => {
        return cat._id === id;
      });
      return filterData ? true : null;
    });
    const url = `/${validUrl(name)}-${id}/${validUrl(subcategory.name)}-${
      subcategory._id
    }`;
    console.log("url :", url);
    navigate(url);
  };

  return (
    <section className="bg-neutral-100 min-h-[70vh] lg:px-0 px-2 mt-4 z-10000">
      <div className="container min-w-full px-5 my-auto ">
        <div className={`w-full h-full min-h-50 bg-neutral-100 rounded `}>
          <BannerCarousel />
        </div>
      </div>
      <div className="container min-w-full mx-auto px-5 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-14  gap-2">
        {loadingCategory
          ? new Array(14).fill(null).map((item, index) => {
              return (
                <div
                  key={index + item}
                  className="bg-neutra-100 w-full rounded p-4 min-h-36 grid gap-2 "
                >
                  <div className="skeleton bg-neutral-400 h-40  w-full "></div>
                  <div className="skeleton bg-neutral-400 h-8 w-full"></div>
                </div>
               
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div
                  key={cat._id + index}
                  className="w-full h-full  shadow-neutral-400 shadow-md  rounded-lg"
                  onClick={() => handleRedirectToProduct(cat._id, cat.name)}
                >
                  <div>
                    <img
                      src={cat.image}
                      className=" rounded-lg w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            })}
      </div>

      <section className="">
        {categoryData?.map((item, index) => {
          return (
            <CategoryWiseProduct
              key={item?._id + index}
              id={item?._id}
              name={item?.name}
            />
          );
        })}
      </section>
    </section>
  );
};

export default Home;
