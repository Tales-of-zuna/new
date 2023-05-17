<template>
  <v-container grid-list-xs>
    {{ product }}
    <v-row
      ><v-col cols="12"
        ><v-card>
          <v-card-title primary-title>
            {{ product.slug }}
          </v-card-title>
          <v-card-subtitle
            >Үүсгэсэн огноо:
            {{
              $moment(product.createdAt).format("YYYY-MM-DD HH:mm")
            }}</v-card-subtitle
          >
          <v-card-text
            ><v-img
              height="200"
              width="200"
              v-if="product.thumbnails[0]"
              :src="$store.state.imageBaseUrl + product.thumbnails[0]"
            ></v-img>
          </v-card-text>

          <v-tabs color="grey darken-3">
            <v-tab> Details </v-tab>
            <v-tab-item>
              <v-card-text>
                <v-row
                  ><v-col cols="4">
                    <v-text-field
                      hide-details
                      v-model="product.name"
                      label="Нэр"
                      id="id"
                      dense
                      color="teal darken-3"
                      outlined
                      hint="Барааны дэлгэрэнгүй нэр"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      hide-details
                      v-model="product.type"
                      :items="items"
                      label="Бүтээгдэхүүний төрөл"
                      single-line
                      color="teal darken-3"
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
                      color="teal darken-3"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col> </v-row
                ><v-row
                  ><v-col cols="4"
                    ><v-select
                      name="taxons"
                      hide-details
                      v-model="product.brand"
                      :items="brands"
                      item-text="name"
                      item-value="_id"
                      label="Бренд"
                      color="teal darken-3"
                      id="id"
                      dense
                      outlined
                    ></v-select
                  ></v-col>
                  <v-col cols="4">
                    <v-select
                      name="taxons"
                      hide-details
                      v-model="product.taxons"
                      :items="taxs"
                      item-text="name"
                      item-value="_id"
                      multiple
                      label="Ангилал"
                      color="teal darken-3"
                      id="id"
                      dense
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-select
                      hide-details
                      v-model="product.optiontypes"
                      :items="types"
                      item-text="name"
                      item-value="slug"
                      multiple
                      label="Varient төрөл"
                      color="teal darken-3"
                      dense
                      outlined
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row
                  ><v-col cols="4"
                    ><v-text-field
                      hide-details
                      v-model="product.price"
                      name="price"
                      label="Үндсэн Үнэ"
                      color="teal darken-3"
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
                      color="teal darken-3"
                      id="id"
                      dense
                      outlined
                    ></v-text-field
                  ></v-col>

                  <v-col cols="4">
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
                          color="teal darken-3"
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
                        color="teal darken-3"
                        v-model="product.availableOn"
                        @input="menu4 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row
                  ><v-col cols="12">
                    <v-textarea
                      rows="3"
                      outlined
                      color="teal"
                      label="Нэмэлт мэдээлэл "
                      v-model="product.description"
                    /> </v-col
                ></v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer
                ><v-btn @click="updateProduct(product._id)" color="error"
                  >Барааг шинэчлэх</v-btn
                ><v-btn
                  @click="updateProduct(product._id)"
                  outlined
                  color="teal"
                  >Барааг шинэчлэх</v-btn
                >
              </v-card-actions>
            </v-tab-item>
            <v-tab> Attributes </v-tab>

            <v-tab> Variants </v-tab>
            <v-tab> Images </v-tab>
            <v-tab> Seo </v-tab>
            <v-tab> Stock </v-tab>
            <v-tab> Prices </v-tab>
            <v-tab> Sales </v-tab>
          </v-tabs>
        </v-card></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      date: "",
      brand: null,
      menu4: false,
      taxs: [],
      types: [],
      items: ["digital", "product"],
      brands: [],
    };
  },
  async fetch() {
    let response = await this.$axios.post(
      "/v1/product/" + this.$route.params.slug,
      { store: this.$auth.user.store }
    );
    if (response.status == 200) {
      this.product = response.data;
    }
    let responseTaxs = await this.$axios.post("/v1/taxons", {
      store: this.$auth.user.store,
    });
    let responseBrand = await this.$axios.post("/v1/brands");
    let responseType = await this.$axios.post("/v1/option-types/all", {
      store: this.$auth.user.store,
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
  methods: {
    async updateProduct(id) {
      let response = await this.$axios.post("/v1");
    },
  },
};
</script>
