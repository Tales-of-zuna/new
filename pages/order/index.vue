<template>
  <v-container grid-list-xs>
    <v-row>
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
            :footer-props="{
              'items-per-page-text': 'Нэг нүүрэн дэх мөрийн тоо',
            }"
            single-select
            show-select
            :headers="headers"
            :items="orders"
            :search="search"
            ><template v-slot:no-results>
              <span>Захиалга олдсонгүй</span
              ><v-icon>mdi-clipboard-alert </v-icon>
            </template>

            <template v-slot:[`item._id`]="{ item }">
              <v-btn
                class="text-subtitle-2"
                @click="selectOrder(item._id)"
                text
                small
                >{{ item._id }}<v-icon small>mdi-open-in-new</v-icon></v-btn
              >
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

  methods: {
    selectOrder(orderId) {
      this.$router.push({ name: "order-id", params: { id: orderId } });
    },
  },

  async fetch() {
    let response = await this.$axios.get("/user/orders");
    if (response.status == 200) {
      this.orders = response.data;
      this.loading = false;
    }
  },
};
</script>

<style></style>
