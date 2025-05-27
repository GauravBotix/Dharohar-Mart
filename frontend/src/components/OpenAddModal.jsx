import React, { useEffect, useRef } from "react";
import { IoCloseCircle } from "react-icons/io5";

const OpenAddModal = ({ setOpenAdd, onChange, value, onSubmit }) => {
  const inputRef = useRef();
  const modalRef = useRef();
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal(); // Open the dialog
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);

  return (
    <section>
      <dialog ref={modalRef} id="my_modal_1" className="modal modal-middle">
        <div className="modal-box relative ">
          <h2 className="text-xl  font-bold text-center pb-5">
            Add More Fields
          </h2>
          <button
            className="absolute top-[5px] right-[5px]"
            onClick={() => {
              document.getElementById("my_modal_1").close();
              setOpenAdd(false);
              modalRef.current.close();
            }}
          >
            <IoCloseCircle size={25} />
          </button>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              ref={inputRef}
              autoFocus
              required
              className="w-full mt-5 bg-white px-3 text-black border-2 border-neutral-700 rounded h-10"
              placeholder="Enter field"
              value={value}
              onChange={onChange}
            />
            <button
              type="submit"
              className="mx-auto flex px-4 py-1 my-5 cursor-pointer text-xl text-center justify-center rounded hover:bg-white text-white bg-yellow-500 hover:text-yellow-500 font-semibold border border-yellow-200"
            >
              Add
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default OpenAddModal;
