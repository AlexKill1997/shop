<template lang="pug">
div
  Header
  Nuxt
  Loader
  Footer
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Header from './header.vue'
import Footer from './footer/footer.vue'
import Loader from '../components/Loader/Loader'
export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer,
    Loader,
  },

  data: () => ({
    hidden: false,
  }),

  computed: {
    loading() {
      return this.$store.state.loading
    },
    meta() {
      return [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no',
        },
      ]
    },
    head() {
      const canonical = `https://localhost:3000/${this.$route.path
        .toLowerCase()
        .replace(/\$/, '')}`
      return {
        meta: [...this.meta],
        link: [
          {
            rel: 'canonical',
            href: canonical,
          },
        ],
      }
    },
  },
  methods: {
    ...mapMutations('cart', ['SET_CART']),
    ...mapMutations('favorites', ['SET_FAVORITES']),
    ...mapMutations({
      setWatcheditems: 'product/SET_WATCHED_ITEMS',
      setLocalDataInited: 'SET_LOCAL_DATA_INITED'
    }),

    initData() {
      // все localStorage складывать сюда и прокидывать в мутации
      const localFavorites = localStorage.getItem('favorites')
      const localCart = localStorage.getItem('cart')
      const watchedItems = localStorage.getItem('watchedItems')
      let cart, favorites, watched

      if (localFavorites) {
        favorites = JSON.parse(localFavorites)
        this.SET_FAVORITES(favorites)
      }

      if (localCart) {
        cart = JSON.parse(localCart)
        this.SET_CART(cart)
      }

      if (watchedItems) {
        watched = JSON.parse(watchedItems)
        this.setWatcheditems(watched)
      }

      // this.setWatcheditems([12,3,4,23])
    },
  },
  mounted() {
    if (this.$route.hash === '#login') {
      this.$store.commit('auth/SET_AUTH_POPUP', true)
    }
    this.initData()
    
    this.setLocalDataInited(true)

    this.$root.$on('scroll:block', () => {
      if (window.matchMedia('(min-width: 768px)').matches) return
      const body = document.body
      body.classList.toggle('hidden')
      this.hidden = !this.hidden
    })
    this.$store.commit('setLoading', false)


    //   var lastTouchEnd = 0;
    // document.addEventListener('touchend', function (event) {
    //   var now = (new Date()).getTime();
    //   if (now - lastTouchEnd <= 50) {
    //     event.preventDefault();
    //   }
    //   lastTouchEnd = now;
    // }, false);
  },
}
</script>

<style lang="sass">
@import '@/layouts/mixins.sass'

*
  font-family: 'SF', sans-serif
  -webkit-font-smoothing: subpixel-antialiased
  -moz-osx-font-smoothing: grayscale
  text-rendering: optimizeLegibility
  box-sizing: border-box
  font-weight: bold

  html
    scroll-behavior: smooth
    
  body
    &.hidden
      overflow: hidden

  button
    padding: 0
    margin: 0

  input:focus
    outline: none !important
  @font-face
    font-family: "SF"
    src: url('~@/assets/fonts/SFUIDisplay-Regular.eot')
  .vt-theme-light
    background-color: white !important
  .vt-notification
    padding: 10px 20px !important
    min-height: 75px !important
    min-width: 383px !important
    border-radius: 5px !important
    margin-bottom: 10px !important
    margin-left: auto !important
    margin-right: auto !important
    z-index: 9999 !important
    display: -webkit-box !important
    display: -ms-flexbox !important
    display: flex !important
    -ms-flex-pack: distribute !important
    justify-content: space-around !important
    -webkit-box-align: center !important
    -ms-flex-align: center !important
    align-items: center !important
    -webkit-box-orient: horizontal !important
    -webkit-box-direction: normal !important
    -ms-flex-flow: wrap row !important
    flex-flow: row wrap !important
    -ms-flex-line-pack: center !important
    align-content: center !important
    @include phones
      border-radius: 0 !important
      padding: 10px 10px !important
      min-width: auto !important
      width: 100% !important
      min-height: 30px !important
  .vt-success>.vt-icon>svg
    height: 30px

  .vt-theme-light>.vt-content>.vt-title
    font-size: 18px !important
    @include phones
      font-size: 18px !important
  .vt-theme-light>.vt-content>.vt-paragraph
    font-size: 14px !important
  .vt-notification>.vt-circle
    width: 40px !important
    height: 40px !important
    @include phones
      width: 35px !important
      height: 35px !important

  .vt-notification-container
    @include phones
      width: 100% !important
      margin: 0 !important
      padding: 7px !important

  .icon__tutify
    width: 80px
    height: 80px

  .vt-theme-light>.vt-content
    display: flex
    align-items: center
</style>
