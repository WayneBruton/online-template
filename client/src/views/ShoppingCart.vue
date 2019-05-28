<template>
  <v-container>
    <v-layout column justify-space-around>
      <v-flex md3>
        <img
          src="../assets/heart_PNG51352.png"
          alt="LOGO"
          style="width: 10%;"
        />
      </v-flex>
      <v-flex md3>
        <h1>Check Out</h1>
      </v-flex>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Your Cart</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2"
            >Delivery Instructions
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Complete Purchase</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <Cart></Cart>
            <br />
            <v-btn
              :class="this.$store.state.siteSetup.color"
              @click="e1 = 2"
              dark
              >Continue
            </v-btn>
            <v-btn flat :to="{ name: 'showroom' }">Return to shop</v-btn>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card class="mb-5" color="grey lighten-1" height="780px">
              <panel title="Delivery details">
                <form name="tab-tracker-form" autocomplete="off">
                  <v-flex xs12 offset-xs0 v-if="deliveryDetails.length">
                    <v-text-field
                      label="First Name"
                      placeholder="First Name"
                      v-model="deliveryDetails[0].first_name"
                    ></v-text-field>
                    <v-text-field
                      label="Last Name"
                      placeholder="Last name"
                      v-model="deliveryDetails[0].last_name"
                    ></v-text-field>
                    <v-text-field
                      label="Email"
                      placeholder="email"
                      v-model="deliveryDetails[0].email"
                    ></v-text-field>
                    <v-text-field
                      label="Contact Number"
                      placeholder="Contact Number"
                      v-model="deliveryDetails[0].contact_number"
                    ></v-text-field>
                    <v-textarea
                      label="Delivery Address"
                      required
                      placeholder="Address"
                      v-model="deliveryDetails[0].delivery_address"
                    ></v-textarea>
                    <v-text-field
                      label="Suburb"
                      placeholder="Suburb"
                      v-model="deliveryDetails[0].suburb"
                    ></v-text-field>
                    <v-text-field
                      label="City"
                      placeholder="City"
                      v-model="deliveryDetails[0].city"
                    >
                    </v-text-field>
                    <v-text-field
                      label="Postal Code"
                      placeholder="Postal Code"
                      v-model="deliveryDetails[0].postal_code"
                    ></v-text-field>
                    <v-text-field
                      label="Province"
                      placeholder="Province"
                      v-model="deliveryDetails[0].province"
                    ></v-text-field>
                    <v-btn flat color="black darken-1" @click="updateDelivery"
                      >Update
                    </v-btn>
                    <br />
                  </v-flex>
                </form>
              </panel>
            </v-card>
            <v-btn flat @click="e1 = 1">Back</v-btn>
            <v-btn
              :class="this.$store.state.siteSetup.color"
              @click="e1 = 3"
              dark
              >Continue
            </v-btn>
            <v-btn flat :to="{ name: 'showroom' }">Return to shop</v-btn>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card class="mb-5 mobile" color="black lighten-1" height="200px">
              <panel title="Checkout">
                <h3>Click Finalise</h3>
                <v-container fluid px-0>
                  <v-layout xs6 offset-xs0>
                    <v-flex xs9>
                      <v-checkbox
                        readonly
                        v-model="checkbox1"
                        :label="`Purchase Detailed Finalised`"
                        color="black lighten-1"
                      ></v-checkbox>
                    </v-flex>
                    <v-flex xs9>
                      <v-checkbox
                        readonly
                        v-model="checkbox2"
                        :label="`Delivery Details Finalised`"
                        color="black lighten-1"
                      ></v-checkbox>
                    </v-flex>
                    <v-flex xs9>
                      <v-checkbox
                        readonly
                        v-model="checkbox3"
                        :label="`Ready to Finalise Payment`"
                        color="black lighten-1"
                      ></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-container>
              </panel>
            </v-card>
            <div class="finalisePmt">
              <div
                class="finalisePmt"
                style="display: flex; justify-content: space-between;"
              >
                <v-btn flat @click="backTo2">Back</v-btn>
                <v-btn
                  :class="this.$store.state.siteSetup.color"
                  v-if="!checkoutProcessComplete"
                  @click="paymentSuccess"
                  dark
                  >Finalise Details
                </v-btn>
                <form
                  v-if="checkoutProcessComplete"
                  action="https://www.payfast.co.za/eng/process"
                  name="form_08163d9b29daed2fa3358f7e2adc2ad7"
                  onsubmit="return click_08163d9b29daed2fa3358f7e2adc2ad7( this );"
                  method="post"
                  style="margin: 7px 5px 5px 5px;"
                >
                  <input type="hidden" name="cmd" value="_paynow" />
                  <input type="hidden" name="receiver" value="10469596" />
                  <input type="hidden" name="item_name" value="form Test" />
                  <input type="hidden" name="amount" :value="finalAmount" />
                  <input
                    type="hidden"
                    name="item_description"
                    value="Boredom Busters"
                  />
                  <input type="hidden" name="return_url" :value="successURL" />
                  <input type="hidden" name="cancel_url" :value="cancelURL" />
                  <table>
                    <tr>
                      <td colspan="2" align="center">
                        <input
                          type="image"
                          src="https://www.payfast.co.za/images/buttons/light-small-paynow.png"
                          width="165"
                          height="36"
                          alt="Pay Now"
                          title="Pay now with PayFast"
                        />
                      </td>
                    </tr>
                  </table>
                </form>
                <!-- <div> -->
                <v-btn flat :to="{ name: 'showroom' }">Return to shop</v-btn>
                <!-- </div> -->
              </div>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import Cart from "@/components/Cart.vue";
