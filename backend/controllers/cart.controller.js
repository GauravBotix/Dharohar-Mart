import CartProductModel from "../models/cartProduct.model.js";
import userModel from "../models/user.model.js";

const addToCartController = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    if (!userId) {
      return res.status(404).json({
        message: "Please Login",
        error: true,
        success: false,
      });
    }
    if (!productId) {
      return res.status(422).json({
        message: "Provide all credential",
        successs: false,
        error: true,
      });
    }
    const checkItem = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });
    if (checkItem) {
      return res.status(400).json({
        message: "Item already in cart",
        success: false,
        error: true,
      });
    }
    const cartItem = new CartProductModel({
      productId: productId,
      quantity: 1,
      userId: userId,
    });
    const save = await cartItem.save();
    const updateUserCart = await userModel.updateOne(
      { _id: userId },
      {
        $push: {
          shopping_cart: productId,
        },
      }
    );
    return res.status(201).json({
      message: "Product added to cart",
      data: save,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Errror" || error.message || error,
      success: false,
      error: true,
    });
  }
};

const getCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItem = await CartProductModel.find({
      userId: userId,
    }).populate("productId");

    return res.status(200).json({
      message: "Item found",
      data: cartItem,
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

const updateCartItemQty = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, qty } = req.body;
    if (!_id || !qty) {
      return res.status(422).json({
        message: "provide all credentials",
        error: true,
        success: false,
      });
    }
    const update = await CartProductModel.updateOne(
      { _id: _id, userId: userId },
      {
        quantity: qty,
      }
    );
    return res.status(200).json({
      message: "updated successfully",
      error: false,
      data: update,
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

const deleteCartItemController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;
    if (!_id) {
      return res.status(422).json({
        message: "provide id",
        error: true,
        success: false,
      });
    }
    const deleteProduct = await CartProductModel.deleteOne({
      _id: _id,
      userId: userId,
    });
    return res.status(200).json({
      message: "Item removed Successfully",
      error: false,
      success: true,
      data: deleteProduct,
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
  addToCartController,
  getCartItemController,
  updateCartItemQty,
  deleteCartItemController,
};
