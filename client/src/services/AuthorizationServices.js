import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().post(`registerUser`, credentials);
  },
  login(credentials) {
    return Api().put(`login`, credentials);
  },
  checkEmail(email) {
    return Api().put(`checkEmail`, email);
  },
  deliveryDetails(id) {
    return Api().get(`deliveryDetails/${id}`);
  },
  updateDelivery(credentials) {
    return Api().put(`updateDelivery`, credentials);
  },
  successURL(credentials) {
    return Api().put(`successURL`, credentials);
  },
  successResponse(pfast) {
    return Api().get(`successResponse/${pfast}`);
  },
  createCart(credentials) {
    return Api().post(`createCart`, credentials);
  },
  deleteCart(id) {
    return Api().delete(`deleteCart/${id}`);
  },
  resetPasswordLink(credentials) {
    return Api().put(`resetPasswordLink`, credentials);
  },
  resetPasswordStart(uri) {
    return Api().get(`resetPasswordStart/${uri}`);
  },
  resetPassword(credentials) {
    return Api().put(`resetPassword`, credentials);
  }
};
