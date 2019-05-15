import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    selectedProduct: null,
    token: null,
    user: null,
    username: null,
    isUserLoggedIn: false,
    cartCount: 0,
    shoppingCart: [],  
    readyToInvoice: false,
    siteSetup: {
      businessName: "Boredom Busters",
      businessEmail: "boredombusters.co.za",
      color: "#305f72"
    },
    administration: {
      admin_user: null,
      admin_token: null,
      admin_username: null,
      isAdminUserLoggedIn: false
    }
  },
  mutations: {
    setSelectedProduct(state, selectedProduct) {
      state.selectedProduct = selectedProduct;
    },
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserName(state, username) {
      state.username = username;
    },
    addToCart(state, addItems) {
      state.cartCount = addItems;
    },
    addToShoppingCart(state, stockItem) {
      state.shoppingCart = stockItem;
    },
    readyToInvoice(state, yes) {
      state.readyToInvoice = yes;
    },
    // *************** ADMIN FUNCTIONS **************
    setAdminToken(state, admin_token) {
      state.administration.admin_token = admin_token;
      if (admin_token) {
        state.administration.isAdminUserLoggedIn = true;
      } else {
        state.administration.isAdminUserLoggedIn = false;
      }
    },
    setAdminUser(state, admin_user) {
      state.administration.admin_user = admin_user;
    },
    setAdminUserName(state, admin_username) {
      state.administration.admin_username = admin_username;
    }
  },
  actions: {
    setSelectedProduct({ commit }, selectedProduct) {
      commit("setSelectedProduct", selectedProduct);
    },
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    setUserName({ commit }, username) {
      commit("setUserName", username);
    },
    addToCart({ commit }, addItems) {
      commit("addToCart", addItems);
    },
    addToShoppingCart({ commit }, stockItem) {
      commit("addToShoppingCart", stockItem);
    },
    readyToInvoice({ commit }, yes) {
      commit("readyToInvoice", yes);
    },
    // ********* ADMIN FUNCTIONS************
    setAdminToken({ commit }, admin_token) {
      commit("setAdminToken", admin_token);
    },
    setAdminUser({ commit }, admin_user) {
      commit("setAdminUser", admin_user);
    },
    setAdminUserName({ commit }, admin_username) {
      commit("setAdminUserName", admin_username);
    }

  }
});
