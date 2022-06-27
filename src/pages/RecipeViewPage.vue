<template>
  <div class="container" > 
    <b-card
      v-if="recipe"
      :img-src="recipe.image"
      img-alt="Image"
      img-height="350"
      img-width="200"
      img-top
      tag="article"
      style="
        max-width: 65%;
        /* height: 33rem; */
        max-height: 35rem;
        
        font-family: Frank Ruhl Libre, Georgia;
        border-radius: 10px;
      "
      class="mb-4"
    >
    
      <div class="mb-4" style="text-align: center;">
        <strong style="font-size: 30px">{{ recipe.title }}</strong> <br>
        <b-avatar
          variant="light"
          src="https://www.pngall.com/wp-content/uploads/8/Vegan-Transparent.png"
          size="3.5em"
          style="display: "
        ></b-avatar>
        <b-avatar
          variant="light"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM01sSL71L6crZ2k__oG2cKWGzov4-vYS2xwmG6SvYC05zJaum0OarEV2oG0w2T_BqhcQ&usqp=CAU"
          size="3.8em"
        ></b-avatar>
        <slot></slot>
        <b-avatar
          variant="light"
          src="https://static.wixstatic.com/media/179523_cbcc13ff55ac449c84c366db1f767fd9~mv2.png/v1/fill/w_300,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/1772008_1.png"
          size="4em"
        ></b-avatar>
        
      </div>
    </b-card>
  
      <!-- <div> -->

            <!-- <b-card 
              v-if="recipe"
              
              img-src="https://www.foodsourceinc.com/wp-content/themes/foodsource/images/heading-ingredients.png"
              :title="recipe.title"
              img-alt="Image"
              img-top
              tag="article"
              style="
                max-width: 40%;
                /* height: 33rem; */
                font-family: Frank Ruhl Libre, Georgia;
                border-radius: 10px;
              "
              class="mb-4"
            >
              <strong
                v-for="r in recipe.ingredients"
                :key="r"
                style="display: list-item"
                >{{ r }}</strong
              > 
              
            </b-card> -->
            <!-- <b-card
              img-src="data:image/jpeg;base64,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"
              title=<strong> </strong>"Ingredients" 
              img-alt="Image"
              img-top
              tag="article"
              style="
                max-width: 50%;
                /* height: 33rem; */
                font-family: Frank Ruhl Libre, Georgia;
                border-radius: 10px;
              "
              class="mb-4"
            >
              <strong
                v-for="r in recipe.ingredients"
                :key="r"
                style="display: list-item"
                >{{ r }}</strong
              > 


            </b-card>
           
      </div> -->
        <div class="Cards">
      <b-card  title="Ingredients" sub-title="All you need is :" style="background-image: url('//www.myalbum.co.il/wp-content/uploads/2019/03/%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99%D7%9D.jpg');text-align: center;">
     
    <b-card-text style="text-align: center;" >
      <strong
                v-for="r in recipe.ingredients"
                :key="r"
                style="display: list-item"
                >{{ r }}
               </strong>
    </b-card-text>

    <a href="#" class="card-link">Check how it looks when done</a>
    <!-- <b-link href="#" class="card-link">Another link</b-link> -->
  </b-card> 
  <br><br><br>
</div>
      <div class="Cards">
      <b-card title="Instructions" sub-title="Le'ts Start" style="background-image: url('//www.myalbum.co.il/wp-content/uploads/2019/03/%D7%9E%D7%AA%D7%9B%D7%95%D7%A0%D7%99%D7%9D.jpg');text-align: center;" >
    <b-card-text style="text-align: center;" >
      <strong> {{recipe.instructions}} </strong>
               
    </b-card-text>

    <a href="#" class="card-link">Check how it looks when done</a>
    <!-- <b-link href="#" class="card-link">Another link</b-link> -->
  </b-card>
</div>
    
    
    
  </div>
</template> 


<script>

export default {
  data() {
    return {
      recipe: null,
      watchIngredients : false,
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
    try{
      let responseData = {
        instructions:"Asdasdasdasda",
        ingredients: ["put 1 salt","put 2 hara","add 3 cosemek","yesh leha banana aba?"],
        popularity: 3,
        readyInMinutes:40,
        image:"https://spoonacular.com/recipeImages/1-556x370.jpg",
        title:"ze shelanu aba",
        vegan: true,
        vegererain: true,
        glutenFree:true,
      };
      let {
        instructions,
        ingredients,
        popularity,
        readyInMinutes,
        image,
        title,
        vegan,
        vegetarian,
        glutenFree,
      } = responseData;

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
      };

      this.recipe = _recipe;
      if (!this.$route.params.user_recipe) {
        this.$root.store.addToUserLastWatched(this.recipe);
      }
    } catch (error) {
      console.log(error);
    }
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
.Cards{
  padding:7px
}
/* .recipe-header{

} */
</style>
