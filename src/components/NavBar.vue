<template>
  <div id="nav">
    <!-- The navigation bar when a user is logged in -->
    <div v-if="$root.store.username" id="Loggednav" >
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">
              <router-link :to="{ name: 'main' }">Main</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link :to="{ name: 'search' }">Search</router-link>
            </b-nav-item>
            <!-- Add route to About page -->
            <b-nav-item href="#">
              <router-link :to="{ name: 'about' }">About Us</router-link>
            </b-nav-item>
            <b-nav-item id="createRecipe" v-b-modal.modal-prevent-closing>
              Create Recipe
            </b-nav-item>
            <b-modal
              modal-class="my-class"
              id="modal-prevent-closing"
              ref="modal"
              title="Create Recipe"
              @hidden="resetModal"
              @submit="handleSubmit"
              size="xl"
            >
              <b-form @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="Title:"
                  invalid-feedback="*"
                  :state="Boolean(form.title)"
                >
                  <b-form-input
                    :state="Boolean(form.title)"
                    id="name-input"
                    v-model="form.title"
                    required
                    placeholder="Title"
                    class="mb-2 mr-sm-2 mb-sm-0"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  label="Image:"
                  invalid-feedback="*"
                  :state="Boolean(form.image)"
                >
                  <b-form-file
                    :state="Boolean(form.image)"
                    id="image-input"
                    v-model="form.image"
                    placeholder="Choose a Image or drop it here..."
                    drop-placeholder="Drop Image here..."
                    accept="image/jpeg, image/png, image/jpg"
                    class="mb-2 mr-sm-2 mb-sm-0"
                  ></b-form-file>
                </b-form-group>
              </b-form>
              <b-form @submit.stop.prevent="handleSubmit" inline>
                <b-form-checkbox
                  id="vegan"
                  v-model="form.vegan"
                  name="vegan"
                  :value="true"
                  :unchecked-value="false"
                >
                  Vegan
                </b-form-checkbox>
                <b-form-checkbox
                  id="vegetarian"
                  v-model="form.vegetarian"
                  name="vegetarian"
                  :value="true"
                  :unchecked-value="false"
                >
                  Vegetarian
                </b-form-checkbox>
                <b-form-checkbox
                  id="glutenFree"
                  v-model="form.glutenFree"
                  name="glutenFree"
                  :value="true"
                  :unchecked-value="false"
                >
                  Gluten Free
                </b-form-checkbox>
                <b-form-group
                  invalid-feedback="*"
                  :state="Boolean(parseInt(form.readyInMinutes))"
                  label="Ready in minutes:"
                >
                  <b-form-input
                    :state="Boolean(parseInt(form.readyInMinutes))"
                    id="time-input"
                    v-model="form.readyInMinutes"
                    required
                    placeholder="Ready in minutes"
                    class="mb-2 mr-sm-2 mb-sm-0"
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  invalid-feedback="*"
                  :state="Boolean(parseInt(form.servings))"
                  label="Servings:"
                >
                  <b-form-input
                    :state="Boolean(parseInt(form.servings))"
                    id="servings-input"
                    v-model="form.servings"
                    required
                    placeholder="Servings"
                    class="mb-2 mr-sm-2 mb-sm-0"
                  ></b-form-input>
                </b-form-group>
              </b-form>
              <b-form @submit.stop.prevent="handleSubmit">
                <strong>Ingredients:</strong>
                <br /><br />
                <b-form-group
                  :state="Boolean(form.ingredients)"
                  v-for="ingredient in form.ingredients"
                  :key="ingredient.key"
                  invalid-feedback="*"
                >
                  <b-form-input
                    :state="Boolean(ingredient.value)"
                    v-model="ingredient.value"
                    required
                    placeholder="Ingredient"
                    class="mb-2 mr-sm-2 mb-sm-0"
                  ></b-form-input>
                </b-form-group>
                <br />
                <b-avatar
                  button
                  @click="addIngredient"
                  variant="info"
                  src="https://cdn4.iconfinder.com/data/icons/cooking-technique/32/Artboard_4-512.png"
                  size="5em"
                  style="text-align: center"
                ></b-avatar>
                <b-avatar
                  button
                  @click="removeIngredient"
                  variant="info"
                  src="https://cdn4.iconfinder.com/data/icons/cooking-technique/32/Artboard_4-512.png"
                  size="5em"
                  style="text-align: center"
                ></b-avatar>
                <br /><br />
                <strong>Instructions:</strong>
                <b-form-group
                  :state="Boolean(form.instructions)"
                  invalid-feedback="*"
                >
                  <b-form-textarea
                    :state="
                      Boolean(form.instructions.length <= 1000) &&
                      Boolean(form.instructions)
                    "
                    id="instructions"
                    v-model="form.instructions"
                    placeholder="Enter instructions..."
                    rows="6"
                    max-rows="8"
                    required
                  ></b-form-textarea>
                </b-form-group>
                <br /><br />
                <b-button
                  type="submit"
                  variant="primary"
                  style="width: 100px; display: block"
                  class="mx-auto w-100"
                  >Login</b-button
                >
              </b-form>
            </b-modal>
            <!-- Drop down for personal info -->
            <b-nav-item-dropdown text="Presonal" left>
              <b-dropdown-item href="#" id="Favourites">
                <router-link :to="{ name: 'favorites' }">
                  My favourites
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <router-link :to="{ name: 'user_recipes' }">
                  My recipes
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item href="#"> My family recipes </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item id="hellowUser">
              Hellow {{ $root.store.username }}
            </b-nav-item>
            <b-nav-item id="hellowUser" @click="Logout"> Logout </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- The nevigation bar when no user is logged in -->
    <div v-else>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">
              <router-link :to="{ name: 'main' }">Main</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <router-link :to="{ name: 'search' }">Search</router-link>
            </b-nav-item>
            <b-nav-item href="#">
              <!-- Add route to About page -->
              <router-link :to="{ name: 'about' }">About Us</router-link>
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <span v-if="!$root.store.username">
              <b-nav-item id="hellowGuest"> Hellow Guest </b-nav-item>
            </span>
            <span v-if="!$root.store.username">
              <b-nav-item href="#" id="register">
                <router-link :to="{ name: 'register' }">Register</router-link>
              </b-nav-item>
            </span>
            <span v-if="!$root.store.username">
              <b-nav-item href="#" id="login">
                <router-link :to="{ name: 'login' }">Login</router-link>
              </b-nav-item>
            </span>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
