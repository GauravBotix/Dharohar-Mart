import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addAddressController,
  deleteAddressController,
  getAddressController,
  updateAddressController,
} from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add_address", auth, addAddressController);
addressRouter.get("/get_address", auth, getAddressController);
addressRouter.put("/update_address", auth, updateAddressController);
addressRouter.delete("/delete_address", auth, deleteAddressController);

export default addressRouter;
