<template>
  <v-container grid-list-xs>
    <v-row
      ><v-col cols="12"
        ><v-snackbar v-model="success">
          Амжилттай нэмэгдлээ <v-icon>mdi-emoticon-cool</v-icon>
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
                      ><v-col cols="4"
                        ><v-text-field
                          v-model="product.title"
                          name="name"
                          label="Нэр"
                          id="id"
                          dense
                          color="orange darken-3"
                          outlined
                          hint="Барааны дэлгэрэнгүй нэр"
                        ></v-text-field></v-col
                      ><v-col cols="4"
                        ><v-text-field
                          name="name"
                          v-model="product.category"
                          label="Англи нэр"
                          color="orange darken-3"
                          id="id"
                          dense
                          hint="xiaomi note13"
                          outlined
                        ></v-text-field></v-col
                      ><v-col cols="4"
                        ><v-text-field
                          name="name"
                          v-model="product.category"
                          label="Ангилал"
                          color="orange darken-3"
                          id="id"
                          dense
                          hint="Product category"
                          outlined
                        ></v-text-field></v-col></v-row
                    ><v-row class="mt-n6"
                      ><v-col cols="6"
                        ><v-text-field
                          v-model="product.color"
                          name="name"
                          label="Төрөл"
                          id="id"
                          dense
                          color="orange darken-3"
                          outlined
                          hint="Барааны нэр монголоор"
                        ></v-text-field></v-col
                      ><v-col cols="3"
                        ><v-text-field
                          v-model="product.price"
                          name="name"
                          label="Үнэ"
                          color="orange darken-3"
                          id="id"
                          dense
                          outlined
                        ></v-text-field></v-col
                      ><v-col cols="3"
                        ><v-text-field
                          v-model="product.quantity"
                          name="name"
                          label="Тоо ширхэг"
                          color="orange darken-3"
                          id="id"
                          dense
                          outlined
                        ></v-text-field
                      ></v-col>
                    </v-row>
                    <v-row class="mt-n6"
                      ><v-col cols="3"
                        ><v-text-field
                          v-model="product.brand"
                          name="name"
                          label="Бренд"
                          color="orange darken-3"
                          id="id"
                          dense
                          outlined
                        ></v-text-field></v-col
                      ><v-col cols="3"
                        ><v-file-input
                          show-size
                          dense
                          counter
                          multiple
                          label="Зураг оруулах"
                        ></v-file-input></v-col
                      ><v-col cols="6">
                        <v-text-field
                          name="name"
                          v-model="product.images[0]"
                          label="Зурагны линк"
                          color="orange darken-3"
                          hint="https://examplewebsite.mn/Image.png"
                          id="id"
                          dense
                          outlined
                        ></v-text-field> </v-col
                    ></v-row>

                    <v-row
                      ><v-col cols="12"
                        ><v-card elevation="0"
                          ><p>Дэлгэрэнгүй мэдээлэл</p>
                          <VueEditor
                            v-model="product.description"
                          /> </v-card></v-col
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
            show-select
            :footer-props="{
              'items-per-page-text': 'Нэг нүүрэн дэх мөрийн тоо',
            }"
            :headers="headers"
            :items="products"
            :search="search"
          >
            <template v-slot:[`item._id`]="{ item }">
              <v-btn
                class="text-subtitle-2"
                @click="selectProduct(item._id)"
                text
                small
                >{{ item._id }}<v-icon small>mdi-open-in-new</v-icon></v-btn
              >
            </template>

            <template v-slot:[`item.price`]="{ item }">
              {{ formatPrice(item.price) }}
            </template>
            <template v-slot:[`item.createdAt`]="{ item }">
              {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm") }}
            </template>
            <template v-slot:[`item.images[0].xl`]="{ item }">
              <v-card height="50" width="50" class="ma-1">
                <v-img :src="item.images[0].xl"></v-img>
              </v-card>
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
      viewProd: false,
      success: false,
      loading: true,
      errorSnack: false,
      addProduct: false,
      product: { images: [] },
      products: [],
      search: "",
      headers: [
        {
          text: "Барааны дугаар (id)",
          align: "start",
          value: "_id",
        },
        { text: "Зураг ", value: "images[0].xl" },
        { text: "SKU", value: "slug" },
        { text: "Slug", value: "slug" },
        { text: "Нэр ", value: "title" },
        { text: "Бренд", value: "brand" },
        { text: "Үлдэгдэл", value: "quantity" },
        { text: "Төрөл (category)", value: "category" },
        { text: "Үнэ", value: "price" },
        { text: "Үүсгэсэн он сар", value: "createdAt" },
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
    let response = await this.$axios.get("/product/");
    if (response.status == 200) {
      this.products = response.data;
      this.loading = false;
    }
  },
  middleware: "auth",
};
</script>

<style></style>
