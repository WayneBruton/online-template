import AuthenticationService from "../services/AuthenticationServices.js";

export default {
  async authenticate() {
    if (
      this.$store.state.token !== null &&
      this.$store.state.isUserLoggedIn !== false &&
      this.$store.state.user !== null &&
      this.$store.state.username !== null
    ) {
      await AuthenticationService.authenticate({
        token: this.$store.state.token,
        user: this.$store.state.user.id,
        email: this.$store.state.user.email
      })
        .then(response => {
          if (!response.data.success) {
            this.$store.dispatch("setToken", null);
            this.$store.dispatch("setUser", null);
            this.$store.dispatch("setSelectedProduct", null);
            this.$store.dispatch("setUserName", null);
            this.$router.push({
              name: "home"
            });
          }
        })
        .catch(error => {
          this.error = error.response;
        });
    }
  }
};
