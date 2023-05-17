<template>
  <v-container grid-list-xs>
    <v-row
      ><v-col cols="4">
        <v-treeview
          :search="search"
          :items="options"
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
        </v-treeview>
      </v-col></v-row
    >
  </v-container>
</template>

<!-- product-> option create(optiontype id){text value sequence image hasImage} -->
<script>
export default {
  props: {
    options: { type: Array },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
