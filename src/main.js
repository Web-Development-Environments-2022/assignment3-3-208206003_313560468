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
    this.username = username;
    console.log("login", this.username);
  },

  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("userFavoriteRecipes");
    localStorage.removeItem("userLastWatched");
    localStorage.removeItem("userRecipes");
    // localStorage.removeItem("userFavoriteRecipes");
    this.username = undefined;
  },

  async produceUserData() {
    await this.setUserFavorites();
    await this.setUserLastWatched();
    await this.setUserRecipes();
  },

  async setUserFavorites() {
    // try {
    //   const favoriteResponse = await axios.get(
    //     this.server_domain + "/users/favorites"
    //   );
    //   let favorites = favoriteResponse.data;
      try{
      let favorites= [{
        vegetarian: false,
        vegan: true,
        glutenFree: true,
        title: "Dandelion pesto",
        readyInMinutes: 45,
        servings: 4,
        image: "https://spoonacular.com/recipeImages/641227-556x370.jpg",
        id: 18,
        popularity: 15,
      },
      {
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        title: "Homemade Broccoli Cheddar Soup",
        readyInMinutes: 45,
        servings: 6,
        image: "https://spoonacular.com/recipeImages/646930-556x370.jpg",
        id: 100,
        popularity: 20,
      },
      {
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        title: "Tart Raspberry Sorbet with a Hint of Heat",
        readyInMinutes: 45,
        servings: 1,
        image: "https://spoonacular.com/recipeImages/716198-556x370.jpg",
        id: 14445,
        popularity: 35,
      },
    ];
      for (let i = 0; i < favorites.length; i++) {
        favorites[i].favorite = true;
      }
      console.log(favorites);
      localStorage.setItem(
        "userFavoriteRecipes",
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.log(error);
    }
  },

  async setUserLastWatched() {
    // try {
    //   const lastWatchedResponse = await axios.get(
    //     this.server_domain + "/users/last_watched"
    //   );
    try{
    let lastWatchedResponse= [{
      vegetarian: false,
      vegan: true,
      glutenFree: true,
      title: "Dandelion pesto",
      readyInMinutes: 45,
      servings: 4,
      image: "https://spoonacular.com/recipeImages/641227-556x370.jpg",
      id: 18,
      popularity: 15,
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: true,
      title: "Homemade Broccoli Cheddar Soup",
      readyInMinutes: 45,
      servings: 6,
      image: "https://spoonacular.com/recipeImages/646930-556x370.jpg",
      id: 100,
      popularity: 20,
    },
    {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      title: "Tart Raspberry Sorbet with a Hint of Heat",
      readyInMinutes: 45,
      servings: 1,
      image: "https://spoonacular.com/recipeImages/716198-556x370.jpg",
      id: 14445,
      popularity: 35,
    },
  ];
      localStorage.setItem(
        "userLastWatched",
        JSON.stringify(lastWatchedResponse.data.slice(0,3))
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
      console.log(userRecipesResponse.data);
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
    for(var i = 0;i<lastWatched.length;i++){
      if(recipe.id == lastWatched[i].id){
          return;
      }
    }
    lastWatched.unshift(recipe);
    localStorage.setItem("userLastWatched", JSON.stringify(lastWatched.slice(0,3)))
  },



  // updateLastSearch() {

  // }
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
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
  },
  render: (h) => h(App),
}).$mount("#app");
