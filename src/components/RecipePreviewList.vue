<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-card-group>
      <div v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </div>
    </b-card-group>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      // console.log(localStorage.getItem("userLastWatched"));
      if (this.message === "last_watched" && localStorage.getItem("userLastWatched") != undefined) {
        // console.log(localStorage.getItem("userLastWatched"));
        this.recipes = JSON.parse(localStorage.getItem("userLastWatched"));
        // console.log(this.recipes)
      } else if (this.message === "favorites" && localStorage.getItem("userFavoriteRecipes") != undefined) {
        this.recipes = JSON.parse(localStorage.getItem("userFavoriteRecipes"));
      } else {
        // try {
        //   const response = await this.axios.get(
        //     "http://localhost:3000/recipes/random"
        //   );


        //   const recipes = response.data;
        //   console.log(recipes[0]);
        //   this.recipes = [];
        //   this.recipes.push(...recipes);
        //   // console.log(this.recipes);
        // } catch (error) {
        //   console.log(error);
        // }
        this.recipes = []
        let recipe1 = { title: 'title', id: 1, image: "https://www.bishulim.co.il/%D7%9E%D7%AA%D7%9B%D7%95%D7%9F/%D7%A7%D7%95%D7%A1%D7%A7%D7%95%D7%A1-%D7%99%D7%A8%D7%A7%D7%95%D7%AA-%D7%98%D7%A2%D7%99%D7%9D-%D7%95%D7%91%D7%A8%D7%99%D7%90", readyInMinutes: 11, aggregateLikes: 20, vegetarain: false, glutenFree: false };
        let recipe2 = { title: 'title', id: 2, image: "https://www.bishulim.co.il/%D7%9E%D7%AA%D7%9B%D7%95%D7%9F/%D7%A7%D7%95%D7%A1%D7%A7%D7%95%D7%A1-%D7%99%D7%A8%D7%A7%D7%95%D7%AA-%D7%98%D7%A2%D7%99%D7%9D-%D7%95%D7%91%D7%A8%D7%99%D7%90", readyInMinutes: 11, aggregateLikes: 20, vegetarain: false, glutenFree: false };
        let recipe3 = { title: 'title', id: 3, image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.bishuli.co.il%2Fwp-content%2Fuploads%2F2013%2F05%2FCouscous.jpg&imgrefurl=https%3A%2F%2Fwww.bishuli.co.il%2F2013%2F05%2F28%2F%25D7%25A7%25D7%2595%25D7%25A1%25D7%25A7%25D7%2595%25D7%25A1%2F&tbnid=aoR-VSTMO9gKxM&vet=12ahUKEwj8r8-Tu8P4AhVJlxoKHfOwAKoQMygBegUIARDTAQ..i&docid=bUi-2hu_24YSqM&w=1080&h=817&q=%D7%A7%D7%95%D7%A1%D7%A7%D7%95%D7%A1&ved=2ahUKEwj8r8-Tu8P4AhVJlxoKHfOwAKoQMygBegUIARDTAQ", readyInMinutes: 11, aggregateLikes: 20, vegetarain: false, glutenFree: false };
        this.recipes.push(recipe1);
        this.recipes.push(recipe2);
        this.recipes.push(recipe3);
      }
    }

  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
