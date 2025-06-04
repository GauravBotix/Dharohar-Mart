import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.router.js";
import categoryRouter from "./routes/category.router.js";
import uploadImageRouter from "./routes/upload.category.image.router.js";
import subCategoryRouter from "./routes/subcategory.router.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import addressRouter from "./routes/address.router.js";
import orderRouter from "./routes/order.router.js";
dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(morgan(":method :url :status :response-time"));
app.use(cookieParser());
app.use("/order", orderRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).send("hello new request.");
});

/* Routes... */
app.use("/user", userRouter);
app.use("/file", uploadImageRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subCategoryRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/address", addressRouter);

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});
