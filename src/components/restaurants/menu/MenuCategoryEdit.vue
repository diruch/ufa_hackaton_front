<template>
  <div>
    <label for="name">Name </label>
    <input id="title" v-model="category.title" />
    <br />
    <br />
    <label for="description">Description </label>
    <input id="description" v-model="category.description" />
    <br />
    <br />
    <label for="image">Image </label>
    <input type="file" id="image" @change="saveImage" />
    <br />
    <br />
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
      category: {
        title: "",
        description: "",
        logo: ""
      },
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
