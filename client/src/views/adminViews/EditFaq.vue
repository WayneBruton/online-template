<template>
  <v-container>
    <v-layout class="panelWidth" xs3 column justify-space-around>
      <v-flex xs3 offset-xs0>
        <panel title="Delete FAQ">
          <ul>
            <li :id="item.id" v-for="(item, i) in displayData" :key="i">
              <div class="liItem">{{ item.title }}</div>
              <div class="liItem">
                <v-btn :id="item.id" dark @click="deleteItem($event)">
                  <v-icon class="mr-2" small>delete</v-icon>Delete
                </v-btn>
              </div>
            </li>
          </ul>
          <br />
          <v-alert class="danger-alert" v-if="error" :value="true" type="error">
            {{ error }}
          </v-alert>
          <v-alert
            class="danger-alert"
            v-if="success"
            :value="true"
            type="success"
          >
            {{ success }}
          </v-alert>
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
      displayData: [],
      id: null,
      error: null,
      success: null,
      required: value => !!value || "Required."
    };
  },
  components: {
    Panel
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
    try {
      let response = await AdminService.getFaq();
      this.displayData = response.data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    returnTo() {
      this.$router.push({ name: "dashboard" });
    },
    async deleteItem(event) {
      this.id = event.currentTarget.id;
      try {
        let response = await AdminService.deleteFaq({
          id: this.id
        });
        this.success = response.data.success;
        setTimeout(() => {
          this.success = null;
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-evenly;
}
li:hover {
  background-color: lightgrey;
}
.liItem {
  width: 30%;
  display: flex;
  align-items: center;
  align-content: center;
}
@media screen and (max-width: 768px) {
}
</style>
