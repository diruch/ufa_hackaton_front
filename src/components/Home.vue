<template>
  <v-app id="inspire">
    <div>
      <v-app-bar dense dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>UFA KakaTON</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </div>
    <div>
      <v-main>
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="6">
              <router-link to="/companies">
                <v-card height="100" class="justify-center">
                  <v-card-text>
                    <v-icon large color="darken-2">mdi-factory</v-icon>
                    <h2>Компании</h2>
                  </v-card-text>
                </v-card>
              </router-link>
            </v-col>
            <v-col cols="6">
              <router-link to="/aggregated-reports">
                <v-card height="100" class="justify-center">
                  <v-card-text>
                    <v-icon large color="darken-2">mdi-database-import-outline</v-icon>
                    <h2>Агрегированные отчеты</h2>
                  </v-card-text>
                </v-card>
              </router-link>
            </v-col>
            <v-col cols="6">
              <router-link to="/detailed-reports">
                <v-card height="100" class="justify-center">
                  <v-card-text>
                    <v-icon large color="darken-2">mdi-chart-line</v-icon>
                    <h2>Детальные отчеты</h2>
                  </v-card-text>
                </v-card>
              </router-link>
            </v-col>
            <v-col cols="6">
              <router-link to="/data-import">
                <v-card height="100" class="justify-center">
                  <v-card-text>
                    <v-icon large color="darken-2">mdi-chart-arc</v-icon>
                    <h2>Импорт данных</h2>
                  </v-card-text>
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
