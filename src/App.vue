<template>
  <div id="app">
      <NavBar :logout="Logout"></NavBar>
      <router-view />
    </div>
</template>



<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  },
  components: { NavBar }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-image: url("https://ae01.alicdn.com/kf/HTB1P5olXUT1gK0jSZFrq6ANCXXaw/-.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
