<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12">
        <v-snackbar v-model="success">
          Амжилттай нэмэгдлээ
          <v-icon>mdi-emoticon-cool</v-icon>
          <template v-slot:action="{ attrs }">
            <v-btn dark text v-bind="attrs" @click="success = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template></v-snackbar
        ><v-snackbar v-model="errorSnack">
          Амжилттай нэмэгдлээ <v-icon>mdi-emoticon-cool</v-icon>
          <template v-slot:action="{ attrs }">
            <v-btn dark text v-bind="attrs" @click="errorSnack = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template> </v-snackbar
        ><v-card>
          <v-card-title primary-title class="d-flex justify-space-between">
            Бүтээгдэхүүний жагсаалт
            <div class="d-flex">
              <v-btn to="/products/create" small color="success"
                ><v-icon>mdi-plus</v-icon>Бараа нэмэх</v-btn
              >
            </div>
          </v-card-title>
          <v-card-subtitle>Нийт: {{ products.length }}</v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Хайх"
              single-line
              :loading="loading"
              loading-text="Уншиж байна... Түр хүлээнэ үү"
              hide-details
              color="grey darken-3"
            ></v-text-field>
          </v-card-text>

          <v-data-table
            :footer-props="{
              'items-per-page-text': 'Нэг нүүрэн дэх мөрийн тоо',
            }"
            dense
            no-results-text="Мэдээлэл байхгүй байна"
            :headers="headers"
            :items="products"
            :search="search"
            @dblclick="handleRowDoubleClick(_id)"
          >
            <template v-slot:item._id="{ item }">
              <v-btn
                @click="selectProduct(item.slug)"
                color="grey darken-3"
                small
                text
                dark
                >{{ item._id }}<v-icon small>mdi-open-in-new</v-icon></v-btn
              >
            </template>
            <template v-slot:item.thumbnails="{ item }">
              <v-sheet class="my-1 d-flex justify-center" rounded>
                <v-img
                  height="30"
                  width="30"
                  contain
                  :src="
                    'http://192.168.88.245:4004/api/v1/file/' +
                    item.thumbnails[0]
                  "
                ></v-img
              ></v-sheet>
            </template>
            <template v-slot:item.price="{ item }">
              {{ formatPrice(item.price) }}
            </template>
            <template v-slot:item.sellPrice="{ item }">
              {{ formatPrice(item.sellPrice) }}
            </template>
            <template v-slot:item.availableOn="{ item }">
              {{ $moment(item.availableOn).format("YYYY-MM-DD HH:mm") }}
            </template>
            <template v-slot:item.taxons="{ item }">
              <!-- {{ item.taxons.name }} -->
              <v-chip
                class="ma-1 green--text text--darken-3"
                small
                color="green lighten-4"
                dark
                v-for="taxon in item.taxons"
                :key="taxon"
                >{{ taxon.name }}</v-chip
              >
            </template>

            <template v-slot:no-results>
              <span>Бараа олдсонгүй</span><v-icon>mdi-archive-alert</v-icon>
            </template>
          </v-data-table>
        </v-card></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      menu2: false,
      menu4: false,
      viewProd: false,
      success: false,
      loading: true,
      errorSnack: false,
      addProduct: false,
      products: [],
      product: { type: { key: "product", name: "Бүтээгдэхүүн" } },
      taxs: [],
      types: [],
      search: "",
      items: [
        { key: "product", name: "Бүтээгдэхүүн" },
        { key: "digital", name: "Дижитал бүтээгдэхүүн" },
      ],
      headers: [
        { text: "ID", value: "_id" },

        { text: "Зураг", value: "thumbnails" },
        { text: "slug", value: "slug" },
        { text: "Төрөл", value: "type" },
        { text: "Нэр", value: "name" },
        { text: "SKU", value: "sku" },
        { text: "Төлөв", value: "status" },
        { text: "Бренд", value: "brand" },
        { text: "Ангилал", value: "taxons" },
        { text: "Үнэ", value: "price" },
        { text: "Худалдах үнэ", value: "sellPrice" },
        { text: "Худалдаж эхлэх огноо", value: "availableOn" },
      ],
    };
  },
  methods: {
    selectProduct(_slug) {
      console.log(_slug);
      this.$router.push({ name: "products-slug", params: { slug: _slug } });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
    },
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
    let response = await this.$axios.post("/v1/products", {
      status: "all",
      store: "644f5ac6e7fb914f1426e0a1",
    });
    let responseTaxs = await this.$axios.post("/v1/taxons", {
      store: "644f5ac6e7fb914f1426e0a1",
    });
    let responseType = await this.$axios.post("/v1/option-types/all", {
      store: "644f5ac6e7fb914f1426e0a1",
    });
    if (response.status == 200) {
      this.products = response.data.rows;
      this.loading = false;
    }
    if (responseTaxs.status == 200) {
      this.taxs = responseTaxs.data;
    }
    if (responseType.status == 200) {
      this.types = responseType.data;
    }
  },
  middleware: "auth",
};
</script>

<style></style>
