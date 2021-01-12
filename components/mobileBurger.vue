<template lang="pug">
.wrapper(@scroll="hide")
  ul.dropdown__list
    li.v-header__info-list-item.setCity(@click="toggle('setCity')" :class="{'setCityDialog': dropDowns.setCity.open}" )
      span.v-header__info-list-item-title {{ $store.state.currentCity }}
      img.v-header__info-list-item-icon(src="@/assets/images/icons/arrow-down.svg" title="Стрелочка")
      ul.setCity-dropdown-menu
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Москва и Московская область')")
          span Москва и Московская область
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Санкт-Петербург')")
          span Санкт-Петербург
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Казань')")
          span Казань
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Крым')")
          span Крым
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Краснодар')")
          span Краснодар
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Астрахань')")
          span Астрахань
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Волгоград')")
          span Волгоград
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Ростов')")
          span Ростов
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Алматы')")
          span Алматы
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Бишкек')")
          span Бишкек
        li.setCity-dropdown-menu-item(@click="$store.dispatch('setCity', 'Витепск')")
          span Витепск
    li.v-header__info-list-item
      nuxt-link.v-header__nav-link(to="/delivery")
        img.v-header__nav-list-item-icon(src="~@/assets/images/icons/delivery.png")
        span.v-header__nav-list-item-title Каталог товаров
    li.v-header__info-list-item
      nuxt-link.v-subheader__cart(to="/cart")
        img.v-subheader__cart-icon(src="~@/assets/images/icons/shop-cart.svg")
        span Корзина
    li.v-header__info-list-item
      nuxt-link.v-header__nav-link(to="/delivery")
        img.v-header__nav-list-item-icon(src="~@/assets/images/icons/delivery.png")
        span.v-header__nav-list-item-title Доставка
    li.v-header__info-list-item
      nuxt-link(to="/payment" @click="closeAll()")
        img.v-header__nav-list-item-icon(src="~@/assets/images/icons/delivery.png")
        span.v-header__nav-list-item-title Оплата
    li.v-header__info-list-item
      .v-footer__phones
        p Есть вопросы? Звоните!
          a.contacts__phone(href="tel:+74951327400")
            | +7 (495) 132-74-00
          | или
          a.contacts__phone(href="tel:+74951327400")
            | +7 (495) 134-28-06
          | круглосуточно
    li.v-header__info-list-item
      ul.v-footer__information-list
        li.v-footer__information-list-item
          p.copyright &copy;&nbsp;2010&nbsp;&mdash; 2020&nbsp;ООО &laquo;Торговый Дом ЦСК&raquo; интернет-магазин строительных материалов.
        li.v-footer__information-list-item
          p Политика конфиденциальности
        li.v-footer__information-list-item
          p Условия пользования
        li.v-footer__information-list-item
          a(href="#").copyright RoboWebTeam. Все права защищены
</template>
<script>
export default {
  data(){
    return{
      dropDowns: {
        customers: { open: false },
        setCity: {
          open: false
        }
    }
  }
}
}
</script>
<style lang="sass">
@import "layouts/mixins.sass"

.wrapper
  position: absolute
  background: blue
  top: 40px
.v-footer__information-list-item
  a
   color: #000
   text-decoration: none



</style>


