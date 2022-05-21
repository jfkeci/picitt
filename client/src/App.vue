<template>
  <v-app>
    <div>
      <v-card class="mx-auto overflow-hidden main-background" width="100%">
        <v-app-bar
          absolute
          color="#6A76AB"
          dark
          shrink-on-scroll
          prominent
          src="https://picsum.photos/1920/1080?random"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-3"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <v-app-bar-nav-icon
            @click.stop="navDrawer = !navDrawer"
          ></v-app-bar-nav-icon>

          <v-app-bar-title>PICITT</v-app-bar-title>

          <v-spacer></v-spacer>

          <v-btn icon class="mx-2" @click.stop="postsDrawer = !postsDrawer">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn
            v-if="isLoggedIn"
            icon
            class="mx-2"
            @click="setAction('create')"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <v-btn icon class="mx-3" @click="test"> Test </v-btn>

          <v-btn
            v-if="!isLoggedIn"
            icon
            class="mx-3"
            @click="setAction('login')"
          >
            Login
          </v-btn>

          <v-btn v-if="isLoggedIn" icon class="mx-3" @click="logout">
            Logout
          </v-btn>

          <v-btn
            v-if="!isLoggedIn"
            icon
            class="mx-3"
            @click="setAction('register')"
            style="margin-left: 20px"
          >
            Register
          </v-btn>

          <!-- <template v-slot:extension>
            <v-tabs align-with-title>
              <v-tab @click="getPosts('new')">New</v-tab>
              <v-tab @click="getPosts('popular')">Popular</v-tab>
            </v-tabs>
          </template> -->
        </v-app-bar>

        <v-sheet
          id="scrolling-techniques-3"
          class="overflow-y-auto"
          max-height="100vh"
          style="padding-top: 20vh"
        >
          <v-row no-gutters>
            <v-col cols="3">
              <!---->
            </v-col>
            <v-col class="ml-3 mr-3">
              <Message />
              <v-row justify="center">
                <v-progress-circular
                  v-if="loading"
                  class="text-xs-center"
                  indeterminate
                  color="purple"
                ></v-progress-circular>
              </v-row>
              <div class="mt-3">
                <!-- <router-view /> -->
                <Posts />
              </div>
            </v-col>

            <div class="text-center">
              <v-dialog
                v-model="dialog"
                width="500"
                content-class="my-custom-dialog"
              >
                <ContentDialog />
              </v-dialog>
            </div>
          </v-row>
          <Footer />
        </v-sheet>

        <v-navigation-drawer v-model="navDrawer" absolute temporary>
          <v-list nav dense>
            <v-list-item-group
              active-class="deep-purple--text text--accent-4"
              style="margin-top: 20vh"
            >
              <v-list-item to="/">
                <v-list-item-title> Home </v-list-item-title>
              </v-list-item>

              <v-list-item to="/about">
                <v-list-item-title> About </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer
          v-model="postsDrawer"
          absolute
          temporary
          width="400px"
        >
          <v-list nav dense>
            <SearchBar />
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import Posts from "./components/Posts/Posts";
import ContentDialog from "./components/ContentDialog";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Message from "./components/Message";

export default {
  name: "App",
  components: {
    Posts,
    Footer,
    SearchBar,
    Message,
    ContentDialog,
  },
  data: () => ({
    navDrawer: false,
    postsDrawer: false,
    postsGroup: null,
    filter: "newest",
  }),
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.getUser;
    },
    dialog: {
      get() {
        return this.$store.getters.getDialogState;
      },
      set(value) {
        this.$store.commit("setDialogState", value);
      },
    },
  },
  mounted() {
    this.$store.dispatch("checkTokenUser");
    this.$store.dispatch("fetchPosts", { type: "all" });
  },
  methods: {
    setAction(action) {
      this.$store.commit("setAction", action);
      this.$store.commit("showDialog");
    },
    closeDialog() {
      this.$store.commit("hideDialog");
    },
    logout() {
      this.$store.commit("logout");
      location.reload();
    },
    test() {
      console.log("TEST");
      console.log(this.$store.getters.getPosts);
    },
  },
  watch: {
    postsGroup() {
      this.postsDrawer = false;
    },
  },
};
</script>


<style>
@import "./assets/css/main.css";
@import "./assets/css/background.css";

.card-outter {
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
.my-custom-dialog {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>