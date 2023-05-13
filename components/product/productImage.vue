<template>
  <div>
    <v-card elevation="0">
      <v-card-title primary-title> Upload image </v-card-title>
      <v-card-subtitle>png , jpg , gif</v-card-subtitle>

      <v-card-text class="d-flex align-center"
        ><v-file-input
          type="file"
          id="file"
          ref="file"
          hide-details
          v-model="image"
          class="col-4"
          color="orange darken-3"
          show-size
          truncate-length="15"
        ></v-file-input>
        <v-btn dark @click="sendImage(image)"
          ><v-icon>mdi-image-plus</v-icon> Нэмэх</v-btn
        >
      </v-card-text>

      <v-card-text>
        <div v-if="product.thumbnails">
          <div v-for="image in product.thumbnails" :key="image">
            {{ "http://192.168.88.245:4004/api/v1/file/" + image }}
            <v-img
              contain
              height="200"
              width="200"
              :src="'http://192.168.88.245:4004/api/v1/file/' + image"
              ><div class="d-flex justify-end">
                <v-btn color="success" icon><v-icon>mdi-close</v-icon></v-btn>
              </div>
            </v-img>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      image: null,
      type: "productImages",
      imageUrl: "",
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
        this.product.thumbnails.push(this.imageUrl.url);
      }
    },
  },
};
</script>

<style></style>
