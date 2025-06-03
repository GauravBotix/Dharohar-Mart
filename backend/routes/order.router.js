import { Router } from "express";
import auth from "../middleware/auth.js";

import {
  cashPayment,
  getOrderItems,
  paymentController,
  webhook,
} from "../controllers/order.controller.js";

const orderRouter = Router();
orderRouter.post("/cash_on_delivery", auth, cashPayment);
orderRouter.post("/online_payment", auth, paymentController);
orderRouter.get("/get_order_items", auth, getOrderItems);
orderRouter.post("/webhook", webhook);

export default orderRouter;
