<template>
  <v-alert :type="message.type" v-if="message">
    {{ message.text }}
  </v-alert>
</template>

<script>
export default {
  name: "Message",
  computed: {
    message() {
      return this.$store.getters.getMessage;
    },
  },
};
</script>