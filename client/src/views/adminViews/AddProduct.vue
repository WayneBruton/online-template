<template>
  <v-container>
    <h1>Add Product</h1>
    <v-layout xs9 column offset-xs2>
      <v-layout class="panelWidth" xs3 column justify-space-around>
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
                  :rules="productRules"
                  placeholder="Product Name"
                  v-model="productName"
                  @blur="checkProductName"
                  autocomplete="false"
                ></v-text-field>

                <!-- <v-text-field
                label="Email"
                hint="Enter your email"
                :rules="emailRules"
                placeholder="email"
                v-model="email"
                @blur="checkEmail"
                autocomplete="false"
                ></v-text-field>-->

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
                  @click="insertProduct"
                  >Post
                </v-btn>
                <v-btn
                  id="btn2"
                  :class="this.$store.state.siteSetup.color"
                  @click="dashboard"
                  dark
                  >Return to Dashboard
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
    </v-layout>
  </v-container>
</template>

<script>
import CustomCropper from "@/components/importedComponents/CustomCropper";
import AdminService from "@/services/AdminServices";
import Panel from "@/components/Panel";
import Authenticate from "@/functions/authenticateAdmin";
export default {
  data() {
    return {
      productImg: null,
      success: null,
      error: null,
      available: true,
      productName: "",
      productRules: [v => !!v || "This is required"],
      weight: "",
      height: "",
      breadth: "",
      length: "",
      price: "",
      description: "",
      file: null,
      useCroppingTool: false,
      useCroppingToolLabel: "Use Cropping Tool",
      imgSRC: null,
      fileType: null
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
    CustomCropper,
    Panel
  },
  methods: {
    dashboard() {
      this.$router.push("dashboard");
    },
    async checkProductName() {
      try {
        let response = await AdminService.checkProductName({
          productName: this.productName
        });
        if (response) {
          this.error = "This name has already been used!";
          this.productName = "";
          setTimeout(() => {
            this.error = null;
          }, 1500);
        }
      } catch (err) {
        console.log(err);
      }
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
          await AdminService.removeImageFileName({
            // let response = await AdminService.removeImageFileName({
            fileName: this.productImg
          });
        } catch (err) {
          console.log(err);
        }
      }
      try {
        let response = await AdminService.insertProductImage(formData);
        this.productImg = response.data.File.filename;
        this.imgSRC = response.data.imageFile;
        this.fileType = response.data.fileType;
      } catch (err) {
        this.error = err;
      }
    },

    async insertProduct() {
      if (this.productImg === null || this.imgSRC === null) {
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
        let response = await AdminService.insertProduct({
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
        this.success = response.data.success;
        setTimeout(() => {
          this.success = "";
          this.$router.push("dashboard");
        }, 2000);
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
@media screen and (max-width: 768px) {
}
</style>
