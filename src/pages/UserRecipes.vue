<template>
  <div class="container">
    <div v-if="!$root.store.username">
      <NotFound></NotFound>
    </div>

    <div v-else>
      <h1 class="title">My Recipes Page</h1>
      <RecipePreviewList
        :inRecipes="userRecipes"
        :random="false"
        :logged_in = "Boolean($root.store.username)"
        class="center"
        :user_recipes="true"
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
      userRecipes: undefined,
    };
  },
  async created() {
    try {
      if (localStorage.getItem("userRecipes") != undefined) {
        this.userRecipes = JSON.parse(localStorage.getItem("userRecipes"));
        for(let i = 0; i < this.userRecipes.length; i++) {
            // console.log(this.userRecipes[i].image);
            // const imageResponse = await this.axios.get(this.$root.store.server_domain + "/users/download", {
            //     params: {
            //         image: this.userRecipes[i].image
            //     }
            // })
            this.userRecipes[i].image = this.$root.store.server_domain + "/users/download?image=" + this.userRecipes[i].image;
        }
      }
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