<template>
  <div id="app">
    <v-app>
      <PageHeader/>
      <v-container fluid>
        <transition name="router-anime">
          <div id="nav">
            <!-- <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>-->

            <router-view/>
          </div>
        </transition>
      </v-container>
      <Footer/>
    </v-app>
  </div>
</template>

<script>
import PageHeader from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AuthenticationService from "./services/AuthenticationServices.js";
export default {
  name: "app",
  components: {
    PageHeader,
    Footer
  },
  async mounted() {
    if (
      this.$store.state.token !== null &&
      this.$store.state.isUserLoggedIn !== false &&
      this.$store.state.user !== null &&
      this.$store.state.username !== null
    ) {
      await AuthenticationService.authenticate({
        token: this.$store.state.token,
        user: this.$store.state.user.id,
        email: this.$store.state.user.email
      }).then(response => {
        // console.log("response is", response.data.success);
        if (!response.data.success) {
          this.$store.dispatch("setToken", null);
          this.$store.dispatch("setUser", null);
          this.$store.dispatch("setSelectedProduct", null);
          this.$store.dispatch("setUserName", null);
          this.$router.push({
            name: "home"
          });
        }
      });
    }
    // console.log(window.localStorage)
  },
  methods: {}
};
</script>

<style lang="scss">
// @font-face {
//     font-family: "MyFont1";
//     src: url('../src/assets/balloonxbdbtextrabold.ttf') format("truetype");
// }
// @font-face {
//     font-family: "MyFont2";
//     src: url('../src/assets/balonxb.ttf') format("truetype");
// }
// h1,
// h2, h3, h4, h5, h6 {
//     font-family: 'MyFont1', sans-serif;
//     text-shadow: 4px 4px 4px #aaa;
//     font-size: 220%;
// }
// .myTitle, .notHamburger {
//    font-family: 'MyFont1', sans-serif;
//     font-size: 220%;

// }
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 35px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.danger-alert {
  font-weight: bold;
  color: red;
}
.panelWidth {
  width: 100%;
  align-self: center;
}
.router-anime-enter-active {
  animation: coming 0.8s;
  animation-delay: 0.2s;
  opacity: 0;
}
// .router-anime-leave-active {
//   animation: going 1s;
// }

@keyframes going {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-10px);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
