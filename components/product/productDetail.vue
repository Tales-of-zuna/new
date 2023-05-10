<template>
  <div>
    {{ $auth.user }}
    <v-card elevation="0">
      <v-card-text>
        <v-row
          ><v-col cols="4">
            <v-text-field
              hide-details
              v-model="product.name"
              label="Нэр"
              id="id"
              dense
              color="orange darken-3"
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
              label="Бренд not now"
              color="orange darken-3"
              id="id"
              dense
              outlined
            ></v-text-field
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
              color="orange darken-3"
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
              label="Varient төрөл not now"
              color="orange darken-3"
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
          ><v-col cols="12">
            <v-textarea
              rows="3"
              outlined
              color="orange"
              label="Нэмэлт мэдээлэл not now"
              v-model="product.description"
            /> </v-col
        ></v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange" text @click="submitAdd(), (step = 2)">
          Нэмэх
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    product: { type: Object },
  },
  data() {
    return {
      date: "",
      menu4: false,
      taxs: [],
      types: [],
      items: ["digital", "product"],
    };
  },
  methods: {
    async submitAdd() {
      this.product.store = "644f5ac6e7fb914f1426e0a1";
      let response = await this.$axios.post("/v1/product/create", this.product);
      if (response.status == 200) {
        this.success = true;
        this.addProduct = false;
        this.product = {};
      } else {
        console.log("boldgue boro");
      }
    },
  },
  async fetch() {
    let responseTaxs = await this.$axios.post("/v1/taxons", {
      store: "644f5ac6e7fb914f1426e0a1",
    });
    let responseType = await this.$axios.post("/v1/option-types/all", {
      store: "644f5ac6e7fb914f1426e0a1",
    });
    if (responseTaxs.status == 200) {
      this.taxs = responseTaxs.data;
    }
    if (responseType.status == 200) {
      this.types = responseType.data;
    }
  },
};
</script>

<style></style>
