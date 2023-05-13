<template>
  <v-app dark>
    <v-card class="fill-height">
      <v-container class="py-8">
        <div class="d-flex justify-center mb-4">
          <v-icon size="40">mdi-ghost</v-icon>
        </div>

        <p class="title text-center my-0 py-0 grey--text text--darken-3">
          Oops! Алдаа гарлаа
        </p>
        <p class="subtitle-1 red--text text-center my-0 py-0">{{ error }}</p>

        <div class="d-flex justify-center mt-6">
          <v-btn @click="reset()" color="green" dark>
            <v-icon class="mr-2">mdi-reload</v-icon>
            Reload
          </v-btn>
        </div>
        <p class="body-2 text-center mt-6 py-0 grey--text text--darken-1">
          Tech support - той холбогдох
        </p>

        <div class="d-flex justify-center mt-2">
          <v-btn color="red" dark fab>
            <v-icon class="mr-2">mdi-google-downasaur</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },

  methods: {
    reset() {
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
