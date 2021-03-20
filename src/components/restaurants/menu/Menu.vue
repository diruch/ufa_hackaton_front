<template>
  <div>
    <label for="title">Title </label>
    <h4 id="title">
      {{ menu.title }}
    </h4>
    <br />
    <br />
    <label for="description">Description </label>
    <h4 id="description">
      {{ menu.description }}
    </h4>
    <br />
    <br />
    <label for="image">Image </label>
    <img :src="menu.logo" />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    restaurantId: Number,
    menuId: Number,
  },
  data() {
    return {
      menu: {
        title: "",
        description: "",
        logo: "",
      },
    };
  },
  created() {
    let id = this.menuId;
    if (this.menuId) {
      this.loadMenuById(id).then((response) => {
        this.menu = response.payload;
      });
    }
  },
  methods: {
    ...mapActions(["loadMenuById", "createMenu", "getFileById"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
