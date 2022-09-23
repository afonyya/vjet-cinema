import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#564C55', // #E53935
        secondary: '#9E8279', // #FFCDD2
        accent: '#65483D' // #3F51B5
      }
    }
  }
})
