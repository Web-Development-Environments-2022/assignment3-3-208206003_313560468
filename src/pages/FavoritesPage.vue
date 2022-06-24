<template>
    <div class="container">
        <div v-if="!$root.store.username">
            <NotFound ></NotFound>
        </div>
    
        <div v-else>
            <h1 class="title"> Favorites Page</h1>
            <RecipePreviewList title="Favourites Recipes" message="favorites" class="RandomRecipes center" />
        </div>
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import NotFound from "../pages/NotFoundPage";
export default {
    components: {
        RecipePreviewList,
        NotFound
    }
};
</script>

<style lang="scss" scoped>
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
</style>