<template>
  <div>
    <RecipeView :recipe="recipe" :user_recipe="true"></RecipeView>
  </div>
</template> 


<script>
import RecipeView from "../components/RecipeView.vue";

export default {
  data() {
    return {
      recipe: null,
      watchIngredients: false,
    };
  },
  async created() {
    let response;
    try {
      response = await this.axios.get(
        this.$root.store.server_domain +
          "/users/my_recipe/" +
          this.$route.params.recipeId
      );
    } catch (error) {
      console.log(error);
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;
    }
    let {
      instructions,
      ingredients,
      readyInMinutes,
      image,
      title,
      vegan,
      vegetarian,
      glutenFree,
      servings,
    } = response.data;
    image = this.$root.store.server_domain + "/users/download?image=" + image;
    let _recipe = {
      instructions,
      ingredients,
      readyInMinutes,
      image,
      title,
      vegan,
      vegetarian,
      glutenFree,
      servings,
    };
    this.recipe = _recipe;
  },
  components: { RecipeView },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.wrapped {
  width: 50%;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.Cards {
  padding: 7px;
}

h1 {
  padding-top: 25px;
  padding-left: 25px;
  color: rgb(248, 248, 217);
  font-family: Frank Ruhl Libre, Georgia;
}
</style>
