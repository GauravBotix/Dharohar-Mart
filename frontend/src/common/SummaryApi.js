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
  get_product_by_category: {
    url: "product/get_product_by_category",
    method: "post",
  },
  get_product_by_category_subcategory: {
    url: "product/get_product_by_category_subcategory",
    method: "post",
  },
  get_product_detail: {
    url: "product/get_product_detail",
    method: "post",
  },
  update_product: {
    url: "product/update_product",
    method: "put",
  },
  delete_product: {
    url: "product/delete_product",
    method: "delete",
  },
  search_product: {
    url: "product/search_product",
    method: "post",
  },
  add_to_cart: {
    url: "cart/add_to_cart",
    method: "post",
  },
  get_Cart: {
    url: "cart/get_Cart",
    method: "get",
  },
  update_Cart: {
    url: "cart/update_Cart",
    method: "put",
  },
  delete_Cart: {
    url: "cart/delete_Cart",
    method: "delete",
  },
  add_address: {
    url: "address/add_address",
    method: "post",
  },
  get_address: {
    url: "address/get_address",
    method: "get",
  },
  update_address: {
    url: "address/update_address",
    method: "put",
  },
  delete_address: {
    url: "address/delete_address",
    method: "delete",
  },
  cash_on_delivery: {
    url: "order/cash_on_delivery",
    method: "post",
  },
  online_payment: {
    url: "order/online_payment",
    method: "post",
  },
  get_order_items: {
    url: "order/get_order_items",
    method: "get",
  },
};

export default SummaryApi;
