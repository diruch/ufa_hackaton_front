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
        <v-col cols="12">
          <h2>Предприятия</h2>
        </v-col>
        <v-col cols="2" offset="8">
          <v-btn>Создать</v-btn>
        </v-col>
        <v-col cols="2"> <v-btn>Импортировать</v-btn> </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Поиск по названию..."
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              dense
              @click:row="clickRow"
              :headers="headers"
              :items="companies"
              :search="search"
              item-key="name"
              class="elevation-1"
            ></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Название",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Вид деятельности", value: "kindOfActivity.name" },
        { text: "Отрасль", value: "okved.value" },
      ],
      companies: [],
    };
  },
  created() {
    this.loadAllCompanies().then((data) => {
      this.companies = data;
    });
  },
  methods: {
    ...mapActions(["loadAllCompanies"]),
    clickRow(row) {
      this.$router.push({
        name: "company-view",
        params: { companyId: row.id },
      });
    },
  },
};
</script>