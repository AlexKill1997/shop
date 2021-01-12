<template lang="pug">
.v-sales-items
  .v-sales-items__heading-wrapper
    h2.v-sales-items__heading Товары со скидкой
    img.v-sales-items__heading-icon(src="@/assets/images/icons/sale.svg")
  .v-popular-items__list
    vItem(
      v-for="(n,index) in items"
      :key="n.id"
      :item="n"
      v-if="compVersion ? index < 5 : index < 6"
      )
</template>

<script>
import vItem from '@/components/Item'
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data:()=>({
    compVersion: true
  }),
   mounted() {
      window.addEventListener('resize', () => {
        if(window.innerWidth < 1950){
          this.compVersion = true
        }
        else this.compVersion = false
      })
  },
  components: {
    vItem
  }
}
</script>
<style lang="sass" scoped>
@import '../layouts/mixins.sass'
.v-sales-items
  @include tablets
    display: none
  &__heading-wrapper
    padding: 15px 0px  25px 0
    background-image: url('~@/assets/images/divider.png')
    background-position: 0% 40%
    background-repeat: no-repeat
    display: flex
    justify-content: center
    margin: 0 20px
    background-size: contain
    @media screen and(max-width: 1200px)
      background-image: url('~@/assets/images/divider3.png')
    @media screen and(max-width: 1000px)
      background-position: 25% 50%
  &__heading
    font-weight: 700
    font-size: calc(14px + (24 - 14) * ((100vw - 320px) / (1920 - 320)))
    letter-spacing: .07em
    text-transform: uppercase
    text-align: center
    color: white
    &-icon
      margin-left: 15px
      align-self: center
</style>
