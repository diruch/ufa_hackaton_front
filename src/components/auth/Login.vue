<template>
  <div>
    <h1>Login page</h1>
    <label for="login">Username </label>
    <input id="username" v-model="username" />
    <br />
    <br />
    <label for="password">Password </label>
    <input id="password" v-model="password" />
    <br />
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("Logging in... " + this.username + " " + this.password);
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', { username, password} )
        .then(() => this.$router.push('/'))
        .catch((e) => console.log(e));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
