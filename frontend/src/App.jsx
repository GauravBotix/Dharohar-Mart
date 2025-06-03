import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import {
  setAllCategory,
  setLoadidngCategory,
  setSubcategory,
} from "./store/productSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import AxiosToastError from "./utils/AxiosError";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobile from "./components/CartMobile";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const fetchUser = async () => {
    const user = await fetchUserDetails();
    dispatch(setUserDetails(user.data));
  };

  const fetchCategoryData = async () => {
    try {
      dispatch(setLoadidngCategory(true));
      const response = await Axios({
        ...SummaryApi.get_category,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      dispatch(setLoadidngCategory(false));
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

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");

      setTimeout(() => {
        window.location.reload();
      }, 50);
    }
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="lg:pt-20 pt-35 flex-1 overflow-y-auto pb-[10vh] z-50 ">
        {" "}
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {location.pathname !== "/checkout" && <CartMobile />}
    </GlobalProvider>
  );
};

export default App;
