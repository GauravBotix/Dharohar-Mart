import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import sendEmail from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateOtp from "../utils/generateForgotOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const register = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Please provide all credentials.",
        success: false,
        error: true,
      });
    }
    const user = await userModel.findOne({
      $or: [{ email }, { mobile: { $ne: null, $eq: mobile } }],
    });

    if (user) {
      return res.status(409).json({
        message: "Already registered.",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
      mobile,
    });
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;
    const verifyEmail = await sendEmail({
      sendTo: newUser.email,
      subject: "Verify Email from DharoharMart",
      html: verifyEmailTemplate({
        name: newUser.name,
        url: verifyEmailUrl,
      }),
    });

    return res.status(201).json({
      message: "Successfully registered",
      success: true,
      error: false,
      data: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
        mobile: newUser.mobile,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        message: "Please provide all the credentials.",
        error: true,
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
        success: false,
        error: true,
      });
    }
    if (user.status !== "Active") {
      return res.status(401).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        message: "Invalid email or password",
        error: true,
        success: false,
      });
    }
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookiesOption = {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    };

    const updateLastLogin = await userModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
    });

    res.cookie("AccessToken", accessToken, cookiesOption);
    res.cookie("RefreshToken", refreshToken, cookiesOption);

    return res.status(200).json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const logout = async (req, res) => {
  try {
    const userid = req.userId; /* from the auth middleware. */

    const cookiesOption = {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    };

    res.clearCookie("AccessToken", cookiesOption);
    res.clearCookie("RefreshToken", cookiesOption);

    const updatedRefreshToken = await userModel.findByIdAndUpdate(
      { _id: userid },
      { refresh_token: "" }
    );

    return res.status(200).json({
      message: "Logout Successfull",
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

const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await userModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: error.message || error,
        success: false,
        error: true,
      });
    }
    const updateVerifyEmail = await userModel.findByIdAndUpdate(
      { _id: code },
      { verify_email: true }
    );
    return res.status(200).json({
      message: "User successfully verified",
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

const updateUser = async (req, res) => {
  try {
    const userId = req.userId; /* form auth middleware. */
    const { name, password, mobile, email } = req.body;

    let hashPassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    const updateProfile = await userModel.findByIdAndUpdate(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      },{ new: true } 
    );
    return res.status(200).json({
      message: "User updated successfully.",
      error: false,
      success: true,
      data: updateProfile,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const forgotOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const Otp = generateOtp();
    const expiryTime = new Date() + 60 * 60 * 1000; /* valid for 1 hour */

    const forgotOtp = await userModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: Otp,
      forgot_password_expiry: new Date(expiryTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Restore the forgot password.",
      html: forgotPasswordTemplate({ name: user.name, otp: Otp }),
    });
    return res.json({
      message: "OTP succesfully send to your registered email id.",
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

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(422).json({
        message: "please provide the email and otp.",
        success: false,
        error: true,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not exist.",
        success: false,
        error: true,
      });
    }
    /* check whether otp is expired or not */
    const currentTime = new Date().toISOString();
    if (user.forgot_password_expiry < currentTime) {
      return res.status(404).json({
        message: "Otp has expired",
        error: true,
        success: false,
      });
    }
    /* check whether otp is correct or not */
    if (user.forgot_password_otp != otp) {
      return res.status(404).json({
        message: "Invalid Otp",
        error: true,
        success: false,
      });
    }
    /* update the forgotOtp */
    const verifyOtp = await userModel.findByIdAndUpdate(user._id, {
      forgot_password_expiry: "",
      forgot_password_otp: "",
    });
    return res.json({
      message: "OTP successfully verified.",
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

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(422).json({
        message: "please enter all  crediantials.",
        error: true,
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not exist.",
        error: true,
        success: false,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword must be same.",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatePassword = await userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    return res.json({
      message: "Password updated successfully.",
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

const userDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel
      .findById(userId)
      .select("-password -refresh_token");

    return res.json({
      message: "User found successfully",
      success: true,
      error: false,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.RefreshToken || req?.headers?.authorization?.split(" ")[1]; /// [ Bearer token]

    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generateAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: false,
      sameSite: "None",
    };

    res.cookie("AccessToken", newAccessToken, cookiesOption);

    return res.json({
      message: "New Access token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    const image = req.file;
    console.log("done", image);
    const upload = await uploadImageCloudinary(image);

    const updateAvatar = await userModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return res.status(200).json({
      message: "Avatar Uploaded",
      error: false,
      success: true,
      data: upload.url,
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
  register,
  login,
  logout,
  verifyEmail,
  updateUser,
  forgotOtp,
  verifyOtp,
  resetPassword,
  userDetails,
  refreshToken,
  uploadAvatar,
};
