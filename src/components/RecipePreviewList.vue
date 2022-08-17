<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-card-group deck style="text-align: center">
      <div v-for="r in recipes" :key="r.id">
        <RecipePreview title="" class="recipePreview" :recipe="r" :user_recipe="user_recipes" :family_recipe="family_recipes" :logged_in="logged_in" />
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
      required: false,
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
    family_recipes: {
      type: Boolean,
      default: false,
    },
    logged_in: {
      type: Boolean,
      required: false,
      default: false,
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
      if (this.random) {
        try {
          const randomResponse = await this.axios.get(this.$root.store.server_domain + "/recipes/random")
          this.recipes = randomResponse.data;
        } catch (error) {
          console.log(error);
        }

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
