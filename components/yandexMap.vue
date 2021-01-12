<template lang="pug">
  #yandexMapContainer
    yandex-map(
      v-if="pageReady"
      :coords="coords.startup"
      style="width: 100%; height: 600px"
      zoom="4"
    )
      ymap-marker(
        v-for="(balloon, index) in regions"
        :key="index"
        :markerId="`${index + 1}`",
        marker-type="placemark"
        :coords="balloon.cords"
        :icon="markerIcon"
      )
        Balloon(slot="balloon" :balloon="balloon")
    .balloon__container(v-if="this.isPage==='contacts'")
      Balloon(v-for="(balloon, index) in regions" :key="index" slot="balloon" :balloon="balloon")      
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import Balloon from '@/components/yandex/balloon.vue'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'YandexMapContainer',
  components: {
    yandexMap,
    ymapMarker,
    Balloon
  },
  data() {
    return {
      regions: [
        {
          heading: 'Москва, ООО Торговый дом «ЦСК»',
          phone: '+7 (495) 132-74-00',
          email: 'zakaz@tdcsk.com',
          address: 'Московская область, Одинцово, ул. Молодежная, 46',
          sklad: 'Московская область, Одинцово, ул. Молодежная, 46',
          schedule: 'ежедневно с 08:00 до 19:00',
          skladSchedule: 'ежедневно с 08:00 до 19:00',
          smallText: '(Предварительно свяжитесь с менеджером для оформления пропуска)',
          cords: [55.677220, 37.271062],
        },
        { 
          heading: 'Санкт-Петербург, ООО Торговый дом «ЦСК»', 
          phone: '+7 (981) 812-94-57', 
          email: 'zakaz@tdcsk.com', 
          address: 'БЦ Цитадель, улица краснопутиловская 69, офис 637.',
          sklad: 'Московское шоссе д.97',
          schedule: 'ежедневно с 09:00 до 18:00', 
          skladSchedule: 'с 09:00 до 18:00',
          smallText: '(Предварительно свяжитесь с менеджером для оформления пропуска)',
          cords: [59.859897, 30.287664],
        },
        {
          heading: 'Казань, ООО Торговый дом «ЦСК»',
          phone: '+7 (999) 553-42-72',
          email: 'zakaz@tdcsk.com',
          address: 'улица Восстания, 100, корп. 31.',
          sklad: 'улица Восстания, 100, корп. 31',
          schedule: 'Пн-Пт: c 09:00 до 18:00',
          skladSchedule: 'Пн-Пт: c 09:00 до 18:00',
          cords: [55.833430, 49.050465]
        },
        {
          heading: 'Краснодар, ООО Торговый дом «ЦСК»',
          phone: '+7 (861) 205-07-56',
          email: 'zakaz@tdcsk.com',
          address: 'Ростовское шоссе, 34/4.',
          sklad: 'Станица Новотитаровская, ул Крайняя, 16А',
          schedule: 'ежедневно с 08:00 до 19:00',
          skladSchedule: 'ежедневно с 08:00 до 19:00',
          smallText: '(Предварительно свяжитесь с менеджером для оформления пропуска)',
          cords: [45.111581, 38.995942]
        },
        { 
          heading: 'Астрахань, ООО Торговый дом «ЦСК»', 
          phone: '+7 (8512) 44-25-15', 
          email: 'zakaz@tdcsk.com', 
          address: 'ул. Рождественского 5', 
          sklad: 'ул.Рождественского 5',
          schedule: 'ежедневно с 08:00 до 19:00',
          skladSchedule: 'ежедневно с 08:00 до 19:00',
          cords: [46.317772, 48.047523],
        },
        {
          heading: 'Волгоград, ООО Торговый дом «ЦСК»',
          phone: '+7 (844) 220-08-54',
          email: 'zakaz@tdcsk.com',
          address: 'ул. "Жукова" 185 A',
          sklad: 'ул.Историческая 187 Б',
          schedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 19:00`,
          skladSchedule: 'c 09:00 до 19:00',
          cords: [48.753072, 44.481413]
        },
        {
          heading: 'Ростов-на-Дону, ООО Торговый дом «ЦСК»',
          phone: '+7 (863) 320-00-81',
          email: 'zakaz@tdcsk.com',
          address: 'ул.Мадояна, 314',
          sklad: 'ул.Мадояна, 314',
          schedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          skladSchedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          cords: [47.245492, 39.626556]
        },
        {
          heading: 'Алматы, ООО Торговый дом «ЦСК»',
          phone: '+7 777-773-08-87',
          email: 'zakaz@tdcsk.com',
          address: 'ул.Мадояна, 314',
          sklad: 'ул.Мадояна, 314',
          schedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          skladSchedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          cords: [43.237156, 76.945618]
        },
        {
          heading: 'Бишкек, ООО Торговый дом «ЦСК»',
          phone: '+99 670 562 69 63',
          email: 'zakaz@tdcsk.com',
          address: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          sklad: 'ул.Мадояна, 314',
          schedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          skladSchedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          cords: [42.878645, 74.616197]
        },
        {
          heading: 'Витебск, ООО Торговый дом «ЦСК»',
          phone: '+375 33 396 99 99',
          email: 'zakaz@tdcsk.com',
          address: 'default',
          sklad: 'ул.Мадояна, 314',
          schedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          skladSchedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          cords: [55.184217, 30.202869]
        },
        { 
          heading: 'Симферополь, ООО Торговый дом «ЦСК»', 
          phone: '+7 (800) 555-25-97', 
          email: 'zakaz@tdcsk.com', 
          address: 'Московское шоссе 11км', 
          sklad: 'ул.Мадояна, 314',
          schedule: 'ежедневно с 08:00 до 19:00', 
          skladSchedule: `<span class='template__accent'>Пн-Пт:</span> c 09:00 до 18:00<br><span class='template__accent'>Сб:</span> с 09:00 до 13:00`,
          smallText: '(Предварительно свяжитесь с менеджером для оформления пропуска)',
          cords: [44.938314, 34.100533]
        }
      ],
      coords: {
        _SanktPeterburg: [59.859897, 30.287664],
        _Astrahan: [46.317772, 48.047523],
        _Simferopol: [44.938314, 34.100533],
        _Minsk: [53.889007, 27.593337],
        Krasnodar: [45.111581, 38.995942],
        Odintsovo: [55.677220, 37.271062],
        RostovNaDonu: [47.245492, 39.626556],
        Almaty: [43.237156,76.945618],
        Volgograd: [48.753072, 44.481413],
        Kazan: [55.833430, 49.050465],
        Vitebsk: [55.184217, 30.202869],
        Bishkek: [42.878645, 74.616197],
        Almaty: [43.237156, 76.945618],

        startup: [52.403687, 39.715173]
      },
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: '/client-icons/map-marker.png',
        imageSize: [48, 62],
        imageOffset: [0, 0]
      },
      pageReady: false,
      maxZoom: 17
    }
  },
  mounted() {
    this.pageReady = true
  },
  computed: {
    ...mapGetters({
      isPage: 'GET_PAGE',
      cart: 'cart/GET_PRODUCTS_FROM_CART',
    })
  },
  methods: {
    BalloonTemplate(obj) {
      obj.smallText = obj.smallText ? obj.smallText : '' // если пояснения не передали, значит там пустая строка
      let img = require('../assets/images/LOGO_RUS.png')

      
    }
  }
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
.balloon__container
  display: grid
  grid-template-columns: repeat(2, minmax(150px,50%))
  grid-gap: 10px
  margin-top: 15px
  justify-content: space-between
  grid-template-rows: repeat(6, minmax(150px,350px))
  
.balloon__container .balloon__wrapper
  border: 2px solid $gray-5
  padding: 10px

.ymap-container
  border: 5px solid #cdcdcd
  box-sizing: border-box
  @include phones
    height: 100% !important
#yandexMapContainer
  width: 100%
  // box-sizing: border-box
  @include phones
    height: 70vh
.balloonTemplate
  &__heading
    font-size: 14px
    font-weight: 800
    text-transform: uppercase
    text-align: center
    letter-spacing: .07em
    color: $text
  &__Info
    display: flex
    justify-content: space-between

    &-item
      margin-left: 12px
      width: 150px
      &:not(:last-child)
        margin-bottom: 15px
      &-heading
        margin-top: 0px
        margin-bottom: 0px
        font-size: 12px
        font-weight: 700
        letter-spacing: .07em
        color: $text
      &-content
        font-size: 12px
        font-weight: bold
        letter-spacing: .07em
        color: $red
  &__footer
    display: block
    text-align: center
    margin-top: 8px
    font-size: 10px
    font-weigth: 300
    letter-spacing: .07em
    color: $text
    line-height: 12px

.template__accent
  color: $text
  font-weight: 700

ymaps > div > div > div.balloonTemplate__Info-wrapper > div
  max-width: 150px

#id_160758622979910905416
  width: 1000px !important

</style>