import AuthorizationService from "../services/AuthorizationServices";
import Authenticate from "../functions/authenticateUser";
export default {
  data() {
    return {
      e1: 0,
      id: null,
      error: null,
      deliveryDetails: [],
      finalAmount: 0,
      checkoutProcessComplete: false,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      item_name: "Boredom+Busters+Purchase",
      successURL: null,
      cancelURL: null
    };
  },
  components: {
    Panel,
    Cart
  },
  async mounted() {
    this.Authenticate = Authenticate.authenticate;
    this.Authenticate();
    this.successURL = null;
    this.cancelURL = null;
    this.id = this.$store.state.user.id;
    try {
      const response = await AuthorizationService.deliveryDetails(this.id);
      this.deliveryDetails.push(response.data[0]);
    } catch (error) {
      this.error = error.response;
    }
    try {
      await AuthorizationService.deleteCart(this.id);
      // const response = await AuthorizationService.deleteCart(this.id);
    } catch (error) {
      console.log(error);
      this.error = error.response;
    }
    // }
  },
  methods: {
    async updateDelivery() {
      try {
        // const response = await AuthorizationService.updateDelivery({
        await AuthorizationService.updateDelivery({
          city: this.deliveryDetails[0].city,
          contact_number: this.deliveryDetails[0].contact_number,
          delivery_address: this.deliveryDetails[0].delivery_address,
          email: this.deliveryDetails[0].email,
          first_name: this.deliveryDetails[0].first_name,
          id: this.deliveryDetails[0].id,
          last_name: this.deliveryDetails[0].last_name,
          postal_code: this.deliveryDetails[0].postal_code,
          province: this.deliveryDetails[0].province,
          suburb: this.deliveryDetails[0].suburb
        });
      } catch (error) {
        console.log("There is an Error", error);
      }
    },
    async paymentSuccess() {
      let finalAmount = this.$store.state.shoppingCart.reduce((prev, el) => {
        return (prev = prev + parseFloat(el.total));
      }, 0);
      let delivery = 90;
      if (finalAmount * 0.1 < 90) {
        delivery = 90;
      } else {
        delivery = finalAmount * 0.1;
      }
      finalAmount = (finalAmount + delivery).toFixed(2);
      this.finalAmount = finalAmount;

      await AuthorizationService.createCart(
        this.$store.state.shoppingCart
      ).catch(error => {
        console.log(error);
      });
      this.successURL = `${process.env.VUE_APP_SUCCESSURL}paymentSuccessful/`;
      this.cancelURL = `${process.env.VUE_APP_CANCELURL}shoppingCart/`;
      await AuthorizationService.successURL({
        finalAmount: this.finalAmount,
        id: this.$store.state.user.id
      })
        .then(response => {
          this.successURL = this.successURL + response.data.successURL;
          console.log(this.successURL);
          console.log(this.cancelURL);
          this.successURL = this.successURL;
        })
        .catch(error => {
          console.log(error);
        });
      setTimeout(() => {
        this.checkbox1 = true;
        setTimeout(() => {
          this.checkbox2 = true;
          setTimeout(() => {
            this.checkbox3 = true;
            this.checkoutProcessComplete = true;
            this.$store.dispatch("readyToInvoice", true);
          }, 200);
        }, 200);
      }, 200);
    },
    async backTo2() {
      this.e1 = 2;
      this.checkoutProcessComplete = false;
      this.checkbox1 = false;
      this.checkbox2 = false;
      this.checkbox3 = false;
      try {
        await AuthorizationService.deleteCart(this.id);
        // const response = await AuthorizationService.deleteCart(this.id);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.finalisePmt {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 600px) {
  .mobile {
    display: none;
  }
  .finalisePmt {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
  }
}
</style>
