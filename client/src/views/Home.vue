<template>
  <div class="home">
    <Carousel />
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import Authenticate from "../functions/authenticateUser";
export default {
  name: "home",
  components: {
    Carousel
  },
  async mounted() {
    this.Authenticate = Authenticate.authenticate;
    this.Authenticate();
  }
};
</script>
