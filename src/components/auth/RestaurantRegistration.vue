<template>
  <div>
    <h1>Restaurant Registration page</h1>
    <label for="login">Email </label>
    <input id="username" v-model="username" />
    <br />
    <br />
    <label for="password">Password </label>
    <input id="password" v-model="password" />
    <br />
    <br />
    <label for="restName">Restaurant Name </label>
    <input id="restName" v-model="restName" />
    <br />
    <br />
    <label for="restLocation">Restaurant Location </label>
    <input id="restLocation" v-model="restLocation" />
    <br />
    <br />
    <button @click="register">Register</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      restName: "",
      restLocation: "",
    };
  },
  methods: {
    register() {
      console.log("Registering restaurant " + this.restName);
      let username = this.username;
      let password = this.password;
      let restName = this.restName;
      let restLocation = this.restLocation;
      this.$store
        .dispatch("registerRestaurant", {
          username,
          password,
          restName,
          restLocation,
        })
        .then((response) => {
          this.$router.push({
            name: "restaurant-edit",
            params: { id: response.id },
          });
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
