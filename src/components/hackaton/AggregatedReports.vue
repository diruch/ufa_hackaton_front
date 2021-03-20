<template>
  <div>
    <h1>Агрегированные отчеты</h1>
    <label for="type">Тип отчета</label>
    <select id="type" v-model="type">
      <option>Российская Федерация</option>
      <option>Округ</option>
      <option>Регион</option>
    </select>
    <br />
    <br />
    <label for="startDateMonth">Месяц начала периода</label>
    <select id="startDateMonth" v-model="startDateMonth">
      <option value="01">Январь</option>
      <option value="02">Февраль</option>
      <option value="03">Март</option>
      <option value="04">Апрель</option>
      <option value="05">Май</option>
      <option value="06">Июнь</option>
      <option value="07">Июль</option>
      <option value="08">Август</option>
      <option value="09">Сентябрь</option>
      <option value="10">Октябрь</option>
      <option value="11">Ноябрь</option>
      <option value="12">Декабрь</option>
    </select>
    <label for="startDateYear">Год начала периода</label>
    <select id="startDateYear" v-model="startDateYear">
      <option>2015</option>
      <option>2016</option>
      <option>2017</option>
      <option>2018</option>
      <option>2019</option>
      <option>2020</option>
    </select>
    <br />
    <br />
    <label for="endDateMonth">Месяц окончания периода</label>
    <select id="endDateMonth" v-model="endDateMonth">
      <option value="01">Январь</option>
      <option value="02">Февраль</option>
      <option value="03">Март</option>
      <option value="04">Апрель</option>
      <option value="05">Май</option>
      <option value="06">Июнь</option>
      <option value="07">Июль</option>
      <option value="08">Август</option>
      <option value="09">Сентябрь</option>
      <option value="10">Октябрь</option>
      <option value="11">Ноябрь</option>
      <option value="12">Декабрь</option>
    </select>
    <label for="endDateYear">Год начала периода</label>
    <select id="endDateYear" v-model="endDateYear">
      <option>2015</option>
      <option>2016</option>
      <option>2017</option>
      <option>2018</option>
      <option>2019</option>
      <option>2020</option>
    </select>
    <br />
    <br />

    <label for="okveds">ОКВЕД</label>
    <select id="okveds" multiple v-model="selectedOkveds">
      <option :value="okved.id" v-for="okved in okveds" :key="okved.id">
        {{ okved.value }}
      </option>
    </select>
    <br />
    <br />
    <button @click="getCountryChart">Загрузить</button>
    <div class="blocktext">
      <line-chart :chart-data="chartData" :options="options"></line-chart>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LineChart from "./LineChart";

export default {
  components: { LineChart },
  data() {
    return {
      type: "",
      startDateMonth: "01",
      endDateMonth: "01",
      startDateYear: "2015",
      endDateYear: "2016",
      okveds: [],
      selectedOkveds: [],
      chartData: {},
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
  },
  methods: {
    ...mapActions(["loadOkveds", "loadChart"]),
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
              label: "Месяцы",
              borderWidth: 3,
              data: points,
              borderColor: "#e80707",
            },
          ],
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
