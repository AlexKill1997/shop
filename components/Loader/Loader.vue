<template>
  <div class="overlay" v-if="loading">
    <div class="lds-roller">
      <!-- <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div> -->
      <transition name="fade">
        <img class="img_roller" src="~@/assets/images/about/logo_298x380.png">
      </transition>
      
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      loading: 'GET_LOADING',
    }),
  },
  methods: {
    start() {
      this.$store.commit("setLoading", true)
    },
    finish() {
      this.$store.commit("setLoading", false)
    }
  }
}
</script>
<style lang="sass" scoped>
@import './Loader.css';
.overlay
  z-index: 100000

.lds-roller
  @media screen and(max-width: 480px)
    width: 100%



</style>
