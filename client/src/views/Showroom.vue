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
      <transition name="welcome">
        <v-flex md3>
          <h1>View our Products</h1>
        </v-flex>
      </transition>
    </v-layout>
    <v-layout row wrap justify-space-between>
      <v-flex
        ml-2
        mt-4
        mr-2
        sm3
        offset-sm6
        elevation-3
        v-for="(item, i) in items"
        :key="i"
      >
        <v-hover>
          <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
            width="344"
          >
            <vue-load-image>
              <img
                slot="image"
                :src="item.product_image"
                style="width: 100%; "
                :aspect-ratio="2.75"
              />
              <img
                slot="preloader"
                src="../assets/30.gif"
                style="width: 100%;"
              />
              <div slot="error">error message</div>
            </vue-load-image>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ item.product_name }}</h3>
                <br />
                <div>{{ item.product_description }}</div>
                <br />
                <div style="font-size: 15px;">R{{ item.price }}</div>
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
            <v-card-actions>
              <v-btn
                :id="item.id"
                :value="item.id"
                flat
                color="#305f72"
                @click="viewItem($event)"
                >See More
              </v-btn>
              <!-- <v-btn v-if="isUserLoggedIn" flat color="#305f72"
                >Add to Cart
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import StoreService from "../services/StoreServices";
import VueLoadImage from "vue-load-image";
export default {
  data() {
    return {
      items: [],
      selectedId: null,
      rating: 3.5,
      isUserLoggedIn: false
    };
  },
  components: {
    "vue-load-image": VueLoadImage
  },
  async mounted() {
    this.items = [];
    this.items = (await StoreService.products()).data;
    this.isUserLoggedIn = this.$store.state.isUserLoggedIn;
  },
  methods: {
    viewItem: function(event) {
      let targetId = event.currentTarget.value;
      this.$store.dispatch("setSelectedProduct", targetId);
      this.$router.push({ name: "product", params: { productId: targetId } });
    }
  }
};
</script>

<style lang="scss">
/* Welcome Styles */
.welcome-enter {
  transform: translateX(10px);
  opacity: 0;
}
.welcome-enter-active {
  transition: all 5.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.welcome-leave-active,
.welcome-leave-to {
  opacity: 0;
}
</style>
