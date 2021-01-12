<template lang="pug">
  .balloon__wrapper
    h2.balloonTemplate__heading
      | {{ balloon.heading }}
    .balloonTemplate__Info
      .balloonTemplate__Info-img-wrapper(style="width: 130px")
        img(:src="require('../../assets/images/logosvg.svg')" title="Изображение подробной карты" style="width: 100%")
      .balloonTemplate__Info-wrapper
        .balloonTemplate__Info-wrapper__column.first
          .balloonTemplate__Info-item
            h6.balloonTemplate__Info-item-heading(style="margin: 0;") Телефон:
            span.balloonTemplate__Info-item-content(:href="`tel:+${balloon.phone}`" v-html="balloon.phone")
          
          .balloonTemplate__Info-item
            h6.balloonTemplate__Info-item-heading(style="margin: 0;") Email:
            a.balloonTemplate__Info-item-content(:href="`mailto:${balloon.email}`" v-html="balloon.email")
        
          div.balloonTemplate__Info-item
            h6.balloonTemplate__Info-item-heading(style="margin: 0;") Адрес офиса:
            span.balloonTemplate__Info-item-content(v-html="balloon.address")
        .balloonTemplate__Info-wrapper__column    
          div.balloonTemplate__Info-item
            h6.balloonTemplate__Info-item-heading(style="margin: 0;") Адрес склада:
            span.balloonTemplate__Info-item-content(v-html="balloon.sklad")
          div.balloonTemplate__Info-item
            h6.balloonTemplate__Info-item-heading(style="margin: 0;") График работы офиса:
            span.balloonTemplate__Info-item-content(v-html="balloon.schedule")
          div.balloonTemplate__Info-item
            h6.balloonTemplate__Info-item-heading(style="margin: 0;") График работы склада:
            span.balloonTemplate__Info-item-content(v-html="balloon.skladSchedule")
    //- yandex-map(
    //-   v-if="pageReady"
    //-   :coords="coords.startup"
    //-   style="width: 100%; height: 600px"
    //-   zoom="4"
    //-   v-for="(balloon, index) in regions"
    //-   :key="index"
    //- )
    //-   ymap-marker(
    //-     :markerId="`${index + 1}`",
    //-     marker-type="placemark"
    //-     :coords="balloon.cords"
    //-     :icon="markerIcon"
    //-     )
    //- span.balloonTemplate__footer {{ balloon.smallText }}
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

export default {
  name: "YandexBaloon",
  components: {
    yandexMap,
    ymapMarker,
  },
  data() {
    return {
      pageReady: false,
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
      }
    }
    },
  props: {
    balloon: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.pageReady = true
  },
}
</script>
<style lang="sass">
.balloonTemplate__Info-img-wrapper
  margin-right: 10px
.balloonTemplate__Info-wrapper
  width: 70%
  display: flex

ymaps > div > div > div.balloonTemplate__Info-wrapper
  width: 131%
#id_160752964760761303444
  height: 400px !important
ymaps > div > div > div.balloonTemplate__Info-wrapper > div
  margin-left: 0

ymaps > div > div > div.balloonTemplate__Info-wrapper > div.balloonTemplate__Info-wrapper__column.first > div
  margin-left: 0
  width: 138px
#id_160758975341326084166
  width: 1000px !important
</style>