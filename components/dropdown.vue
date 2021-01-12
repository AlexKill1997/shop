<template lang="pug">
  #v-sublist
    slot
</template>

<script>
export default {
  name: 'SublistDropdown'
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
.catalog-dropdown-sublist
  background-color: #fff
  z-index: 1000
  min-height: 100%
  box-shadow: 0 2px 5px lightgrey
  &::-webkit-scrollbar 
    -webkit-appearance: none !important
  &::-webkit-scrollbar
    width: 4px !important
    background-color: #F5F5F5
    &-track
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
      border-radius: 10px
      background-color: #F5F5F5
    &-thumb
      border-radius: 10px
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
      background-color: #555
  #v-sublist
    &::before
      position: absolute
      left: -4px
      height: 100%
      width: 4px
      content: ""
  @include mediumlaptop
    min-width: auto
.vDropdown
  display: none
  .catalog-subdrop
    padding: 0 7px
    margin-bottom: 5px
    margin-top: 5px
    width: 413px
    &-item
      position: relative
      display: flex
      flex-direction: row
      align-items: center
      height: 46px
      padding-left: 23px
      background-color: $gray-1
      font-size: 16px
      font-weight: bold
      letter-spacing: .07em
      color: $text
      cursor: pointer
      padding: 7px
      text-decoration: none
      &__pic
        margin-right: 5px
        transform: rotate(-90deg)
        width: 20px
        height: 20px
        img
          height: 100%
      &:hover
        background-color: darken($gray-1, 4%)
.catalogSubdropOpen
  display: block
</style>
