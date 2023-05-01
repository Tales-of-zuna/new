<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col cols="12">
        <v-card
          ><v-card-title primary-title>
            Захиалга: {{ order._id }}
          </v-card-title>
          <v-card-subtitle>{{
            $moment(order.createdAt).format("YYYY-MM-DD HH:mm")
          }}</v-card-subtitle>

          <v-card-text>
            <v-tabs
              dense
              grow
              background-color="grey lighten-5"
              color="grey darken-3"
              show-arrows
              prev-icon="mdi-arrow-left-bold-box-outline"
              next-icon="mdi-arrow-right-bold-box-outline"
            >
              <v-tab
                ><v-icon class="mr-1 text-capitalize">mdi-view-list</v-icon>
                General info
              </v-tab>

              <v-tab-item>
                <OrderDetail :order="order" />
              </v-tab-item>

              <v-tab
                ><v-icon class="mr-1 text-capitalize"
                  >mdi-truck-delivery</v-icon
                >
                Shipment
              </v-tab>
              <v-tab-item>
                <OrderShipment :order="order" />
              </v-tab-item>
              <!-- <v-tab> Adjustment </v-tab> -->
              <v-tab
                ><v-icon class="mr-1 text-capitalize">mdi-cash</v-icon>
                Payments
              </v-tab>
              <v-tab
                ><v-icon class="mr-1 text-capitalize">mdi-bank</v-icon> Leasing
              </v-tab>
              <v-tab
                ><v-icon class="mr-1 text-capitalize"
                  >mdi-swap-horizontal</v-icon
                >
                State changes
              </v-tab>
              <v-tab
                ><v-icon class="mr-1 text-capitalize">mdi-message</v-icon> SMS
              </v-tab>
              <v-tab
                ><v-icon class="mr-1 text-capitalize">mdi-file-table</v-icon>
                Shipping slip
              </v-tab>
              <v-tab
                ><v-icon class="mr-1 text-capitalize"
                  >mdi-note-edit-outline</v-icon
                >
                Notes
              </v-tab>
              <v-tab
                ><v-icon class="mr-1 text-capitalize"
                  >mdi-file-document-outline</v-icon
                >
                eBarimt
              </v-tab>
              <v-tab
                ><v-icon class="mr-1 text-capitalize">mdi-qrcode</v-icon> QR
                code
              </v-tab>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-col></v-row
    >
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      order: {},
    };
  },
  async fetch() {
    let response = await this.$axios.get(
      "/user/orders/" + this.$route.params.id
    );
    if (response.status == 200) {
      this.order = response.data;
    }
  },
};

</script>

<style></style>
