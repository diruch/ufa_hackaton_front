<template>
  <div>
    <h1>Restaurant Registration page</h1>
    <label for="title">Title </label>
    <input id="title" v-model="restaurant.title" />
    <br />
    <br />
    <label for="description">Description </label>
    <input id="description" v-model="restaurant.description" />
    <br />
    <br />
    <label for="location">Location </label>
    <input id="location" v-model="restaurant.location" />
    <br />
    <br />
    <br />
    <br />
    <h2>Menus</h2>
    <br />
    <br />
    <table>
      <thead>
        <tr>
          <td>Logo</td>
          <td>Title</td>
          <td>Description</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="menu in restaurant.menus" :key="menu.id">
          <td><img style="width:100px" :src="menu.logo" /></td>
          <td>{{ menu.title }}</td>
          <td>{{ menu.description }}</td>
          <td><button @click="editMenu(menu.id)">Edit</button></td>
          <td><button>Delete</button></td>
        </tr>
      </tbody>
    </table>
    <template>
      <menu-edit v-if="creatingMenu" :restaurantId="id" />
    </template>
    <br />
    <br />
    <button @click="addMenu">Add Menu</button>
    <button @click="edit">Save changes</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MenuEdit from "./menu/MenuEdit.vue";

export default {
  components: { MenuEdit },
  props: {
    id: Number,
  },
  data() {
    return {
      restaurant: {
        title: "",
        description: "",
        location: "",
        menus: [],
      },
      creatingMenu: false,
    };
  },
  created() {
    let id = this.id;
    this.loadRestaurantById({ id: id }).then((response) => {
      this.restaurant = response.payload;
    });
  },
  methods: {
    ...mapActions(["loadRestaurantById", "editRestaurantData"]),
    edit() {
      let id = this.id;
      let restaurant = this.restaurant;
      this.editRestaurantData({ id: id, restaurant: restaurant });
    },
    addMenu() {
      this.$router.push({
        name: "menu-edit",
        params: {
          restaurantId: this.id,
          menuId: null,
          menuObj: null,
        },
      });
    },
    editMenu(menuId) {
      let menu = this.restaurant.menus.filter((menu) => menu.id == menuId)[0];
      if (menu) {
        this.$router.push({
          name: "menu-edit",
          params: {
            restaurantId: this.id,
            menuId: menuId,
            menuObj: menu,
          },
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%; /* Ширина таблицы */
  border: 4px double black; /* Рамка вокруг таблицы */
  border-collapse: collapse; /* Отображать только одинарные линии */
}
th {
  text-align: left; /* Выравнивание по левому краю */
  background: #ccc; /* Цвет фона ячеек */
  padding: 5px; /* Поля вокруг содержимого ячеек */
  border: 1px solid black; /* Граница вокруг ячеек */
}
td {
  padding: 5px; /* Поля вокруг содержимого ячеек */
  border: 1px solid black; /* Граница вокруг ячеек */
}
</style>
