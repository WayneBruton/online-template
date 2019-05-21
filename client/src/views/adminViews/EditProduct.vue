<template>
  <v-container>
    <h1>Edit Product</h1>
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
            <v-text-field placeholder="Search" v-model="search"></v-text-field>
            <v-btn flat color="black" dark @click="clearSearch">
              <v-icon>clear</v-icon>
            </v-btn>
          </div>
        </panel>
          <v-flex>
            <v-layout row wrap>
              <v-switch
                v-model="switch1"
                @change="show"
                :label="
                  `${switch1 ? 'Products on sale' : 'Discontinued products'}`
                "
              ></v-switch>
            </v-layout>
            <panel title="products">
              <ul>
                <li :id="item.id" v-for="(item, i) in displayData" :key="i">
                  <div class="liItem">{{ item.product_name }}</div>
                  <div class="liItem">R {{ item.price }}</div>
                  <div class="liItem">
                    <v-btn :id="item.id" dark @click="editItem($event)">
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
            <v-alert class="danger-alert" :value="true" type="info"
              >It is highly recommended that you crop your image using the
              cropping tool first, then upload.
            </v-alert>
            <v-checkbox
              readonly
              v-model="useCroppingTool"
              :label="useCroppingToolLabel"
              color="black lighten-1"
              @click="cropping"
            ></v-checkbox>
            <!-- <Custom-Cropper v-if="useCroppingTool" @fileUploaded="updateImage"></Custom-Cropper> -->
            <Custom-Cropper v-if="useCroppingTool"></Custom-Cropper>
            <br />
            <v-flex sm12 offset-xs0>
              <form enctype="multipart/form-data">
                <panel title="upload image" v-if="!useCroppingTool">
                  <input type="file" ref="file" @change="selectFile" />
                  <br />
                  <br />
                  <img :src="imgSRC" alt style="width: 30%;" />
                </panel>
                <br />
                <v-text-field
                  label="Product Name"
                  placeholder="Product Name"
                  v-model="productName"
                  :rules="productRules"
                  required
                  readonly
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Weight"
                  type="number"
                  min="0"
                  v-model="weight"
                  :rules="productRules"
                  required
                  placeholder="Weight"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Height"
                  type="number"
                  min="0"
                  v-model="height"
                  :rules="productRules"
                  required
                  placeholder="Height"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Breadth"
                  type="number"
                  min="0"
                  v-model="breadth"
                  :rules="productRules"
                  required
                  placeholder="Breadth"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Length"
                  type="number"
                  min="0"
                  v-model="length"
                  :rules="productRules"
                  required
                  placeholder="Length"
                  autocomplete="false"
                ></v-text-field>
                <v-text-field
                  label="Price (R)"
                  type="decimal"
                  min="0.00"
                  v-model="price"
                  :rules="productRules"
                  placeholder="Price (R)"
                  required
                  autocomplete="false"
                ></v-text-field>
                <br />
                <v-textarea
                  label="Product Description"
                  required
                  v-model="description"
                  :rules="productRules"
                  placeholder="Description"
                ></v-textarea>
                <v-checkbox
                  readonly
                  v-model="available"
                  :label="`Available in store`"
                  color="black lighten-1"
                  @click="isAvailable"
                ></v-checkbox>
                <v-btn
                  :class="this.$store.state.siteSetup.color"
                  dark
                  @click="editProduct"
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
import CustomCropper from "@/components/importedComponents/CustomCropper";
import AdminService from "@/services/AdminServices";
import Panel from "@/components/Panel";
export default {
  data() {
    return {
      mainData: [],
      displayData: [],
      display: false,
      switch1: true,
      editID: null,
      search: [],
      selectedItem: {
        available: null,
        id: null,
        price: null,
        product_breadth: null,
        product_description: null,
        product_height: null,
        product_image: null,
        product_length: null,
        product_name: null,
        product_weight: null
      },
      productImg: null,
      success: null,
      error: null,
      available: null,
      productName: "Test Product",
      productRules: [v => !!v || "This is required"],
      weight: 0,
      height: 0,
      breadth: 0,
      length: 0,
      price: 199.61,
      description:
        "This is an awesome product that does amazing things for kids intellectuall growth.",
      file: null,
      useCroppingTool: false,
      useCroppingToolLabel: "Use Cropping Tool",
      imgSRC: null,
      fileType: null
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
        this.show()
        // this.displayData = this.totalItems;
      }
    }
  },
  async mounted() {
    this.mainData = [];
    this.displayData = [];
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
          //   console.log("response is", response.data.success);
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

    this.getDataToEdit();
  },
  components: {
    CustomCropper,
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
        const response = await AdminService.productsToEdit();
        this.mainData = response.data;
        // console.log(response.data)
        this.show();
      } catch (err) {
        console.log(err);
      }
    },
    show() {
      this.displayData = [];
      if (this.switch1) {
        this.displayData = this.mainData.filter(el => {
          return el.available === 1 || el.available === true;
        });
      } else {
        this.displayData = this.mainData.filter(el => {
          return el.available === 0 || el.available === false;
        });
      }
    },
    editItem(event) {
      let id = event.currentTarget.id;

      // console.log(id);
      this.display = true;
      let selected = this.mainData.find(el => {
        return el.id == id;
      });
      this.productName = selected.product_name;
      this.weight = selected.product_weight;
      this.height = selected.product_height;
      this.breadth = selected.product_breadth;
      this.length = selected.product_length;
      this.price = selected.price;
      this.description = selected.product_description;
      this.available = selected.available;
      this.editID = selected.id;
      this.imgSRC = selected.product_image;
    },
    cancelEdit() {
      this.display = !this.display;
      this.editID = null;
    },
    // updateImage: function(param1) {
    //   // this.productImg = param1;
    // },
    async selectFile() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("fileName", this.productImg);
      if (this.productImg) {
        try {
          let response = await AdminService.removeImageFileName({
            fileName: this.productImg
          });
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        let response = await AdminService.insertProductImage(formData);
        // console.log(response.data.File.filename);
        this.productImg = response.data.File.filename;
        // console.log("File name (imageSrc is:", response.data.imageFile);
        this.imgSRC = response.data.imageFile;
        this.fileType = response.data.fileType;
      } catch (err) {
        this.error = err;
        console.log(err);
      }
    },

    async editProduct() {
      if (this.imgSRC === null) {
        return (this.error = "Product needs an image");
      } else if (this.productName === "") {
        return (this.error = "Product needs a name");
      } else if (this.description === "") {
        return (this.error = "Product needs an description");
      } else if (this.weight === "") {
        return (this.error = "Product needs a weight");
      } else if (this.length === "") {
        return (this.error = "Product needs a length");
      } else if (this.breadth === "") {
        return (this.error = "Product needs a breadth");
      } else if (this.height === "") {
        return (this.error = "Product needs a height");
      } else if (this.price === "") {
        return (this.error = "Product needs a price");
      }
      this.error = null;
      try {
        let response = await AdminService.editProduct({
          id: this.editID,
          fileType: this.fileType,
          productImg: this.productImg,
          product_name: this.productName,
          product_description: this.description,
          product_weight: this.weight,
          product_length: this.length,
          product_height: this.height,
          product_breadth: this.breadth,
          price: parseFloat(this.price).toFixed(2),
          isAvailable: this.available
        });
        // BUSY HERE
        let foundIndex = null;
        let test = this.mainData.find((el, index) => {
          // console.log("Index Number::", index);
          if (el.id === this.editID) {
            foundIndex = index;
            return el.id === this.editID;
          }
        });

        let editedItem = {
          available: this.available,
          id: this.editID,
          price: parseFloat(this.price).toFixed(2),
          product_breadth: this.breadth,
          product_description: this.description,
          product_height: this.height,
          product_image: this.imgSRC,
          product_length: this.length,
          product_name: this.productName,
          product_weight: this.weight
        };
        console.log("Index Number of changed Item", test);
        this.mainData.splice(foundIndex, 1);
        this.mainData.push(editedItem);
        this.mainData = this.mainData.sort(function(a, b) {
          if (a.product_name < b.product_name) {
            return -1;
          }
          if (a.product_name > b.product_name) {
            return 1;
          }
          return 0;
        });
        console.log(response.data.success);
        this.success = response.data.success;
        setTimeout(() => {
          // this.getDataToEdit();
          this.clearSearch()
          this.show();
          this.success = "";
          this.display = false;
        }, 1250);
        this.show();
      } catch (err) {
        console.log(err);
      }
    },
    isAvailable() {
      this.available = !this.available;
    },
    cropping() {
      this.useCroppingTool = !this.useCroppingTool;
      if (this.useCroppingTool) {
        this.useCroppingToolLabel = "Hide cropping tool";
      } else {
        this.useCroppingToolLabel = "Use Cropping Tool";
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
