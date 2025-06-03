import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  deleteProduct,
  getProductByCategory,
  getProductByCategoryAndSubcategory,
  getProductController,
  getProductDetails,
  searchProduct,
  updateProduct,
  uploadProductController,
} from "../controllers/product.controller.js";
import { admin } from "../middleware/admin.js";

const productRouter = Router();

productRouter.post("/add_product", auth, uploadProductController);
productRouter.post("/get_product", getProductController);
productRouter.post("/get_product_by_category", getProductByCategory);
productRouter.post(
  "/get_product_by_category_subcategory",
  getProductByCategoryAndSubcategory
);
productRouter.post("/get_product_detail", getProductDetails);
productRouter.put("/update_product", auth, admin, updateProduct);
productRouter.delete("/delete_product", auth, admin, deleteProduct);
productRouter.post("/search_product", searchProduct);

export default productRouter;
