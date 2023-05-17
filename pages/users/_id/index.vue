<template>
  <v-container grid-list-xs>
    <v-row
      ><v-col cols="12"
        ><v-card>
          <v-card-title primary-title>Хэрэглэгчийн мэдээлэл </v-card-title>
          <v-card-subtitle class="d-flex mt-0">
            <v-img
              class="rounded-lg"
              max-width="150"
              height="150"
              src="https://scontent.fuln1-2.fna.fbcdn.net/v/t1.18169-9/27332321_10214826116952668_1680983326327375812_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=ma1mW3aJ7FIAX9CUgPI&_nc_ht=scontent.fuln1-2.fna&oh=00_AfAaYFNuUUHkQAk9pusH2ItvVvrQ4qgWYIBTWnb07BBRXA&oe=64698D49"
            ></v-img>
            <div class="ml-4 d-flex flex-column">
              <v-btn class="" color="grey darken-1" text>{{
                user.firstname
              }}</v-btn>
              <v-btn
                class="mt-4"
                dark
                :color="user.role == 'admin' ? 'teal' : 'teal'"
                ><v-icon>{{
                  user.role == "admin" ? "mdi-shield-crown" : "mdi-account"
                }}</v-icon
                >{{ user.role }}</v-btn
              >
              <v-btn class="mt-4" color="grey darken-1" outlined>{{
                $moment(user.createdAt).format("YYYY-MM-DD HH:mm")
              }}</v-btn>
            </div>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-row
              ><v-col cols="6">
                <v-text-field
                  label="Нэр"
                  outlined
                  color="teal"
                  dense
                  v-model="user.firstname"
                ></v-text-field
                ><v-text-field
                  label="Имэйл"
                  outlined
                  color="teal"
                  dense
                  v-model="user.email"
                ></v-text-field>
                <v-text-field
                  label="Хаяг"
                  outlined
                  color="teal"
                  dense
                  v-model="user.address"
                ></v-text-field></v-col
              ><v-col cols="6">
                <v-text-field
                  label="Эцэг / Эхийн нэр"
                  outlined
                  color="teal"
                  v-model="user.lastname"
                  dense
                ></v-text-field>
                <v-text-field
                  label="Утасны дугаар"
                  outlined
                  color="teal"
                  dense
                  v-model="user.mobile"
                ></v-text-field>
                <v-select
                  :items="roles"
                  label="Үүрэг"
                  outlined
                  dense
                  color="teal"
                  v-model="user.role"
                ></v-select> </v-col
            ></v-row>
          </v-card-text>

          <v-card-actions>
            <v-snackbar light v-model="complete">
              Амжилттай хадгаллаа

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="pink"
                  text
                  icon
                  v-bind="attrs"
                  @click="complete = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
            <v-snackbar dark v-model="deleted">
              Хэрэглэгч устгагдлаа

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="pink"
                  text
                  icon
                  v-bind="attrs"
                  @click="deleted = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
            <v-spacer></v-spacer
            ><v-btn @click="updateUser()" color="success">Хадгалах</v-btn
            ><v-btn @click="deleteUser()" outlined color="error">Устгах</v-btn
            ><v-spacer></v-spacer> </v-card-actions></v-card></v-col
    ></v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      roles: ["user", "admin"],
      complete: false,
      deleted: false,
    };
  },
  async fetch() {
    let response = await this.$axios.get("/user/" + this.$route.params.id);
    if (response.status == 200) {
      this.user = response.data;
    }
  },
  methods: {
    async updateUser() {
      let response = await this.$axios.put(
        "/user/" + this.$route.params.id,
        this.user
      );
      if (response.status == 200) {
        this.complete = true;
      } else {
        console.log(error);
      }
    },
    async deleteUser() {
      let response = await this.$axios.delete("/user/" + this.$route.params.id);
      if (response.status == 200) {
        this.deleted = true;
      }
    },
  },
  middleware: "auth",
};
</script>

<style></style>
