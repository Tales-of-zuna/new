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
              <v-dialog v-model="addProduct" width="1000">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green " dark small v-bind="attrs" v-on="on"
                    >Бүтээгдэхүүн үүсгэх <v-icon small>mdi-plus</v-icon></v-btn
                  >
                </template>
                <v-card>
                  <v-card-title
                    primary-title
                    class="d-flex justify-space-between"
                  >
                    Бараа нэмэх
                    <v-btn @click="addProduct = false" icon
                      ><v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-subtitle
                    >Барааны загваруудыг тусд нь оруулна</v-card-subtitle
                  >

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
                        ></v-text-field> </v-col
                      ><v-col cols="4"
                        ><v-text-field
                          hide-details
                          v-model="product.sku"
                          name="SKU"
                          label="SKU"
                          color="orange darken-3"
                          id="id"
                          dense
                          hint="Дугаар"
                          outlined
                        ></v-text-field
                      ></v-col>
                      <v-col cols="4">
                        <v-select
                          hide-details
                          name="type"
                          v-model="product.type"
                          :items="items"
                          label="Бүтээгдэхүүний төрөл"
                          item-text="name"
                          item-value="key"
                          single-line
                          color="orange darken-3"
                          id="id"
                          dense
                          outlined
                          return-object
                        ></v-select>
                      </v-col> </v-row
                    ><v-row
                      ><v-col cols="4"
                        ><v-text-field
                          hide-details
                          v-model="product.brand"
                          name="brand"
                          label="Бренд"
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
                          name="opttypes"
                          hide-details
                          v-model="product.optiontypes"
                          :items="types"
                          item-text="name"
                          item-value="slug"
                          multiple
                          label="Varient төрөл"
                          color="orange darken-3"
                          id="id"
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
                            v-model="product.availableOn"
                            @input="menu4 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                    <!-- <v-row class="mt-n6"><v-col cols="3"><v-text-field v-model="product.brand" name="name" label="Бренд"
                          color="orange darken-3" id="id" dense outlined></v-text-field></v-col><v-col
                        cols="3"><v-file-input show-size dense counter multiple
                          label="Зураг оруулах"></v-file-input></v-col><v-col cols="6">
                        <v-text-field name="name" v-model="product.images[0]" label="Зурагны линк" color="orange darken-3"
                          hint="https://examplewebsite.mn/Image.png" id="id" dense outlined></v-text-field>
                      </v-col></v-row> -->

                    <v-row
                      ><v-col cols="12">
                        <v-textarea
                          rows="3"
                          outlined
                          color="orange"
                          label="Нэмэлт мэдээлэл"
                          v-model="product.description"
                        /> </v-col
                    ></v-row>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange" text @click="submitAdd()">
                      Нэмэх
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card-title>
          <v-card-subtitle>Нийт: {{ products.count }}</v-card-subtitle>
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
            :headers="headers"
            :items="products"
            :search="search"
            @dblclick="handleRowDoubleClick(_id)"
          >
            <template v-slot:item.thumbnails="{ item }">
              <v-card
                height="25"
                width="25"
                class="ma-1"
                @click="selectProduct(item.slug)"
              >
                <v-img :src="item.thumbnails[0]"></v-img>
              </v-card>
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
              <v-chip v-for="taxon in item.taxons">{{ taxon.name }}</v-chip>
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
