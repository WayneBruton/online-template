import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Showroom from "./views/Showroom.vue";
import Product from "./views/Product.vue";
import About from "./views/About.vue";
import Terms from "./views/Terms.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import ShoppingCart from "./views/ShoppingCart.vue";
import Contact from "./views/Contact.vue";
import PaymentSuccessful from "./views/PaymentSuccessfull.vue";
import ResetPassword from "./views/ResetPassword.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home 
    },
    {
      path: "/showroom",
      name: "showroom",
      component: Showroom
    },
    {
      path: "/product/:productId",
      name: "product",
      component: Product
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/terms",
      name: "terms",
      component: Terms
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register", 
      component: Register
    },
    {
      path: "/shoppingCart",
      name: "shoppingCart", 
      component: ShoppingCart
    },
    {
      path: "/contact",
      name: "contact", 
      component: Contact
    },
    {
      path: "/paymentSuccessful/:payID",
      name: "paymentSuccessful",
      component: PaymentSuccessful
    },
    {
      path: "/resetPassword/:reset",
      name: "resetPassword",
      component: ResetPassword
    }
  ]
});
