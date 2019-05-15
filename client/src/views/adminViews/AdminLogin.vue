<template>
  <v-container>
    <v-layout class="panelWidth" xs3 column justify-space-around>
      <v-flex xs3 offset-xs0>
        <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%; "> -->
        <panel title="Admin Login">
          <form name="tab-tracker-form" autocomplete="off">
            <v-flex sm12 offset-xs0>
              <v-text-field label="Email" placeholder="email" v-model="email"></v-text-field>
              <br>
              <v-text-field
                label="Password"
                type="password"
                placeholder="password"
                v-model="password"
              ></v-text-field>
            </v-flex>
          </form>
          <br>
          <v-alert class="danger-alert" v-if="error" :value="true" type="error">{{ error }}</v-alert>
          <v-alert class="danger-alert" v-if="success" :value="true" type="success">{{ success }}</v-alert>
          <v-btn :class="this.$store.state.siteSetup.color" @click="loginAdmin" dark>Login</v-btn>
          <v-btn
            v-if="this.error === 'Password is incorrect. Please try again'"
            :class="this.$store.state.siteSetup.color"
            @click="resetAdminPasswordLink"
            dark
          >Reset Password</v-btn>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import AdminService from "@/services/AdminServices";
export default {
  data() {
    return {
      email: "wayne@eccentrictoad.com",
      password: "1234567",
      error: null,
      success: null,
      required: value => !!value || "Required."
    };
  },
  components: {
    Panel
  },
  methods: {
    async loginAdmin() {
      try {
        const response = await AdminService.loginAdmin({
          email: this.email,
          user_password: this.password
        });
        if (response.data.error) {
          this.error = response.data.error;
        } else {
           this.$store.dispatch("setAdminToken", response.data.admin_token);
          this.$store.dispatch("setAdminUser", response.data.admin_user);
          this.$store.dispatch(
            "setAdminUserName",
            response.data.admin_username
          );
          this.$store.dispatch("setToken", null);
          this.$store.dispatch("setUser", null);
          this.$store.dispatch("setUserName", null);
            this.$router.push({ name: "dashboard" });
          }
       
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
    ,
    async resetAdminPasswordLink() {
      await AdminService.resetAdminPasswordLink({ email: this.email })
        .then(response => {
          console.log(response)
          this.success = response.data;
          this.error = null;
          setTimeout(() => {
            this.error = null;
            this.success = null;
          }, 3000);
        })
        .catch(() => {
          this.error = "There was a connection error, please try again later.";
          setTimeout(() => {
            this.error = null;
          }, 3000);
        });
    }
  }
};
</script>

<style scoped></style>
