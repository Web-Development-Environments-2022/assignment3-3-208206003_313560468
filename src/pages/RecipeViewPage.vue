<template>
  <div v-if="!recipe">
    <NotFoundPage></NotFoundPage>
  </div>
  <div class="container" v-else>

    <b-card-group deck style="text-align: center">
      <b-card :img-src="recipe.image" img-alt="Image" img-height="420" img-width="200" img-top tag="article" style="
        max-width: 65%;
        /* height: 33rem; */
        height: 15rem;
        background-image:url('https://static.vecteezy.com/system/resources/previews/002/677/456/large_2x/white-grey-cement-concrete-textured-background-soft-natural-wall-backdrop-for-aesthetic-creative-design-free-photo.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        font-family: Frank Ruhl Libre, Georgia;
        border-radius: 10px;
      " class="mb-4">
        <h1 style="font-size: 40px;  text-align: center;"> <strong> {{ recipe.title }}</strong></h1>
        <!-- <div class="mb-4" style="text-align: left;">
          <h1><strong style="font-size: 40px; padding-top: 0px;">{{ recipe.title }}</strong></h1> <br>
        </div> -->
      </b-card>
      <b-card style="
        max-width: 35%;
        /* height: 33rem; */
        max-height: 5rem;
        background-image: url('https://ae01.alicdn.com/kf/HTB1ZcZVaOnrK1RjSsziq6xptpXan/-.jpg_Q90.jpg_.webp');
        background-repeat: no-repeat;
        background-size: cover;
        
        font-family: Frank Ruhl Libre, Georgia;
        border-radius: 10px;
      " class="mb-4">

        <div class="mb-4" style="text-align: center; padding-left: 15px;">
          <b-row>
            <b-avatar id="vegetarian" v-if="recipe.vegetarian" variant="transparent"
              :src="require('@/assets/vegetarian.png')" size="7em" />
            <b-avatar id="vegan" v-if="recipe.vegan" variant="transparent" :src="require('@/assets/vegan.png')"
              size="7em" style="display:" />
            <b-avatar id="glutenFree" v-if="recipe.glutenFree" variant="transparent"
              :src="require('@/assets/glutenFree.png')" size="7em" />
          </b-row><br>
          <b-row>
            <b-avatar variant="transparent" :src="require('@/assets/servings.png')" size="7em" />

            <h1>{{ recipe.servings }} people</h1>
          </b-row>
          <br>
          <b-row>
            <b-avatar variant="transparent" :src="require('@/assets/time.png')" size="7em"></b-avatar>
            <h1>{{ recipe.readyInMinutes }} minutes</h1>
          </b-row><br>
          <b-row>
            <b-avatar variant="transparent" :src="require('@/assets/like.png')" size="7em"></b-avatar>
            <h1>{{ recipe.popularity }} likes</h1>
          </b-row>

        </div>
      </b-card>
    </b-card-group>

    <b-card-group deck style="text-align: center">
      <b-card style="background-image:url('https://media.gettyimages.com/photos/herbs-and-spices-over-black-stone-background-picture-id589135154?b=1&k=20&m=589135154&s=170667a&w=0&h=MuYiqZW2zMeoU_r7QN0u0c-FFQEWsW3WFfPL0dMibXs=');
        background-repeat: no-repeat; background-size: cover; 
        text-align: center; max-width: 35%; border-radius: 10px; padding-bottom: 20px;">
        <h1> Ingredients </h1>
        <b-card-text style="text-align: center;">
          <v-list-item-content> <strong id="List" v-for="r in recipe.ingredients" :key="r"
              style="display:list-item; color: white; text-align: left; padding-bottom: 7px;"> {{ r }} </strong>
          </v-list-item-content>

        </b-card-text>

        <a href="#" class="card-link">Check how it looks when done</a>
        <!-- <b-link href="#" class="card-link">Another link</b-link> -->
      </b-card>
      <b-card style="background-image: url('https://media.gettyimages.com/photos/herbs-and-spices-over-black-stone-background-picture-id589135154?b=1&k=20&m=589135154&s=170667a&w=0&h=MuYiqZW2zMeoU_r7QN0u0c-FFQEWsW3WFfPL0dMibXs=');background-repeat: no-repeat; background-size: cover;
        text-align: center;  max-width: 65%; border-radius: 10px;">
        <h1> Instructions </h1>
        <b-card-text style="text-align: center;">
          <strong style="color: white;"> {{ recipe.instructions }} </strong>
        </b-card-text>
        <a href="#" class="card-link">Check how it looks when done</a>
        <!-- <b-link href="#" class="card-link">Another link</b-link> -->
      </b-card>
    </b-card-group>
  </div>
</template> 


<script>
import NotFoundPage from './NotFoundPage.vue';

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
        "/recipes/details/" +
        this.$route.params.recipeId
      );
    } catch (error) {
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;
    }
    // try {
    //   let responseData = {
    //     instructions: "Asdasdasdasda",
    //     ingredients: ["put 1 salt", "put 2 hara", "add 3 cosemek", "yesh leha banana aba?"],
    //     popularity: 3,
    //     readyInMinutes: 40,
    //     image: "https://www.seriouseats.com/thmb/DeOzmC_A8yHIiCLo2KCcUfedwv4=/1500x844/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__03__20200224-carretteira-pasta-vicky-wasik-21-ffe68515b25f4b348cbde845a59d6a62.jpg",
    //     title: "ze shelanu aba",
    //     vegan: true,
    //     vegetarian: true,
    //     glutenFree: true,
    //     servings: 5

    //   };
    let { instructions, ingredients, popularity, readyInMinutes, image, title, vegan, vegetarian, glutenFree, servings } = response.data;
    let _recipe = {
      instructions,
      ingredients,
      popularity,
      readyInMinutes,
      image,
      title,
      vegan,
      vegetarian,
      glutenFree,
      servings
    };
    this.recipe = _recipe;
    if (!this.$route.params.user_recipe) {
      this.$root.store.addToUserLastWatched(this.recipe);
    }
  },
  components: { NotFoundPage }
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
  padding: 7px
}

h1 {
  padding-top: 25px;
  padding-left: 25px;
  color: rgb(248, 248, 217);
  font-family: Frank Ruhl Libre, Georgia;

}




/* .recipe-header{

} */
</style>
