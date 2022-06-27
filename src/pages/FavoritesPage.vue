<template>
  <div class="container">
    <div v-if="!$root.store.username">
      <NotFound></NotFound>
    </div>

    <div v-else>
      <h1 class="title">Favorites Page</h1>
      <RecipePreviewList
        title="Favourites Recipes"
        :inRecipes="favoriteRecipes"
        :random="false"
        :logged_in = "Boolean($root.store.username)"
        class="center"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import NotFound from "../pages/NotFoundPage";
export default {
  components: {
    RecipePreviewList,
    NotFound,
  },
  data() {
    return {
      favoriteRecipes: undefined,
    };
  },
  created() {
    try {
      if (localStorage.getItem("userFavoriteRecipes") != undefined) {
        this.favoriteRecipes = JSON.parse(localStorage.getItem("userFavoriteRecipes"));
      }
      console.log(this.favoriteRecipes)
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<!-- <style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px);
  /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style> -->