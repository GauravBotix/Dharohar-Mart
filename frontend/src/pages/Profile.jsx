import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import UserAvatarEdit from "../components/UserAvatarEdit";
import Name from "../components/Name";
import Email from "../components/Email";
import Mobile from "../components/Mobile";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";
import AxiosToastError from "../utils/AxiosError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [profileEdit, setProfileEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await Axios({
        ...SummaryApi.update_user,
        data: userData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        const updatedUserData = await fetchUserDetails();
        dispatch(setUserDetails(updatedUserData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 pl-4 pr-4">
      <div className="  bg-neutral-200 hover:border-neutral-700 hover:border p-0.5 w-18 h-18 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar w-18 h-18 "
          >
            <div className="w-full rounded-full  ">
              <img alt={user.name} src={user.avatar} />
            </div>
          </div>
        ) : (
          <FaUserCircle size={72} />
        )}
      </div>

      <button
        className=" min-w-20 border cursor-pointer border-yellow-200 hover:bg-white hover:text-yellow-500 text-white text-md bg-yellow-400 px-3 py-1 rounded-full mt-3 font-semibold"
        onClick={() => {
          setProfileEdit(true),
            document.getElementById("my_modal_1").showModal();
        }}
      >
        Edit
      </button>

      {profileEdit && <UserAvatarEdit />}

      <form
        onSubmit={handleSubmit}
        className="my-4 w gap-9 w-full bg-neutral-300 rounded-lg grid gap-y-3 py-5 px-4"
      >
        <div className=" name min-w-full grid">
          <label htmlFor="name">Name</label>
          <Name name={userData.name} handleChange={handleChange} />
        </div>
        <div className="email min-w-full grid">
          <label htmlFor="email">Email</label>
          <Email email={userData.email} handleChange={handleChange} />
        </div>
        <div className="mobile min-w-full grid">
          <label htmlFor="mobile">Mobile</label>
          <Mobile mobile={userData.mobile} handleChange={handleChange} />
        </div>

        <button className="border px-4 py-2 font-semibold hover:bg-white text-lg cursor-pointer bg-yellow-400 text-white hover:text-yellow-500 border-yellow-400  rounded">
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
