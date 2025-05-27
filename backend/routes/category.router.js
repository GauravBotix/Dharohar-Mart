import { Router } from "express";
import {
  addCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController,
} from "../controllers/category.controller.js";
import auth from "../middleware/auth.js";

const categoryRouter = Router();

categoryRouter.post("/add_category", auth, addCategoryController);
categoryRouter.get("/get_category", getCategoryController);
categoryRouter.put("/update_category", auth, updateCategoryController);
categoryRouter.delete("/delete_category", auth, deleteCategoryController);

export default categoryRouter;
