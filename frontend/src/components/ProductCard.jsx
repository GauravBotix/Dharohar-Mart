import React, { useState } from "react";

const ProductCard = ({
  data,
  setEditOpen,
  setOpenDelete,
  setEditProductData,
  setDeleteProduct,
}) => {
  return (
    <div className="card bg-base-100 shadow-xl shadow-gray-300 w-full">
      <figure>
        <img src={data?.image[0]} alt={data?.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-ellipsis line-clamp-2 font-medium text-md ">
          {data?.name}
        </h2>
        <p className="text-neutral-500">{data.unit}</p>

        <div className="flex justify-evenly gap-4">
          <button
            onClick={() => {
              setEditOpen(true);
              setEditProductData(data);
              document.getElementById("my_modal_2").showModal();
            }}
            className="border px-1 w-full py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => {
              setOpenDelete(true);
              setDeleteProduct(data);
              document.getElementById("my_modal_2").showModal();
            }}
            className="border px-1 w-full py-1 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
