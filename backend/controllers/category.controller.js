import categoryModel from "../models/category.model.js";
import subCategoryModel from "../models/subCategory.model.js";
import productModel from "../models/product.model.js";

const addCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(422).json({
        message: "Provide all the credintials",
        error: false,
        success: true,
      });
    }

    const addCategory = new categoryModel({
      name,
      image,
    });
    const savecategory = await addCategory.save();
    if (!savecategory) {
      return res.status(500).json({
        message: "Category not created",
        success: false,
        error: true,
      });
    }
    return res.status(201).json({
      message: "New category created",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getCategoryController = async (req, res) => {
  try {
    const getCategory = await categoryModel.find().sort({ createdAt: -1 });
    return res.json({
      data: getCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;
    const update = await categoryModel.findByIdAndUpdate(_id, { name, image });
    return res.json({
      message: "Updated Successfully",
      success: true,
      error: false,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;

    const checkSubCategory = await subCategoryModel
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();

    const checkProduct = await productModel
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();

    if (checkProduct > 0 || checkSubCategory > 0) {
      return res.status(400).json({
        message: "Category is already in use, so cannot delete",
        success: false,
        error: true,
      });
    }
    const deleteCategory = await categoryModel.deleteOne({ _id: _id });
    return res.json({
      message: "Deleted Successfully",
      success: true,
      error: false,
      data: deleteCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {
  addCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
