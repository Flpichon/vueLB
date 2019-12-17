<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
    Coucou les amis
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    value: false
  }),
  mounted() {
    this.getDocuments();
  },
  methods: {
    getDocuments() {
      this.value = true;
      console.log(this.value);
    }
  }
};
</script>
