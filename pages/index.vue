<template>
  <v-container grid-list-xs>
    <v-row
      ><v-col cols="4"
        ><v-card>
          <v-card-title primary-title> Сайн уу, Zuna! 🎉</v-card-title>
          <v-card-subtitle>Энэ сарын цэвэр ашиг</v-card-subtitle>
          <v-card-text class="">
            <p class="text-h5 font-weight-bold orange--text ma-0">$42.8k</p>
            <p class="">78% өсөлт 🚀</p> </v-card-text
          ><v-card-actions> </v-card-actions></v-card></v-col
      ><v-col cols="5"
        ><v-card class="fill-height">
          <v-card-title primary-title> Захиалгын статистик </v-card-title>
          <v-card-subtitle> Энэ сард нийт 48.5%-ийн өсөлт 😎 </v-card-subtitle>
          <v-card-text
            ><v-row
              ><v-col cols="2"
                ><v-card>
                  <v-card-title primary-title class="text-subtitle-2">
                    Нийт
                  </v-card-title>
                  <v-card-subtitle class="text-h5">{{
                    orders.length
                  }}</v-card-subtitle>
                </v-card></v-col
              ></v-row
            ></v-card-text
          >
        </v-card></v-col
      ><v-col cols="3"
        ><v-card class="fill-height">
          <v-card-title primary-title> Хүргэлт </v-card-title>
          <v-card-subtitle> Энэ сард нийт 48.5%-ийн өсөлт 😎 </v-card-subtitle>
          <v-card-text
            ><v-row
              ><v-col v-for="item in 3" :key="item" cols="4"
                ><v-card>
                  <v-card-title primary-title class="text-subtitle-2">
                    TOTAL
                  </v-card-title>
                  <v-card-subtitle class="text-h5">{{
                    orders.length
                  }}</v-card-subtitle>
                </v-card></v-col
              ></v-row
            ></v-card-text
          >
        </v-card></v-col
      >
      <v-col cols="12"
        ><v-card>
          <v-card-title primary-title class="d-flex justify-space-between">
            Захиалгын жагсаалт
            <div class="d-flex">
              <v-btn class="mx-2" small dark>Бүгдийг сонгох</v-btn
              ><v-btn color="green" dark small
                >Захиалга үүсгэх <v-icon small>mdi-plus</v-icon></v-btn
              >
            </div>
          </v-card-title>
          <v-card-subtitle>2023/04/11</v-card-subtitle>
          <v-card-text>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Хайх"
              single-line
              hide-details
              :loading="loading"
              loading-text="Уншиж байна... Түр хүлээнэ үү"
              color="grey darken-3"
            ></v-text-field>
          </v-card-text>
          <v-data-table
            @click:row="selectOrder()"
            :footer-props="{
              'items-per-page-text': 'Нэг нүүрэн дэх мөрийн тоо',
            }"
            show-select
            :headers="headers"
            :items="orders"
            :search="search"
            ><template v-slot:no-results>
              <span>Захиалга олдсонгүй</span
              ><v-icon>mdi-clipboard-alert </v-icon>
            </template>
          </v-data-table>
        </v-card></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    value: [
      423, 446, 675, 510, 590, 610, 760, 423, 446, 675, 510, 590, 610, 760,
    ],
    search: "",
    headers: [
      {
        text: "Захиалгын дугаар",
        align: "start",
        value: "_id",
      },
      { text: "Захиалагч", value: "orderby.firstname" },
      { text: "Төлөв", value: "orderStatus" },
      { text: "Утас", value: "orderby.mobile" },
      { text: "Имэйл", value: "orderby.email" },
      { text: "Барааны тоо", value: "products.length" },
      { text: "Төлбөр", value: "paymentIntent.amount" },
      { text: "Он сар өдөр", value: "createdAt" },
    ],
    orders: [],
  }),

  async fetch() {
    let response = await this.$axios.get("/user/orders");
    if (response.status == 200) {
      this.orders = response.data;
      this.loading = false;
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
    },
  },
  middleware: "auth",
};
</script>

<style></style>
