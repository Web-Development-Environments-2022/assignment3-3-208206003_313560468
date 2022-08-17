import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
import state from "./store";
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

axios.defaults.withCredentials = true;

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  AvatarPlugin,
  VBHoverPlugin,
  InputGroupPlugin,
  ModalPlugin,
  FormFilePlugin,
  FormCheckboxPlugin,
  FormTextareaPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  AvatarPlugin,
  VBHoverPlugin,
  InputGroupPlugin,
  ModalPlugin,
  FormFilePlugin,
  FormCheckboxPlugin,
  FormTextareaPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  server_domain: state.server_domain,
  username: localStorage.username,
  lastSearch: localStorage.lastSearch,
  login(username) {
    localStorage.setItem("username", username);
    localStorage.setItem("loginTime", new Date().toString());
    this.username = username;
    console.log("login", this.username);
  },

  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("userFavoriteRecipes");
    localStorage.removeItem("userLastWatched");
    localStorage.removeItem("userRecipes");
    localStorage.removeItem("loginTime");
    this.username = undefined;
  },

  async produceUserData() {
    await this.setUserFavorites();
    await this.setUserLastWatched();
    await this.setUserRecipes();
  },

  async setUserFavorites() {
    try {
      const favoriteResponse = await axios.get(
        this.server_domain + "/users/favorites"
      );
      
      let favorites = favoriteResponse.data;
      for (let i = 0; i < favorites.length; i++) {
        favorites[i].favorite = true;
      }
      localStorage.setItem(
        "userFavoriteRecipes",
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.log(error);
    }
  },

  async setUserLastWatched() {
    try {
      const lastWatchedResponse = await axios.get(
        this.server_domain + "/users/last_watched"
      );
      localStorage.setItem(
        "userLastWatched",
        JSON.stringify(lastWatchedResponse.data.slice(0, 3))
      );
    } catch (error) {
      console.log(error);
    }
  },

  async setUserRecipes() {
    try {
      const userRecipesResponse = await axios.get(
        this.server_domain + "/users/my_recipes"
      );
      localStorage.setItem(
        "userRecipes",
        JSON.stringify(userRecipesResponse.data)
      );
    } catch (error) {
      console.log(error);
    }
  },


  async addToUserFavorite(recipe) {
    try {
      let favorites = [];
      if (localStorage.getItem("userFavoriteRecipes") != undefined) {
        favorites = JSON.parse(localStorage.getItem("userFavoriteRecipes"));
      }

      favorites.unshift(recipe);
      localStorage.setItem("userFavoriteRecipes", JSON.stringify(favorites));
      await axios.post(
        this.server_domain + "/users/favorites",
        {
          recipe_id: recipe.id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  addToUserLastWatched(recipe) {
    let lastWatched = [];
    if (localStorage.getItem("userLastWatched") != undefined) {
      lastWatched = JSON.parse(localStorage.getItem("userLastWatched"));
    }
    

    for (var i = 0; i < lastWatched.length; i++) {
      if (recipe.id === lastWatched[i].id) {
        return;
      }
    }
    lastWatched.unshift(recipe);
    localStorage.setItem("userLastWatched", JSON.stringify(lastWatched.slice(0, 3)))
  },
};
// Vue.prototype.$root.store = shared_data;
let loginTime = localStorage.getItem("loginTime");
if (loginTime != undefined) {
  let last = new Date(loginTime);
  let now = new Date();
  let diff = Math.floor(last - now);
  if(diff / (1000 * 60 * 60) > 12){
    shared_data.logout();
  }
}

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  async created() {
    await this.setFamilyRecipes();
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
    async setFamilyRecipes() {
      try {
        const response = await this.axios.get(
          this.store.server_domain + "/recipes/my_family_recipes"
        );
        sessionStorage.setItem("familyRecipes", JSON.stringify(response.data))
      } catch (err) {
        console.log(err);
      }
    }
  },
  render: (h) => h(App),
}).$mount("#app");
