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
      // color: "red"
      // color: "blue"
      // color: "cyan"
      // color: "whitesmoke"
      // color: "green"
      // color: "orange"
      // color: "pink"
      // color: "purple"
      // color: "darkgrey"
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
    }
  }
});
