import React, { useEffect, useState } from "react";
import UploadCategorymodal from "../components/UploadCategorymodal";
import Nodata from "../assets/nodata.png";

import CategoryCard from "../components/CategoryCard";
import EditCategoryModal from "../components/EditCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";

import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosError";

const category = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [deleteId, setDeleteId] = useState({ _id: "" });
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });

  // const allCategory = useSelector(state => state.product.allcategory)
  // useEffect(()=>{
  //     setCategoryData(allcategory)
  // },[allCategory])

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_category,
      });
      console.log(response);
      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <section className="px-4 pl-4 pr-4">
      <div className="p-3 bg-white shadow-md  shadow-neutral-300 mb-4 rounded-lg flex items-center justify-between ">
        <h1 className="font-semibold text-neutral-700 uppercase text-xl ">
          Category
        </h1>
        <button
          onClick={() => {
            setOpenUploadCategory(true);
            document.getElementById("my_modal_1").showModal();
          }}
          className="text-sm border cursor-pointer border-yellow-200 bg-yellow-500 hover:bg-white hover:text-yellow-500 text-white font-semibold px-3 py-1 rounded ml-auto "
        >
          Add Category
        </button>
        {openUploadCategory && (
          <UploadCategorymodal
            fetchCategoryData={fetchCategoryData}
            setOpenUploadCategory={setOpenUploadCategory}
          />
        )}
      </div>

      {!categoryData[0] && !loading && (
        <>
          <img
            src={Nodata}
            className="h-68 w-68 m-auto mt-10 bg-transparent grid grid-center rounded-full"
          />
          <p className="text-center  text-xl font-bold">
            <div className="text-red-600 text-3xl uppercase">Sorry!!</div>
            No Category present
          </p>
        </>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 m-2 ">
        {categoryData.map((item, index) => (
          <CategoryCard
            item={item}
            key={item._id}
            setEditCategory={setEditCategory}
            setDeleteCategory={setDeleteCategory}
            setEditData={setEditData}
            setDeleteId={setDeleteId}
          />
        ))}
      </div>

      {editCategory && (
        <EditCategoryModal
          editData={editData}
          fetchCategoryData={fetchCategoryData}
          setEditCategory={setEditCategory}
        />
      )}
      {deleteCategory && (
        <DeleteCategoryModal
          deleteId={deleteId}
          fetchCategoryData={fetchCategoryData}
          setDeleteCategory={setDeleteCategory}
        />
      )}
    </section>
  );
};

export default category;

/* : (
        <div className="text-center pt-5">
          <div className="loading loading-dots loading-xl"></div>
        </div>
      ) */
