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
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Импортирование данных
          </v-card-title>
          <v-row style="margin-top: 10px">
            <v-col cols="8" offset="2">
              <v-file-input
                label="Click here to select a .txt file"
                outlined
                v-model="file"
              >
              </v-file-input>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="importData">
              Импортировать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2>Предприятия</h2>
        </v-col>
        <v-col cols="2" offset="8">
          <v-btn @click="createComp">Создать</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn @click="openImportDialog">Импортировать</v-btn>
        </v-col>
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
      file: null,
      dialog: false,
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
    ...mapActions(["loadAllCompanies", "importCompanies"]),
    clickRow(row) {
      this.$router.push({
        name: "company-view",
        params: { companyId: row.id },
      });
    },
    createComp() {
      this.$router.push({
        name: "company-create",
      });
    },
    openImportDialog() {
      this.dialog = true;
    },
    importData() {
      this.dialog = false;
      let data = new FormData();
      data.append("file", this.file);
      this.importCompanies({ formData: data }).then((data) => {
        this.loadAllCompanies().then((data) => {
          this.companies = data;
        });
      });
    },
  },
};
</script>