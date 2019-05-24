<template>
  <div id="app">
    <v-app>
      <PageHeader />
      <v-container>
        <div id="nav">
          <router-view />
        </div>
      </v-container>
      <Footer />
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
  },
  methods: {}
};
</script>

<style lang="scss">
@font-face {
  font-family: "MyFont1";
  src: url("../src/assets/balloonxbdbtextrabold.ttf") format("truetype");
}
@font-face {
  font-family: "MyFont2";
  src: url("../src/assets/balonxb.ttf") format("truetype");
}

#app {
  font-family: "Syncopate", sans-serif;
  font-family: "Open Sans", sans-serif;
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

h1,
h2,
h3,
h5,
h6 {
  // font-family: 'MyFont1', sans-serif;
  font-family: "Syncopate", sans-serif;
  text-shadow: 4px 4px 4px #aaa;
  font-size: 180%;
}
.myTitle,
.notHamburger {
  //  font-family: 'MyFont1', sans-serif;
  font-family: "Syncopate", sans-serif;
  font-size: 100%;
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
  animation: coming 0.9s;
  animation-delay: 0.2s;
  opacity: 0;
}
.router-anime-leave-active {
  animation: going 0.4s;
}

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
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

@media screen and (max-width: 768px) {
  #app {
    width: 100vw;
  }
}
</style>
