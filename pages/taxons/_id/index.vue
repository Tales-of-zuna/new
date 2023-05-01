<template>
  <v-container grid-list-xs>
    <v-row><v-col cols="12"><v-card>
          <v-card-title primary-title>
            {{ product.title }}
          </v-card-title>
          <v-card-subtitle>Үүсгэсэн огноо:
            {{
              $moment(product.createdAt).format("YYYY-MM-DD HH:mm")
            }}</v-card-subtitle>
          <v-card-text><v-img height="200" width="200" v-if="product.images" :src="product.images[0]"></v-img>
            {{ product }}</v-card-text>
        </v-card></v-col></v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    };
  },
  async fetch() {
    let response = await this.$axios.get("/product/" + this.$route.params.id);
    if (response.status == 200) {
      this.product = response.data;
    }
  },
  methods: {},
};
</script>

<style></style>
