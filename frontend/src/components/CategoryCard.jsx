import React from "react";

const CategoryCard = ({
  item,
  setEditCategory,
  setDeleteCategory,
  setEditData,
  setDeleteId
}) => {
  return (
    <>
      <div className="card bg-slate-300 shadow-sm  ">
        <img src={item.image} alt={item.name} className="rounded-xl p-1 " />

        <div className=" flex justify-around  rounded items-center ">
          <button
            onClick={() => {
              setEditData(item);
              setEditCategory(true);
              document.getElementById("my_modal_2").showModal();
            }}
            className=" text-green-700  font-medium cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setDeleteId(item);
              setDeleteCategory(true);
              document.getElementById("my_modal_3").showModal();
            }}
            className="text-red-700 font-medium cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
