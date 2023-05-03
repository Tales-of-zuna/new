<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12">
        <v-snackbar v-model="success">
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
            Төрлийн жагсаалт
            <v-dialog v-model="big" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="teal" dark v-bind="attrs" v-on="on">
                  Ангилал нэмэх
                  <v-icon>mdi-note-plus</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="d-flex justify-space-between">
                  Ангилал (Taxon) нэмэх
                  <v-btn color="" @click="big = false" icon
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-card-title>

                <v-card-text>
                  <v-row
                    ><v-col cols="6"
                      ><v-text-field
                        v-model="taxon.name"
                        name="name"
                        label="Нэр"
                        color="teal"
                        hint="Гутал"
                        id="id"
                        dense
                        outlined
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6"
                      ><v-text-field
                        v-model="taxon.sequence"
                        name="name"
                        label="Эзлэх байрлал"
                        color="teal "
                        hint="1"
                        id="id"
                        dense
                        outlined
                      ></v-text-field
                    ></v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="teal" text @click="(big = false), bigAdd()">
                    Нэмэх </v-btn
                  ><v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-subtitle>Нийт: {{ taxons.count }}</v-card-subtitle>
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

          <v-treeview
            :search="search"
            :items="taxons.rows"
            item-key="name"
            color="teal"
            open-on-click
            expand-icon="mdi-chevron-down"
          >
            <template v-slot:prepend="{ item, open }">
              <v-icon :color="open ? 'grey darken-2' : ''" v-if="!item.file">
                {{ open ? "mdi-folder-open" : "mdi-folder" }}
              </v-icon>
              <v-icon v-else>
                {{ files[item.file] }}
              </v-icon>
            </template>
            <template v-slot:append="{ item }">
              <v-dialog v-model="item.title" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon color="green" v-bind="attrs" v-on="on">
                    <v-icon>mdi-note-plus</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="d-flex justify-space-between">
                    Ангилал (Taxon) нэмэх
                    <v-btn color="" @click="item.title = false" icon
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-row
                      ><v-col cols="6"
                        ><v-text-field
                          v-model="taxon.name"
                          name="name"
                          label="Нэр"
                          color="teal"
                          hint="Гутал"
                          id="id"
                          dense
                          outlined
                        ></v-text-field
                      ></v-col>
                      <v-col cols="6"
                        ><v-text-field
                          v-model="taxon.sequence"
                          name="name"
                          label="Эзлэх байрлал"
                          color="teal "
                          hint="1"
                          id="id"
                          dense
                          outlined
                        ></v-text-field
                      ></v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="teal"
                      text
                      @click="(item.title = false), submitAdd(item._id)"
                    >
                      Нэмэх </v-btn
                    ><v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn color="red" @click="deleteTaxon(item._id)" icon
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </template>
            <v-btn color="success">text</v-btn>
          </v-treeview>
        </v-card>
      </v-col></v-row
    >
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      big: false,
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
    async bigAdd() {
      this.taxon.store = this.$auth.user.store;
      let response = await this.$axios.post("/v1/taxon/create", this.taxon);
      if (response.status == 200) {
        this.taxons = response.data;
        this.loading = false;
      }
      this.taxon = {};
    },
    async submitAdd(id) {
      this.taxon.parentTaxon = id;
      this.taxon.store = this.$auth.user.store;
      let response = await this.$axios.post("/v1/taxon/create", this.taxon);
      if (response.status == 200) {
        this.taxons = response.data;
        this.loading = false;
      }
      this.taxon = {};
    },
    async deleteTaxon(id) {
      let response = await this.$axios.put(`/v1/taxon/${id}`, {
        active: false,
      });
      if (response.status == 200) {
        this.taxons = response.data;
        this.loading = false;
      }
    },
  },
  async fetch() {
    let response = await this.$axios.post("/v1/taxons/list", {
      store: this.$auth.user.store,
    });
    if (response.status == 200) {
      this.taxons = response.data;
      this.loading = false;
    }
  },
  middleware: "auth",
};
</script>

<style></style>
