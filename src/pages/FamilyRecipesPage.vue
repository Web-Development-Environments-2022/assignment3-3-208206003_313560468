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
  created() {
    try {
      if (localStorage.getItem("familyRecipes") != undefined) {
        this.familyRecipes = JSON.parse(localStorage.getItem("familyRecipes"));
        console.log(this.familyRecipes);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
