<template>
  <v-container>
    <panel title="Dashboard">
      <v-layout class="panelWidth" xs9 column>
        <br />
        <v-btn @click="addProduct" dark>Add Stock Item</v-btn>
        <br />
        <hr />
        <br />
        <v-btn @click="editProduct" dark>Edit Stock Item</v-btn>
        <br />
        <hr />
        <br />
        <v-btn @click="customers" dark>Customers</v-btn>
        <br />
        <hr />
        <br />
        <v-btn @click="addFAQ" dark>Add FAQ</v-btn>
        <br />
        <hr />
        <br />
        <v-btn @click="editFAQ" dark>Delete FAQ</v-btn>
        <br />
        <hr />
        <br />
        <v-btn @click="stats" dark>Store Stats</v-btn>
        <br />
        <hr />
        <br />
        <v-btn @click="addAdminUser" class="black" dark>Add Admin User</v-btn>
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
      </v-layout>
    </panel>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import AdminService from "@/services/AdminServices";
export default {
  data() {
    return {
      error: null,
      success: null
    };
  },
  components: {
    Panel
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
    addAdminUser() {
      this.$router.push("addAdminUser");
    },
    addProduct() {
      this.$router.push("addproduct");
    },
    editProduct() {
      this.$router.push("editproduct");
    },
    addFAQ() {
      this.$router.push("addFaq");
    },
    editFAQ() {
      this.$router.push("editFaq");
    },
    stats() {
      this.$router.push("stats");
    },
    customers() {
      this.$router.push("customers");
    }
  }
};
</script>

<style scoped></style>
