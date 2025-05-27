import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addSubcategoryController,
  deleteSubcategoryController,
  getSubcategoryController,
  updateSubcategoryController,
} from "../controllers/subcategory.controller.js";

const subCategoryRouter = Router();

subCategoryRouter.post("/add_subcategory", auth, addSubcategoryController);
subCategoryRouter.post("/get_subcategory", getSubcategoryController);
subCategoryRouter.put("/update_subcategory", auth, updateSubcategoryController);
subCategoryRouter.delete("/delete_subcategory", auth, deleteSubcategoryController);

export default subCategoryRouter;
