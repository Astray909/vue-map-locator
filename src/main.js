import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";
import vuetify from './plugins/vuetify'

Vue.use(VueGoogleMaps,{
  load:{
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places"
  }
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
