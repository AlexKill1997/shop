<script>
import brandCatalog from '@/components/catalog/brands.vue'
import baseCatalog from '@/components/catalog/index.vue'
import noProductsCatalog from '@/components/catalog/no-products.vue'

export default {
  functional: true,
  render(h, { children, data, props }) {
    let renderComponent;

    switch(data.attrs.type) {

      case 'no-products':
        renderComponent = noProductsCatalog
      break;
      case 'brand':
        renderComponent = brandCatalog
      break;
      case 'category':
        renderComponent = baseCatalog
      break;
      default:
        renderComponent = baseCatalog
      break;
    }

    return h(renderComponent, data, children)
  }
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
@import '../assets/sass/checkboxStyles/checkbox.sass'
.slider
  width: 200px
#v-catalog
  @include phones
    display: flex
    flex-direction: column
    height: 100%


.v-catalog
  display: flex
  flex-direction: row
  padding: 0px 45px
  justify-content: space-between
  @include tablets
    padding: 0
  @include phones
    display: block
    padding: 0
  &__heading
    margin-left: 45px
    @include phones
      display: none

.categories__list, .filters__list, .filters__list__open
  list-style: none
  padding-left: 0px
.categories__list
  padding-top: 10px
  margin: 0
  @include phones
    text-transform: uppercase
    font-weight: bold
    padding-top: 0
    margin-bottom: 20px
.filters__list-item
  text-transform: none
  cursor: pointer
  &:not(:last-child)
    @include phones
      // border-bottom: 2px solid #bab4b4

  &:not(:first-child)
    margin-top: 8px
    @include phones
      margin-top: 0

.filters__heading
  font-size: 16px
  font-weight: 700
  line-height: 16px
  letter-spacing: .07em
  display: -webkit-box
  -webkit-line-clamp: 1
  -webkit-box-orient: vertical
  overflow: hidden
  text-overflow: ellipsis
  align-self: flex-start
  @include phones
    font-weight: bold
    font-size: 14px


.v-catalog__categories
  margin-bottom: 19px
  @include phones
    margin-bottom: 0

.v-catalog__categories, .v-catalog__filters
  border: 2px solid $gray-4
  min-width: 296px

  padding: 15px 20px
  @include phones
    border: none
    padding: 0
    max-width: none
.categories__list-item
  margin-bottom: 8px
  background-color: #f6f6f6
  padding: 0 2px
  .categories__counter
    display: flex
    min-width: 32px
    padding: 2px
    font-size: 14px
    font-weight: 700
    align-items: center
    justify-content: flex-end
    .counter
      background-color: $yellow
      padding: 3px
.categories__list-link
  display: flex
  justify-content: space-between
  text-decoration: none
  color: #000
  align-items: center
  padding: 5px 5px

.categories__item-title
  text-decoration: underline
  color: $text
  display: -webkit-box
  -webkit-line-clamp: 1
  -webkit-box-orient: vertical
  overflow: hidden
  @include phones
    font-weight: bold
    text-transform: none
    font-size: 14px
  &--active
    color: $red

.filters__header
  display: flex
  align-items: flex-start
  justify-content: space-between
  margin-bottom: 8px
  background-color: #f6f6f6
  padding: 8px 8px 8px 5px
  @include phones
    align-items: center
    margin-bottom: 8px
    padding: 8px 5px
  .filters__heading
    margin: 0px

.filters__range
  margin-bottom: 10px
  @include phones
    margin-bottom: 5px
  .range-input
    padding: 4px 4px
    text-align: center
    font-size: 14px
    border: 2px solid #505050
    border-radius: 3px
    width: 64px
    -moz-appearance: textfield
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button
      -webkit-appearance: none
      margin: 0

  &-unit
    display: inline-block
    margin-left: 6px
    font-size: 14px
    letter-spacing: .1ex

.categories__header
  text-align: center
  display: flex
  justify-content: space-between
  align-items: center
  padding-bottom: 8px
  border-bottom: 2px solid $gray-4
  cursor: pointer
  position: relative

  @include phones
    border-bottom: none
    padding: 10px
  .categories__heading
    margin-top: 0px
    margin-bottom: 0px
    text-transform: uppercase
    font-size: 16px
    line-height: 16px
    letter-spacing: .07em
    font-weight: bold
    color: white
    padding: 3px
    background-color: $red
    width: 85%
    @include phones
      padding-left: 0
      font-weight: bold
      font-size: 15px

.categories__buttons
  display: none
  flex-direction: column
  align-items: center
  &-clear,
  &-apply
    width: 48%
    text-align: center
    padding: 10px 0px
    background-color: #fff
    font-weight: 700
    font-size: 15px
    line-height: 18px
    text-transform: uppercase
    cursor: pointer

  &-apply
    border: 2px solid $red
    margin-bottom: 15px
    color: $red
    &:hover
      color: #fff
      background-color: $red
      transition: .3s ease-in-out
    @include phones
      margin-bottom: 0
  &-clear
    border: 2px solid $gray-4
    color: $gray-4
    &:hover
      color: #fff
      background-color: $gray-4
      transition: all .4s


.v-catalog__content
  @media screen and(max-width: 3114px)
    width: 2408px
    margin-left: 1%
  @media screen and(max-width: 2813px)
    width: 2107px
    margin-left: 1%
  @media screen and(max-width: 2512px)
    width: 1806px
    margin-left: 1%
  @media screen and(max-width: 2211px)
    width: 1505px
    margin-left: 1%
  @media screen and(max-width: 1920px)
    width: 100%
    margin-left: 1%
  @include tablets
    margin-left: 0
  @include phones
    margin-left: 0
    margin-right: 0
  & > img
    width: 100%
    object-fit: cover
    margin-bottom: 13px
    @include phones
      display: none

.v-catalog__queries-wrapper
  border: 2px solid $gray-4
  @include phones
    border: none
    margin-top: 0
.v-catalog__frequently-searching
  display: flex
  align-items: baseline
  flex-direction: row
  justify-content: space-between
  font-size: 16px
  padding: 14px 40px
  @include phones
    display: none
  &__btn_all
    padding: 10px
    background-color: $red
    color: white
  h3
    margin: 0px
    letter-spacing: .07em
    line-height: 21px
    color: $text
    font-size: 16px
  .freq-search-container
    display: flex
    align-items: center
    flex-wrap: wrap
    margin-right: auto
  .freq-search-item
    padding: 5px 23px
    background-color: $yellow
    color: #000
    text-decoration: none
    letter-spacing: .07em
    font-weight: 700
    font-size: 16px
    margin-left: 30px
    max-width: 400px
    display: flex
    justify-content: flex-start
    &:last-child
      margin-right: auto
.freq-list
  margin-left: auto
  display: flex
  flex-direction: row
  align-items: center
  @media screen and(max-width: 990px)
    display: none
  img
    margin-left: 7px
  span
    font-size: 15px
    letter-spacing: .07em
    line-height: 19px

.v-catalog__sorting
  display: flex
  align-items: center
  flex-direction: row
  border-top: 2px solid #bab4b4
  padding: 12px 40px
  justify-content: space-between

  @media screen and(max-width: 1100px)
    padding: 0
  @media screen and(max-width: 628px)
    padding: 2px 10px 0
  @include phones
    flex-direction: column
    border: none
    padding: 0 7px
  @media screen and(max-width: 350px)
    justify-content: space-around
    padding: 0 3px
    flex-wrap: wrap
  &__btn
    display: flex
    @include phones
      width: 100%
      margin-bottom: 15px
    &-filter
      width: 100%
      height: 30px
      border: 2px solid red
      justify-content: center
      align-items: center
      font-size: 16px
      cursor: pointer
      display: none
      @include phones
        font-size: 14px
        display: flex
        font-weight: bold
        color: $red
        margin-right: 2px
        overflow: auto
      @media screen and(max-width: 350px)
        font-size: 14px
      &:last-of-type
        margin-right: 0

  h3
    margin: 0px
    letter-spacing: .07em
    font-size: 16px
    line-height: 21px
    color: $text
    @include phones
      font-size: 13px
      font-weight: bold
      text-transform: none
      line-height: normal
  option
    color: $red
    text-decoration: underline
.v-catalog__sorting-wrapper
  display: flex
  cursor: pointer
  h3
    @include tablets
      font-size: 14px

  &-title
    font-size: 18px
    letter-spacing: .07em
    line-height: 21px
    text-decoration: underline
    color: $red
    @include phones
      font-size: 13px
      font-weight: bold
  img
    margin-left: 11px

.v-catalog__partial-showing
  display: flex
  align-items: center
  margin-right: 37px
  margin-left: auto
  font-weight: bold
  font-size: 16px
  @media screen and(max-width: 770px)
    margin-right: 0
    font-size: 14px
  @include phones
    display: none


.v-catalog__partial-showing-value
  color: $red
  font-size: 20px
  letter-spacing: .07em
  line-height: 21px
  text-decoration: underline
  font-weight: bold
  -webkit-appearance: none
  width: 40px
  padding: 8px
  @include phones
    font-size: 14px
  option
    text-align: center
  img
    margin-left: 7px

.v-catalog__showing-type
  cursor: pointer
  display: flex
  align-items: center
  @media screen and(max-width: 1210px)
    display: none
  svg
    margin-right: 13px
  svg:last-child
    margin-right: 0
  img
    border-left: 2px solid #bab4b4

.v-catalog__items-wrapper
  margin-top: 16px
  width: 100%
  display: flex
  flex-direction: column
  @include phones
    margin-top: 15px
  .v-catalog__items-more
    background-color: $gray-3
    display: flex
    align-items: center
    flex-direction: column
    padding: 25px
    margin-bottom: 19px
    margin-top: 19px
    @include phones
      background-color: white
      padding: 0
    .items-more, .items-summary
      display: inline-block

    .items-more
      font-size: 16px
      font-weight: 700
      letter-spacing: .07em
      text-decoration: underline
      color: $red
      cursor: pointer
      margin-bottom: 10px
      @include phones
        margin-bottom: 0
    .items-summary
      font-weight: 700
      letter-spacing: .07em
      color: $text
      @include phones
        display: none

.v-catalog__items-list
  display: flex
  flex-wrap: wrap
  margin-bottom: 50px
  width: 100%
.v-catalog__items-wrapper__for_card
  display: flex
  justify-content: center
  align-self: center
  width: 100%
  @media screen and(max-width: 3114px)
    width: 2408px

  @media screen and(max-width: 2813px)
    width: 2107px

  @media screen and(max-width: 2512px)
    width: 1806px

  @media screen and(max-width: 2211px)
    width: 1505px
  @media screen and(max-width: 1900px)
    width: 1204px
  @media screen and(max-width: 1570px)
    width: 903px
  @media screen and(max-width: 1290px)
    width: 602px
  @media screen and(max-width: 770px)
    width: 619px
  @media screen and(max-width: 630px)
    width: inherit

.input-group
  display: flex
  align-items: flex-start
  margin-bottom: 10px
  @include phones
    margin-bottom: 12px
  &__input
    width: 14px
    height: 14px
    cursor: pointer
  &__label
    display: flex !important
    align-items: flex-start
    padding-top: 2px
    font-size: 14px
    padding-left: 6px
    cursor: pointer
    position: relative
    @include phones
      line-height: 15px !important
      max-width: 240px
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
      font-weight: bold
      text-transform: none
      padding-left: 30px
      padding-top: 4px

  &__label::before
    left: 0 !important

.v-catalog__aside
  width: 20%
  @include largelaptop
    width: auto
    max-width: 296px
    width: 296px
  @media screen and(max-width: 990px)
    display: none

.turnHalf
  transform: rotate(180deg) !important
  margin-right: 8px

.v-catalog__items-more-usual
  @include phones
    display: none
.v-catalog__items-more-mobile
  display: none
  @include phones
    display: block
    margin: 20px 0

select
  text-decoration: underline
  color: $red
  position: relative
  border: none
  outline: none
  cursor: pointer
  @include phones
    font-size: 12px
    width: 114px
.v-catalog__select > option, .v-catalog__partial-showing-value > option
  color: black
  font-size: 18px

  @include phones
    font-size: 12px

// select.v-catalog__select, select.v-catalog__partial-showing-value

.isActive
  fill: $red
.isComp
  fill: black

.fade-enter-active, .fade-leave-active
  transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

.turn
  transform: rotate(180deg) !important
svg
  cursor: pointer

.catalog__filters__heading
  margin: 0
  font-size: 16px
  text-transform: uppercase
  color: white
  background-color: $red
  width:  85%
  padding: 3px
  text-align: center
  @include phones

    padding-left: 0
.catalog__filters__header
  display: flex
  justify-content: space-between
  align-items: center
  font-weight: bold
  padding-bottom: 8px
  border-bottom: 2px solid #bab4b4
  position: relative

.v-catalog__filters
  padding: 15px 20px
  margin-bottom: 20px

.filters__list, .categories__buttons
  @include phones
    display: none

.appear
  display: block !important

.appear__butt
  display: flex
.show_more, .show_less
  font-size: 16px
  font-weight: 700
  letter-spacing: .07em
  text-decoration: underline
  color: $red
  cursor: pointer
  margin-bottom: 10px
  text-align: center






.v-catalog__popup-filter
  display: none
  z-index: 130
  @include phones
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    background: white
    display: block
    padding: 10%
    z-index: 100
    overflow: auto

.categories__list
  &__def
    position: relative
    color: white
    margin-bottom: 5px
    &__icon-divider
      display: block
      width: 99vw
      height: 30px
      position: absolute
      top: -7px
      right: -12%
      z-index: -1
      img
        width: 100%
        height: 100%
.filters__list__open
  margin: 0
  text-transform: uppercase
  font-weight: bold
  &__def
    position: relative
    color: white
    margin-bottom: 5px
    .filters__list__open__icon-divider
      display: block
      width: 99vw
      height: 30px
      position: absolute
      top: -7px
      right: -12%
      z-index: -1
      img
        width: 100%
        height: 100%


.categories__buttons__open
  @include phones
    display: flex
    align-items: center
    justify-content: space-between

.notshow
  max-height: 1px
  overflow: hidden
.v-popup-login__closeIcon
  right: 10px
  top: 11px
  position: fixed
  cursor: pointer


.categories__list__def, .filters__list__open__def
  margin-bottom: 10px

.filters__list
  display: none
  margin-top: 8px
.input-group__input
  position: absolute
  left: -9999px

// input
//   -webkit-appearance: none
//   border-radius: 0

select.v-catalog__select
  -webkit-appearance: none
  -webkit-border-radius: 0px
  border-radius: 0
  font-weight: bold
  padding-left: 8px
  padding-right: 8px
  font-size: 18px
  @include phones
    font-size: 12px
.disabled
  border-color: #cdcdcd

  color: #cdcdcd



.categories__background-icon, .catalog__filters__background-icon
  z-index: -1
  position: absolute
  width: 90%
  height: 100%
  transform: rotate(180deg)
  img
    width: 100%
    height: 100%

.filters__heading__notwebkit
  display: flex
</style>
