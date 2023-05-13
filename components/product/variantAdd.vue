<template>
  <v-card elevation="0">
    <v-card-text>
      <v-row
        ><v-col cols="4">
          <v-text-field
            hide-details
            v-model="product.name"
            label="Variant name"
            id="id"
            dense
            color="orange darken-3"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            hide-details
            v-model="product.type"
            :items="items"
            label="Variant төрөл"
            single-line
            color="orange darken-3"
            dense
            outlined
            return-object
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-text-field
            hide-details
            v-model="$auth.user.store"
            label="Дэлгүүр"
            single-line
            readonly
            color="orange darken-3"
            dense
            outlined
          ></v-text-field>
        </v-col> </v-row
      ><v-row
        ><v-col cols="4"
          ><v-text-field
            hide-details
            v-model="product.brand"
            name="brand"
            label="Бренд "
            color="orange darken-3"
            id="id"
            dense
            outlined
          ></v-text-field
        ></v-col>
        {{ types }}
        <v-col cols="4">
          <v-select
            hide-details
            v-model="product.options"
            :items="types"
            item-text="name"
            item-value="slug"
            multiple
            label="Varient төрөл "
            color="orange darken-3"
            dense
            outlined
          >
          </v-select> </v-col
        ><v-col cols="4">
          <v-menu
            v-model="menu4"
            :close-on-content-click="false"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                hide-details
                outlined
                color="orange darken-3"
                dense
                v-model="product.availableOn"
                label="Худалдаж эхлэх хугацаа"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              color="orange darken-3"
              v-model="product.availableOn"
              @input="menu4 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row
        ><v-col cols="4"
          ><v-text-field
            hide-details
            v-model="product.price"
            name="price"
            label="Үндсэн Үнэ"
            color="orange darken-3"
            id="id"
            dense
            type="number"
            outlined
          ></v-text-field
        ></v-col>
        <v-col cols="4"
          ><v-text-field
            hide-details
            v-model="product.sellPrice"
            name="sellingprice"
            label="Зарах Үнэ"
            color="orange darken-3"
            id="id"
            dense
            outlined
          ></v-text-field
        ></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    product: { type: Object },
  },
  data() {
    return {
      date: "",
      brand: null,
      menu4: false,
      taxs: [],
      types: [],
      items: ["digital", "product"],
    };
  },
  methods: {},
  async fetch() {
    let responseTaxs = await this.$axios.post("/v1/taxons", {
      store: "644f5ac6e7fb914f1426e0a1",
    });

    let responseBrand = await this.$axios.post("/v1/brands");

    let responseType = await this.$axios.post("/v1/option-types/all", {
      store: "644f5ac6e7fb914f1426e0a1",
    });
    if (responseTaxs.status == 200) {
      this.taxs = responseTaxs.data;
    }
    if (responseType.status == 200) {
      this.types = responseType.data;
    }
    if (responseBrand.status == 200) {
      this.brands = responseBrand.data.rows;
    }
  },
};
</script>

<style></style>
