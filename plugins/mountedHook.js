import Vue from 'vue'

Vue.use(vue => {
  vue.mixin({
    data: () => ({
      isMounted: false,
    }),
    methods: {
      blockMounted() {
        this.isMounted = true
      }
    },
    // mounted() {
    //   this.isMounted = true
    // }
  })
})
