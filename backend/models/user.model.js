import mongoose from "mongoose";

const uerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      unique: true,
      sparse: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    refresh_token: {
      type: String,
      default: "",
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    forgot_password_otp: {
      type: String,
      default: "",
    },
    forgot_password_expiry: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Inactive"],
      default: "Active",
    },
    last_login_date: {
      type: Date,
      default: "",
    },
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "order",
      },
    ],
    address_detail: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cartProduct",
      },
    ],
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", uerSchema);
export default userModel;
