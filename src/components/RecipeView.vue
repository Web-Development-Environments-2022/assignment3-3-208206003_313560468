<template>
  <div v-if="!recipe">
    <NotFoundPage></NotFoundPage>
  </div>
  <div class="container" v-else>
    <b-card-group deck style="text-align: center">
      <b-card
        :img-src="recipe.image"
        img-alt="Image"
        img-height="420"
        img-width="200"
        img-top
        tag="article"
        style="
          max-width: 65%;
          max-height: 45rem;
          background-image: url('https://static.vecteezy.com/system/resources/previews/002/677/456/large_2x/white-grey-cement-concrete-textured-background-soft-natural-wall-backdrop-for-aesthetic-creative-design-free-photo.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          font-family: Frank Ruhl Libre, Georgia;
          border-radius: 10px;
        "
        class="mb-4"
      >
        <h1 style="font-size: 40px; text-align: center">
          <strong> {{ recipe.title }}</strong>
        </h1>
      </b-card>
      <b-card
        style="
          max-width: 35%;
          max-height: 45rem;
          background-image: url('https://ae01.alicdn.com/kf/HTB1ZcZVaOnrK1RjSsziq6xptpXan/-.jpg_Q90.jpg_.webp');
          background-repeat: no-repeat;
          background-size: cover;

          font-family: Frank Ruhl Libre, Georgia;
          border-radius: 10px;
        "
        class="mb-4"
      >
        <div class="mb-4" style="text-align: center; padding-left: 15px">
          <b-row>
            <b-avatar
              id="vegetarian"
              v-if="recipe.vegetarian"
              variant="transparent"
              :src="require('@/assets/vegetarian.png')"
              size="7em"
            />
            <b-avatar
              id="vegan"
              v-if="recipe.vegan"
              variant="transparent"
              :src="require('@/assets/vegan.png')"
              size="7em"
              style="display: "
            />
            <b-avatar
              id="glutenFree"
              v-if="recipe.glutenFree"
              variant="transparent"
              :src="require('@/assets/glutenFree.png')"
              size="7em"
            /> </b-row
          ><br />
          <b-row>
            <b-avatar
              variant="transparent"
              :src="require('@/assets/servings.png')"
              size="7em"
            />

            <h1>{{ recipe.servings }} people</h1>
          </b-row>
          <br />
          <b-row>
            <b-avatar
              variant="transparent"
              :src="require('@/assets/time.png')"
              size="7em"
            ></b-avatar>
            <h1>{{ recipe.readyInMinutes }} minutes</h1> </b-row
          ><br />
          <b-row v-if="!user_recipe">
            <b-avatar
              variant="transparent"
              :src="require('@/assets/like.png')"
              size="7em"
            ></b-avatar>
            <h1>{{ recipe.popularity }} likes</h1>
          </b-row>
          <div>
            <b-button
              v-if="logged_in && !recipe.favorite && !user_recipe"
              @click="addToFavorites"
              :key="favorite"
              style="
                text-decoration: none;
                position: relative;
                border-radius: 30px;
              "
              variant="danger"
            >
              Add to favorites
            </b-button>
          </div>
        </div>
      </b-card>
    </b-card-group>

    <b-card-group deck style="text-align: center">
      <b-card
        style="
          background-image: url('https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-black-vintage-ingredients-hot-pot-psd-layered-main-picture-image_181628.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          text-align: center;
          max-width: 35%;
          border-radius: 10px;
          padding-bottom: 20px;
        "
      >
        <h1>Ingredients</h1>
        <b-card-text style="text-align: center">
          <strong
            id="List"
            v-for="r in recipe.ingredients"
            :key="r"
            style="
              display: list-item;
              color: white;
              text-align: left;
              padding-bottom: 7px;
            "
          >
            {{ r }}
          </strong>
        </b-card-text>

        <a href="#" class="card-link">Check how it looks when done</a>
      </b-card>
      <b-card
        style="
          background-image: url('https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-black-vintage-ingredients-hot-pot-psd-layered-main-picture-image_181628.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          text-align: center;
          max-width: 65%;
          border-radius: 10px;
        "
      >
        <h1>Instructions</h1>
        <v-list-item-content>
          <b-card-text style="text-align: center">
            <strong
              v-for="instruction in recipe.instructions"
              :key="instruction"
              style="
                display: list-item;
                color: white;
                text-align: left;
                padding-bottom: 7px;
              "
            >
              {{ instruction }}
            </strong>
          </b-card-text>
        </v-list-item-content>
        <a href="#" class="card-link">Check how it looks when done</a>
        <!-- <b-link href="#" class="card-link">Another link</b-link> -->
      </b-card>
    </b-card-group>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      favorite: undefined,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    user_recipe: {
      type: Boolean,
      required: false,
      default: false,
    },
    logged_in: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  created() {
    console.log(this.recipe);
  },
  // created() {
  //   if (!this.user_recipe && localStorage.getItem("userFavoriteRecipes")) {
  //     let favorites = JSON.parse(localStorage.getItem("userFavoriteRecipes"));
  //     for (let i = 0; i < favorites.length; i++) {
  //       if (favorites[i].id === this.recipe.id) {
  //         this.favorite = true;
  //       }
  //     }
  //   }
  // },
  methods: {
    async addToFavorites() {
      this.recipe.favorite = true;
      this.favorite = true;
      await this.$root.store.addToUserFavorite(this.recipe);
    },
  },
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


