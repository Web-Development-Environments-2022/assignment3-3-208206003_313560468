<template>
  <div>
    <RecipeView :recipe="recipe" :family_recipe="true" :key="imageLoad"></RecipeView>
  </div>
</template> 


<script>
import RecipeView from "../components/RecipeView.vue";

export default {
  data() {
    return {
      recipe: null,
      watchIngredients: false,
      imageLoad: false
    };
  },
  async created() {
    try {
      let response = await this.axios.get(
        this.$root.store.server_domain +
          "/recipes/family_recipe/" +
          this.$route.params.recipeId
      );
      let {
        instructions,
        ingredients,
        readyInMinutes,
        recipeOwner,
        images,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings,
        when,
      } = response.data;
      image =
        this.$root.store.server_domain + "/recipes/download?image=" + image;
      for (let i = 0; i < images.length; i++) {
        images[i].src =
          this.$root.store.server_domain +
          "/recipes/download?image=" +
          images[i].src;
      }
      let _recipe = {
        instructions,
        ingredients,
        readyInMinutes,
        recipeOwner,
        images,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
        servings,
        when,
      };
      this.recipe = _recipe;
      this.imageLoad = true;
    } catch (error) {
      console.log(error);
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;
    }
  },

  //     }
  //   }
  // },
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
