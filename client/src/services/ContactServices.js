import Api from "@/services/Api";

export default {
    contact(credentials) {
      return Api().post(`contact`, credentials);
    }
}