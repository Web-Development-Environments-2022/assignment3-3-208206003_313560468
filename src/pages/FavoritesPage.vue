<template>
  <div class="container">
    <div v-if="!$root.store.username">
      <NotFound></NotFound>
    </div>

    <div v-else-if="favoriteRecipes">
      <h1 class="title">Favorites Page</h1>
      <RecipePreviewList
        :inRecipes="favoriteRecipes"
        :random="false"
        :logged_in = "Boolean($root.store.username)"
        class="center"
      />
    </div>
    <div v-else>
      <h1 id="NotFound">You havn't added anything yet!</h1>
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

<style>
#NotFound {
  padding-top: 50px;
  font-size: 120px;
  text-align: center;
  color: rgb(248, 248, 217);
  font-family: Frank Ruhl Libre, Georgia;
}
</style>