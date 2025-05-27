import React, { useEffect, useRef } from "react";

const ViewImage = ({ url }) => {
  const modalRef = useRef();
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal(); // Open the dialog
    }
  }, []);
  return (
    <div>
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box ">
          <div className="card bg-slate-500  shadow-sm mx-auto justify-center items-center  ">
            <img src={url} alt="image" className="object-scale-up text-3xl" />
          </div>
          <div className="modal-action">
            <button
              className="border-1 bg-gray-800 w-full text-center cursor-pointer font-semibold uppercase hover:bg-gray-900 text-white items-center p-2 rounded-md"
              onClick={() => modalRef.current.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ViewImage;
