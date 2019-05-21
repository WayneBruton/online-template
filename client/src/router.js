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
import Faq from "./views/Faq.vue";

import Dashboard from "./views/adminViews/Dashboard.vue";
import AdminLogin from "./views/adminViews/AdminLogin.vue";
import AdminResetPassword from "./views/adminViews/AdminResetPassword.vue";
import AddAdminUser from "./views/adminViews/AddAdminUser.vue";
import AddProduct from "./views/adminViews/AddProduct.vue";
import EditProduct from "./views/adminViews/EditProduct.vue";
import AddFAQ from "./views/adminViews/AddFaq.vue";
import EditFAQ from "./views/adminViews/EditFaq.vue";
import Stats from "./views/adminViews/Stats.vue";
import Customers from "./views/adminViews/Customers.vue";

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
    },
    {
      path: "/faq",
      name: "faq",
      component: Faq
    },
    // **********ADMIN ROUTES*************
    {
      path: "/administration/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/administration/adminLogin",
      name: "adminLogin",
      component: AdminLogin
    },
    {
      path: "/administration/adminresetpassword/:reset",
      name: "adminresetpassword",
      component: AdminResetPassword
    },
    {
      path: "/administration/AddAdminUser",
      name: "addadminuser",
      component: AddAdminUser
    },
    {
      path: "/administration/addproduct",
      name: "addproduct",
      component: AddProduct
    },
    {
      path: "/administration/editproduct",
      name: "editproduct",
      component: EditProduct
    },
    {
      path: "/administration/addFaq",
      name: "addFaq",
      component: AddFAQ
    },
    {
      path: "/administration/editFaq",
      name: "editFaq",
      component: EditFAQ
    },
    {
      path: "/administration/stats",
      name: "stats",
      component: Stats
    },
    {
      path: "/administration/customers",
      name: "customers",
      component: Customers
    }
  ]
});
