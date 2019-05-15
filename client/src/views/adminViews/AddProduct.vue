<template>
  <v-container>
    <h1>Add Product</h1>
    <v-layout xs9 column offset-xs2>
      <v-flex>
        <!-- <div id="app"> -->
        <Custom-Cropper ref="child" @clickedSomething="handleInParent"></Custom-Cropper>
        <!-- </div> -->
        <br>
        <img :src="productImg" alt style="width: 50%;">
        <v-btn
          id="btn2"
          :class="this.$store.state.siteSetup.color"
          @click="dashboard"
          dark
        >Return to Dashboard</v-btn>
         <v-alert class="danger-alert" v-if="error" :value="true" type="error">{{ error }}</v-alert>
        <v-alert class="danger-alert" v-if="success" :value="true" type="success">{{ success }}</v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import CustomCropper from "@/components/importedComponents/CustomCropper";
import AdminService from "@/services/AdminServices";
export default {
  data() {
    return {
      productImg: null,
      success: null,
      error: null
    };
  },
  async mounted() {
    if (
      this.$store.state.administration.admin_token !== null &&
      this.$store.state.administration.isAdminUserLoggedIn !== false &&
      this.$store.state.administration.admin_user !== null &&
      this.$store.state.administration.admin_username !== null
    ) {
      await AdminService.authenticateAdmin({
        token: this.$store.state.administration.admin_token,
        user: this.$store.state.administration.admin_user.id,
        email: this.$store.state.administration.admin_user.email
      })
        .then(response => {
        //   console.log("response is", response.data.success);
          if (!response.data.success) {
            this.$store.dispatch("setAdminToken", null);
            this.$store.dispatch("setAdminUser", null);
            this.$store.dispatch("setAdminUserName", null);
            this.error =
              "Your session has expired! You will be redirected to the login page.";
            setTimeout(() => {
              this.error = null;
              this.$router.push({
                name: "adminLogin"
              });
            }, 5000);
          }
        })
        .catch(error => {
          this.error = error.response;
        });
    }
    if (!this.$store.state.administration.isAdminUserLoggedIn) {
      this.error =
        "Your session has expired! You will be redirected to the login page.";
      setTimeout(() => {
        this.error = null;
        this.$router.push({
          name: "adminLogin"
        });
      }, 5000);
    }
  },
  components: {
    CustomCropper
  },
  methods: {
    dashboard() {
      this.$router.push("dashboard");
    },
    handleInParent: function(param1) {
      this.productImg = param1;
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
}
</style>
