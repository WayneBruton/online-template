<template>
  <v-container>
    <v-layout class="panelWidth" xs3 column justify-space-around>
      <v-flex xs3 offset-xs0>
        <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%; "> -->
        <panel title="Add Admin User">
          <form name="tab-tracker-form" autocomplete="off">
            <v-flex xs12 offset-xs0>
              <v-text-field
                label="First Name"
                :rules="nameRules"
                placeholder="First Name"
                v-model="firstname"
                autocomplete="false"
              ></v-text-field>
              <v-text-field
                label="Email"
                hint="Enter your email"
                :rules="emailRules"
                placeholder="email"
                v-model="email"
                @blur="checkAdminEmail"
                autocomplete="false"
              ></v-text-field>
              <br />
              <v-text-field
                label="Password"
                type="password"
                :rules="passwordRules"
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
          <v-alert class="danger-alert" v-if="error" :value="true" type="error"
            >{{ error }}
          </v-alert>
          <v-alert
            class="danger-alert"
            v-if="success"
            :value="true"
            type="success"
            >{{ success }}
          </v-alert>
          <v-btn
            id="btn2"
            :class="this.$store.state.siteSetup.color"
            @click="register"
            dark
            >Add Admin</v-btn
          >
          <v-btn
            id="btn2"
            :class="this.$store.state.siteSetup.color"
            @click="dashboard"
            dark
            >Return to Dashboard</v-btn
          >
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import AdminService from "@/services/AdminServices";
export default {
  components: {
    Panel
  },
  data: () => ({
    valid: false,
    firstname: "",
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
    success: null,
    required: value => !!value || "Required."
  }),
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
          console.log("response is", response.data.success);
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
  },
  methods: {
    async register() {
      if (this.password !== this.passwordRepeat) {
        return (this.error = "Passwords do not agree");
      } else {
        this.error = null;
      }
      try {
        const response = await AdminService.registerAdmin({
          first_name: this.firstname,
          email: this.email,
          user_password: this.password
        });
        if (response.data.error) {
          console.log("HELLOOOO");
          this.error = response.data.error;
        } else {
          this.$router.push("dashboard");
        }
      } catch (response) {
        this.error = response.data.error;
      }
    },
    async checkAdminEmail() {
      try {
        const response = await AdminService.checkAdminEmail({
          email: this.email
        });
        if (response.data.length) {
          this.error = "This email is already in use. Try logging in!";
          this.email = "";
        }
      } catch (err) {
        this.error = null;
      }
    },
    dashboard() {
      this.$router.push("dashboard");
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
