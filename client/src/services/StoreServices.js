import Api from "@/services/Api";

export default {
  products() {
    return Api().get(`/products`);
  },
  product(id) {
    return Api().get(`/product/${id}`);
  }
};
