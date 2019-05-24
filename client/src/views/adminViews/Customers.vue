<template>
  <v-container>
    <h1>Customers</h1>
    <v-layout xs9 column offset-xs2>
      <v-layout
        class="panelWidth"
        xs3
        column
        justify-space-around
        v-if="!display"
      >
        <panel title="Products for sale">
          <panel title="Search">
            <div style="display: flex;">
              <v-text-field placeholder="Search" v-model="search">
              </v-text-field>
              <v-btn flat color="black" dark @click="clearSearch">
                <v-icon>clear</v-icon>
              </v-btn>
            </div>
          </panel>
          <br />
          <v-flex>
            <!-- <v-layout row wrap>
              <v-switch
                v-model="switch1"
                @change="show"
                :label="
                  `${switch1 ? 'Products on sale' : 'Discontinued products'}`
                "
              ></v-switch>
            </v-layout>-->
            <panel title="products">
              <ul>
                <li :id="item.id" v-for="(item, i) in displayData" :key="i">
                  <div class="liItem">{{ item.last_name }}</div>
                  <div class="liItem">{{ item.first_name }}</div>
                  <div class="liItem">{{ item.email }}</div>
                  <div class="liItem">
                    <v-btn :id="item.id" dark @click="editCustomer($event)">
                      <v-icon small>edit</v-icon>Edit
                    </v-btn>
                  </div>
                </li>
              </ul>
            </panel>
          </v-flex>
        </panel>
      </v-layout>
      <v-layout
        class="panelWidth"
        xs3
        column
        justify-space-around
        v-if="display"
      >
        <v-flex xs3 offset-xs0>
          <v-flex>
            <br />
            <v-flex sm12 offset-xs0>
              <form enctype="multipart/form-data">
                <br />
                <v-text-field
                  label="Last Name"
                  placeholder="Last Name"
                  v-model="last_name"
                  :rules="productRules"
                  required
                  readonly
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="First Name"
                  placeholder="First Name"
                  v-model="first_name"
                  :rules="productRules"
                  required
                  readonly
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="email"
                  type="email"
                  v-model="email"
                  :rules="productRules"
                  required
                  placeholder="email"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Contact Number"
                  type="text"
                  v-model="contact_number"
                  :rules="productRules"
                  required
                  placeholder="Contact Number"
                  autocomplete="false"
                ></v-text-field>
                <v-textarea
                  label="Delivery Address"
                  required
                  placeholder="Delivery Address"
                  v-model="delivery_address"
                ></v-textarea>
                <v-text-field
                  label="Postal Code"
                  type="number"
                  v-model="postal_code"
                  :rules="productRules"
                  required
                  placeholder="Postal Code"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Suburb"
                  type="text"
                  v-model="suburb"
                  :rules="productRules"
                  placeholder="Suburb"
                  required
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="City"
                  type="text"
                  v-model="city"
                  :rules="productRules"
                  placeholder="City"
                  required
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Province"
                  type="text"
                  v-model="province"
                  :rules="productRules"
                  placeholder="Province"
                  required
                  autocomplete="false"
                ></v-text-field>
                <hr />
                <panel title="invoices" v-if="invoiceData.length">
                  <ul>
                    <li :id="item.id" v-for="(item, i) in invoiceData" :key="i">
                      <div class="liItem">{{ item.invoice_date }}</div>
                      <div class="liItem">{{ item.total_value }}</div>
                      <div class="liItem">Invoice No {{ item.id }}</div>
                      <div class="liItem">
                        <v-btn :id="item.id" dark>
                          <v-icon medium class="mr-2">present_to_all</v-icon>
                          <a
                            :href="item.download"
                            style="color: white;"
                            download
                            target="_blank"
                            >download
                          </a>
                          <!-- download -->
                        </v-btn>
                      </div>
                    </li>
                  </ul>
                </panel>
                <br />
                <hr />
                <v-btn
                  :class="this.$store.state.siteSetup.color"
                  dark
                  @click="editClient"
                  >Post
                </v-btn>
                <v-btn
                  :class="this.$store.state.siteSetup.color"
                  dark
                  @click="cancelEdit"
                  >Cancel
                </v-btn>
              </form>
            </v-flex>
            <v-alert
              class="danger-alert"
              v-if="error"
              :value="true"
              type="error"
              >{{ error }}
            </v-alert>
            <v-alert
              class="danger-alert"
              v-if="success"
              :value="true"
              type="success"
              >{{ success }}
            </v-alert>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-btn
        id="btn2"
        :class="this.$store.state.siteSetup.color"
        @click="dashboard"
        dark
        >Return to Dashboard
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import AdminService from "@/services/AdminServices";
import Panel from "@/components/Panel";
import Authenticate from "../../functions/authenticateAdmin";
export default {
  data() {
    return {
      mainData: [],
      displayData: [],
      invoiceData: [],
      display: false,
      //   switch1: true,
      editID: null,
      search: [],
      selectedItem: {
        last_name: "",
        first_name: "",
        email: "",
        contact_number: "",
        delivery_address: "",
        postal_code: null,
        suburb: "",
        city: "",
        province: ""
      },
      success: null,
      error: null,
      last_name: "Bruton",
      first_name: "Wayne",
      email: "waynebruton@icloud.com",
      contact_number: "074 062 8742",
      delivery_address: "dsfsdfdsfdsf sdfdsfa",
      postal_code: 7945,
      suburb: "Kirstenhof",
      city: "Cape Town",
      province: "Western Cape",
      productRules: [v => !!v || "This is required"]
    };
  },
  watch: {
    search: function() {
      if (this.search !== "") {
        let query = this.search.toLowerCase();
        this.displayData = this.displayData.filter(el => {
          return el.product_name.toLowerCase().indexOf(query) >= 0;
        });
      } else {
        this.show();
      }
    }
  },
  async mounted() {
    this.mainData = [];
    this.displayData = [];
    this.invoiceData = [];
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

    this.getDataToEdit();
  },
  components: {
    Panel
  },
  methods: {
    dashboard() {
      this.$router.push("dashboard");
    },
    clearSearch() {
      this.search = "";
    },
    async getDataToEdit() {
      try {
        const response = await AdminService.customerViews();
        this.mainData = response.data;
        this.show();
      } catch (err) {
        console.log(err);
      }
    },
    show() {
      this.displayData = this.mainData;
    },
    async editCustomer(event) {
      let id = event.currentTarget.id;
      this.display = true;
      let selected = this.mainData.find(el => {
        return el.id == id;
      });
      this.editID = selected.id;
      this.last_name = selected.last_name;
      this.first_name = selected.first_name;
      this.email = selected.email;
      this.contact_number = selected.contact_number;
      this.delivery_address = selected.delivery_address;
      this.postal_code = selected.postal_code;
      this.suburb = selected.suburb;
      this.city = selected.city;
      this.province = selected.province;

      try {
        let response = await AdminService.customerInvoices({
          id: this.editID
        });
        let hostURL = `http://localhost:3000/files/Invoice-`;
        this.invoiceData = response.data;
        this.invoiceData.forEach(el => {
          el.download = `${hostURL}${el.id}.pdf`;
        });
      } catch (err) {
        console.log(err);
      }
    },
    cancelEdit() {
      this.display = !this.display;
      this.editID = null;
    },
    async editClient() {
      if (this.last_name === "") {
        return (this.error = "Last Name is required");
      } else if (this.first_name === "") {
        return (this.error = "First Name is required");
      } else if (this.email === "") {
        return (this.error = "Email is required");
      } else if (this.contact_number === "") {
        return (this.error = "Contact Number is required");
      } else if (this.delivery_address === "") {
        return (this.error = "Delivery Assress is required");
      } else if (this.postal_code === "") {
        return (this.error = "Postal Code is required");
      } else if (this.suburb === "") {
        return (this.error = "Suburb is required");
      } else if (this.city === "") {
        return (this.error = "City is required");
      } else if (this.province === "") {
        return (this.error = "Province is required");
      }
      this.error = null;
      try {
        let response = await AdminService.adminEditClientDetails({
          id: this.editID,
          last_name: this.last_name,
          first_name: this.first_name,
          email: this.email,
          contact_number: this.contact_number,
          delivery_address: this.delivery_address,
          postal_code: this.postal_code,
          suburb: this.suburb,
          city: this.city,
          province: this.province
        });

        let foundIndex = null;
        // let test = this.mainData.find((el, index) => {
        this.mainData.find((el, index) => {
          if (el.id === this.editID) {
            foundIndex = index;
            return el.id === this.editID;
          }
        });

        let editedItem = {
          id: this.editID,
          last_name: this.last_name,
          first_name: this.first_name,
          email: this.email,
          contact_number: this.contact_number,
          delivery_address: this.delivery_address,
          postal_code: this.postal_code,
          suburb: this.suburb,
          city: this.city,
          province: this.province
        };
        this.mainData.splice(foundIndex, 1);
        this.mainData.push(editedItem);
        this.mainData = this.mainData.sort(function(a, b) {
          if (a.last_name < b.last_name) {
            return -1;
          }
          if (a.last_name > b.last_name) {
            return 1;
          }
          return 0;
        });
        this.success = response.data.success;
        setTimeout(() => {
          // this.getDataToEdit();
          this.clearSearch();
          this.show();
          this.success = "";
          this.display = false;
        }, 1250);
        this.show();
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
