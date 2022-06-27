<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-card-group deck style="text-align: center">
      <div v-for="r in recipes" :key="r.id">
        <RecipePreview
          class="recipePreview"
          :recipe="r"
          :user_recipe="user_recipes"
          :logged_in = "logged_in"
        />
      </div>
    </b-card-group>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    inRecipes: {
      type: Array,
      required: false,
    },
    random: {
      type: Boolean,
      required: true,
    },
    user_recipes: {
      type: Boolean,
      default: false,
    },
    logged_in:{
      type: Boolean,
      required: false,
      default:false,
    }
  },
  data() {
    return {
      recipes: [],
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      if(this.random) {
        // try{
        //   const randomResponse = await this.axios.get(this.$root.store.server_domain + "/recipes/random")
        //   this.recipes = randomResponse.data;
        // } catch (error) {
        //   console.log(error);
        // }
        this.recipes = [{
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            title: "Dandelion pesto",
            readyInMinutes: 45,
            servings: 4,
            image: "https://spoonacular.com/recipeImages/641227-556x370.jpg",
            id: 2,
            popularity: 15,
          },
          {
            vegetarian: false,
            vegan: false,
            glutenFree: true,
            title: "Homemade Broccoli Cheddar Soup",
            readyInMinutes: 45,
            servings: 4,
            image: "https://spoonacular.com/recipeImages/646930-556x370.jpg",
            id: 1,
            popularity: 20,
          },
          {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            title: "Tart Raspberry Sorbet with a Hint of Heat",
            readyInMinutes: 45,
            servings: 6,
            image: "https://spoonacular.com/recipeImages/716198-556x370.jpg",
            id: 716198,
            popularity: 35,
          },
        ];
      }
      else if (this.inRecipes != undefined) {
        this.recipes = this.inRecipes;
      }

    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
