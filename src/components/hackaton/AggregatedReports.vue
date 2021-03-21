<template>
  <v-app id="inspire">
    <div>
      <v-app-bar dense dark>
        <v-spacer></v-spacer>
        <v-toolbar-title
          ><router-link to="/" style="color: white">UFA HACKATON</router-link></v-toolbar-title
        >
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
    <v-container fluid align="center">
      <v-row>
        <v-col cols="12">
          <h1>Агрегированные отчеты</h1>
        </v-col>
        <v-col cols="6" offset="3">
          <v-select
            :items="reportTypeSelect"
            label="Тип отчёта"
            item-text="name"
            item-value="id"
            v-model="type"
          ></v-select>
        </v-col>
        <v-col cols="6" offset="3">
          <h4>Начало периода</h4>
        </v-col>
        <v-col cols="3" offset="3">
          <v-select
            :items="reportMonthSelect"
            label="Месяц"
            item-text="name"
            item-value="id"
            v-model="startDateMonth"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            :items="reportYearSelect"
            label="Год"
            item-text="value"
            item-value="value"
            v-model="startDateYear"
          ></v-select>
        </v-col>
        <v-col cols="6" offset="3">
          <h4>Конец периода</h4>
        </v-col>
        <v-col cols="3" offset="3">
          <v-select
            :items="reportMonthSelect"
            label="Месяц"
            item-text="name"
            item-value="id"
            v-model="endDateMonth"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            :items="reportYearSelect"
            label="Год"
            item-text="value"
            item-value="value"
            v-model="endDateYear"
          ></v-select>
        </v-col>
        <v-col cols="6" offset="3">
          <v-select
            :items="okveds"
            label="ОКВЕД"
            item-text="value"
            item-value="id"
            multiple
            v-model="selectedOkveds"
          ></v-select>
        </v-col>
        <v-col cols="6" offset="3">
          <template v-if="type == '2'">
            <v-select
              :items="districts"
              label="Округ"
              item-text="name"
              item-value="id"
              multiple
              v-model="ids"
            ></v-select>
          </template>
          <template v-if="type == '3'">
            <v-select
              :items="regions"
              label="Отрасль"
              item-text="name"
              item-value="id"
              multiple
              v-model="ids"
            ></v-select>
          </template>

          <v-btn dark elevation="24" @click="getChart"
            >Загрузить</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="blocktext">
            <line-chart :chart-data="chartData" :options="options"></line-chart>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import LineChart from "./LineChart";

export default {
  components: { LineChart },
  data() {
    return {
      reportTypeSelect: [
        { name: "Российская Федерация", id: 1 },
        { name: "Округ", id: 2 },
        { name: "Регион", id: 3 },
      ],
      reportMonthSelect: [
        { name: "Январь", id: "01" },
        { name: "Февраль", id: "02" },
        { name: "Март", id: "03" },
        { name: "Апрель", id: "04" },
        { name: "Май", id: "05" },
        { name: "Июнь", id: "06" },
        { name: "Июль", id: "07" },
        { name: "Август", id: "08" },
        { name: "Сентябрь", id: "09" },
        { name: "Октябрь", id: "10" },
        { name: "Ноябрь", id: "11" },
        { name: "Декабрь", id: "12" },
      ],
      reportYearSelect: [
        { value: 2015 },
        { value: 2016 },
        { value: 2017 },
        { value: 2018 },
        { value: 2019 },
        { value: 2020 },
      ],
      type: 1,
      startDateMonth: "01",
      endDateMonth: "01",
      startDateYear: 2015,
      endDateYear: 2016,
      okveds: [],
      selectedOkveds: [],
      chartData: {},
      ids: [],
      districts: [],
      district: "",
      regions: [],
      colors: ["#c90432", "#2071f5", "#ffff0d", "#04de04"],
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 90,
                suggestedMax: 130,
              },
            },
          ],
        },
      },
    };
  },
  created() {
    this.loadOkveds().then((data) => {
      this.okveds = data;
    });
    this.loadDistricts().then((data) => (this.districts = data));
    this.loadRegions().then((data) => (this.regions = data));
  },
  methods: {
    ...mapActions([
      "loadOkveds",
      "loadChart",
      "loadDistricts",
      "loadDistrictChart",
      "loadRegions",
      "loadRegionsChart",
    ]),
    getChart() {
      if (this.type == 1) {
        this.getCountryChart();
      } else if (this.type == 2) {
        this.getDistrictChart();
      } else if (this.type == 3) {
        this.getRegionChart();
      }
    },
    getCountryChart() {
      console.log(this.selectedOkveds);
      this.loadChart({
        ids: [],
        okvedIds: this.selectedOkveds,
        periodStart:
          this.startDateYear + "-" + this.startDateMonth + "-" + "01",
        periodEnd: this.endDateYear + "-" + this.endDateMonth + "-" + "01",
      }).then((data) => {
        console.log(data);
        let labels = data.periods.map((p) => p.periodDate);
        let points = data.periods.map((p) => p.monthRatio);
        console.log(labels);
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: "РФ",
              borderWidth: 3,
              data: points,
              borderColor: "#e80707",
            },
          ],
        };
      });
    },
    getDistrictChart() {
      console.log("D");
      this.loadDistrictChart({
        ids: this.ids,
        okvedIds: this.selectedOkveds,
        periodStart:
          this.startDateYear + "-" + this.startDateMonth + "-" + "01",
        periodEnd: this.endDateYear + "-" + this.endDateMonth + "-" + "01",
      }).then((data) => {
        console.log(data);
        let labels = data[0].periods.map((p) => p.periodDate);
        let datasets = [];
        data.forEach((element, ind) => {
          let points = element.periods.map((p) => p.monthRatio);
          let label = this.districts.filter((d) => {
            return d.id == element.placeId;
          })[0].name;
          let d = {
            label: label,
            borderWidth: 3,
            data: points,
            borderColor: this.colors[ind],
          };
          datasets.push(d);
        });
        this.chartData = {
          labels: labels,
          datasets: datasets,
        };
      });
    },
    getRegionChart() {
      console.log("R");
      this.loadRegionsChart({
        ids: this.ids,
        okvedIds: this.selectedOkveds,
        periodStart:
          this.startDateYear + "-" + this.startDateMonth + "-" + "01",
        periodEnd: this.endDateYear + "-" + this.endDateMonth + "-" + "01",
      }).then((data) => {
        console.log(data);
        let labels = data[0].periods.map((p) => p.periodDate);
        let datasets = [];
        data.forEach((element, ind) => {
          let points = element.periods.map((p) => p.monthRatio);
          let label = this.districts.filter((d) => {
            return d.id == element.placeId;
          })[0].name;
          let d = {
            label: label,
            borderWidth: 3,
            data: points,
            borderColor: this.colors[ind],
          };
          datasets.push(d);
        });
        this.chartData = {
          labels: labels,
          datasets: datasets,
        };
      });
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
.blocktext {
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  height: 400px;
  max-height: 400px;
}
</style>
