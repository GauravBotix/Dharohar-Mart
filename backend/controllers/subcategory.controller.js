import SubCategoryModel from "../models/subCategory.model.js";
import productModel from "../models/product.model.js";

const addSubcategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name && !image && !category[0]) {
      return res.status(422).json({
        message: "provide all the credentials",
        success: false,
        error: true,
      });
    }
    const createdSubcategory = new SubCategoryModel({
      name,
      image,
      category,
    });
    const save = await createdSubcategory.save();

    if (save) {
      return res.status(201).json({
        message: "Subcategory added Successfully",
        error: false,
        success: true,
        data: save,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: false,
      success: true,
    });
  }
};

const getSubcategoryController = async (req, res) => {
  try {
    const data = await SubCategoryModel.find()
      .sort({ createdAt: -1 })
      .populate("category");
    return res.status(200).json({
      message: "Fetched subcategory data",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const updateSubcategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;
    const check = await SubCategoryModel.findById(_id);
    if (!check) {
      return res.status(404).json({
        message: "Sub category not found",
        error: true,
        success: false,
      });
    }

    const update = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });
    return res.status(200).json({
      message: "Updated Successfully",
      error: false,
      success: true,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const deleteSubcategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const checkProduct = await productModel
      .find({
        subCategory: {
          $in: [_id],
        },
      })
      .countDocuments();
    if (checkProduct > 0) {
      return res.status(400).json({
        message: "Subcategory is already in use",
        success: false,
        error: true,
      });
    }
    const subcategoryfound = await SubCategoryModel.findById(_id);
    if (!subcategoryfound) {
      return res.status(404).json({
        message: "Sub-Category not found",
        error: true,
        success: false,
      });
    }
    const deleteSubcategory = await SubCategoryModel.deleteOne({ _id: _id });
    return res.status(200).json({
      message: "Deleted Successfully",
      success: true,
      error: false,
      data: deleteSubcategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export {
  addSubcategoryController,
  getSubcategoryController,
  updateSubcategoryController,
  deleteSubcategoryController,
};
