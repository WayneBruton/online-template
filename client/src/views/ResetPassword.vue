<template>
  <v-container>
    <v-layout class="panelWidth" xs3 column justify-space-around>
      <v-flex xs3 offset-xs0>
        <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%; "> -->
        <panel title="Reset Password">
          <form name="tab-tracker-form" autocomplete="off">
            <v-flex xs12 offset-xs0>
              <v-text-field
                label="Email"
                placeholder="email"
                v-model="email"
                autocomplete="false"
                readonly
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
          <!-- <div class="danger-alert" v-html="error" /> -->
          <v-alert class="danger-alert" v-if="error" :value="true" type="warning">{{ error }}</v-alert>
          <v-alert class="danger-alert" v-if="message" :value="true" type="info">{{ message }}</v-alert>
          <v-btn id="btn2" :class="this.$store.state.siteSetup.color" @click="reset" dark
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
  components: {
    Panel
  },
  data: () => ({
    email: "",
    password: "123456",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    passwordRepeat: "123456",
    error: null,
    message: null,
    required: value => !!value || "Required."
  }),
  async mounted() {
    let uri = window.location.href.split("/");
      uri = uri[uri.length - 1];
      await AuthorizationService.resetPasswordStart(uri)
      .then((response)=> {
        this.email = response.data.uri
      }).catch((error)=>{
        this.error = "There was a connection error, please try again later"
        setTimeout(()=> {
          this.error = null
        },2000)
      })
  },
  methods: {
    async reset() {
      if (this.password !== this.passwordRepeat) {
        this.error = "Passwords do not match"
        this.passwordRepeat = ""
        this.password = ""
        setTimeout(()=> {
          this.error = null
        },2000)
      } else {
        await AuthorizationService.resetPassword({
          email: this.email,
          password: this.password,
          passwordRepeat: this.passwordRepeat
        }).then(()=> {
          this.message = "Password successfully reset"
          setTimeout(()=>{
            this.message = null
            this.error = null
            this.$router.push({name: 'login'})
          },2000)

        }).catch((response)=>{
          this.error = "There was a connection issue, please try again later."
        })
      }
    }
  }
};
</script>

<style scoped></style>
