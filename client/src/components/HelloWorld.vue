<template>
  <v-container>
    coucou
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
  }),
  mounted() {
    this.getDocs();
  },
  methods: {
    getDocs() {
      axios
        .get("/api/documents?access_token=pI1lETwMbWKCXs5xPj9JGvNadxVqf75Hn3EcSplaAwwqUdCAJVSOjykrYXeYN9Za")
        .then(res => {
            console.log(res);
        });
    }
  }
};
</script>
