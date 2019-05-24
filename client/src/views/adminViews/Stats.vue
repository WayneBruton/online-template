<template>
  <v-container>
    <v-layout class="panelWidth" xs3 column justify-space-around>
      <v-flex xs3 offset-xs0>
        <!-- <img src="../assets/heart_PNG51352.png" alt="LOGO" style="width: 10%; "> -->
        <panel title="Statistics" transition="scale-transition">
          <v-flex sm12 offset-xs0>
            <v-btn
              @click="mostViewedProduct"
              :class="this.$store.state.siteSetup.color"
              dark
              >Top 10 viewed products
            </v-btn>
            <br />
            <v-btn
              @click="salesByMonth"
              :class="this.$store.state.siteSetup.color"
              dark
              >Sales by Month / Year
            </v-btn>
            <v-btn
              @click="salesByProduct"
              :class="this.$store.state.siteSetup.color"
              dark
              >Top 10 product Sales
            </v-btn>
            <v-btn
              @click="salesByArea"
              :class="this.$store.state.siteSetup.color"
              dark
              >Sales by City / Province
            </v-btn>
            <br />
            <br />
          </v-flex>
          <br />
          <v-alert class="danger-alert" v-if="error" :value="true" type="error">
            {{ error }}
          </v-alert>
          <v-alert
            class="danger-alert"
            v-if="success"
            :value="true"
            type="success"
          >
            {{ success }}
          </v-alert>
          <!-- <v-btn :class="this.$store.state.siteSetup.color" @click="addFaq" dark>Post</v-btn> -->
        </panel>
        <panel title="Most Viewed Products" v-if="topViewProductsChartDisplay">
          <div style="display: flex;">
            <div class="chart-wrapper">
              <chart :options="chartOptionsBar"></chart>
            </div>
            <div style="display: flex; flex-direction: column; width: 35%;">
              <br />
              <br />
              <h4>Legend</h4>
              <br />
              <div style="displey: flex; justify-content: flex-start;">
                <ul>
                  <li v-for="item in myData" :key="item.id">
                    <div style=" width: 50%; display: flex;">{{ item.id }}</div>
                    <div style=" width: 50%; display: flex;">
                      {{ item.product_name }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </panel>
        <panel title="Sales" v-if="salesLast12MonthsDisplay">
          <div class="chart-wrapper">
            <chart :options="chartOptionsLine"></chart>
          </div>
        </panel>
        <panel
          title="Sales By Product"
          v-if="salesByProductLast12MonthsDisplay"
        >
          <div class="chart-wrapper">
            <chart :options="chartOptionsBar"></chart>
          </div>
        </panel>
        <panel title="Sales by Area" v-if="SalesByCityDisplay">
          <div class="chart-wrapper">
            <chart :options="chartOptionsBar"></chart>
          </div>
        </panel>
        <br />
      </v-flex>
      <v-btn @click="returnTo" :class="this.$store.state.siteSetup.color" dark
        >Dashboard
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "@/components/Panel.vue";
import AdminService from "@/services/AdminServices";
import Authenticate from "../../functions/authenticateAdmin";
export default {
  data() {
    return {
      myData: [],
      topViewProductsChartDisplay: false,
      salesLast12MonthsDisplay: false,
      salesByProductLast12MonthsDisplay: false,
      SalesByCityDisplay: false,
      chartOptionsBar: {
        xAxis: {
          data: ["Q1", "Q2", "Q3", "Q4"]
        },
        yAxis: {
          type: "value"
        },
        legend: {
          data: ["Forest", "Steppe", "Desert", "Wetland"]
        },
        series: [
          {
            name: "",
            type: "bar",
            barGap: 0,
            label: {
              show: true,
              align: "left",
              rotate: 90,
              verticalAlign: "middle",
              formatter: "{c}  {name|{a}}",
              fontSize: 16,
              rich: {
                name: {
                  textBorderColor: "#fff"
                }
              }
            },

            data: [63, 75, 24, 92]
          }
        ],
        title: {
          text: "Quarterly Sales Results",
          x: "center",
          textStyle: {
            fontSize: 24
          }
        },
        color: ["green"]
        // color: ["#127ac2"]
      },
      chartOptionsLine: {
        xAxis: {
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            data: [55, 72, 84, 48, 59, 62, 87, 75, 94, 101, 127, 118]
          }
        ],

        title: {
          text: "Monthly Stock Prices",
          x: "center",
          textStyle: {
            fontSize: 24
          }
        },
        color: ["#127ac2"]
      },
      error: null,
      success: null,
      required: value => !!value || "Required."
    };
  },
  components: {
    Panel
  },
  async mounted() {
    this.myData = [];
    this.Authenticate = Authenticate.authenticate;
    this.Authenticate();
    if (!this.$store.state.administration.isAdminUserLoggedIn) {
      this.error =
        "Your session has expired! You will be redirected to the login page.";
      setTimeout(() => {
        this.error = null;
        this.$router.push({
          name: "adminLogin"
        });
      }, 800);
    }
  },
  methods: {
    returnTo() {
      this.$router.push({ name: "dashboard" });
    },
    async mostViewedProduct() {
      this.myData = [];
      try {
        let response = await AdminService.productViews();
        this.myData = response.data;
      } catch (err) {
        console.log(err);
      }
      this.chartOptionsBar.title.text = "Top 10 most viewed products";
      this.chartOptionsBar.xAxis.data = []; //this is x axist titles
      this.chartOptionsBar.series[0].data = []; // this is the acual data
      this.chartOptionsBar.series[0].name = "";
      this.chartOptionsBar.color = ["green"];
      this.chartOptionsBar.legend.data = [];
      this.myData.forEach(el => {
        this.chartOptionsBar.xAxis.data.push(el.id);
        this.chartOptionsBar.series[0].data.push(el.views);
        this.chartOptionsBar.legend.data.push(el.product_name);
      });
      this.topViewProductsChartDisplay = true;
      this.salesLast12MonthsDisplay = false;
      this.salesByProductLast12MonthsDisplay = false;
      this.SalesByCityDisplay = false;
    },
    salesByMonth() {
      this.topViewProductsChartDisplay = false;
      this.salesLast12MonthsDisplay = true;
      this.salesByProductLast12MonthsDisplay = false;
      this.SalesByCityDisplay = false;
      this.chartOptionsLine.title.text = "Last 12 months turnover";
    },
    salesByProduct() {
      this.topViewProductsChartDisplay = false;
      this.salesLast12MonthsDisplay = false;
      this.salesByProductLast12MonthsDisplay = true;
      this.SalesByCityDisplay = false;
      this.chartOptionsBar.series[0].name = "Product";
      this.chartOptionsBar.xAxis.data = ["Q1", "Q2", "Q3", "Q4"]; //this is x axist titles
      this.chartOptionsBar.series[0].data = [63, 75, 24, 92]; // this is the acual data

      this.chartOptionsBar.title.text = "Sales by Products";
      this.chartOptionsBar.color = ["orange"];
    },
    salesByArea() {
      this.topViewProductsChartDisplay = false;
      this.salesLast12MonthsDisplay = false;
      this.salesByProductLast12MonthsDisplay = false;
      this.SalesByCityDisplay = true;
      this.chartOptionsBar.series[0].name = "Area";
      this.chartOptionsBar.xAxis.data = ["WC", "EC", "FS", "KZN", "GTG"]; //this is x axist titles
      this.chartOptionsBar.series[0].data = [63, 75, 24, 92, 111]; // this is the acual data

      this.chartOptionsBar.title.text = "Sales by province";
      this.chartOptionsBar.color = ["blue"];
    }
  }
};
</script>

<style scoped>
/* .echarts {
  width: 100%;
  height: 100%;
} */
.chart-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 400px;
}
li {
  display: flex;
  justify-content: space-around;
}
li div {
  display: flex;
  justify-content: flex-start;
}
li:hover {
  background-color: lightgrey;
}
</style>
