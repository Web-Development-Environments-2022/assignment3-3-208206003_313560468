<template>
  <div class="container">
    <div>
      <h1 class="title">Family Page</h1>
      <RecipePreviewList
        :inRecipes="familyRecipes"
        :family_recipes="true"
        :random="false"
        class="center"
      />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      familyRecipes: undefined,
    };
  },
  async created() {
    try {
      if (sessionStorage.getItem("familyRecipes") != undefined) {
        this.familyRecipes = JSON.parse(
          sessionStorage.getItem("familyRecipes")
        );
        for (let i = 0; i < this.familyRecipes.length; i++) {
          this.familyRecipes[i].image =
            this.$root.store.server_domain +
            "/recipes/download?image=" +
            this.familyRecipes[i].image;
          console.log("image changed" + i);
          for (let j = 0; j < this.familyRecipes[i].images.length; j++) {
            this.familyRecipes[i].images[j].src =
              this.$root.store.server_domain +
              "/recipes/download?image=" +
              this.familyRecipes[i].images[j].src;
          }
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
