import { Router } from "express";
import auth from "../middleware/auth.js";
import uploadCategoryImageController from "../controllers/upload.category.image.controller.js";
import upload from "../middleware/multer.js";

const uploadImageRouter = Router();

uploadImageRouter.post(
  "/upload_image",
  auth,
  upload.single("image"),
  uploadCategoryImageController
);

export default uploadImageRouter;
