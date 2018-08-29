<template>
  <div>
    <h1>Museum Indonesia</h1>
    <router-link to="/">
      <img alt="Museum Indonesia logo" src="../assets/logo.png" class="logo-100">
    </router-link>
    <br>
    <br>
    Crafted by <a href="https://github.com/mazipan" target="_blank" rel="noopener">Irfan Maulana</a>
    <br>
    <br>
    <small>Feel free to submit issue in <a href="https://github.com/mazipan/museum-indonesia/issues/new" target="_blank" rel="noopener">Github</a> if you found bugs or some data that not updated</small>

    <div class="google-ads">
      <InArticleAdsense
          root-class="InArticleAdsense"
          :data-ad-client="client"
          :data-ad-slot="slot">
      </InArticleAdsense>
    </div>

  </div>
</template>

<script>
import constant from '../constants.js'

export default {
  name: 'About',
  data () {
    return {
      slot: constant.ADS.slotInArticle,
      client: constant.ADS.client
    }
  }
}
</script>
