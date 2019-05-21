<template>
  <v-container>
    <v-layout column justify-space-around>
      <v-flex xs12 sm8 md3>
        <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 7%;" />
      </v-flex>
      <v-flex xs12 sm8 md3>
        <h1>Product</h1>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex ml-2 mt-4 mr-2 sm6 offset-sm6 elevation-3>
        <v-card>
          <v-img :src="items.product_image" aspect-ratio="1.55" />
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ items.product_name }}</h3>
              <br />
              <div>{{ items.product_description }}</div>
              <br />
              <label class="numbersChosen" for>
                Unit Price:
              </label>
              <br />
              <div class="numbersChosen" style="font-size: 15px;">
                R{{ items.price }}
              </div>
              <br />
              <label class="numbersChosen" for>Quantity</label>
              <br />
              <input
                class="numbersChosen quantity"
                style="text-align: center;"
                type="number"
                min="1"
                @change="add"
                v-model="items.quantity"
              />
              <br />
              <br />
              <label class="numbersChosen" for>Total</label>
              <br />
              <div id="total" class="numbersChosen" style="font-size: 15px;">
                R{{ items.total }}
              </div>
            </div>
          </v-card-title>
          <!-- <v-rating
            half-increments
            dark
            background-color="black"
            color="black"
            v-model="rating"
          >
          </v-rating> -->
          <div v-if="!isUserLoggedIn">
            <p>
              You need to be logged in. If you have registered, please login,
              else register.
            </p>
            <v-btn
              :id="items.id"
              :value="items.id"
              flat
              color="#305f72"
              :to="{ name: 'login' }"
              >Login
            </v-btn>
            <v-btn
              :id="items.id"
              :value="items.id"
              flat
              color="#305f72"
              :to="{ name: 'register' }"
              >Register</v-btn
            >
            <hr />
          </div>
          <v-card-actions justify-space-between>
            <v-flex>
              <v-btn
                :id="items.id"
                :value="items.id"
                flat
                color="#305f72"
                @click="checkUserLoggedIn"
                v-if="isUserLoggedIn"
                >Add to Cart
              </v-btn>
              <v-btn flat color="#305f72" :to="{ name: 'showroom' }"
                >Return to Shop
              </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StoreService from "../services/StoreServices";
export default {
  data() {
    return {
      items: [],
      shoppingCart: [],
      selectedId: null,
      isUserLoggedIn: true,
      rating: 3.5
    };
  },
  async mounted() {
    let id = this.$store.state.selectedProduct;
    if (id !== null) {
      this.items = (await StoreService.product(id)).data[0];
      this.items.quantity = 1;
      this.items.views = this.items.views + 1;
      if (this.$store.state.user) {
        this.items.user_id = this.$store.state.user.id;
      }
      this.items.total = (this.items.price * this.items.quantity).toFixed(2);
      this.shoppingCart = this.$store.state.shoppingCart;
    } else {
      this.$router.push({ name: "showroom" });
    }
    try {
      let response = await StoreService.productViews({
        id: this.items.id,
        views: this.items.views
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
    console.log(this.items);
  },
  methods: {
    add() {
      this.items.total = this.items.quantity * this.items.price;
      let newVal = this.items.total.toFixed(2);
      document.getElementById("total").innerHTML = "R" + newVal;
    },
    checkUserLoggedIn() {
      let newItem;
      let updatedCart = [];
      if (this.$store.state.isUserLoggedIn === false) {
        this.isUserLoggedIn = !this.isUserLoggedIn;
      } else {
        let addItems =
          this.$store.state.cartCount + parseInt(this.items.quantity);
        this.$store.dispatch("addToCart", addItems);
        if (!this.shoppingCart.length) {
          this.shoppingCart.push(this.items);
          this.$store.dispatch("addToShoppingCart", this.shoppingCart);
        } else {
          newItem = this.shoppingCart.find(el => {
            return el.id === this.items.id;
          });
          if (newItem === undefined) {
            this.shoppingCart.push(this.items);
            this.$store.dispatch("addToShoppingCart", this.shoppingCart);
          } else {
            updatedCart = this.shoppingCart.filter(el => {
              return el.id !== this.items.id;
            });
            newItem.quantity =
              parseInt(newItem.quantity) + parseInt(this.items.quantity);
            newItem.total = newItem.quantity * newItem.price;
            updatedCart.push(newItem);
            this.shoppingCart = updatedCart.sort((a, b) => {
              parseInt(a.id) - parseInt(b.id);
            });
            this.$store.dispatch("addToShoppingCart", this.shoppingCart);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.numbersChosen {
  font-weight: bold;
  font-size: 20px;
}
#total {
  font-size: 35px;
}
.quantity {
  background-color: lightgray;
  width: 100px;
}
</style>
