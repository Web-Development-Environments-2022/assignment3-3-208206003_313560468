<template>
  <b-modal
    modal-class="my-class"
    id="modal-prevent-closing"
    title="Create Recipe"
    @hidden="resetModal"
    @submit="handleSubmit"
    size="xl"
    ref="my-modal"
    hide-footer
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
        >
        </b-form-input>
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
        v-for="ingredient in form.ingredients"
        :key="ingredient.key"
        invalid-feedback="*"
        :state="Boolean(form.ingredients) && Boolean(ingredient.value ? ingredient.value.length <= 80: false)"
      >
        <b-form-input
          :state="Boolean(ingredient.value) && Boolean(ingredient.value ? ingredient.value.length <= 80: false)"
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
        variant="transparent"
        :src="require('@/assets/plus.png')"
        size="2em"
        style="text-align: center"
      />
      <b-avatar
        button
        @click="removeIngredient"
        variant="transparent"
        :src="require('@/assets/minus.png')"
        size="2em"
        style="text-align: center"
      />

      <br /><br />
      <strong>Instructions:</strong>
      <br /><br />
      <b-form-group
        :state="Boolean(form.instructions) && Boolean(instruction.value ? instruction.value.length <= 250 : false)"
        v-for="instruction in form.instructions"
        :key="instruction.key"
        invalid-feedback="*"
      >
        <b-form-input
          :state="
            Boolean(instruction.value) && Boolean(instruction.value ? instruction.value.length <= 250 : false)
          "
          v-model="instruction.value"
          required
          placeholder="Instruction"
          class="mb-2 mr-sm-2 mb-sm-0"
        ></b-form-input>
      </b-form-group>
      <br />
      <b-avatar
        button
        @click="addInstruction"
        variant="transparent"
        :src="require('@/assets/plus.png')"
        size="2em"
        style="text-align: center"
      ></b-avatar>
      <b-avatar
        button
        @click="removeInstruction"
        variant="transparent"
        :src="require('@/assets/minus.png')"
        size="2em"
        style="text-align: center"
      ></b-avatar>
      <br /><br />
      <b-button
        type="submit"
        variant="primary"
        style="width: 100px; display: block"
        class="mx-auto w-100"
      >
        Add Recipe</b-button
      >
    </b-form>
  </b-modal>
</template>


<script>
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
        ingredients: [{ value: undefined, key: 1 }],
        instructions: [{ value: undefined, key: -1 }],
      },
      ingredientCount: 1,
      instructionCount: -1,
    };
  },
  methods: {
    resetModal() {
      this.form.title = undefined;
      this.form.image = undefined;
      this.form.vegan = false;
      this.form.vegetarian = false;
      this.form.readyInMinutes = undefined;
      this.form.servings = undefined;
    },
    addIngredient() {
      this.ingredientCount += 1;
      this.form.ingredients.push({
        value: undefined,
        key: this.ingredientCount,
      });
    },
    addInstruction() {
      this.instructionCount -= 1;
      this.form.instructions.push({
        value: undefined,
        key: this.ingredientCount,
      });
    },
    removeIngredient() {
      this.form.ingredients.pop();
      if (this.ingredientCount > 0) {
        this.ingredientCount -= 1;
      }
    },
    removeInstruction() {
      this.form.instructions.pop();
      if (this.instructionCount < 0) {
        this.instructionCount += 1;
      }
    },
    handleSubmit() {
      try {
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
        for (let i = 0; i < this.form.instructions.length; i++) {
          formData.append("instructions[]", this.form.instructions[i].value);
        }
        this.axios
          .post(this.$root.store.server_domain + "/users/add_recipe", formData)
          .then(
            function (result) {
              console.log(result);
            },
            function (error) {
              console.log(error);
            }
          );
        this.$root.store.setUserRecipes();
        this.$refs["my-modal"].hide();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
::v-deep .my-class > .modal-dialog > .modal-content > .modal-header {
  background: black;
  color: white;
}

::v-deep .my-class > .modal-dialog > .modal-content {
  background: #343a40;
  color: white;
}

::v-deep .my-class {
  backdrop-filter: blur(3px);
}
</style>
