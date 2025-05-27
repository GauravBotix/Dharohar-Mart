import React, { useEffect, useRef, useState } from "react";
import Email from "../components/Email";

import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const location = useLocation();
  const valideValue = data.every((el) => el);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate('/forgot_password')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.verify_otp,
        data: {
          otp: data.join(''),
          email:location?.state?.email
        },
      });

      if (response.status === 200 || response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset_password", {
          state: {
            data: response.data,
            email: location?.state?.email
          }
        });
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const inputRef = useRef([]);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-semibold mb-9 text-center text-blue-600 ">
        Enter OTP
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center gap-x-2 ">
          {data.map((item, index) => {
            return (
              <input
                key={index}
                ref={(ref) => {
                  inputRef.current[index] = ref
                  return ref;
                }}
                type="text"
                value={data[index]}
                onChange={(e) => {
                  const value = e.target.value
                  const newData = [...data]
                  newData[index] = value
                  setData(newData)
                  if (value && index < 5) {
                    inputRef.current[index+1].focus()
                  }
                }}
                maxLength={1}
                className="w-full border-2 py-2 px-2 rounded-lg text-center"
              />
            );
          })}
        </div>

        <div className="text-center mt-7">
          <button
            type="submit"
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-blue-600 hover:bg-blue-700" : "bg-neutral-400 "
            } text-white px-6 py-2 rounded-md`}
          >
            Verify Otp
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
    </div>
  );
};

export default OtpVerification;
