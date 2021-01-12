<template lang="pug">
  #v-popup
    .v-popup-wrapper(ref="popupWrapper" @click="closePopup")
    template(v-if="$slots.content !== undefined")
      slot(name="content")
    template(v-else)
      .v-popup
        .v-popup__header
          template(v-if="$slots.header !== undefined")
            slot(name="header")
          template(v-else)
            img(v-if="nameLeftIcon.length > 0" :src="require(`../../assets/images/icons/${nameLeftIcon}`)")
            .v-popup__header-descWrapper
              span.v-popup__header-title {{ popupTitle }}
              span.v-popup__header-desc {{ popupDescription }}
            img.v-popup__header-closeIcon(
              :src="require('../../assets/images/icons/close_mark.svg')"
              title="Закрыть окно"
              alt="Закрыть"
              @click="closePopup")
        .v-popup__content
          slot(name="default")
</template>

<script>
import popupMixin from '@/components/popup/mixins/popupMixin';

export default {
  name: 'BasePopup',
  methods: {},
  mixins: [popupMixin]
}
</script>

<style lang="sass" scoped>
@import '@/layouts/mixins.sass'

#v-popup
  position: absolute
  width: 99vw
  height: 100vh
  z-index: 61 !important
  display: flex
  align-items: center
  justify-content: center
  @include phones
    min-width: 314px

.v-popup-wrapper
  background-color: rgba(0, 0, 0, .46)
  position: fixed
  display: flex
  align-items: center
  justify-content: center
  width: 100vw
  height: 100vh
  z-index: 2000
  top: 0
.v-popup
  padding: 10px
  position: fixed
  z-index: 2001
  background: #fff
  border: 10px solid $gray-1
  max-width: 486px
  left: 50%
  top: 50%
  transform: translate(-50%,-50%)
  height: auto
  @include phones
    border: 10px solid $gray-1
    min-width: 314px
    width: auto
    position: absolute

  &__header
    display: flex
    justify-content: space-between
    align-items: flex-start
    &-descWrapper
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      margin: auto
    &-title
      font-size: 18px
      font-weight: bold
      color: $text
      letter-spacing: .07em
    &-desc
      margin-top: 6px
      font-size: 12px
      font-weight: 300
      letter-spacing: .07em
      text-align: center
      max-width: 300px
    &-closeIcon
      margin-top: 5px
      cursor: pointer
    img:first-child
      // margin-top: 12px
  &__content
    display: flex
    justify-content: center
    flex-direction: column
    margin-top: 15px
  &__footer
    display: flex
    justify-content: center
  .popup-submit
    margin-top: 20px
    margin-bottom: 5px
    padding: 8px 56px
    color: $text
    background-color: $yellow
    border: none
    text-transform: uppercase
    font-size: 15px
    font-weight: 700
    cursor: pointer
</style>
