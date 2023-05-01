<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12"
        ><v-card>
          <v-card-title primary-title class="d-flex justify-space-between">
            Хэрэглэгчийн жагсаалт
            <div class="d-flex">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn dark v-bind="attrs" fab color="teal" v-on="on">
                    <v-icon>mdi-account-plus</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title primary-title class="grey--text text--darken-2"
                    ><svg
                      width="40px"
                      height="40px"
                      viewBox="0 0 193 193"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      class="mi-layout__logo mr-2"
                    >
                      <title>编组</title>
                      <desc>Created with Sketch.</desc>
                      <defs>
                        <polygon
                          id="path-1"
                          points="1.78097075e-14 0.000125324675 192.540685 0.000125324675 192.540685 192.540058 1.78097075e-14 192.540058"
                        ></polygon>
                      </defs>
                      <g
                        id="\u9875\u9762-1"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        <g id="\u7F16\u7EC4">
                          <mask id="mask-2" fill="white">
                            <use xlink:href="#path-1"></use>
                          </mask>
                          <g id="Clip-2"></g>
                          <path
                            d="M172.473071,20.1164903 C154.306633,2.02148701 128.188344,-1.78097075e-14 96.2706558,-1.78097075e-14 C64.312237,-1.78097075e-14 38.155724,2.0452987 19.9974318,20.1872987 C1.84352597,38.3261656 1.78097075e-14,64.4406948 1.78097075e-14,96.3640227 C1.78097075e-14,128.286724 1.84352597,154.415039 20.0049513,172.556412 C38.1638701,190.704052 64.3141169,192.540058 96.2706558,192.540058 C128.225942,192.540058 154.376815,190.704052 172.53636,172.556412 C190.694653,154.409399 192.540685,128.286724 192.540685,96.3640227 C192.540685,64.3999643 190.672721,38.2553571 172.473071,20.1164903"
                            id="Fill-1"
                            fill="#FF6900"
                            mask="url(#mask-2)"
                          ></path>
                          <path
                            d="M89.1841721,131.948836 C89.1841721,132.594885 88.640263,133.130648 87.9779221,133.130648 L71.5585097,133.130648 C70.8848896,133.130648 70.338474,132.594885 70.338474,131.948836 L70.338474,89.0100961 C70.338474,88.3584078 70.8848896,87.8251513 71.5585097,87.8251513 L87.9779221,87.8251513 C88.640263,87.8251513 89.1841721,88.3584078 89.1841721,89.0100961 L89.1841721,131.948836 Z"
                            id="Fill-3"
                            fill="#FFFFFF"
                            mask="url(#mask-2)"
                          ></path>
                          <path
                            d="M121.332896,131.948836 C121.332896,132.594885 120.786481,133.130648 120.121633,133.130648 L104.492393,133.130648 C103.821906,133.130648 103.275491,132.594885 103.275491,131.948836 L103.275491,131.788421 L103.275491,94.9022357 C103.259198,88.4342292 102.889491,81.7863818 99.5502146,78.445226 C96.6790263,75.5652649 91.3251562,74.9054305 85.7557276,74.7669468 L57.4242049,74.7669468 C56.7555977,74.7669468 56.2154484,75.3045896 56.2154484,75.9512649 L56.2154484,128.074424 L56.2154484,131.948836 C56.2154484,132.594885 55.6640198,133.130648 54.9954127,133.130648 L39.3555198,133.130648 C38.6875393,133.130648 38.1498964,132.594885 38.1498964,131.948836 L38.1498964,60.5996188 C38.1498964,59.9447974 38.6875393,59.4121675 39.3555198,59.4121675 L84.4786692,59.4121675 C96.2717211,59.4121675 108.599909,59.9498104 114.680036,66.0380831 C120.786481,72.1533006 121.332896,84.4595571 121.332896,96.2657682 L121.332896,131.948836 Z"
                            id="Fill-5"
                            fill="#FFFFFF"
                            mask="url(#mask-2)"
                          ></path>
                          <path
                            d="M153.53056,131.948836 C153.53056,132.594885 152.978505,133.130648 152.316164,133.130648 L136.678778,133.130648 C136.010797,133.130648 135.467515,132.594885 135.467515,131.948836 L135.467515,60.5996188 C135.467515,59.9447974 136.010797,59.4121675 136.678778,59.4121675 L152.316164,59.4121675 C152.978505,59.4121675 153.53056,59.9447974 153.53056,60.5996188 L153.53056,131.948836 Z"
                            id="Fill-7"
                            fill="#FFFFFF"
                            mask="url(#mask-2)"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    Xiaomi add user
                  </v-card-title>
                  <v-card-text>
                    <v-row
                      ><v-col cols="6"
                        ><v-text-field
                          outlined
                          dense
                          color="orange"
                          label="Овог"
                          id="id"
                          v-model="register.lastname"
                        ></v-text-field></v-col
                      ><v-col cols="6"
                        ><v-text-field
                          outlined
                          dense
                          color="orange"
                          label="Нэр"
                          id="id"
                          v-model="register.firstname"
                        ></v-text-field></v-col
                    ></v-row>

                    <v-text-field
                      outlined
                      dense
                      color="orange"
                      label="Имэйл"
                      id="id"
                      v-model="register.email"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      dense
                      color="orange"
                      label="Утасны дугаар"
                      id="id"
                      v-model="register.mobile"
                    ></v-text-field>
                    <v-text-field
                      outlined
                      color="orange"
                      dense
                      v-model="register.password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Нууц үг"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      block
                      @click="userSignUp"
                      color="green darken-1 "
                      dark
                      >Хэрэглэгч нэмэх</v-btn
                    >
                    <v-snackbar dark v-model="successSignUp">
                      Амжилттай бүртгүүллээ
                      <v-icon color="success"
                        >mdi-human-greeting-variant</v-icon
                      >

                      <template v-slot:action="{ attrs }">
                        <v-btn
                          dark
                          icon
                          text
                          v-bind="attrs"
                          @click="successSignUp = false"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                    </v-snackbar>
                    <v-snackbar dark v-model="errorSignUp">
                      Бүртгэл үүсгэхэд алдаа гарлаа
                      <v-icon color="error">mdi-account-remove</v-icon>

                      <template v-slot:action="{ attrs }">
                        <v-btn
                          dark
                          icon
                          text
                          v-bind="attrs"
                          @click="errorSignUp = false"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                    </v-snackbar>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card-title>
          <v-card-subtitle>{{
            $moment(new Date()).format("YYYY-MM-DD HH:mm")
          }}</v-card-subtitle>
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
            :headers="headers"
            :items="users"
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
            <template v-slot:[`item.role`]="{ item }">
              <v-btn
                dark
                small
                :color="item.role == 'admin' ? 'orange' : 'teal'"
                ><v-icon>{{
                  item.role == "admin" ? "mdi-shield-crown" : "mdi-account"
                }}</v-icon
                >{{ item.role }}</v-btn
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
    register: {},
    show1: false,
    loading: true,
    value: [
      423, 446, 675, 510, 590, 610, 760, 423, 446, 675, 510, 590, 610, 760,
    ],
    search: "",
    headers: [
      {
        text: "Хэрэглэгчийн дугаар",
        align: "start",
        value: "_id",
      },
      { text: "Хэрэглэгч", value: "firstname" },
      { text: "Хориг", value: "isBlocked" },
      { text: "Имэйл", value: "email" },
      { text: "Утас", value: "mobile" },
      { text: "Үүрэг", value: "role" },
    ],
    users: [],
  }),

  methods: {
    selectOrder(orderId) {
      this.$router.push({ name: "users-id", params: { id: orderId } });
    },
  },
  async userSignUp() {
    let response = await this.$axios.post("/user/register", this.register);
    if (response.status == 200) {
      this.successSignUp = true;
    } else {
      this.errorSignUp = true;
    }
  },
  async fetch() {
    let response = await this.$axios.get("/user/all-users");
    if (response.status == 200) {
      this.users = response.data;
      this.loading = false;
    }
  },
};
</script>

<style></style>
