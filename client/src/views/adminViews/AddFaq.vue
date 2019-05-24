<template>
  <v-container>
    <v-layout class="panelWidth" xs3 column justify-space-around>
      <v-flex xs3 offset-xs0>
        <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%; "> -->
        <panel title="FAQ">
          <form autocomplete="off">
            <v-flex sm12 offset-xs0>
              <v-text-field label="Title" placeholder="Title" v-model="title">
              </v-text-field>
              <br />
              <v-textarea
                label="Narrative"
                required
                placeholder="Narrative"
                v-model="narrative"
              >
              </v-textarea>
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
          <v-btn :class="this.$store.state.siteSetup.color" @click="addFaq" dark
            >Post
          </v-btn>
          <v-btn :class="this.$store.state.siteSetup.color" @click="reset" dark
            >Reset
          </v-btn>
        </panel>
        <br />
        <v-btn @click="returnTo" :class="this.$store.state.siteSetup.color" dark
          >Dashboard
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import AdminService from "@/services/AdminServices";
import Authenticate from "@/functions/authenticateAdmin";
export default {
  data() {
    return {
      title: "",
      narrative: "",
      error: null,
      success: null,
      required: value => !!value || "Required."
    };
  },
  async mounted() {
    this.Authenticate = Authenticate.authenticate;
    this.Authenticate();
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
  components: {
    Panel
  },
  methods: {
    returnTo() {
      this.$router.push({ name: "dashboard" });
    },
    async addFaq() {
      try {
        let response = await AdminService.addFaq({
          title: this.title,
          narrative: this.narrative
        });
        this.success = response.data.success;
        setTimeout(() => {
          this.success = null;
          this.$router.push({ name: "dashboard" });
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    },
    reset() {
      this.title = "";
      this.narrative = "";
    }
  }
};
</script>

<style scoped></style>
