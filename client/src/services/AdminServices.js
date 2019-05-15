import Api from "@/services/Api";

export default {
    registerAdmin(credentials) {
    return Api().post(`registerAdmin`, credentials);
  },
  checkAdminEmail(email) {
    return Api().put(`checkAdminEmail`, email);
  },
  loginAdmin(credentials) {
    return Api().put(`loginAdmin`, credentials);
  },
  authenticateAdmin(credentials) {
    return Api().put(`authenticateAdmin`, credentials)
  },
  resetAdminPasswordLink(credentials) {
    return Api().put(`resetAdminPasswordLink`, credentials);
  },
  resetAdminPasswordStart(uri) {
    return Api().get(`resetAdminPasswordStart/${uri}`);
  },
  resetAdminPassword(credentials) {
    return Api().put(`resetAdminPassword`, credentials);
  }
};