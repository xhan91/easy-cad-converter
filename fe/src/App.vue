<template>
  <v-app>
    <v-container fluid ma-0 pa-0>
      <converter></converter>
    </v-container>
  </v-app>
</template>

<script>
import converter from './components/Converter.vue';

export default {
  name: 'App',
  components: {
    converter,
  },
};
</script>
