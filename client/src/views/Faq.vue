<template>
  <v-container>
    <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%;" />
    <v-flex xs12>
      <h1>Frequently asked questions</h1>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm8 md8 offset-md2>
            <v-expansion-panel popout dark>
              <v-expansion-panel-content v-for="(item, i) in items" :key="i">
                <div slot="header">{{ item.title }}</div>
                <v-card>
                  <v-card-text>{{ item.description }}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-container>
</template>

<script>
import AdminService from "@/services/AdminServices";
export default {
  data() {
    return {
      items: []
    };
  },
  
  async mounted() {
    try {
      let response = await AdminService.getFaq();
      this.items = response.data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped></style>
