<template>
  <div v-if="!recipe">
    <NotFoundPage></NotFoundPage>
  </div>
  <div class="container" v-else>

    <b-card-group deck style="text-align: center">
      <b-card :img-src="recipe.image" img-alt="Image" img-width="200" img-top tag="article" style="
        max-width: 65%;
        /* height: 33rem; */
        height: 15rem;
        
        font-family: Frank Ruhl Libre, Georgia;
        border-radius: 10px;
      " class="mb-4">

        <div class="mb-4" style="text-align: center;">
          <strong style="font-size: 30px">{{ recipe.title }}</strong> <br>
        </div>
      </b-card>
      <b-card style="
        max-width: 35%;
        /* height: 33rem; */
        max-height: 5rem;
        background-image: url('https://i.pinimg.com/originals/a3/39/55/a33955a3b991d0765b4a734cd9f99019.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        
        font-family: Frank Ruhl Libre, Georgia;
        border-radius: 10px;
      " class="mb-4">

        <div class="mb-4" style="text-align: center; padding-left: 15px;">
          <b-row>
            
            <b-avatar id="vegan" v-if="recipe.vegan" variant="transparent" 
              src="https://www.pngall.com/wp-content/uploads/8/Vegan-Transparent.png" size="7em" style="display:" />
            <b-avatar  id="vegetarian" v-if="recipe.vegetarian" variant="transparent"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM01sSL71L6crZ2k__oG2cKWGzov4-vYS2xwmG6SvYC05zJaum0OarEV2oG0w2T_BqhcQ&usqp=CAU"
              size="7em" />
            <b-avatar id="glutenFree" v-if="recipe.glutenFree" variant="transparent"
              src="https://static.wixstatic.com/media/179523_cbcc13ff55ac449c84c366db1f767fd9~mv2.png/v1/fill/w_300,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/1772008_1.png"
              size="7em" />
          </b-row><br>
          <b-row>
            <b-avatar variant="transparent" src="https://cdn-icons-png.flaticon.com/512/1046/1046874.png" size="7em" />
          
            <h1>{{ recipe.servings }} people</h1>
          </b-row>
          <br>
          <b-row>
            <b-avatar variant="transparent"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfF0qGfmgFsf0E2ycAhkP6gcuZ05AAutJUzw&usqp=CAU"
              size="7em"></b-avatar>
            <h1>{{ recipe.readyInMinutes }} minutes</h1>
          </b-row><br>
          <b-row>
            <b-avatar variant="transparent"
              src="https://banner2.cleanpng.com/20180616/ccf/kisspng-thumb-signal-computer-icons-like-icon-5b24ba2679a3b8.7819004915291336064983.jpg"
              size="7em"></b-avatar>
            <h1>{{ recipe.popularity }} likes</h1>
          </b-row>

        </div>
      </b-card>
    </b-card-group>

    <div class="Cards">
      <b-card title="Ingredients" sub-title="All you need is :"
        style="background-image: url('//www.myalbum.co.il/wp-content/uploads/2019/03/%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99%D7%9D.jpg');text-align: center;">

        <b-card-text style="text-align: center;">
          <strong v-for="r in recipe.ingredients" :key="r" style="display: list-item">{{ r }}
          </strong>
        </b-card-text>

        <a href="#" class="card-link">Check how it looks when done</a>
        <!-- <b-link href="#" class="card-link">Another link</b-link> -->
      </b-card>
      <br><br><br>
    </div>
    <div class="Cards">
      <b-card title="Instructions" sub-title="Le'ts Start"
        style="background-image: url('//www.myalbum.co.il/wp-content/uploads/2019/03/%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99%D7%9D.jpg');text-align: center;">
        <b-card-text style="text-align: center;">
          <strong> {{ recipe.instructions }} </strong>

        </b-card-text>

        <a href="#" class="card-link">Check how it looks when done</a>
        <!-- <b-link href="#" class="card-link">Another link</b-link> -->
      </b-card>
    </div>



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
    console.log(this.$route.params.user_recipe);
    // try {
    //   let response;
    //   // response = this.$route.params.response;
    //   if (!this.$route.params.user_recipe) {
    //     try {
    //       response = await this.axios.get(
    //         this.$root.store.server_domain +
    //           "/recipes/details/" +
    //           this.$route.params.recipeId
    //       );
    //       // console.log("response.status", response.status);
    //       if (response.status !== 200) this.$router.replace("/NotFound");
    //     } catch (error) {
    //       console.log("error.response.status", error.response.status);
    //       this.$router.replace("/NotFound");
    //       return;
    //     }
    //   } else {
    //     try {
    //       response = await this.axios.get(
    //         this.$root.store.server_domain +
    //           "/users/my_recipe/" +
    //           this.$route.params.recipeId
    //       );
    //       // console.log("response.status", response.status);
    //       if (response.status !== 200) this.$router.replace("/NotFound");
    //     } catch (error) {
    //       console.log("error.response.status", error.response.status);
    //       this.$router.replace("/NotFound");
    //       return;
    //     }
    //   }
    try {
      let responseData = {
        instructions: "Asdasdasdasda",
        ingredients: ["put 1 salt", "put 2 hara", "add 3 cosemek", "yesh leha banana aba?"],
        popularity: 3,
        readyInMinutes: 40,
        image: "https://spoonacular.com/recipeImages/1-556x370.jpg",
        title: "ze shelanu aba",
        vegan: true,
        vegetarian: true,
        glutenFree: true,
        servings: 5

      };
      let { instructions, ingredients, popularity, readyInMinutes, image, title, vegan, vegetarian, glutenFree, servings } = responseData;
      // let _instructions = analyzedInstructions
      //   .map((fstep) => {
      //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
      //     return fstep.steps;
      //   })
      //   .reduce((a, b) => [...a, ...b], []);
      // if (this.$route.params.user_recipe) {
      //   image =
      //     this.$root.store.server_domain + "/users/download?image=" + image;
      // }
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
    }
    catch (error) {
      console.log(error);
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
}

/* .recipe-header{

} */
</style>
