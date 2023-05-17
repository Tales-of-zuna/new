<template>
  <v-container grid-list-xs>
    <v-card elevation="0">
      <v-card-title class="d-flex justify-space-between" primary-title>
        Бренд нэмэх
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on" fab>
              <v-icon>mdi-storefront-plus</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title primary-title> Бренд нэмэх </v-card-title>
            <v-card-text>
              <v-text-field
                outlined
                dense
                label="Brand name"
                color="grey darken-3"
                hide-details
                v-model="brand.name"
              ></v-text-field>
            </v-card-text>
            <v-card-text class="d-flex align-center">
              <v-file-input
                type="file"
                id="file"
                ref="file"
                hide-details
                v-model="image"
                color="teal darken-3"
                show-size
                truncate-length="15"
              ></v-file-input>
              <v-btn dark @click="sendImage(image)"
                ><v-icon>mdi-image-plus</v-icon> Нэмэх</v-btn
              >
            </v-card-text>
            <v-img
              height="100"
              contain
              v-if="brand.image"
              :src="$store.state.imageBaseUrl + brand.image"
            ></v-img>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="teal"
                text
                @click="brand.image ? ((dialog = false), addBrand()) : ''"
              >
                Нэмэх
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="brand in brands.rows" :key="brand.name" cols="2"
            ><v-card hover v-if="(brand.active = true)"
              ><div class="px-1 pt-1">
                <v-img
                  contain
                  height="100"
                  :src="$store.state.imageBaseUrl + brand.image"
                  ><div class="d-flex justify-space-between">
                    <div></div>
                    <v-btn @click="deleteBrand(brand)" color=" error" icon
                      ><v-icon>mdi-delete</v-icon></v-btn
                    >
                  </div></v-img
                >
              </div>
              <v-card-title primary-title>
                {{ brand.name }}
              </v-card-title></v-card
            ></v-col
          ></v-row
        ></v-card-text
      >
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      brands: [],
      brand: {},
      dialog: false,
      image: null,
      type: "brandImages",
      imageUrl: "",
    };
  },

  methods: {
    async deleteBrand(brand) {
      brand.active = false;
      let response = await this.$axios.put("/v1/brand/" + brand._id, brand);
    },
    async addBrand() {
      let response = await this.$axios.post("/v1/brand/create", this.brand);
      if (response.status == 200) {
        this.brand = {};
      }
    },
    async sendImage(image) {
      let formData = new FormData();
      formData.append("file", image);
      let response = await this.$axios.post(
        "/v1/upload/" + this.type,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        this.image = null;
        this.imageUrl = response.data;
        this.brand.image = this.imageUrl.url;
      }
    },
  },
  async fetch() {
    let response = await this.$axios.post("/v1/brands");
    if (response.status == 200) {
      this.brands = response.data;
    }
  },
};
</script>

<style></style>
