import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

require('./eventBus')

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
