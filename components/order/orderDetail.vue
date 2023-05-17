<template>
  <v-container v-if="order" grid-list-xs>
    <!-- deed order stateuud -->
    <v-row
      ><v-col cols="12">
        <v-card elevation="0 " outlined>
          <v-card-text>
            <v-row
              ><v-col class="" cols="3"
                ><div class="d-flex align-center">
                  <v-btn color="success" fab class="mr-2"
                    ><v-icon>mdi-clock-time-eight-outline</v-icon></v-btn
                  >
                  <div>
                    <p class="text-h6">2023/04/16 21:58</p>
                    <p class="ma-0 mt-n5 green--text">ЗАХИАЛСАН</p>
                  </div>
                </div></v-col
              ><v-divider vertical inset></v-divider
              ><v-col class="" cols="3"
                ><div class="d-flex align-center">
                  <v-btn color="teal" dark fab class="mr-2"
                    ><v-icon>mdi-credit-card-clock-outline</v-icon></v-btn
                  >
                  <div>
                    <p class="text-h6">--</p>
                    <p class="ma-0 mt-n5 teal--text">ТӨЛБӨР ХҮЛЭЭГДЭЖ БУЙ</p>
                  </div>
                </div></v-col
              ><v-divider vertical inset></v-divider
              ><v-col class="" cols="3"
                ><div class="d-flex align-center">
                  <v-btn color="teal" dark fab class="mr-2"
                    ><v-icon>mdi-car-clock</v-icon></v-btn
                  >
                  <div>
                    <p class="text-h6">--</p>
                    <p class="ma-0 mt-n5 teal--text">ХҮЛЭЭГДЭЖ БУЙ</p>
                  </div>
                </div></v-col
              ><v-divider vertical inset></v-divider
              ><v-col class="" cols="3"
                ><div class="d-flex align-center">
                  <v-btn color="blue" dark fab class="mr-2"
                    ><v-icon>mdi-cart</v-icon></v-btn
                  >
                  <div>
                    <p class="text-h6">2,604,000 ₮</p>
                    <p class="ma-0 mt-n5 blue--text">Нийт дүн</p>
                  </div>
                </div></v-col
              ></v-row
            >
          </v-card-text>
        </v-card>
      </v-col></v-row
    >
    <v-row
      ><v-col cols="12">
        <v-card outlined>
          <v-card-title primary-title> Бараанууд </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Зураг</th>
                    <th class="text-left">Барааны нэр</th>
                    <th class="text-left">SKU</th>

                    <th class="text-left">Бренд</th>
                    <th class="text-left">Үнэ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item">
                    <td class="pa-2">
                      <v-img
                        height="50"
                        width="50"
                        :src="item.product.images[0].xl"
                      ></v-img>
                    </td>
                    <td>{{ item.product.title }}</td>
                    <td>{{ item.product.slug }}</td>

                    <td>{{ item.product.brand }}</td>
                    <td>{{ formatPrice(item.product.price) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div class="text-right text-h6 mr-5">
              Нийт: {{ formatPrice(order.paymentIntent.amount) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col></v-row
    >
    <v-row
      ><v-col cols="4"
        ><v-card outlined>
          <v-card-title
            class="d-flex align-center justify-space-between"
            primary-title
          >
            Захиалгын хураангуй
            <v-btn light icon><v-icon>mdi-square-edit-outline</v-icon></v-btn>
          </v-card-title>
          <v-card-subtitle primary-title>
            {{ order.orderby._id }}
          </v-card-subtitle>
          <v-card-text>
            <v-list flat dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-cash</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Нийт төлбөр:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>{{
                    order.paymentIntent.amount
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-clock-time-eight</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Үүсгэсэн хугацаа:</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title>{{
                    $moment(order.createdAt).format("YYYY-MM-DD HH:mm")
                  }}</v-list-item-title></v-list-item-content
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-ticket-percent</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Купон:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>ZUNACOUPON</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-swap-horizontal</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Статус:</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title>{{ order.orderStatus }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card></v-col
      >

      <v-col cols="4"
        ><v-card outlined>
          <v-card-title
            class="d-flex align-center justify-space-between"
            primary-title
          >
            Хэрэглэгчийн мэдээлэл
            <v-btn light icon><v-icon>mdi-square-edit-outline</v-icon></v-btn>
          </v-card-title>
          <v-card-subtitle primary-title>
            {{ order.orderby._id }}
          </v-card-subtitle>
          <v-card-text>
            <v-list flat dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Хэрэглэгч:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>{{
                    order.orderby.firstname
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-cellphone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Утас:</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title>{{
                    order.orderby.mobile
                  }}</v-list-item-title></v-list-item-content
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Имэйл:</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title>{{
                    order.orderby.email
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-map</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Хаяг:</v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title
                    >Туул гол гудамж, 56Е байр 27 тоот</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card></v-col
      >

      <v-col cols="4"
        ><v-card outlined class="fill-height">
          <v-card-title
            class="d-flex align-center justify-space-between"
            primary-title
          >
            Захиалгын хаяг
            <v-btn light icon><v-icon>mdi-square-edit-outline</v-icon></v-btn>
          </v-card-title>
          <v-card-subtitle primary-title>
            {{ order.orderby._id }}
          </v-card-subtitle>
          <v-card-text>
            <v-list flat dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store-marker</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Хүргүүлэх хаяг :</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title
                    >Туул гол гудамж, 56Е байр 27 тоот</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
    },
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
