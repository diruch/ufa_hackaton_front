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
                <v-col cols="12">
                  <v-text-field
                    label="Наименование"
                    v-model="company.name"
                  ></v-text-field>
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
                  <v-btn color="primary" @click="newCompany()">
                    Сохранить
                  </v-btn>
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
  data() {
    return {
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
    this.loadOkveds().then((data) => {
      console.log(data);
      this.okveds = data;
    });
    this.loadActivites().then((data) => {
      this.activities = data;
    });
  },
  methods: {
    ...mapActions(["loadOkveds", "loadActivites", "createCompany"]),
    newCompany() {
        var okved = this.okveds.find(o => o.id == this.company.okved);
        var act = this.activities.find(o => o.id == this.company.kindOfActivity);
        this.company.okved = okved
        this.company.kindOfActivity = act
      this.createCompany({ company: this.company }).then((data) => {
        this.$router.push({
          name: "company-view",
          params: { companyId: data.id },
        });
      });
    },
  },
};
</script>