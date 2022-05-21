<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Register</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form ref="form" class="mx-2 my-2" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="username"
            :rules="usernameRules"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-text-field
            type="password"
            v-model="confirmPassword"
            :rules="confirmPasswordRules"
            label="Confirm password"
            required
          ></v-text-field>
        </v-form>
        <v-divider> </v-divider>
        <small>Don't have an account? <a @click="login">Login</a></small>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$store.commit('hideDialog')">
        Close
      </v-btn>
      <v-btn color="blue darken-1" text @click="register"> Register </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    valid: true,
    name: "marko markovic",
    nameRules: [(v) => !!v || "Name is required"],
    username: "mmarkovic",
    usernameRules: [(v) => !!v || "Surname is required"],
    email: "mmarkovic@email.com",
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Must be a valid email",
    ],
    password: "mmarkovic23",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password must be at least 8 characters",
    ],
    confirmPassword: "mmarkovic23",
    confirmPasswordRules: [(v) => !!v || "Password confirmation is required"],
  }),
  methods: {
    register() {
      const user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      this.$store.dispatch("registerUser", user);
      this.$refs.form.reset();
    },
    login() {
      this.$store.commit("setAction", "login");
      this.$store.commit("showDialog");
    },
  },
};
</script>