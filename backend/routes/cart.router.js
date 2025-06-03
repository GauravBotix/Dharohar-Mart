import { Router } from "express";
import auth from "../middleware/auth.js";
import { addToCartController, deleteCartItemController, getCartItemController, updateCartItemQty } from "../controllers/cart.controller.js";



const cartRouter = Router();

cartRouter.post("/add_to_cart", auth, addToCartController);
cartRouter.get("/get_Cart", auth, getCartItemController);
cartRouter.put("/update_Cart", auth, updateCartItemQty);
cartRouter.delete("/delete_Cart", auth, deleteCartItemController);


export default cartRouter;