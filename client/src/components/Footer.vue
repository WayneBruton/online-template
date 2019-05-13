<template>
  <!-- <v-footer class="pa-3" dark> -->
  <v-footer :class="this.$store.state.siteSetup.color" dark>
    <v-spacer></v-spacer>
    <v-flex md3>
      <div>
        Created and maintained by:
        <strong>
          <a href="https://www.eccentrictoad.com" target="_blank"
            >Eccentric Toad
          </a>
        </strong>
      </div>
    </v-flex>
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      header: "BOREDOM BUSTERS",
      username: null
    };
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: whitesmoke;
}
a:hover {
  color: white;
  /* color: darkblue */
  font-size: 15px;
}
</style>
