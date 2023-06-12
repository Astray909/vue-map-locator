<template>
  <v-app>
    <v-app-bar color="primary" dark hide-on-scroll>
      <!-- banner and site logo -->
      <v-img src="./assets/pin.png" alt="logo" height="40" width="40" contain class="d-flex flex-grow-0 mr-2"></v-img>
      <v-app-bar-title>Map Locator</v-app-bar-title>
    </v-app-bar>
    <GoogleMap />
  </v-app>
</template>

<script>
  import GoogleMap from './components/GoogleMap.vue'
  export default {
    name: 'App',
    components: {
      GoogleMap
    }
  };
</script>
