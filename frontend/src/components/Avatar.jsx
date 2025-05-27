import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosError";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
const Avatar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.status === 200 || response.data.success) {
        toast.success(response.data.message);
        localStorage.clear();

        navigate("/");
        window.location.reload();
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-end ">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar "
        >
          <div className="w-10  rounded-full  ">
            {
              user.avatar ?
            (<img alt="Tailwind CSS Navbar component" src={user.avatar} />):( <FaUserCircle size={39} />)
            }
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
        >
          <li>
            <Link to="/dashboard/profile" className="justify-between  ">
              Profile
              <span className="hover:scale-102 hover:text-red-600">
                <FaExternalLinkAlt />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/myorders" className="justify-between  ">
              MyOrders
              <span className="hover:scale-102 hover:text-red-600">
                <FaExternalLinkAlt />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/address" className="justify-between  ">
              Address
              <span className="hover:scale-102 hover:text-red-600">
                <FaExternalLinkAlt />
              </span>
            </Link>
          </li>

          <li>
            <Link to="/setting">Settings</Link>
          </li>

          <button
            onClick={handleLogout}
            className=" hover:bg-red-700 rounded-sm p-1 text-red-600 hover:text-white  cursor-pointer"
          >
            Logout
          </button>
        </ul>
      </div>
    </>
  );
};

export default Avatar;
