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
            Төрлийн жагсаалт
            <div class="d-flex">
              <v-dialog v-model="addType" width="1000">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green " dark small v-bind="attrs" v-on="on"
                    >Төрөл нэмэх <v-icon small>mdi-plus</v-icon></v-btn
                  >
                </template>
                <v-card>
                  <v-card-title
                    primary-title
                    class="d-flex justify-space-between"
                  >
                    Төрөл нэмэх
                    <v-btn @click="addType = false" icon
                      ><v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-subtitle
                    >Төрлийн мэдээллийг тусд нь оруулна</v-card-subtitle
                  >

                  <v-card-text>
                    <v-row
                      ><v-col cols="4">
                        <v-text-field
                          v-model="optionType.name"
                          label="Нэр"
                          hide-details
                          id="id"
                          dense
                          color="teal darken-3"
                          outlined
                          hint="Барааны дэлгэрэнгүй нэр"
                        ></v-text-field> </v-col
                      ><v-col cols="4"
                        ><v-text-field
                          hide-details
                          v-model="optionType.sequence"
                          name="SKU"
                          label="Sequence"
                          color="teal darken-3"
                          id="id"
                          dense
                          hint="123456789"
                          outlined
                          type="number"
                        ></v-text-field
                      ></v-col>
                      <v-col class="d-flex align-center" cols="4"
                        ><v-checkbox
                          class="ma-0"
                          hide-details
                          color="teal"
                          :label="optionType.hasImage ? 'Зурагтай' : 'Зураггүй'"
                          v-model="optionType.hasImage"
                        ></v-checkbox
                      ></v-col>
                    </v-row>
                  </v-card-text>
                  {{ optionType }}
                  <v-card-actions>
                    <v-spacer></v-spacer
                    ><v-btn
                      class="mt-3 ml-5"
                      color="teal"
                      text
                      @click="submitAdd()"
                    >
                      Нэмэх </v-btn
                    ><v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card-title>
          <v-card-subtitle>Нийт: {{ this.counter }}</v-card-subtitle>
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
            :items="optionTypes"
            :search="search"
          >
            <template v-slot:item._id="{ item }">
              <v-btn
                class="text-subtitle-2"
                @click="selectProduct(item._id)"
                text
                small
                >{{ item._id }}<v-icon small>mdi-open-in-new</v-icon></v-btn
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
      loading: false,
      image: null,
      type: "optionImages",
      imageUrl: "",
      viewProd: false,
      success: false,
      loading: true,
      errorSnack: false,
      addType: false,
      counter: "",
      optionTypes: [],
      optionType: { hasImage: false, image: null },
      taxs: [],
      search: "",
      headers: [
        { text: "Нэр ", value: "name" },
        { text: "Дараалал ", value: "sequence" },
      ],
    };
  },
  methods: {
    async sendImage(image) {
      let formData = new FormData();
      formData.append("file", image);
      let response = await this.$axios.post(
        "/v1/upload/" + this.type,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200) {
        this.image = null;
        this.imageUrl = response.data;
        this.optionType.image = this.imageUrl;
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
    },
    async submitAdd() {
      let response = await this.$axios.post("/v1/option-types/create", {
        ...this.optionType,
        store: this.$auth.user.store,
      });
      if (response.status == 200) {
        this.success = true;
        this.addType = false;
      } else {
        console.log("boldgue boro");
      }
    },
  },
  async fetch() {
    let response = await this.$axios.post("/v1/option-types", {
      store: this.$auth.user.store,
    });
    if (response.status == 200) {
      this.optionTypes = response.data.rows;
      this.counter = response.data.count;
      this.loading = false;
    }
  },
  middleware: "auth",
};
</script>

<style></style>
