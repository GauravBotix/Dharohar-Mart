import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setSubcategory } from "./store/productSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";

const App = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const user = await fetchUserDetails();
    dispatch(setUserDetails(user.data));
    // console.log(user);
  };

  const fetchCategoryData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_category,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchSubCategoryData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.get_subcategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setSubcategory(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchCategoryData();
    fetchSubCategoryData();
  }, []);

  return (
    <>
      <Header />
      <main className="lg:pt-20 pt-35 flex-1 min-h-screen overflow-y-auto z-0 pb-[20px]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
