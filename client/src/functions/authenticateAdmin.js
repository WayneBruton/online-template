import AdminService from "@/services/AdminServices";

export default {
  async authenticate() {
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
            }, 800);
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
      }, 800);
    }
  }
};
