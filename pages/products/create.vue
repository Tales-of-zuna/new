<template>
  <v-container grid-list-xs>
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
                <v-btn color="teal" dark @click="step = 2"> Continue </v-btn>
                <v-btn text> Cancel </v-btn>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-step color="teal darken-3" :complete="step > 2" step="2">
              Барааны ангилал нэмэх
              <small>Zaaval nemne</small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <ProductVariantAdd />
              <v-btn color="teal " dark @click="step = 3"> Continue </v-btn>
              <v-btn text> Cancel </v-btn>
            </v-stepper-content>

            <v-stepper-step color="teal darken-3" :complete="step > 3" step="3">
              Барааны зураг нэмэх
              <small>hola</small>
            </v-stepper-step>

            <v-stepper-content step="3">
              <ProductImage :product="product" />
              <v-btn color="teal " dark @click="step = 1"> Continue </v-btn>
              <v-btn text> Cancel </v-btn>
            </v-stepper-content>
          </v-stepper>
          <v-tabs slider-color="grey darken-3" color="grey darken-3">
            <v-tab> Бараа нэмэх </v-tab>
            <v-tab> Variant нэмэх </v-tab>
            <v-tab> Зураг нэмэх </v-tab>

            <v-tab-item>
              <ProductDetail :product="product" />
            </v-tab-item>
            <v-tab-item>
              <ProductDetail :product="product" />
            </v-tab-item>
            <v-tab-item>
              <ProductImage :product="product" />
            </v-tab-item>
          </v-tabs>
        </v-card> </v-col
    ></v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      product: { type: { key: "product", name: "Бүтээгдэхүүн" } },
    };
  },
  methods: {},
};
</script>

<style></style>
