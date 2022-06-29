<template>
  <div class="container">
    <div class="neon-text">Liroey Recipes</div>
    <div>
      <RecipePreviewList
        :random="true"
        :key="rerender"
        :logged_in = "Boolean($root.store.username)"
        class="RandomRecipes center"
      />
      <div style="text-align: center; margin-top: 30px">
        <b-avatar
          button
          @click="randomRecipes"
          variant="tranparent"
          :src="require('@/assets/shuffle.png')"
          size="5em"
          style="text-align: center"
        ></b-avatar>
      </div>
    </div>
    <h1> Last Viewed Recipes:</h1>

    <div v-if="!$root.store.username" id="membershipRequest" style="text-align: left; margin-right: 50%;" >
      <h3> Only members can see that</h3>
      <b-button  style="max-width: 100px; background-color: blue;">
        <router-link to="login" style="color: white;"> Login</router-link>
      </b-button>
      <b-button  style="max-width: 100px; background-color: green;">
        <router-link to="register" style="color: white; "> Join us !</router-link>
      </b-button>
    
    </div>
    

    <RecipePreviewList
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true,
      }"
      :random="!lastWatched"
      :inRecipes="lastWatched"
      :logged_in = "false"
      disabled
    ></RecipePreviewList>
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
      lastWatched: undefined,
      rerender: false,
    };
  },
  methods: {
    randomRecipes() {
      if (this.rerender) {
        this.rerender = false;
      } else {
        this.rerender = true;
      }
    },
  },
  created() {
    try {
      if (JSON.parse(localStorage.getItem("userLastWatched")) != undefined) {
        this.lastWatched = JSON.parse(localStorage.getItem("userLastWatched"));
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.twelve h1 {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  margin: auto;
  white-space: nowrap;
  padding-bottom: 13px;
}

$extra-large: 110px;
$large: 84px;
$title: #a0721c;

.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.neon-text {
  text-align: center;
  $random-text: "underlying wire";
  position: relative;
  $stroke-width: $extra-large * 0.05;
  font-family: "Pacifico", cursive;
  text-transform: uppercase;
  font-size: $extra-large;
  color: lighten($title, 25%);
  -webkit-text-stroke-width: $stroke-width;
  -webkit-text-stroke-color: lighten($title, 2%);
  // @include center;
  text-shadow: 0 0 40px lighten($title, 2%), 0 0 40px lighten($title, 2%),
    0 0 40px lighten($title, 2%);
  &:after {
    content: $random-text;
    z-index: -1;
    position: absolute;
    color: transparent;
    -webkit-text-stroke-width: $stroke-width;
    -webkit-text-stroke-color: darken($title, 40%);
    top: -5%;
    left: -0.5%;
  }
}
header {
  border: 3px solid;
  // height: 300px;
  position: relative;
}

header:before {
  content: "Header";
  position: absolute;
  top: -10px;
  left: 50px;
  background: #fff;
  padding: 0 20px;
}
h3{
  font-size: 20px;
  font-family: 'Courier New', Courier, monospace;
  font-style:italic;
  font-weight: bolder;
}
</style>
