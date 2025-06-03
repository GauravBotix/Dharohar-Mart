import productModel from "../models/product.model.js";

const uploadProductController = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = req.body;

    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !price ||
      !description
    ) {
      return res.status(422).json({
        message: "Please Provide all the credentials",
        success: false,
        error: true,
      });
    }

    const uploadProduct = new productModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });

    const save = await uploadProduct.save();
    if (!save) {
      return res.status(500).json({
        message: "Product not uploaded",
        success: false,
        error: true,
      });
    }
    return res.status(201).json({
      message: "Product Successfully added",
      success: true,
      error: false,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getProductController = async (req, res) => {
  try {
    let { page, limit, search } = req.body;
    if (!page) page = 2;
    if (!limit) limit = 10;

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;
    const [data, totalCount] = await Promise.all([
      productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      productModel.countDocuments(query),
    ]);

    return res.status(200).json({
      message: "Product sent",
      error: false,
      success: true,
      totalCount: totalCount,
      totalPage: Math.ceil(totalCount / limit),
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(422).json({
        message: "Provide all the credentials",
        success: false,
        error: true,
      });
    }
    const product = await productModel
      .find({
        category: { $in: id },
      })
      .limit(10);

    return res.status(200).json({
      message: "category product List",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const getProductByCategoryAndSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId, page, limit } = req.body;
    if (!categoryId || !subcategoryId) {
      return res.status(422).json({
        message: "Provide all credentials",
        success: false,
        error: true,
      });
    }
    if (!page) page = 1;
    if (!limit) limit = 10;

    const query = {
      category: { $in: categoryId },
      subCategory: { $in: subcategoryId },
    };

    const skip = (page - 1) * limit;
    const [data, dataCount] = await Promise.all([
      productModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      productModel.countDocuments(query),
    ]);

    return res.status(200).json({
      message: "Product List",
      data: data,
      totalCount: dataCount,
      page: page,
      limit: limit,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findOne({ _id: productId });
    return res.status(200).json({
      message: "product found",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(422).json({
        message: "Id not present",
        success: false,
        error: true,
      });
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      { _id: _id },
      {
        ...req.body,
      }
    );
    return res.status(200).json({
      message: "product Updated successfully",
      data: updatedProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res.status(422).json({
        message: "Id not present",
        success: false,
        error: true,
      });
    }
    const deleteproduct = await productModel.deleteOne({ _id: _id });
    return res.status(200).json({
      message: "Product Deleted Successfully",
      data: deleteproduct,
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

const searchProduct = async (req, res) => {
  try {
    let { search, page, limit } = req.body;
    if (!page) page = 1;
    if (!limit) limit = 10;

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const skip = (page - 1) * limit;
    const [data, dataCount] = await Promise.all([
      productModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      productModel.countDocuments(query),
    ]);

    return res.status(200).json({
      message: "product displayed",
      data: data,
      totalCount: dataCount,
      totalPage: Math.ceil(dataCount / limit),
      page: page,
      limit: limit,
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
export {
  uploadProductController,
  getProductController,
  getProductByCategory,
  getProductByCategoryAndSubcategory,
  getProductDetails,
  updateProduct,
  deleteProduct,
  searchProduct,
};
