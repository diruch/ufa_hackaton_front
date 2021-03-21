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
          <h1>Детальные отчеты</h1>
        </v-col>
        <v-col cols="6" offset="3">
          <v-select
            :items="chartTypes"
            label="Тип графика"
            item-text="value"
            item-value="id"
            @change="onChartTypeChange()"
            v-model="selectedChartType"
          ></v-select>
        </v-col>
        <v-col cols="6" offset="3">
          <v-select
            :items="valueTypes"
            label="Значения"
            item-text="value"
            item-value="id"
            v-model="selectedValueType"
          ></v-select>
        </v-col>
        <v-col cols="6" offset="3">
          <v-select
            :items="selectTypes"
            label="Тип отчета"
            item-text="value"
            item-value="id"
            v-model="selectedSelectType"
          ></v-select>
        </v-col>
        <template v-if="selectedSelectType == 1">
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
        </template>
        <template v-if="selectedSelectType == 2">
          <v-col cols="6" offset="3">
            <h4 v-for="period in periodList" :key="period.year + period.month">
              {{ period.year + "-" + period.month }}
            </h4>
          </v-col>
          <v-col cols="2" offset="3">
            <v-select
              :items="reportMonthSelect"
              label="Месяц"
              item-text="name"
              item-value="id"
              v-model="addedPeriodMonth"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-select
              :items="reportYearSelect"
              label="Год"
              item-text="value"
              item-value="value"
              v-model="addedPeriodYear"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn color="success" elevation="24" @click="addPeriod"
              >Добавить точку</v-btn
            >
          </v-col>
        </template>
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
          <v-btn color="primary" elevation="24" @click="getOKVEDChart"
            >Загрузить</v-btn
          >
        </v-col>
      </v-row>
      <template v-if="selectedChartType == 1">
        <v-row v-if="selectedSelectType == 1">
          <v-col>
            <div class="blocktext">
              <line-chart
                :chart-data="chartData"
                :options="options"
                ref="lineChart"
              ></line-chart>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="selectedSelectType == 2">
          <v-col>
            <div class="blocktext">
              <bar-chart
                :chart-data="chartData"
                :options="options"
                ref="barChart"
              ></bar-chart>
            </div>
          </v-col>
        </v-row>
      </template>
      <template v-if="selectedChartType == 2">
        <v-row>
          <v-col>
            <div class="blocktext">
              <pie-chart
                :chart-data="chartData"
                :options="options"
                ref="pieChart"
              ></pie-chart>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

