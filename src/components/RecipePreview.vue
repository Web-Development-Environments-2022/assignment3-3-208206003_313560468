<template>
  <div>
    <router-link
      style="text-decoration: none; color: inherit"
      :to="{
        name: user_recipe
          ? 'my_recipe'
          : family_recipe
          ? 'family_recipe'
          : 'recipe',
        params: {
          recipeId: recipe.id,
          user_recipe: user_recipe,
          family_recipe: family_recipe,
        },
      }"
      class="recipe-preview"
      v-b-hover="handleHovered"
    >
      <div>
        <b-card
          :img-src="recipe.image"
          :title="recipe.title"
          img-alt="Image"
          img-top
          tag="article"
          style="
            max-width: 20rem;
            height: 33rem;
            font-family: Frank Ruhl Libre, Georgia;
            border-radius: 10px;
          "
          class="mb-4"
        >
          <div class="mb-4">
            <b-avatar
              variant="transparent"
              src="https://www.pngall.com/wp-content/uploads/8/Vegan-Transparent.png"
              size="3.5em"
              style="display: "
            ></b-avatar>
            <b-avatar
              v-if="recipe.vegetarian"
              variant="transparent"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM01sSL71L6crZ2k__oG2cKWGzov4-vYS2xwmG6SvYC05zJaum0OarEV2oG0w2T_BqhcQ&usqp=CAU"
              size="3.8em"
            ></b-avatar>
            <slot></slot>
            <b-avatar
              v-if="recipe.glutenFree"
              variant="transparent"
              src="https://static.wixstatic.com/media/179523_cbcc13ff55ac449c84c366db1f767fd9~mv2.png/v1/fill/w_300,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/1772008_1.png"
              size="4em"
            ></b-avatar>
          </div>
          <div class="mb-4">
            <b-avatar
              variant="transparent"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfF0qGfmgFsf0E2ycAhkP6gcuZ05AAutJUzw&usqp=CAU"
              size="2em"
            ></b-avatar>
            {{ recipe.readyInMinutes }} minutes
            <b-avatar
              variant="transparent"
              src="https://cdn-icons-png.flaticon.com/512/1046/1046874.png"
              size="2em"
            >
            </b-avatar>
            {{ recipe.servings }} people <br /><br />
            <div v-if="!user_recipe && !family_recipe">
              <b-avatar
                variant="transparent"
                src="https://banner2.cleanpng.com/20180616/ccf/kisspng-thumb-signal-computer-icons-like-icon-5b24ba2679a3b8.7819004915291336064983.jpg"
                size="2em"
              ></b-avatar>
              {{ recipe.popularity }} likes
            </div>
            <b-avatar
              v-if="watched"
              variant="transparent"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mIy8PoSlI5ATokKUgHZVXKVF9GTTgg7vCw&usqp=CAU"
              size="2em"
              style="margin-left: auto"
            ></b-avatar>
            <br />
            <div v-if="family_recipe">
              Its {{ recipe.recipeOwner }} special Recipe
            </div>
          </div>
        </b-card>
      </div>
    </router-link>
    <div>
      <b-button
        v-if="logged_in && !favorite && !user_recipe"
        :key="favorite"
        @click="addToFavorites"
        style="text-decoration: none; position: relative; border-radius: 30px"
        variant="danger"
      >
        Add to favorites
      </b-button>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
  },
  data() {
    return {
      image_load: false,
      hovered: false,
      favorite: undefined,
      watched: undefined,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    user_recipe: {
      type: Boolean,
      default: false,
    },
    family_recipe: {
      type: Boolean,
      default: false,
    },
    logged_in: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    handleHovered(hovered) {
      this.hovered = hovered;
    },
    async addToFavorites() {
      this.favorite = true;
      await this.$root.store.addToUserFavorite(this.recipe);
    },
  },
  created() {
    if (localStorage.getItem("userFavoriteRecipes")) {
      let favorites = JSON.parse(localStorage.getItem("userFavoriteRecipes"));
      for (let i = 0; i < favorites.length; i++) {
        if (favorites[i].id === this.recipe.id) {
          this.favorite = true;
          this.recipe.favorite = true;
          return;
        }
      }
    }
    if (localStorage.getItem("userLastWatched")) {
      let lastWatched = JSON.parse(localStorage.getItem("userLastWatched"));
      
      for (let i = 0; i < lastWatched.length; i++) {
        if (lastWatched[i].id === this.recipe.id) {
          
          this.watched = true;
          return;
        }
      }
    }
    this.watched = false;
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  display: list-ite;
  width: 100%;
  height: 90%;
  position: relative;
  margin: 10px 10px;
  transition: all 0.4s ease-in-out;
}

.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.recipe-preview:hover {
  transform: scale(1.2);
}
</style>
