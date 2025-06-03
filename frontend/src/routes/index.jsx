import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Search from "../pages/Search";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import Address from "../pages/Address";
import Category from "../pages/Category";
import Subcategory from "../pages/Subcategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import Admin from "../layout/Admin";
import ProductList from "../pages/ProductList";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckOutPage from "../pages/CheckOutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import MyOrders from "../pages/MyOrders";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgot_password",
        element: <ForgotPassword />,
      },
      {
        path: "verify_otp",
        element: <OtpVerification />,
      },
      {
        path: "reset_password",
        element: <ResetPassword />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "order",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: (
              <Admin>
                <Category />
              </Admin>
            ),
          },
          {
            path: "subcategory",
            element: (
              <Admin>
                <Subcategory />
              </Admin>
            ),
          },
          {
            path: "product",
            element: (
              <Admin>
                <ProductAdmin />
              </Admin>
            ),
          },
          {
            path: "upload-product",
            element: (
              <Admin>
                <UploadProduct />
              </Admin>
            ),
          },
        ],
      },
      {
        path: ":category",
        children: [
          {
            path: ":subcategory",
            element: <ProductList />,
          },
        ],
      },
      {
        path: "product/:product",
        element: <ProductDisplayPage />,
      },
      {
        path: "cart",
        element: <CartMobile />,
      },
      {
        path: "checkout",
        element: <CheckOutPage />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
    ],
  },
]);

export default router;
