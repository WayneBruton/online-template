<template>
  <v-container>
    <panel title="Successful Payment">
      <v-layout column justify-space-around>
        <h1 v-if="readyToInvoice">Payment Successful</h1>
        <br v-if="readyToInvoice" />
        <div v-if="readyToInvoice">
          Received R{{ amount_paid }} from {{ first_name }} {{ last_name }}.
        </div>
        <br v-if="readyToInvoice" />
        <div v-if="readyToInvoice">Thank you for your business.</div>
        <br v-if="readyToInvoice" />
        <div v-if="readyToInvoice">
          An invoice will be mailed to you shortly.
        </div>
        <br v-if="readyToInvoice" />
        <div v-if="readyToInvoice">
          Postnet will contact you as soon as your delivery arrives.
        </div>
        <br />
        <v-alert
          class="danger-alert"
          v-if="!readyToInvoice"
          :value="true"
          type="error"
          >{{ pageExpired }}</v-alert
        >
      </v-layout>
    </panel>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import AuthorizationService from "../services/AuthorizationServices";
export default {
  data() {
    return {
      first_name: null,
      last_name: null,
      amount_paid: null,
      readyToInvoice: true,
      pageExpired: "This page has expired"
    };
  },
  components: {
    Panel
  },
  async mounted() {
    this.readyToInvoice = this.$store.state.readyToInvoice;
    if (this.readyToInvoice) {
      let uri = window.location.href.split("/");
      uri = uri[uri.length - 1];
      try {
        const response = await AuthorizationService.successResponse(uri);
        this.first_name = response.data.first_name;
        this.last_name = response.data.last_name;
        this.amount_paid = response.data.amount_paid;
      } catch (error) {
        console.log(error);
      }
      this.$store.dispatch("setSelectedProduct", null);
      this.$store.dispatch("addToCart", 0);
      this.$store.dispatch("addToShoppingCart", []);
      this.$store.dispatch("readyToInvoice", false);
      console.log(this.$store.state.readyToInvoice);
      setTimeout(() => {
        this.$router.push({ name: "home" });
      }, 2000);
    } else {
      setTimeout(() => {
        this.$router.push({ name: "home" });
      }, 2000);
    }
  }
};
</script>

<style scoped></style>
