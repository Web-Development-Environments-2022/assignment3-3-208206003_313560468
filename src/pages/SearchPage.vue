<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
      <b-form @submit.prevent="onSearch">
        <b-input-group>
          <template #prepend>
            <b-form-select
              id="select"
              v-model="form.number"
              :options="number"
            ></b-form-select>
          </template>

          <b-form-input
            id="title"
            v-model="$v.form.title.$model"
            type="text"
            :state="validateState('title')"
          >
          </b-form-input>

          <template #append>
            <!-- <b-form-select class="select" v-model="form.cuisine" multiple :options="cuisines" variant="dark"></b-form-select>
            <b-form-select class="select" v-model="form.diet" multiple :options="diet"></b-form-select>
            <b-form-select class="select" v-model="form.intolerance" multiple :options="intolerance"></b-form-select> -->
            <b-button type="submit" class="mx-auto w-100" variant="danger"
              >Search</b-button
            >
          </template>
        </b-input-group>
        <br />
        <div>
          <b-row>
            <multiselect
              v-model="form.diet"
              :options="diet"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Diet"
              :preselect-first="false"
              style="width:30%; padding-left: 2%;"
            ></multiselect>
            <multiselect
              v-model="form.cuisine"
              :options="cuisines"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Cuisine"
              :preselect-first="false"
              style="width:30%; padding-left: 2%;"
            ></multiselect>
            <multiselect
              v-model="form.intolerance"
              :options="intolerance"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Intolerance"
              :preselect-first="false"
              style="width:30%; padding-left: 2%;"
            ></multiselect>
          </b-row>
        </div>
        <br /><br />
        <div
          v-if="searched && results.length > 0"
          class="btn-group btn-group-lg"
          :key="timeSort"
        >
          <b-row>
            <h1>Sort by:</h1>
            <b-button
              v-if="timeSort === 0"
              style="background-color: #343a40; padding-left: 10px"
              @click="sortByTime"
            >
              Time in Minutes
            </b-button>
            <b-button
              v-else-if="timeSort === 1"
              style="background-color: #343a40; padding-left: 10px"
              @click="sortByTime"
              >Time in Minutes &uarr;</b-button
            >
            <b-button
              v-else-if="timeSort === -1"
              style="background-color: #343343a40; padding-left: 10px"
              @click="sortByTime"
              >Time in Minutes &darr;</b-button
            >
            <b-button
              v-if="popularitySort === 0"
              style="background-color: #343a40; padding-left: 10px"
              @click="sortByPopularity"
              >popularity</b-button
            >
            <b-button
              v-else-if="popularitySort === 1"
              style="background-color: #343a40; padding-left: 10px"
              @click="sortByPopularity"
              >popularity &uarr;</b-button
            >
            <b-button
              v-else-if="popularitySort === -1"
              style="background-color: #343a40; padding-left: 10px"
              @click="sortByPopularity"
              >popularity &darr;</b-button
            >
          </b-row>
        </div>
      </b-form>
    </div>
    <div v-if="searched && results.length > 0">
      <RecipePreviewList
        title=""
        :inRecipes="results"
        :random="false"
        :key="results"
        :logged_in="Boolean($root.store.username)"
        class="center"
      />
    </div>
    <div id="notFound" v-else-if="searched">
      <h1>No results found, try another search!</h1>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import { required, alpha } from "vuelidate/lib/validators";
import cuisines from "../assets/cuisines";
import diet from "../assets/diet";
import intolerance from "../assets/intolerance";
import Multiselect from "vue-multiselect";

export default {
  components: {
    RecipePreviewList,
    Multiselect,
  },
  data() {
    return {
      form: {
        title: sessionStorage.getItem("searchQuery"),
        number: 5,
        cuisine: [],
        diet: [],
        intolerance: [],
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
      results: sessionStorage.getItem("searchResults")
        ? JSON.parse(sessionStorage.getItem("searchResults"))
        : undefined,
      timeSort: 0,
      popularitySort: 0,
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
              cuisine: this.form.cuisine.toString(),
              diet: this.form.diet.toString(),
              intolerance: this.form.intolerance.toString(),
            },
          }
        );
        sessionStorage.setItem("searchQuery", this.form.title);
        sessionStorage.setItem("searchResults", JSON.stringify(response.data));
        this.results = response.data;
        this.searched = true;
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
    sortByTime() {
      if (this.timeSort === 0 || this.timeSort === 1) {
        this.results.sort((a, b) => {
          return b.readyInMinutes - a.readyInMinutes;
        });
        this.timeSort = -1;
        this.popularitySort = 0;
      } else if (this.timeSort === -1) {
        this.results.sort((a, b) => {
          return a.readyInMinutes - b.readyInMinutes;
        });
        this.timeSort = 1;
        this.popularitySort = 0;
      }
    },
    sortByPopularity() {
      if (this.popularitySort === 0 || this.popularitySort === 1) {
        this.results.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        this.timeSort = 0;
        this.popularitySort = -1;
      } else if (this.popularitySort === -1) {
        this.results.sort((a, b) => {
          return a.popularity - b.popularity;
        });
        this.timeSort = 0;
        this.popularitySort = 1;
      }
    },
  },
};
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css">
#select {
  background-color: #343a40;
  color: white;
}

h1 {
  padding-left: 25px;
  color: rgb(243, 223, 174);
  font-family: Frank Ruhl Libre, Georgia;
}

#NotFound {
  padding-top: 50px;
  font-size: 120px;
  text-align: center;
  color: rgb(248, 248, 217);
  font-family: Frank Ruhl Libre, Georgia;
}
</style>

