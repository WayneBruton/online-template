<template>
  <v-container>
    <v-layout class="panelWidth" xs3 column justify-space-around>
      <v-flex xs3 offset-xs0>
        <panel title="Delete FAQ">
          <ul>
            <li :id="item.id" v-for="(item, i) in displayData" :key="i">
              <!-- <div > -->
              <div class="liItem">{{ item.title }}</div>
              <div class="liItem">
                <v-btn :id="item.id" dark @click="deleteItem($event)">
                  <v-icon class="mr-2" small>delete</v-icon>Delete
                </v-btn>
              </div>
            </li>
          </ul>
          <br>
          <v-alert class="danger-alert" v-if="error" :value="true" type="error">{{ error }}</v-alert>
          <v-alert class="danger-alert" v-if="success" :value="true" type="success">{{ success }}</v-alert>
        </panel>
        <br>
        <v-btn @click="returnTo" :class="this.$store.state.siteSetup.color" dark>Dashboard</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import AdminService from "@/services/AdminServices";
export default {
  data() {
    return {
      displayData: [],
      id: null,
      error: null,
      success: null,
      required: value => !!value || "Required."
    };
  },
  components: {
    Panel
  },
  async mounted() {
    try {
      let response = await AdminService.getFaq();
      console.log(response.data);
      this.displayData = response.data;
      // this.success = response.data.success;
    } catch (err) {}
  },
  methods: {
    returnTo() {
      this.$router.push({ name: "dashboard" });
    },
    async deleteItem(event) {
        console.log('Clicked')
        this.id = event.currentTarget.id
        console.log(this.id)
      try {
        let response = await AdminService.deleteFaq({
          id: this.id
        });
        console.log(response.data);
        this.success = response.data.success
        setTimeout(()=> {
            this.success = null;
            this.$router.push({ name: "dashboard" });
        }, 2000)
      } catch (err) {}
    }
  }
};
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-evenly;
}
li:hover {
  background-color: lightgrey;
}
.liItem {
  width: 30%;
  display: flex;
  align-items: center;
  align-content: center;
}
@media screen and (max-width: 768px) {
}
</style>
