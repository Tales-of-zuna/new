<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="drawer" clipped fixed dark app>
      <v-list nav dense>
        <v-list-group
          color="white"
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            :to="child.link"
            v-for="child in item.items"
            :key="child.title"
          >
            <v-list-item-content>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" elevation="2" clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold"
        ><v-btn class="" to="/" text>
          <v-icon color="red">mdi-tailwind</v-icon>
          Tailwind.MN</v-btn
        ></v-toolbar-title
      >
      <v-spacer />
      <!-- <v-btn text> {{ $auth.user.store }}</v-btn> -->
      <v-btn small class="mr-2" color="teal darken-3" dark>Xiaomi </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="$auth.user"
            color="grey darken-3"
            small
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon> {{ $auth.user.email }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in profile" :key="index">
            <v-list-item-title
              >{{ item.title
              }}<v-icon>{{ item.icon }}</v-icon></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main style="background-color: #f5f5f5">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      profile: [
        { title: "Profile", icon: "mdi-account" },
        { title: "Дэлгэрэнгүй мэдээлэл", icon: "mdi-list-box" },
        { title: "Гарах", icon: "mdi-logout" },
      ],
      items: [
        {
          action: "mdi-view-dashboard",
          active: true,
          items: [{ title: "Dashboard", link: "/" }],
          title: "Хяналтын самбар",
        },
        {
          action: "mdi-view-list",

          items: [
            { title: "List", link: "/order" },
            { title: "Leasing" },
            { title: "Notes" },
            { title: "Printings" },
          ],
          title: "Захиалга",
        },
        {
          action: "mdi-cart",

          items: [
            { title: "Category", link: "/taxons" },
            { title: "Option type", link: "/optiontype" },
            { title: "All products", link: "/products" },
            { title: "Product Listing" },
            { title: "Elastic Products" },
            { title: "Add Product", link: "/products/create" },
            { title: "Badges" },
            { title: "Brands", link: "/brands" },
            { title: "Mass import" },
            { title: "Price update" },
            { title: "Variants" },
            { title: "Stock" },
          ],
          title: "Бараа",
        },
        {
          action: "mdi-account",
          items: [
            { title: "Хэрэглэгчийн жагсаалт", link: "/users" },
            { title: "Contact Forms" },
          ],
          title: "Хэрэглэгчид",
        },
        {
          action: "mdi-gift",
          items: [{ title: "Discount" }, { title: "Gift Cards" }],
          title: "Урамшуулал",
        },
        {
          action: "mdi-truck-delivery",
          items: [
            { title: "Dashboard" },
            { title: "Products to collect" },
            { title: "By Vendors" },
            { title: "Pivot" },
            { title: "Products To Return" },
            { title: "Delivery Report" },
            { title: "Driver Report" },
            { title: "Delivery Schedule" },
            { title: "Store Locations" },
            { title: "Map" },
          ],
          title: "Биелэлт",
        },
        {
          action: "mdi-note-text-outline",
          items: [
            { title: "Page" },
            { title: "News" },
            { title: "Articles" },
            { title: "Authors" },
            { title: "Menu" },
            { title: "Notifications" },
            { title: "Look Book" },
            { title: "Polls" },
            { title: "File Manager" },
          ],
          title: "Контент",
        },
        {
          action: "mdi-chart-bar",
          items: [{ title: "Order" }, { title: "Product" }],
          title: "Тайлан",
        },
        {
          action: "mdi-account-group",
          items: [
            { title: "Orders" },
            { title: "General Report" },
            { title: "Products To Collect" },
            { title: "Products To Return" },
            { title: "Contracts" },
            { title: "Store Information" },
            { title: "E-Tickets" },
            { title: "Coupons" },
            { title: "Seller" },
          ],
          title: "Худалдаа",
        },
        {
          action: "mdi-sale",
          items: [
            { title: "Mass SMS" },
            { title: "Push Notifications" },
            { title: "Email" },
            { title: "RFM" },
            { title: "Automation" },
          ],
          title: "Маркетинг",
        },

        {
          action: "mdi-bank",
          items: [
            { title: "Corporate Gateway" },
            { title: "Буцаалтын гүйлгээ" },
          ],
          title: "Корпорацийн гарц",
        },
        {
          action: "mdi-check-decagram",
          items: [{ title: "Баталгаат хугацаа" }],
          title: "Баталгаат хугацаа",
        },
        {
          action: "mdi-help",
          items: [{ title: "Шинэчлэлтүүд" }],
          title: "Шинэчлэлтүүд",
        },
      ],
    };
  },
};
</script>
<style>
::-webkit-scrollbar {
  width: 13px;
}

::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: black;
}
</style>
