import React, { useState } from "react";
import Name from "../components/Name";
import Email from "../components/Email";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosError";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password must be same.");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });
      if (response.status === 201 || response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl min-h-[65vh]">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Welcome to Dharohar Mart
      </h2>
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
        Signup
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center">
          <div htmlFor="name" className="w-1/3 text-gray-700 font-medium">
            Name
          </div>
          <div className="w-2/3">
            <Name name={data.name} handleChange={handleChange} />
          </div>
        </div>

        <div className="flex items-center">
          <div htmlFor="email" className="w-1/3 text-gray-700 font-medium">
            Email
          </div>
          <div className="w-2/3">
            {" "}
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

        <div className="flex items-center">
          <div
            htmlFor="confirmPassword"
            className="w-1/3 text-gray-700 font-medium"
          >
            Confirm Password
          </div>
          <div className="w-2/3">
            <ConfirmPassword
              name="confirmPassword"
              value={data.confirmPassword}
              handleChange={handleChange}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              className=""
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-blue-600 hover:bg-blue-700" : "bg-neutral-400 "
            } text-white px-6 py-2 rounded-md`}
          >
            Register
          </button>
        </div>
        <div className="flex justify-between text-gray-500 hover:text-gray-600">
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

export default Signup;
