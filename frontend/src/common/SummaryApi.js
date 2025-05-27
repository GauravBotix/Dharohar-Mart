const baseUrl = import.meta.env.VITE_API_URL;

const SummaryApi = {
  register: {
    url: "/user/signup",
    method: "post",
  },
  login: {
    url: "/user/login",
    method: "post",
  },
  forgot_password: {
    url: "/user/forgot_password",
    method: "put",
  },
  verify_otp: {
    url: "/user/verify_otp",
    method: "put",
  },
  reset_password: {
    url: "/user/reset_password",
    method: "put",
  },
  user_details: {
    url: "/user/user_details",
    method: "get",
  },
  logout: {
    url: "user/logout",
    method: "get",
  },
  update_user: {
    url: "user/update_user",
    method: "put",
  },
  upload_avatar: {
    url: "user/upload_avatar",
    method: "put",
  },
  add_category: {
    url: "category/add_category",
    method: "post",
  },
  upload_image: {
    url: "file/upload_image",
    method: "post",
  },
  get_category: {
    url: "category/get_category",
    method: "get",
  },
  update_category: {
    url: "category/update_category",
    method: "put",
  },
  delete_category: {
    url: "category/delete_category",
    method: "delete",
  },
  add_subcategory: {
    url: "subcategory/add_subcategory",
    method: "post",
  },
  get_subcategory: {
    url: "subcategory/get_subcategory",
    method: "post",
  },
  update_subcategory: {
    url: "subcategory/update_subcategory",
    method: "put",
  },
  delete_subcategory: {
    url: "subcategory/delete_subcategory",
    method: "delete",
  },
  add_product: {
    url: "product/add_product",
    method: "post",
  },
  get_product: {
    url: "product/get_product",
    method: "post",
  },
};

export default SummaryApi;
