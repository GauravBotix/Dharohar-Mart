import React, { useState } from "react";
import Email from "../components/Email";

import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();

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
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.status === 200 || response.data.success) {
        toast.success(response.data.message);
        navigate("/verify_otp", {
          state: data,
        });
        setData({
          email: "",
        });
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-[65vh] items-center ">
      <section className="max-w-md  mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-9 text-center text-blue-600 ">
          Forgot Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* <div className="flex items-center"></div> */}

          <div className="flex items-center">
            <div htmlFor="email" className="w-1/3 text-gray-700 font-medium">
              Email
            </div>
            <Email email={data.email} handleChange={handleChange} />
          </div>

          <div className="text-center mt-7">
            <button
              type="submit"
              disabled={!valideValue}
              className={` ${
                valideValue
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-neutral-400 "
              } text-white px-6 py-2 rounded-md`}
            >
              Send Otp
            </button>
          </div>
          <div className="flex justify-between text-gray-500  hover:text-gray-600">
            <Link to="/login" className="text-sm">
              Already have an account?
            </Link>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </section>
    </section>
  );
};

export default ForgotPassword;
