import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  getProductController,
  uploadProductController,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post("/add_product", auth, uploadProductController);
productRouter.post("/get_product", getProductController);

export default productRouter;
