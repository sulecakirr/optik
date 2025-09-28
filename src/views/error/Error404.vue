<template>
  <!-- Error page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
        <!-- image -->
        <b-img
          fluid
          :src="subuLogo"
          alt="Logo"
          style="width: 50px; height: 50px;"
        />
      <h2 class="brand-text text-primary ml-1" style="margin: 10px;">
        SUBÜ
      </h2>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          Sayfa Bulunamadı 🕵🏻‍♀️
        </h2>

        <b-button
          style="margin: 20px;"
          variant="primary"
          class="mb-2 btn-sm-block"
          :to="{path:'/'}"
        >
          Anasayfaya dön
        </b-button>

        <!-- image -->
        <b-img
          fluid
          :src="imgUrl"
          alt="Error page"
        />
      </div>
    </div>
  </div>
<!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BButton, BImg } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'

export default {
  components: {
    VuexyLogo,
    BLink,
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/error.svg'),
      subuLogo: require('@/assets/images/logo/logo.png')
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/error-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
