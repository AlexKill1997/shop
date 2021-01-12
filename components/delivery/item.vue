<template lang="pug">
  .v-delivery__table--items-item
    img.v-delivery__table--items-item-img(:src="require(`@/assets/images/delivery/${item.img}`)")
    span.v-delivery__table--items-item-weight До {{item.maxWeight}} кг
    span.v-delivery__table--items-item-price От {{item.minPrice}} P
</template>

<script>
export default {
    name: 'DeliveryItem',
    props: {
      item: {
          type: Object,
          default: () => {}
      }
    }
}
</script>

<style lang="sass">
@import '../../layouts/mixins.sass'

.v-delivery__table--items-item
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  background: #FFFFFF
  border: 2px solid #BAB4B4
  padding: 12px
  object-fit: cover
  @include phones
    padding: 5px
  &-img
    width: unset
    max-height: 37px

  &-weight
    font-size: calc(14px + (14 - 14) * ((100vw - 320px) / (1920 - 320)))
    font-weight: bold
    @include phones
      font-size: 12px

  &-price
    font-weight: bold
    font-size: calc(14px + (14 - 14) * ((100vw - 320px) / (1920 - 320)))
    padding: 1px 10px
    background: #DADADA
    @include phones
      font-size: 12px
      padding: 1px
</style>
