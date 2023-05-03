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
          </template></v-snackbar><v-snackbar v-model="errorSnack">
          Амжилттай нэмэгдлээ <v-icon>mdi-emoticon-cool</v-icon>
          <template v-slot:action="{ attrs }">
            <v-btn dark text v-bind="attrs" @click="errorSnack = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template> </v-snackbar><v-card>
          <v-card-title primary-title class="d-flex justify-space-between">
            Бүтээгдэхүүний жагсаалт
            <div class="d-flex">
              <v-dialog v-model="addProduct" width="1000">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green " dark small v-bind="attrs" v-on="on">Бүтээгдэхүүн үүсгэх <v-icon
                      small>mdi-plus</v-icon></v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title class="d-flex justify-space-between">
                    Бараа нэмэх
                    <v-btn @click="addProduct = false" icon><v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-subtitle>Барааны загваруудыг тусд нь оруулна</v-card-subtitle>

                  <v-card-text>
                    <v-row><v-col cols="4">
                        <v-text-field v-model="products.name" label="Нэр" id="id" dense color="orange darken-3" outlined
                          hint="Барааны дэлгэрэнгүй нэр"></v-text-field>
                      </v-col><v-col cols="4"><v-text-field label="Англи нэр" color="orange darken-3" id="id" dense
                          hint="xiaomi note13" outlined></v-text-field></v-col>
                      <v-col cols="4">
                        <v-select name="name" v-model="products.type" :items="items" item-text="name" item-value="key"
                          single-line color="orange darken-3" id="id" dense outlined return-object></v-select>
                      </v-col>
                    </v-row><v-row><v-col cols="4"><v-text-field v-model="products.brand" name="name" label="Бренд"
                          color="orange darken-3" id="id" dense outlined></v-text-field></v-col>
                      <v-col cols="4">
                        <v-select name="name" v-model="products.taxons" :items="taxs" label="Ангилал"
                          color="orange darken-3" id="id" dense outlined></v-select>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="products.store" name="name" label="Дэлгүүр сонгох" id="id" dense
                          color="orange darken-3" outlined hint="644f5ac6e7fb914f1426e0a1"></v-text-field>
                      </v-col>
                      <!-- <v-col cols="6"><v-text-field v-model="product.color" name="name"
                          label="Төрөл" id="id" dense color="orange darken-3" outlined
                          hint="Барааны нэр монголоор"></v-text-field></v-col><v-col cols="3"><v-text-field
                          v-model="product.price" name="name" label="Үнэ" color="orange darken-3" id="id" dense
                          outlined></v-text-field></v-col><v-col cols="3"><v-text-field v-model="product.quantity"
                          name="name" label="Тоо ширхэг" color="orange darken-3" id="id" dense
                          outlined></v-text-field></v-col> -->
                    </v-row>
                    <v-row><v-col cols="4"><v-text-field v-model="products.price" name="name" label="Үндсэн Үнэ"
                          color="orange darken-3" id="id" dense outlined></v-text-field></v-col>
                      <v-col cols="4"><v-text-field v-model="products.sellPrice" name="name" label="Зарах Үнэ"
                          color="orange darken-3" id="id" dense outlined></v-text-field></v-col>
                      <v-col cols="4">
                        <label>Зарж эхлэх огноо</label>
                        <input name="name" id="id" type="datetime-local" />
                      </v-col>
                    </v-row>
                    <v-row>{{ taxs }}</v-row>
                    <!-- <v-row class="mt-n6"><v-col cols="3"><v-text-field v-model="product.brand" name="name" label="Бренд"
                          color="orange darken-3" id="id" dense outlined></v-text-field></v-col><v-col
                        cols="3"><v-file-input show-size dense counter multiple
                          label="Зураг оруулах"></v-file-input></v-col><v-col cols="6">
                        <v-text-field name="name" v-model="product.images[0]" label="Зурагны линк" color="orange darken-3"
                          hint="https://examplewebsite.mn/Image.png" id="id" dense outlined></v-text-field>
                      </v-col></v-row> -->

                    <!-- <v-row><v-col cols="12"><v-card elevation="0">
                          <p>Дэлгэрэнгүй мэдээлэл</p>
                          <VueEditor v-model="product.description" />
                        </v-card></v-col></v-row> -->
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
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Хайх" single-line :loading="loading"
              loading-text="Уншиж байна... Түр хүлээнэ үү" hide-details color="grey darken-3"></v-text-field>
          </v-card-text>

          <v-data-table show-select :footer-props="{
              'items-per-page-text': 'Нэг нүүрэн дэх мөрийн тоо',
            }" :headers="headers" :items="products" :search="search">
            <template v-slot:[`item._id`]="{ item }">
              <v-btn class="text-subtitle-2" @click="selectProduct(item._id)" text small>{{ item._id }}<v-icon
                  small>mdi-open-in-new</v-icon></v-btn>
            </template>

            <template v-slot:[`item.price`]="{ item }">
              {{ formatPrice(item.price) }}
            </template>
            <template v-slot:[`item.sellPrice`]="{ item }">
              {{ formatPrice(item.sellPrice) }}
            </template>
            <template v-slot:[`item.availableOn`]="{ item }">
              {{ $moment(item.availableOn).format("YYYY-MM-DD HH:mm") }}
            </template>
            <!-- <template v-slot:[`item.images[0].xl`]="{ item }">
              <v-card height="50" width="50" class="ma-1">
                <v-img :src="item.images[0].xl"></v-img>
              </v-card>
            </template> -->

            <template v-slot:no-results>
              <span>Бараа олдсонгүй</span><v-icon>mdi-archive-alert</v-icon>
            </template>
          </v-data-table>
        </v-card></v-col></v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      viewProd: false,
      success: false,
      loading: true,
      errorSnack: false,
      addProduct: false,
      products: [],
      taxs: [],
      search: "",
      items: [{ key: "product", name: "Бүтээгдэхүүн" }, { key: "digital", name: "Дижитал бүтээгдэхүүн" }],
      headers: [
        // { text: "Зураг ", value: "images[0].xl" },
        // { text: "SKU", value: "slug" },
        // { text: "Slug", value: "slug" },
        // { text: "Үлдэгдэл", value: "quantity" },
        { text: "Нэр ", value: "name" },
        { text: "Төрөл ", value: "type" },
        { text: "Бренд", value: "brand" },
        { text: "Ангилал", value: "taxons" },
        { text: "Үнэ", value: "price" },
        { text: "Үнэ", value: "sellPrice" },
        { text: "Дэлгүүр", value: "store" },
        { text: "Үүсгэсэн он сар", value: "availableOn" },
      ],
    };
  },
  methods: {
    selectProduct(productId) {
      this.$router.push({ name: "products-id", params: { id: productId } });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
    },
    async submitAdd() {
      if (this.product != { images: [] }) {
        let response = await this.$axios.post("/product/", this.product);
        if (response.status == 200) {
          this.success = true;
          this.addProduct = false;
          this.product = { images: [] };
        } else {
          console.log("boldgue boro");
        }
      } else {
        this.errorSnack = true;
      }
    },
  },
  async fetch() {
    let response = await this.$axios.post("/v1/products", { store: "644f5ac6e7fb914f1426e0a1" });
    let responseTaxs = await this.$axios.post("/v1/taxons", { store: "644f5ac6e7fb914f1426e0a1" });
    // should I add responseTaxs or what?
    if (response.status == 200) {
      this.products = response.data.rows;
      this.taxs = responseTaxs.data.rows;
      this.loading = false;
    }
  },
  middleware: "auth",
};
</script>

<style></style>
