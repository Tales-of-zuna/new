<template>
  <v-container grid-list-xs>
    <v-row
      ><v-col cols="12">
        <v-card outlined>
          <v-card-title primary-title> Бараа нэмэх </v-card-title>
          <v-card-text>
            <v-dialog v-model="dialog" width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-bind="attrs"
                  v-on="on"
                  solo
                  color="orange"
                  label="Search Variants using SKU"
                  append-icon="mdi-map-marker"
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </template>

              <v-card>
                <v-card-title class="text-h6 d-flex justify-space-between">
                  Барааны төрөл нэмэх
                  <v-btn @click="dialog = false" small icon
                    ><v-icon small>mdi-close</v-icon></v-btn
                  >
                </v-card-title>
                <v-card-subtitle>
                  <v-text-field
                    color="orange"
                    class="mt-5"
                    solo
                    dense
                    label="Бараа хайх"
                    prepend-inner-icon="mdi-magnify"
                    v-model="search"
                  ></v-text-field>
                </v-card-subtitle>

                <v-card-text class="mt-n5">
                  <v-data-table
                    show-select
                    :headers="headers"
                    :items="products"
                    class="elevation-1"
                    :search="search"
                    hide-default-footer
                  >
                    <template v-slot:[`item.title`]="{ item }">
                      <div class="d-flex">
                        <v-card height="50" width="50">
                          <v-img :src="item.images[0]"></v-img>
                        </v-card>
                        <div class="ml-2">
                          <p class="text-subtitle-2">{{ item.title }}</p>
                          <p class="mt-n3">
                            {{ item.color }}, {{ item.description }}
                          </p>
                        </div>
                      </div>
                    </template>

                    <template v-slot:[`item.price`]="{ item }">
                      {{ formatPrice(item.price) }}
                    </template>
                  </v-data-table>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn small color="success">Бүх барааг нэмэх</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    color="grey darken-2"
                    plain
                    @click="dialog = false"
                  >
                    Цуцлах
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-card>
      </v-col></v-row
    >

    <v-row
      ><v-col cols="12">
        <v-card outlined>
          <v-card-title class="d-flex justify-space-between" primary-title>
            <div class="d-flex align-center">
              {{ order._id }}:
              <v-btn x-small elevation="0" class="ml-2" color="grey lighten-3"
                >Хүргэхэд бэлэн</v-btn
              >
              <span class="font-weight-light ml-2">From: Central</span>
            </div>
            <div class="d-flex">
              <v-btn small color="teal " dark>Mark as shipped</v-btn>
              <v-btn class="ml-2" small color="success"
                >Mark as shipped without sms</v-btn
              >
            </div>
          </v-card-title>
          <v-card-text>
            <v-data-table
              show-select
              :headers="headers"
              :items="products"
              class="elevation-1"
              :search="search"
              hide-default-footer
            >
              <template v-slot:[`item.title`]="{ item }">
                <div class="d-flex align-center">
                  <v-card height="50" width="50">
                    <v-img :src="item.images[0]"></v-img>
                  </v-card>
                  <div class="ml-2">
                    <p class="text-subtitle-2">{{ item.title }}</p>
                    <p class="mt-n3">
                      {{ item.color }}, {{ item.description }}
                    </p>
                  </div>
                </div>
              </template>

              <template v-slot:[`item.price`]="{ item }">
                {{ formatPrice(item.price) }}
              </template>
            </v-data-table>
            <v-sheet class="pa-2 mt-2 d-flex justify-end text-h6">
              Нийт: {{ formatPrice(order.paymentIntent.amount) }}
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col></v-row
    >
  </v-container>
</template>

<script>
export default {
  props: {
    order: { type: Object },
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Бараа",
          align: "start",
          value: "title",
        },
        { text: "Үнэ", value: "price" },
      ],
      dialog: false,
      products: [],
      loading: true,
    };
  },

  async fetch() {
    let response = await this.$axios.get("/product/");
    if (response.status == 200) {
      this.products = response.data;
      this.loading = false;
    }
  },

  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
    },
  },
};
</script>

<style></style>
