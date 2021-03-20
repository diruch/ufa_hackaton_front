<template>
  <v-app id="inspire">
    <div>
      <v-app-bar dense dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>UFA KakaTON</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
    <v-container>
      <v-row>
        <v-col cols="10" offset="1">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <h1 class="text--primary" align="left">{{ company.name }}</h1>
                </v-col>
                <v-col offset="5" cols="3">
                  <v-btn @click="edit">Редактировать</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h3 class="text--primary" align="left">
                    <span class="text--secondary">Отрасль: </span>
                    {{ company.okved.value }} <br />
                    <span class="text--secondary">Вид деятельности: </span>
                    {{ company.kindOfActivity.name }} <br />
                  </h3>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h2 class="text--primary" align="left">
                    Данные по предприятию: <br />
                  </h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  ><v-card>
                    <v-card-title>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Поиск"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      dense
                      :headers="headers"
                      :items="companyResults"
                      :search="search"
                      item-key="name"
                      class="elevation-1"
                    >
                      <template v-slot:item.ratio="{ item }">
                        <span>{{ Math.round(item.ratio * 100) }}</span>
                      </template></v-data-table
                    >
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script>
import { mapActions } from "vuex";

export default {
  props: {
    companyId: String,
  },
  data() {
    return {
      search: "",
      company: {
        name: "",
        kindOfActivity: {
          name: "",
        },
        okved: {
          value: "",
        },
      },
      headers: [
        {
          text: "В натуральном выражении ",
          value: "tons",
        },
        { text: "В стоимостном выражении", value: "rubs" },
        { text: "% к прошлому году", value: "ratio" },
        { text: "Период", value: "periodDate" },
      ],
      companyResults: [],
    };
  },
  created() {
    let id = this.companyId;
    this.loadByCompanyById({ id: id }).then((response) => {
      this.company = response;
    });
    this.loadCompanyResultsById({ id: id }).then((response) => {
      this.companyResults = response.periods;
    });
  },
  methods: {
    ...mapActions(["loadByCompanyById", "loadCompanyResultsById"]),
    edit() {
      this.$router.push({
        name: "company-edit",
        params: { companyId: this.companyId },
      });
    },
  },
};
</script>