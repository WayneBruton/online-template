<template>
  <!-- <v-carousel class="mt-5" dark hide-delimiters hide-controls> -->
  <v-carousel class="mt-5" dark interval="3000" xs6>
    <v-carousel-item v-for="(item, i) in items" :key="i">
      <v-img :src="item.src" style="height: 100%; width: 100%;" />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { src: require("../assets/image16.png") },
        { src: require("../assets/image25.jpeg") },
        { src: require("../assets/image26.jpeg") },
        { src: require("../assets/image27.jpeg") },
        { src: require("../assets/image10.jpeg") },
        { src: require("../assets/image21.jpeg") },
        { src: require("../assets/image22.jpeg") },
        { src: require("../assets/image35.jpeg") },
        { src: require("../assets/image36.jpeg") }
      ]
    };
  }
};
</script>

<style></style>