// import { title } from "process";

export default {
  data() {
    return {
      form: {
        title: undefined,
        image: undefined,
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        readyInMinutes: undefined,
        servings: undefined,
        ingredients: [{ value: undefined, key: 0 }],
        instructions: "",
      },
      ingredientCount: 1,
    };
  },
  props: {
    logout: { type: Function },
  },
  methods: {
    Logout() {
      this.logout();
    },
    resetModal() {
      this.form.title = undefined;
      this.form.image = undefined;
      this.form.vegan = false;
      this.form.vegetarian = false;
      this.form.readyInMinutes = undefined;
      this.form.servings = undefined;
    },
    addIngredient() {
      this.form.ingredients.push({
        value: undefined,
        key: this.ingredientCount,
      });
      this.ingredientCount += 1;
    },
    removeIngredient() {
      this.form.ingredients.pop();
      if (this.ingredientCount > 0) {
        this.ingredientCount -= 1;
      }
    },
    handleSubmit() {
      try{
      const formData = new FormData();
      formData.append("title", this.form.title);
      formData.append("image", this.form.image);
      formData.append("vegan", this.form.vegan);
      formData.append("vegetarian", this.form.vegetarian);
      formData.append("glutenFree", this.form.glutenFree);
      formData.append("readyInMinutes", this.form.readyInMinutes);
      formData.append("servings", this.form.servings);
      for (let i = 0; i < this.form.ingredients.length; i++) {
        formData.append("ingredients[]", this.form.ingredients[i].value);
      }
      formData.append("instructions", this.form.instructions);
      this.axios.post(this.$root.store.server_domain + "/users/add_recipe", formData).then(
        function (result) {
          console.log(result);
        },
        function (error) {
          console.log(error);
        }
      );
      this.$root.store.setUserRecipes();
    } catch (error) {
      console.log(error);
    }
    },
  },
};
</script>

<style scoped>
#hellowGuest {
  font-size: large;
  font-family: "Gill Sans";
}
/* /deep/ .my-class {
  background: black;
  color: white;
}

/deep/ .my-second-class > .modal-dialog > .modal-content > .modal-header {
  background: black;
  color: white;
} */
/* img {
    background: transparent 0% 0% no-repeat padding-box;
    opacity: 1;
    width: 31px;
    height: 24px;
    margin-top: -12px;
} */
</style>
