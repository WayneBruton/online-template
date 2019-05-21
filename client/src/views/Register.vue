<template>
  <v-container>
    <v-layout class="panelWidth" xs3 column justify-space-around>
      <v-flex xs3 offset-xs0>
        <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%; ">
        <panel title="Register">
          <form name="tab-tracker-form" autocomplete="off">
            <v-flex xs12 offset-xs0>
              <v-text-field
                label="First Name"
                :rules="nameRules"
                placeholder="First Name"
                v-model="firstname"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                label="Last Name"
                hint="Enter your last name"
                :rules="nameRules"
                placeholder="Last name"
                v-model="lastname"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                label="Email"
                hint="Enter your email"
                :rules="emailRules"
                placeholder="email"
                v-model="email"
                @blur="checkEmail"
                autocomplete="off"
              ></v-text-field>
              <br />
              <v-text-field
                label="Password"
                type="password"
                :rules="passwordRules"
                browser-autocomplete="new-password"
                placeholder="password"
                v-model="password"
                autocomplete="false"
              ></v-text-field>
              <v-text-field
                label="Repeat Password"
                :rules="passwordRules"
                type="password"
                placeholder="Retype your password"
                v-model="passwordRepeat"
                autocomplete="false"
              ></v-text-field>
            </v-flex>
          </form>
          <br />
          <div class="danger-alert" v-html="error" />
          <div>
            <p id="termsClick" @click="navigateTo({ name: 'terms' })">
              By registering you agree to our terms and conditions
            </p>
          </div>
          <v-btn id="btn2" :class="this.$store.state.siteSetup.color" @click="register" dark
            >Register
          </v-btn>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import AuthorizationService from "../services/AuthorizationServices";
export default {
  components: {
    Panel
  },
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    passwordRepeat: "",
    error: null,
    required: value => !!value || "Required."
  }),
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async register() {
      if (this.password !== this.passwordRepeat) {
        return (this.error = "Passwords do not agree");
      } else {
        this.error = null;
      }
      try {
        const response = await AuthorizationService.register({
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          user_password: this.password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setUserName", response.data.user.username);
      } catch (error) {
        this.error = error.response.data.error;
      }
      let targetId = this.$store.state.selectedProduct;
      this.$router.push({ name: "product", params: { productId: targetId } });
    },
    async checkEmail() {
      try {
        const response = await AuthorizationService.checkEmail({
          email: this.email
        });
        if (response.data.length) {
          this.error = "This email is already in use. Try logging in!";
          this.email = "";
        }
      } catch (err) {
        this.error = null;
      }
    }
  }
};
</script>

<style scoped>
#termsClick {
  font-size: 15px;
  font-weight: bold;
  color: red;
  cursor: pointer;
  text-decoration-line: underline;
}
</style>
