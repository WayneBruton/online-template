import Api from "@/services/Api";

export default {
  authenticate(credentials) {
    return Api().put(`authenticate`, credentials)
  }
};
