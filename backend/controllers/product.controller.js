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
export { uploadProductController, getProductController };
