<template>
  <v-toolbar id="toolbarHeader" :class="this.$store.state.siteSetup.color" fixed dark>
    <!-- <v-btn fab dark small color="red" class="logo" @click="clearCart">
      <v-icon dark>favorite</v-icon>
    </v-btn> -->
    <img
      src="../assets/heart_PNG51352.png"
      alt="LOGO"
      style="width: 4%; heght:4%;"
    />
    <v-toolbar-title class="mr-1 myTitle" @click="navigateTo({ name: 'home' })">
      <span class="home">{{ header }}</span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" dark flat :to="{ name: 'showroom' }"
        >Shop
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <v-toolbar-title
      v-if="$store.state.isUserLoggedIn || $store.state.administration.isAdminUserLoggedIn"
      style="color: whitesmoke;"
      class="mr-1 mt-1 notHamburger"
      >Hello {{ $store.state.username || $store.state.administration.admin_username }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-flex md3>
      <v-btn
        class="#305f72"
        dark
        flat
        v-if="$store.state.isUserLoggedIn && $store.state.cartCount > 0"
        :to="{ name: 'shoppingCart' }"
      >
        <div class="text-xs-right cart">
          <v-badge right color="green" :to="{ name: 'login' }">
            <template v-slot:badge>
              <span>
                <div>{{ $store.state.cartCount }}</div>
              </span>
            </template>
            <v-icon large color="grey lighten-1">shopping_cart</v-icon>
          </v-badge>
        </div>
      </v-btn>
    </v-flex>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" dark flat :to="{ name: 'about' }"
        >About
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        class="#305f72 notHamburger"
        v-if="!$store.state.isUserLoggedIn"
        dark
        flat
        :to="{ name: 'login' }"
        >Log in
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        class="#305f72 notHamburger"
        v-if="!$store.state.isUserLoggedIn"
        dark
        flat
        :to="{ name: 'register' }"
        >Sign Up
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn
        class="#305f72 notHamburger"
        v-if="$store.state.isUserLoggedIn"
        dark
        flat
        @click="logout"
        >Log Out
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" dark flat :to="{ name: 'contact' }"
        >Contact
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn class="#305f72 notHamburger" dark flat :to="{ name: 'faq' }"
        >FAQ<v-icon dark left color="red darken-2" class="ml-2">help</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-menu full-width right dark offsetY min-width="100%">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-toolbar-side-icon class="hamburger"></v-toolbar-side-icon>
        </v-btn>
      </template>
      <v-list class="hamburger">
        <v-list-tile :to="{ name: 'showroom' }">
          <v-list-tile-title>Shop</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          v-if="!$store.state.isUserLoggedIn"
          :to="{ name: 'login' }"
        >
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile>
        <v-divider v-if="!$store.state.isUserLoggedIn"></v-divider>
        <v-list-tile
          v-if="!$store.state.isUserLoggedIn"
          :to="{ name: 'register' }"
        >
          <v-list-tile-title>Signup</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-if="$store.state.isUserLoggedIn" @click="logout">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile :to="{ name: 'contact' }">
          <v-list-tile-title>Contact</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile :to="{ name: 'faq' }">
          <v-list-tile-title>faq<v-icon dark left color="red darken-2">help</v-icon></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
export default {
  data() {
    return {
      header: "BOREDOM BUSTERS",
      username: null
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setSelectedProduct", null);
      this.$store.dispatch("setUserName", null);
      this.$router.push({
        name: "home"
      });
    },
    clearCart() {
      this.$store.dispatch("addToCart", 0);
      this.$store.dispatch("addToShoppingCart", []);
      // window.localStorage.clear()
    }
  },
  mounted() {
    if (this.$store.state.username !== null) {
      this.username = this.$store.state.username;
    }
  }
};
</script>
<style scoped>
#toolbarHeader {
  z-index: 15;
}
.home {
  cursor: pointer;
}
#toolbarImg {
  width: 5%;
  height: 5%;
}
.cart:hover {
  cursor: pointer;
}

.logo:hover {
  cursor: auto;
}
.hamburger {
  display: none;
}
.v-list-tile-title:hover {
  cursor: pointer;
}

@media screen and (max-width: 820px) {
  .hamburger {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .v-toolbar-items {
    display: none;
  }
  .notHamburger {
    display: none;
  }
  .home {
    font-size: 80%;
  }
}
</style>
