import userModel from "../models/user.model.js";
import addressModel from "../models/address.model.js";

const addAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, country, mobile } = req.body;
    const createAddress = new addressModel({
      address_line,
      city,
      state,
      country,
      pincode,
      mobile,
      userId: userId,
    });

    const save = await createAddress.save();
    const updateUserAddress = await userModel.findByIdAndUpdate(userId, {
      $push: {
        address_detail: save._id,
      },
    });
    return res.status(201).json({
      message: "Address added successfully",
      data: save,
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

const getAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const details = await addressModel
      .find({ userId: userId })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "found address",
      error: false,
      success: true,
      data: details,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const updateAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, address_line, city, state, country, pincode, mobile } =
      req.body;
    const updateAddress = await addressModel.updateOne(
      { _id: _id, userId: userId },
      {
        address_line,
        city,
        state,
        country,
        pincode,
        mobile,
      }
    );
    return res.status(200).json({
      message: "Updated Successfully",
      error: false,
      success: true,
      data: updateAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;
    const disableAddress = await addressModel.deleteOne({
      _id: _id,
      userId: userId,
    });
    return res.status(200).json({
      message: "Deleted Successfully",
      error: false,
      success: true,
      data: disableAddress,
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
  addAddressController,
  getAddressController,
  updateAddressController,
  deleteAddressController,
};
