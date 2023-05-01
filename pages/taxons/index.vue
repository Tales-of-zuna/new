<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12"> <v-snackbar v-model="success">
          Амжилттай нэмэгдлээ <v-icon>mdi-emoticon-cool</v-icon>
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
            Төрлийн жагсаалт
            <div class="d-flex">
              <v-dialog v-model="addTaxon" width="1000">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="green " dark small v-bind="attrs" v-on="on">Төрөл нэмэх <v-icon
                      small>mdi-plus</v-icon></v-btn>
                </template>
                <v-card>
                  <v-card-title primary-title class="d-flex justify-space-between">
                    Төрөл нэмэх
                    <v-btn @click="addTaxon = false" icon><v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>

                  <v-card-text>
                    <v-row class="d-flex"><v-col cols="4"><v-text-field class="mt-3" v-model="taxon.name" name="name"
                          label="Төрлийн Нэр" color="orange darken-3" id="id" dense outlined>
                        </v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field class="mt-3" v-model="taxon.store" name="name" label="Slug" color="orange darken-3"
                          id="id" dense outlined></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-switch v-model="taxon.active" color="orange" :label="taxon.active ? 'Идэвхитэй' : 'Идэвхгүй'"
                          dense outlined></v-switch>
                      </v-col>
                    </v-row>
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
          <v-card-subtitle>Нийт: {{ taxons.count }}</v-card-subtitle>
          <v-card-text>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Хайх" single-line :loading="loading"
              loading-text="Уншиж байна... Түр хүлээнэ үү" hide-details color="grey darken-3"></v-text-field>
          </v-card-text>
          <v-data-table show-select :footer-props="{
              'items-per-page-text': 'Нэг нүүрэн дэх мөрийн тоо',
            }" :headers="headers" :items="taxons.rows" :search="search">
            {{ item }}
            <template v-slot:[`item.price`]="{ item }">
              {{ formatPrice(item.price) }}
            </template>
            <template v-slot:[`item.sellPrice`]="{ item }">
              {{ formatPrice(item.sellPrice) }}
            </template>
            <template v-slot:[`item.available`]="{ item }">
              {{ available ? "Тийм" : "Үгүй" }}
            </template>
            <template v-slot:[`item.availableOn`]="{ item }">
              {{ $moment(item.availableOn).format("YYYY-MM-DD HH:mm") }}
            </template>
            <template v-slot:[`item.images[0].xl`]="{ item }">
              <v-card height="50" width="50" class="ma-1">
                <v-img :src="item?.thumbnail[0]"></v-img>
              </v-card>
            </template>

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
      addTaxon: false,
      taxon: {},
      taxons: [],
      search: "",
      headers: [
        { text: "Slug", value: "slug" },
        { text: "Нэр ", value: "name" },
        { text: "Идэвхитэй эсэх", value: "active" },
      ],
    };
  },
  methods: {
    selectTaxon(taxonId) {
      this.$router.push({ name: "taxons-id", params: { id: taxonId } });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₮";
    },
    async submitAdd() {
      let response = await this.$axios.post("/v1/taxon/create", this.taxon);
      if (response.status == 200) {
        this.success = true;
        this.addTaxon = false;
        this.taxon = {};
      } else {
        this.errorSnack = true;
      }
    },
  },
  async fetch() {
    let response = await this.$axios.get("/v1/taxons");
    if (response.status == 200) {
      this.taxons = response.data;
      this.loading = false;
    }
  },
  middleware: "auth",
};
</script>

<style></style>
