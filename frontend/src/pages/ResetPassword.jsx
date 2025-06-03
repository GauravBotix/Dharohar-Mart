import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import Email from "../components/Email";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosError";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const valideValue = Object.values(data).every((el) => el);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

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
    if (data.newPassword !== data.confirmPassword) {
      toast.error("password and confirm password must be same.");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data,
      });

      if (response.status === 201 || response.data.success) {
        toast.success(response.data.message);
        setData({
          email: "",
          newPassword: "",
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
    <section className="min-h-[65vh]">
      <div className="max-w-md  mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Update Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <div htmlFor="password" className="w-1/3 text-gray-700 font-medium">
              New Password
            </div>
            <div className="w-2/3">
              <Password
                name="newPassword"
                value={data.newPassword}
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
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={!valideValue}
              className={` ${
                valideValue
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-neutral-400 "
              } text-white px-6 py-2 rounded-md`}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
