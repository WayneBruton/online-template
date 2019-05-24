<template>
  <v-container fluid>
    <v-layout class="panelWidth" xs12 sm8 md4 column justify-space-around>
      <v-flex xs12 sm8 md4 offset-xs0>
        <img
          src="../assets/heart_PNG51352.png"
          alt="LOGO"
          style="width: 10%; "
        />
        <panel title="Login">
          <form name="tab-tracker-form" autocomplete="off">
            <v-flex xs12 sm8 md4>
              <v-text-field label="Email" placeholder="email" v-model="email">
              </v-text-field>
              <br />
              <v-text-field
                label="Password"
                type="password"
                placeholder="password"
                v-model="password"
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
          <v-btn :class="this.$store.state.siteSetup.color" @click="login" dark
            >Login
          </v-btn>
          <v-btn
            v-if="this.error === 'Password is incorrect. Please try again'"
            :class="this.$store.state.siteSetup.color"
            @click="resetPasswordLink"
            dark
            >Reset Password
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
  data() {
    return {
      email: "",
      password: "",
      error: null,
      success: null,
      required: value => !!value || "Required."
    };
  },
  components: {
    Panel
  },
  methods: {
    async login() {
      try {
        const response = await AuthorizationService.login({
          email: this.email,
          user_password: this.password
        });
        if (response.data.error) {
          this.error = response.data.error;
        } else {
          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch("setUser", response.data.user);
          this.$store.dispatch("setUserName", response.data.username);
          let targetId = this.$store.state.selectedProduct;
          if (targetId !== null) {
            this.$router.push({
              name: "product",
              params: { productId: targetId }
            });
          } else {
            this.$router.push({ name: "showroom" });
          }
        }
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    async resetPasswordLink() {
      await AuthorizationService.resetPasswordLink({ email: this.email })
        .then(response => {
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

<style scoped>
/* @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css";
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1"; */
</style>
