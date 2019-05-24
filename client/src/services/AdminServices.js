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
    return Api().put(`authenticateAdmin`, credentials);
  },
  resetAdminPasswordLink(credentials) {
    return Api().put(`resetAdminPasswordLink`, credentials);
  },
  resetAdminPasswordStart(uri) {
    return Api().get(`resetAdminPasswordStart/${uri}`);
  },
  resetAdminPassword(credentials) {
    return Api().put(`resetAdminPassword`, credentials);
  },
  insertProduct(credentials) {
    return Api().post(`insertProduct`, credentials);
  },
  insertProductImage(credentials) {
    return Api().post(`insertProductImage`, credentials);
  },
  removeImageFileName(credentials) {
    return Api().post(`removeImageFileName`, credentials);
  },
  checkProductName(productName) {
    return Api().put(`checkProductName`, productName);
  },
  productsToEdit() {
    return Api().get(`productsToEdit`);
  },
  editProduct(credentials) {
    return Api().post(`editProduct`, credentials);
  },
  addFaq(credentials) {
    return Api().post(`addFaq`, credentials);
  },
  getFaq() {
    return Api().get(`getFaq`);
  },
  deleteFaq(credentials) {
    return Api().post(`deleteFaq`, credentials);
  },
  productViews() {
    return Api().get(`productViews`);
  },
  customerViews() {
    return Api().get(`customerViews`);
  },
  customerInvoices(credentials) {
    return Api().put(`customerInvoices`, credentials);
  },
  adminEditClientDetails(credentials) {
    return Api().post(`adminEditClientDetails`, credentials);
  }
};
