import { Router } from "express";
import auth from "../middleware/auth.js";
import express from "express";
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
orderRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhook
);

export default orderRouter;
