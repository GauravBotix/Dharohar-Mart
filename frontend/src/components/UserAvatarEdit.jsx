import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosError";
import { updatedAvatar } from "../store/userSlice";
import { IoCloseCircle } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetails";
// import ViewImage from "../components/ViewImage";

const UserAvatarEdit = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.upload_avatar,
        data: formData,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        const uploadeAvatar = await fetchUserDetails();
        dispatch(updatedAvatar(uploadeAvatar.avatar));
        await document.getElementById("my_modal_1").close();

        setInterval(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  
  const modalRef = useRef();
    useEffect(() => {
      if (modalRef.current) {
        modalRef.current.showModal(); // Open the dialog
      }
    }, []);

  return (
    <section>
      <dialog ref={modalRef} id="my_modal_1" className="modal modal-middle">
        <div className="modal-box relative ">
          <h2 className="text-xl font-bold text-center pb-5 uppercase">Update Avatar</h2>

          <button
            className="absolute top-[15px] right-[5px]"
            onClick={() => modalRef.current.close()}
          >
            <IoCloseCircle size={25} />
          </button>
          <div className="flex items-center justify-evenly  ">
            <div className="">
              {user.avatar ? (
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar w-30 h-30 p-0.5 rounded-full hover:border-neutral-700 bg-neutral-200 object-scale-down "
                >
                  <div className=" rounded-full object-scale-down">
                    <img alt={user.name} src={user.avatar} />
                  </div>
                </div>
              ) : (
                <FaUserCircle size={100} />
              )}
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="avatar"
                  className="flex  items-center justify-center"
                >
                  <div className="border-1 rounded-md  cursor-pointer  border-yellow-400 font-semibold text-lg  bg-yellow-400 text-white hover:bg-white hover:text-yellow-500 p-2 text-center uppercase">
                    {loading ? "Loading..." : "Upload"}
                  </div>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={handleUploadAvatar}
                    className="hidden"
                  />
                </label>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default UserAvatarEdit;
{
  /* <section className=" top-0 bottom-0 left-0 right-0 p-4 flex items-center justify-center">
  <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
    <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
      {user.avatar ? (
        <img alt={user.name} src={user.avatar} className="w-full h-full" />
      ) : (
        <FaUserCircle size={72} />
      )}
    </div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="uploadProfile">
        <div className="border border-primary-200 cursor-pointer hover:bg-yellow-200 px-4 py-1 rounded text-sm my-3">
          {loading ? "Loading..." : "Upload"}
        </div>
        <input
          onChange={handleUploadAvatar}
          type="file"
          id="uploadProfile"
          className="hidden"
        />
      </label>
      <button
        className="btn"
        onClick={() => {
          document.getElementById("my_modal_1").close();
        }}
      >
        Close
      </button>
    </form>
  </div>
</section>; */
}
