<template>
  <div id="cart">
    <div id="cartTable">
      <v-toolbar flat color="white">
        <v-toolbar-title>CART</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-icon large color="green lighten-1">shopping_cart</v-icon>
        <!-- ============================================ -->
        <v-dialog v-model="deleteDialog" persistent max-width="500">
          <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
          <v-card>
            <v-card-title class="headline">{{ formTitle }}</v-card-title>
            <v-card-text>If you delete in error, you can simply click "Return to Shop" and correct your mistake.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" flat @click.native="deleteDialog = false">Cancel</v-btn>
              <v-btn color="black darken-1" flat @click.native="deleteItem">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- ================================================ -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
              <br>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field readonly v-model="editedItem.product_name" label="Product name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.quantity" label="Quantity" @change="minVal"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field readonly v-model="editedItem.price" label="Price"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field readonly v-model="editedItem.total" label="Total"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="black darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="black darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="shoppingCart"
        class="elevation-2"
        v-bind:pagination.sync="pagination"
      >
        <template v-slot:items="props">
          <td>{{ props.item.product_name }}</td>
          <td class="text-xs-right">{{ props.item.quantity }}</td>
          <td class="text-xs-right">R {{ parseFloat(props.item.price).toFixed(2) }}</td>
          <td class="text-xs-right">R {{ parseFloat(props.item.total).toFixed(2) }}</td>
          <td class="justify-center layout px-0 mt-4">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon class="edit" small v-on="on" @click="editItem(props.item)">edit</v-icon>
              </template>
              <span>Edit Quantity</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-icon class="delete" small v-on="on" @click="deleteItemA(props.item)">delete</v-icon>
              </template>
              <span>Delete Item</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </div>
    <div id="cartSummary">
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-toolbar flat color="white">
        <v-spacer></v-spacer>
        <v-toolbar-title>TOTALS</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card>
        <div id="totals">
          <div class="items">
            <h4>Product Totals</h4>
            <h4>R {{ parseFloat(total).toFixed(2) }}</h4>
          </div>
          <hr>
          <div class="items">
            <h4>Delivery</h4>
            <h4>R {{ parseFloat(delivery).toFixed(2) }}</h4>
          </div>
          <hr>
          <hr>
          <div class="items">
            <h3>Net</h3>
            <h3>R {{ parseFloat(net).toFixed(2) }}</h3>
          </div>
          <hr>
          <hr>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      e1: 0,
      shoppingCart: [],
      dialog: false,
      deleteDialog: false,
      deleteIndex: 0,
      headers: [
        {
          text: "Product Name",
          align: "center",
          sortable: false,
          value: "product_name"
        },
        { text: "Quantity", align: "right", value: "quantity" },
        { text: "Price (R)", align: "right", value: "price" },
        { text: "Total (R)", align: "right", value: "total" },
        {
          text: "Actions",
          align: "center",
          value: "product_name",
          sortable: false
        }
      ],
      pagination: { sortBy: "quantity", descending: false, rowsPerPage: 5 },
      editedIndex: -1,
      editedItem: {
        product_name: "",
        quantity: 0,
        price: 0,
        total: 0
      },
      defaultItem: {
        product_name: "",
        quantity: 0,
        price: 0,
        total: 0
      },
      total: 0,
      delivery: 0,
      net: 0
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Delete Item" : "Change Quantity";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  mounted() {
    this.shoppingCart = this.$store.state.shoppingCart;
    //UPDATE SUMMARY
    let totalAdded = this.shoppingCart.reduce((prev, el) => {
      return (prev = prev + parseFloat(el.total));
    }, 0);
    this.total = totalAdded;
    if (totalAdded * 0.1 < 90) {
      this.delivery = 90;
    } else {
      this.delivery = totalAdded * 0.1;
    }
    this.net = parseFloat(this.total) + parseFloat(this.delivery);
    if (!this.shoppingCart.length) {
      this.$router.push("showroom");
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.shoppingCart.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editedItem.price = parseFloat(this.editedItem.price).toFixed(2);
      this.editedItem.total = parseFloat(this.editedItem.total).toFixed(2);
      this.dialog = true;
    },
    minVal() {
      if (parseFloat(this.editedItem.quantity) < 1) {
        this.editedItem.quantity = 1;
      }
      this.editedItem.total =
        parseFloat(this.editedItem.price) *
        parseFloat(this.editedItem.quantity);
    },
    deleteItemA(item) {
      this.deleteIndex = this.shoppingCart.indexOf(item);
      this.deleteDialog = true;
    },
    deleteItem() {
      const index = this.deleteIndex;
      this.shoppingCart.splice(index, 1);
      this.$store.dispatch("addToShoppingCart", this.shoppingCart);
      let addItems = this.shoppingCart.reduce((prev, current) => {
        return (prev = prev + parseInt(current.quantity));
      }, 0);
      this.$store.dispatch("addToCart", addItems);
      if (!this.shoppingCart.length) {
        this.$router.push("showroom");
      }
      // UPDATE SUMMARY
      let totalAdded = this.shoppingCart.reduce((prev, el) => {
        return (prev = prev + parseFloat(el.total));
      }, 0);
      this.total = totalAdded;
      if (totalAdded * 0.1 < 90) {
        this.delivery = 90;
      } else {
        this.delivery = totalAdded * 0.1;
      }
      this.net = parseFloat(this.total) + parseFloat(this.delivery);
      this.deleteDialog = false;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.shoppingCart[this.editedIndex], this.editedItem);
      } else {
        this.shoppingCart.push(this.editedItem);
      }
      this.close();
      this.$store.dispatch("addToShoppingCart", this.shoppingCart);
      let addItems = this.shoppingCart.reduce((prev, current) => {
        return (prev = prev + parseInt(current.quantity));
      }, 0);
      this.$store.dispatch("addToCart", addItems);
      if (!this.shoppingCart.length) {
        this.$router.push("showroom");
      }

      // customSort(items, index, isDescending);

      //Update Summary
      let totalAdded = this.shoppingCart.reduce((prev, el) => {
        return (prev = prev + parseFloat(el.total));
      }, 0);
      this.total = totalAdded;
      if (totalAdded * 0.1 < 90) {
        this.delivery = 90;
      } else {
        this.delivery = totalAdded * 0.1;
      }
      this.net = parseFloat(this.total) + parseFloat(this.delivery);
    },
    customSort(items, index, isDescending) {
      items.sort((a, b) => {
        if (index === "quantity") {
          if (isDescending) {
            return b.quantity - a.quantity;
          } else {
            return a.quantity - b.quantity;
          }
        }
      });

      return items;
    }
  }
};
</script>

<style scoped>
.delete:hover {
  color: red;
}
.edit:hover {
  color: green;
  opacity: 0.8;
}
#cart {
  display: flex;
}
#cartTable {
  width: 70%;
  margin: 3px;
}
#cartSummary {
  padding: 3px;
  width: 30%;
}

#totals {
  display: flex;
  flex-direction: column;
}
.items {
  display: flex;
  justify-content: space-between;
  margin: 3px;
  padding: 10px 3px;
  height: 50px;
}
@media screen and (max-width: 768px) {
  #cart {
    flex-direction: column;
  }
  #cartTable {
    width: 100%;
    margin: 3px;
  }
  #cartSummary {
    padding: 3px;
    width: 100%;
  }
}
</style>
