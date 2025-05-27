import { Router } from "express";
import {
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
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.get("/logout", auth, logout);
userRouter.post("/verify_email", verifyEmail);
userRouter.put("/update_user", auth, updateUser);
userRouter.put("/forgot_password", forgotOtp);
userRouter.put("/verify_otp", verifyOtp);
userRouter.put("/reset_password", resetPassword);
userRouter.get("/user_details", auth, userDetails);
userRouter.post("/refreshToken", refreshToken);
userRouter.put("/upload_avatar", auth, upload.single('avatar'),uploadAvatar);


export default userRouter;
