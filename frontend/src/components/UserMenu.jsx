import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosError from "../utils/AxiosError";
import { HiOutlineExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";

const UserMenu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      console.log("logout", response);
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="min-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}{" "}
          <span className="text-medium text-red-600">
            {user.role === "ADMIN" ? "(Admin)" : ""}
          </span>
        </span>
        <Link to={"/dashboard/profile"} className="hover:text-primary-200">
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>
      <div className="p-[0.5px] bg-slate-300 my-2"></div>

      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <>
            <Link
              to={"/dashboard/category"}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Category
            </Link>
            <Link
              to={"/dashboard/subcategory"}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Sub Category
            </Link>
            <Link
              to={"/dashboard/upload-product"}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Upload Product
            </Link>
            <Link
              to={"/dashboard/product"}
              className="px-2 hover:bg-orange-200 py-1"
            >
              Product
            </Link>
          </>
        )}

        <Link
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>

        <Link
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Save Address
        </Link>

        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
