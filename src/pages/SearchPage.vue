<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
      <b-form @submit.prevent="onSearch">
        <b-input-group>
          <template #prepend>
            <b-form-select
              class="select"
              v-model="form.number"
              :options="number"
            ></b-form-select>
          </template>

          <b-form-input
            id="title"
            v-model="$v.form.title.$model"
            type="text"
            :state="validateState('title')"
          ></b-form-input>

          <template #append>
            <b-form-select
              class="select"
              v-model="form.cuisine"
              :options="cuisines"
            ></b-form-select>
            <b-form-select
              class="select"
              v-model="form.diet"
              :options="diet"
            ></b-form-select>
            <b-form-select
              class="select"
              v-model="form.intolerance"
              :options="intolerance"
            ></b-form-select>
            <b-button type="submit" class="mx-auto w-100">Search</b-button>
          </template>
        </b-input-group>
      </b-form>
    </div>
    <div v-if="searched">
      <RecipePreviewList title="" :inRecipes="results" :random="false" :key="results" :logged_in = "root.store.username" class="center" />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { required, alpha } from "vuelidate/lib/validators";
import cuisines from "../assets/cuisines";
import diet from "../assets/diet";
import intolerance from "../assets/intolerance";

export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      form: {
        title: sessionStorage.getItem("searchQuery"),
        number: 5,
        cuisine: "",
        diet: "",
        intolerance: "",
        submitError: undefined,
      },
      number: [
        { value: 5, text: "--results number--" },
        { value: 5, text: "5" },
        { value: 10, text: "10" },
        { value: 15, text: "15" },
      ],
      cuisines: cuisines,
      diet: diet,
      intolerance: intolerance,
      searched: sessionStorage.getItem("searchQuery"),
      results: JSON.parse(sessionStorage.getItem("searchResults"))
    };
  },
  validations: {
    form: {
      title: {
        required,
        alpha,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async search() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/search",
          {
            params: {
              title: this.form.title,
              number: this.form.number,
              cuisine: this.form.cuisine,
              diet: this.form.diet,
              intolerance: this.form.intolerance,
            },
          }
        );
        sessionStorage.setItem("searchQuery", this.form.title);
        sessionStorage.setItem("searchResults", JSON.stringify(response.data));
        this.searched = true;
        this.results = response.data;
        // console.log(response);
        // this.$root.loggedIn = true;
        // console.log(this.$root.store.login);
        // this.$root.store.login(this.form.username);
        // await this.$root.store.produceUserData();
        // this.$router.push("/");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSearch() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.search();
    },
  },
};
</script>

<style>
.select {
  background-color: rgb(226, 208, 156);
}
</style>

