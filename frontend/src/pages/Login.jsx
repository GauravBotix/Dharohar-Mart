import React, { useState } from "react";
import Email from "../components/Email";
import Password from "../components/Password";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosError";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const valideValue = Object.values(data).every((el) => el);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });
      if (response.status === 200 || response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("AccessToken", response.data.data.accessToken);
        localStorage.setItem("RefreshToken", response.data.data.refreshToken);
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-[65vh] ">
      <div className="max-w-md  mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <div htmlFor="email" className="w-1/3 text-gray-700 font-medium">
              Email
            </div>
            <div className="w-2/3">
              <Email email={data.email} handleChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center">
            <div htmlFor="password" className="w-1/3 text-gray-700 font-medium">
              Password
            </div>
            <div className="w-2/3">
              <Password
                name="password"
                value={data.password}
                handleChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          </div>
          <div className="flex mt-10">
            <Link
              to="/forgot_password"
              className="text-gray-500 text-sm hover:text-blue-500  block ml-auto"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center mt-[-10px]">
            <button
              type="submit"
              disabled={!valideValue}
              className={` ${
                valideValue
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-neutral-400 "
              } text-white px-6 py-2 rounded-md`}
            >
              Login
            </button>
          </div>
          <div className="flex justify-between text-gray-500 hover:text-gray-600">
            <Link to="/signup" className="text-sm">
              Don't have an account?
            </Link>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
