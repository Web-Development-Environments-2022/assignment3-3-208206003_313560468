<template>
  <div id="nav">
    <!-- The navigation bar when a user is logged in -->
    <div v-if="$root.store.username" id="Loggednav">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">
              <router-link :to="{ name: 'main' }">
                <h2>Main</h2>
              </router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link :to="{ name: 'search' }">
                <h2>Search</h2>
              </router-link>
            </b-nav-item>

            <b-nav-item href="#">
              <router-link :to="{ name: 'about' }">
                <h2>About Us</h2>
              </router-link>
            </b-nav-item>
            <b-nav-item id="createRecipe" v-b-modal.modal-prevent-closing>
              <h2>Create Recipe</h2>
            </b-nav-item>

            <AddRecipeModal />

            <b-nav-item-dropdown
              type="dark"
              variant="dark"
              text="Personal"
              left
            >
              <b-dropdown-item href="#" id="Favourites">
                <router-link :to="{ name: 'favorites' }">
                  <h3>My favourites</h3>
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <router-link :to="{ name: 'user_recipes' }">
                  <h3>My recipes</h3>
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <router-link :to="{ name: 'family_recipes' }">
                  <h3>My family recipes</h3>
                </router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item id="hellowUser">
              <h2>Hellow {{ $root.store.username }}</h2>
            </b-nav-item>
            <b-nav-item id="hellowUser" @click="Logout">
              <h2>Logout</h2>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- The nevigation bar when no user is logged in -->
    <div v-else>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">
              <router-link :to="{ name: 'main' }">
                <h2>Main</h2>
              </router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link :to="{ name: 'search' }">
                <h2>Search</h2>
              </router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <!-- Add route to About page -->
              <router-link :to="{ name: 'about' }">
                <h2>About Us</h2>
              </router-link>
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item id="hellowGuest">
              <h2>Hellow Guest</h2>
            </b-nav-item>
            <b-nav-item href="#" id="register">
              <router-link :to="{ name: 'register' }">
                <h2>Register</h2>
              </router-link>
            </b-nav-item>
            <b-nav-item href="#" id="login">
              <router-link :to="{ name: 'login' }">
                <h2>Login</h2>
              </router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
// import { title } from "process";
import AddRecipeModal from "../components/AddRecipeModal";

export default {
  components: {
    AddRecipeModal,
  },
  props: {
    logout: { type: Function },
  },
  methods: {
    Logout() {
      this.logout();
    },
  },
};
</script>

<style scoped>
#hellowGuest {
  font-size: large;
  font-family: Frank Ruhl Libre, Georgia;
}

h2 {
  color: white;
  font-size: 20px;
  font-family: Frank Ruhl Libre, Georgia;
}

::v-deep .dropdown .nav-link {
  color: white !important;
  font-size: 18px;
  font-family: Frank Ruhl Libre, Georgia;
}

h3 {
  font-size: 20px;
  font-family: Frank Ruhl Libre, Georgia;
}

/* /deep/ .my-class {
  background: black;
  color: white;
}

/deep/ .my-second-class > .modal-dialog > .modal-content > .modal-header {
  background: black;
  color: white;
} */
/* img {
    background: transparent 0% 0% no-repeat padding-box;
    opacity: 1;
    width: 31px;
    height: 24px;
    margin-top: -12px;
} */
</style>
