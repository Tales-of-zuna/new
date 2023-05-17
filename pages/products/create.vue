<template>
  <v-container grid-list-xs>
    {{ product }}

    <v-row
      ><v-col cols="12">
        <v-card>
          <v-stepper v-model="step" vertical>
            <v-stepper-step color="teal darken-3" :complete="step > 1" step="1">
              Ерөнхий мэдээлэл
              <small>Барааны загваруудыг тусд нь оруулна</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <ProductDetail :step="step" :product="product" />
              <v-card-actions>
                <v-btn
                  color="teal"
                  dark
                  @click="product_id ? (step = 2) : '', submitAdd()"
                >
                  Үргэлжлүүлэх
                </v-btn>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-step color="teal darken-3" :complete="step > 2" step="2">
              Сонголтууд
              <small>Zaaval nemne</small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <option-types :options="options" />

              <v-btn
                color="teal "
                @click="variant_id ? (step = 3) : '', variantAdd()"
                dark
              >
                Үргэлжлүүлэх
              </v-btn>
            </v-stepper-content>

            <v-stepper-step color="teal darken-3" :complete="step > 3" step="3">
              Барааны variant нэмэх
              <small>Zaaval nemne</small>
            </v-stepper-step>

            <v-stepper-content step="3">
              <ProductVariantAdd :options="options" :product="product" />

              <v-btn
                color="teal "
                @click="variant_id ? (step = 4) : '', variantAdd()"
                dark
              >
                Үргэлжлүүлэх
              </v-btn>
            </v-stepper-content>

            <v-stepper-step color="teal darken-3" :complete="step > 4" step="4">
              Барааны зураг нэмэх
              <small>hola</small>
            </v-stepper-step>

            <v-stepper-content step="4">
              <ProductImage :product="product" />
              <v-btn color="teal " dark @click="(step = 1), saveImages()">
                Үргэлжлүүлэх
              </v-btn>
              <v-btn text> Буцах </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-col></v-row
    >
    {{ options }}
  </v-container>
</template>

<script>
import optionTypes from "../../components/product/optionTypes.vue";
export default {
  components: { optionTypes },
  data() {
    return {
      step: 1,
      product_id: Number,
      variant_id: Number,
      product: {
        type: "product",
        thumbnails: [],
        language: "",
        store: "",
      },
      options: [],
    };
  },
  methods: {
    async saveImages() {
      this.product.store = this.$auth.user.store;
      let response = await this.$axios.put(
        "/v1/product/" + this.product_id,
        this.product
      );
      if (response.status == 200) {
        this.product = { type: "product", thumbnails: [], options: [] };
        this.product_id = response.data._id;
      } else {
        console.log("boldgue boro");
      }
    },
    async submitAdd() {
      this.product.store = this.$auth.user.store;
      this.options = this.product.optionTypes;
      this.product.language = this.$auth.user.defaultLanguage;
      let response = await this.$axios.post("/v1/product/create", this.product);
      if (response.status == 200) {
        this.product = { type: "product", thumbnails: [], options: [] };
        this.product_id = response.data._id;
      } else {
        console.log("boldgue boro");
      }
    },
    async variantAdd() {
      this.product.store = this.$auth.user.store;
      this.product.language = this.$auth.user.defaultLanguage;
      let response = await this.$axios.post(
        "/v1/product-variant/create/" + this.product_id,
        this.product
      );
      if (response.status == 200) {
        this.product = { type: "product", thumbnails: [], options: [] };
        this.variant_id = response.data._id;
      } else {
        console.log("boldgue boro");
      }
    },
  },
};
</script>

<style></style>
