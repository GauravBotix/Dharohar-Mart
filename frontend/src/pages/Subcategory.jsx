import React, { useEffect, useState } from "react";
import UploadSubcategoryModal from "../components/UploadSubcategoryModal";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosError";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "../components/Table";
import ViewImage from "../components/viewImage";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Nodata from "../assets/nodata.png";

import EditSubcategoryModal from "../components/EditSubcategoryModal";
import DeleteSubcategoryModal from "../components/DeleteSubCategoryModal";

const Subcategory = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const columnHelper = createColumnHelper();
  const [openEditSubcategory, setOpenEditSubcategory] = useState(false);
  const [openDeleteSubcategory, setOpenDeleteSubcategory] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [deleteSubcategoryId, setDeleteSubcategoryId] = useState({
    _id: "",
  });

  const fetchSubcategoryData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_subcategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategoryData();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        console.log("row", row);

        return (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-8 h-8 mx-auto cursor-pointer my-2 border rounded-md object-cover bg-slate-300"
            onClick={() => {
              setImageUrl(row.original.image);
              document.getElementById("my_modal_1").showModal();
            }}
          />
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((item, index) => (
              <p
                key={item._id + "-" + item.name}
                className=" px-1  justify-start flex  font-sans font-thin"
              >
                <div className="my-0.5 border-1 border-neutral-300 bg-neutral-300 text-black font-neutral px-1 rounded">
                  {item.name}
                </div>
              </p>
            ))}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className=" flex justify-evenly  ">
            <button
              onClick={() => {
                setOpenEditSubcategory(true);
                setEditData(row.original);
                document.getElementById("my_modal_2").showModal();
              }}
              className="text-green-600 cursor-pointer px-1 hover:scale-103"
            >
              <FaPencil className="text-lg lg:text-2xl " />
            </button>
            <button
              onClick={() => {
                setOpenDeleteSubcategory(true);
                setDeleteSubcategoryId(row.original);
                document.getElementById("my_modal_3").showModal();
              }}
              className="text-red-600 px-2  cursor-pointer hover:scale-103"
            >
              <FaTrashAlt className="text-lg lg:text-2xl " />
            </button>
          </div>
        );
      },
    }),
  ];

  return (
    <section className="px-4 pl-4 pr-4  ">
      <div className="p-3 bg-white shadow-md shadow-neutral-300 rounded-lg mb-4 flex items-center justify-between ">
        <h1 className="font-semibold text-neutral-700 uppercase text-xl ">
          Sub-Category
        </h1>
        <button
          onClick={() => {
            setOpenUploadSubCategory(true);
            document.getElementById("my_modal_1").showModal();
          }}
          className="text-sm cursor-pointer border border-yellow-200 bg-yellow-500 text-white hover:bg-white hover:text-yellow-500 font-semibold px-3 py-1 rounded ml-auto "
        >
          Add Sub-Category
        </button>

        {openUploadSubCategory && (
          <UploadSubcategoryModal
            fetchSubcategoryData={fetchSubcategoryData}
            setOpenUploadSubCategory={setOpenUploadSubCategory}
          />
        )}
      </div>

      {!data[0] && !loading ? (
        <>
          <img
            src={Nodata}
            className="h-68 w-68 m-auto mt-10 bg-transparent grid grid-center rounded-full"
          />
          <p className="text-center  text-xl font-bold">
            <div className="text-red-600 text-3xl uppercase">Sorry!!</div>
            No Sub-Category present
          </p>
        </>
      ) : (
        <div className="m-auto overflow-auto rounded-lg ">
          <Table data={data} column={column} />
        </div>
      )}

      {imageUrl && <ViewImage url={imageUrl} />}

      {openEditSubcategory && (
        <EditSubcategoryModal
          editData={editData}
          setOpenEditSubcategory={setOpenEditSubcategory}
          fetchSubcategoryData={fetchSubcategoryData}
        />
      )}

      {openDeleteSubcategory && (
        <DeleteSubcategoryModal
          deleteSubcategoryId={deleteSubcategoryId}
          setOpenDeleteSubcategory={setOpenDeleteSubcategory}
          fetchSubcategoryData={fetchSubcategoryData}
        />
      )}
    </section>
  );
};

export default Subcategory;
