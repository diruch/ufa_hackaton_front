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
    <v-container>
      <v-row>
        <v-col cols="10" offset="1">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <h1 class="text--primary" align="left">{{ company.name }}</h1>
                </v-col>
                <v-col offset="3" cols="5">
                  <v-btn @click="importData">Импортировать данные</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    :items="okveds"
                    label="Отрасль"
                    item-text="value"
                    item-value="id"
                    v-model="company.okved"
                  ></v-select>
                  <v-select
                    :items="activities"
                    label="Вид деятельности"
                    item-text="name"
                    item-value="id"
                    v-model="company.kindOfActivity"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="1">
                  <v-btn color="primary"> Сохранить </v-btn>
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
          id: "",
          name: "",
        },
        okved: {
          id: "",
          value: "",
        },
      },
      okveds: [],
      activities: [],
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
    this.loadOkveds().then((data) => {
      console.log(data);
      this.okveds = data;
    });
    this.loadActivites().then((data) => {
      this.activities = data;
    });
  },
  methods: {
    ...mapActions([
      "loadByCompanyById",
      "loadCompanyResultsById",
      "loadOkveds",
      "loadActivites",
    ]),
    edit() {
      this.$router.push({
        name: "company-edit",
        params: { companyId: this.companyId },
      });
    },
    importData() {},
  },
};
</script>