<template lang="pug">
  .v-percent-bar
    .v-percent-bar__line-wrap
      .v-percent-bar__line(:style="{ width: `${percent}%` }" :class="[`v-percent-bar__line--color--${getColor}`]")
      .v-percent-bar__number {{ percent }}%
    
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      required: true,
      default: () => 0
    }
  },
  computed: {
    getColor() {
      const { percent } = this
      
      switch(true) {
        case percent < 30:
          return 'red'
          break;
        case percent < 70:
          return 'orange'
          break;
        default:
          return 'green'
      }
    }
  }
}
</script>

<style lang="sass">

.v-percent-bar
  &__line-wrap
    overflow: hidden
    position: relative
    width: 100%
    height: 15px
    border-radius: 10px
    background-color: #f6f6f6
    margin:
      top: 15px
      bottom: 15px
    border: 2px solid #BAB4B4
  &__line
    position: absolute
    height: 100%
    max-width: 100%
    width: 0

    &--color
      &--red
        background-color: #ef476f
      &--orange
        background-color: #FFB400
      &--green
        background-color: #17C671

  &__number
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%) 
    font-size: 12px
    color: $text
</style>