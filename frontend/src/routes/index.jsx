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
import Myorders from "../pages/Myorders";
import Address from "../pages/Address";
import Category from "../pages/category";
import Subcategory from "../pages/Subcategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import Admin from "../layout/Admin";

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
            path: "myorders",
            element: <Myorders />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: <Admin><Category /></Admin>,
          },
          {
            path: "subcategory",
            element: <Admin><Subcategory /></Admin>,
          },
          {
            path: "product",
            element: <Admin><ProductAdmin /></Admin>,
          },
          {
            path: "upload-product",
            element: <Admin><UploadProduct /></Admin>,
          },
        ],
      },
    ],
  },
]);

export default router;