export default {
  components: { LineChart, BarChart, PieChart },
  data() {
    return {
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
      reportYearSelect: [{ value: 2019 }, { value: 2020 }],
      chartTypes: [
        {
          id: 1,
          value: "График по ОКВЭДам",
        },
        {
          id: 2,
          value: "Диаграмма суммы показателей",
        },
      ],
      selectedChartType: 1,
      valueTypes: [
        {
          id: 1,
          value: "Натуральная величина",
        },
        {
          id: 2,
          value: "Стоимость",
        },
        {
          id: 3,
          value: "Отношение",
        },
      ],
      selectedValueType: 1,
      periodTypes: [
        {
          id: 1,
          value: "К прошлому году",
        },
        {
          id: 2,
          value: "К прошлому месяцу",
        },
      ],
      selectedPeriodType: 1,
      selectTypes: [
        {
          id: 1,
          value: "По периоду",
        },
        {
          id: 2,
          value: "По значениям",
        },
      ],
      selectedSelectType: 1,
      okveds: [],
      selectedOkveds: [],
      periodList: [],
      chartData: {},
      colors: ["#c90432", "#2071f5", "#ffff0d", "#04de04"],
      addedPeriodMonth: "01",
      addedPeriodYear: 2020,
      startDateMonth: "01",
      endDateMonth: "01",
      startDateYear: 2019,
      endDateYear: 2020,
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Тонны",
              },
              ticks: {
                suggestedMin: 2,
                suggestedMax: 0,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Дата",
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
  },
  methods: {
    ...mapActions(["loadOkveds", "loadOKVEDChart"]),
    getOKVEDChart() {
      let periodStart = this.startDateYear + "-" + this.startDateMonth + "-01";
      let periodEnd = this.endDateYear + "-" + this.endDateMonth + "-01";
      let request = {};
      if (this.selectedSelectType == 1) {
        request = {
          ids: this.selectedOkveds,
          periodStart: periodStart,
          periodEnd: periodEnd,
        };
      }
      if (this.selectedSelectType == 2) {
        request = {
          ids: this.selectedOkveds,
          periodList: this.periodList.map(
            (period) => period.year + "-" + period.month + "-01"
          ),
        };
      }
      this.loadOKVEDChart(request).then((data) => {
        console.log(data);
        let labels = data.chart[0].periods.map((p) => p.periodDate);
        let datasets = [];

        if (this.selectedChartType == 1) {
          if (this.selectedSelectType == 1) {
            data.chart.forEach((element, ind) => {
              let points = null;
              if (this.selectedValueType == 1) {
                this.options.scales.yAxes[0].scaleLabel.labelString = "Тонны";
                points = element.periods.map((p) => p.tons);
              } else if (this.selectedValueType == 2) {
                this.options.scales.yAxes[0].scaleLabel.labelString = "Рубли";
                points = element.periods.map((p) => p.rubs);
              } else if (this.selectedValueType == 3) {
                this.options.scales.yAxes[0].scaleLabel.labelString =
                  "% к отчетному периоду прошлого года";
                points = element.periods.map((p) => p.ratio);
              }
              let label = this.okveds.filter((d) => {
                return d.id == element.okvedId;
              })[0].value;
              let d = {
                label: label,
                borderWidth: 3,
                data: points,
                borderColor: this.getRandomColor(),
              };
              datasets.push(d);
            });
          }
          if (this.selectedSelectType == 2) {
            data.chart.forEach((element, ind) => {
              let points = null;
              if (this.selectedValueType == 1) {
                this.options.scales.yAxes[0].scaleLabel.labelString = "Тонны";
                points = element.periods.map((p) => p.tons);
              } else if (this.selectedValueType == 2) {
                this.options.scales.yAxes[0].scaleLabel.labelString = "Рубли";
                points = element.periods.map((p) => p.rubs);
              } else if (this.selectedValueType == 3) {
                this.options.scales.yAxes[0].scaleLabel.labelString =
                  "% к отчетному периоду прошлого года";
                points = element.periods.map((p) => p.ratio);
              }
              let label = this.okveds.filter((d) => {
                return d.id == element.okvedId;
              })[0].value;
              let d = {
                label: label,
                borderWidth: 3,
                data: points,
                borderColor: this.getRandomColor(),
              };
              datasets.push(d);
            });
          }
        } else if (this.selectedChartType == 2) {
          let pointsList = [];
          let colorsList = [];
          labels = [];
          data.chart.forEach((element, ind) => {
            let points = null;
            if (this.selectedValueType == 1) {
              points = element.periods
                .map((p) => p.tons)
                .reduce((a, b) => a + b);
            } else if (this.selectedValueType == 2) {
              points = element.periods
                .map((p) => p.rubs)
                .reduce((a, b) => a + b);
            } else if (this.selectedValueType == 3) {
              points = element.periods
                .map((p) => p.ratio)
                .reduce((a, b) => a + b);
            }
            let label = this.okveds.filter((d) => {
              return d.id == element.okvedId;
            })[0].value;
            labels.push(label);
            pointsList.push(points);
            colorsList.push(this.getRandomColor());
          });
          datasets.push({
            data: pointsList,
            backgroundColor: colorsList,
          });
        }
        this.chartData = {
          labels: labels,
          datasets: datasets,
        };
        console.log(this.chartData);
        if (this.$refs.lineChart) {
          this.$refs.lineChart.refresh();
        }
        if (this.$refs.barChart) {
          this.$refs.barChart.refresh();
        }
        if (this.$refs.pieChart) {
          this.$refs.pieChart.refresh();
        }
      });
    },
    addPeriod() {
      this.periodList.push({
        month: this.addedPeriodMonth,
        year: this.addedPeriodYear,
      });
    },
    getRandomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    onChartTypeChange() {
      this.chartData = {};
      if (this.selectedChartType == 2) {
        this.options = {
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var total = dataset.data.reduce(function (
                  previousValue,
                  currentValue,
                  currentIndex,
                  array
                ) {
                  return previousValue + currentValue;
                });
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = Math.floor((currentValue / total) * 100 + 0.5);
                return percentage + "%";
              },
            },
          },
        };
      } else {
        this.options = {
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Тонны",
                },
                ticks: {
                  suggestedMin: 2,
                  suggestedMax: 0,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Дата",
                },
              },
            ],
          },
        };
      }
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
  width: 740px;
  height: 400px;
  max-height: 400px;
}
</style>
