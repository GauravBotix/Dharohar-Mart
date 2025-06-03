import userModel from "../models/user.model.js";

export const admin = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (user.role !== "ADMIN") {
      return res.status(404).json({
        message: "Permission denial",
        error: true,
        success: false,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Permission denial",
      error: true,
      success: false,
    });
  }
};
