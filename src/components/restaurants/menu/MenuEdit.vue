<template>
  <div>
    <label for="title">Title </label>
    <input id="title" v-model="menu.title" />
    <br />
    <br />
    <label for="description">Description </label>
    <input id="description" v-model="menu.description" />
    <br />
    <br />
    <label for="image">Image </label>
    <input type="file" id="image" @change="saveImage" />
    <br />
    <h2>Subcategories</h2>
    <br />
    <br />
    <table>
      <thead>
        <tr>
          <td>Logo</td>
          <td>Name</td>
          <td>Description</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subcategory in menu.categories" :key="subcategory.id">
          <td><img style="width:100px" :src="subcategory.logo" /></td>
          <td>{{ subcategory.title }}</td>
          <td>{{ subcategory.description }}</td>
          <td><button @click="editSubcategory(subcategory.id)">Edit</button></td>
          <td><button>Delete</button></td>
        </tr>
      </tbody>
    </table>
    <br />
    <button @click="addCategory">Add category</button>
    <br />
    <br />
    <button @click="saveChanges">Save Menu</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    restaurantId: Number,
    menuId: Number,
    menuObj: Object,
  },
  data() {
    return {
      menu: {
        title: "",
        description: "",
      },
      image: {}
    };
  },
  created() {
    let id = this.menuId;
    if (!this.menuObj && this.menuId) {
      this.loadMenuById({ id: id }).then((response) => {
        this.restaurant = response.payload;
      });
    } else if (this.menuObj) {
      this.menu = this.menuObj;
    } else {
      this.menu = {};
    }
  },
  methods: {
    ...mapActions(["loadMenuById", "createMenu", "uploadImage", "editMenu"]),
    saveChanges() {
      let menu = this.menu;
      let menuId = this.menuId;
      if (this.menuId) {
        this.saveMenu(this.editMenu, { menuId, menu });
      } else {
        this.saveMenu(this.createMenu, { menu });
      }
    },
    saveMenu(method, params) {
      if (this.image) {
        let fd = new FormData();
        fd.append("image", this.image);
        this.uploadImage(fd)
          .then((response) => {
            this.menu.logoId = response.payload;
            method(params).then((response) => {
              this.routeToRestaurantEdit();
            });
          })
          .catch((error) => console.log(error));
      } else {
        method(params).then((response) => {
          this.routeToRestaurantEdit();
        });
      }
    },
    routeToRestaurantEdit() {
      this.$router.push({
        name: "restaurant-edit",
        params: {
          id: this.restaurantId,
        },
      });
    },
    saveImage(e) {
      this.image = e.target.files[0];
    },
    addCategory() {
      
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
