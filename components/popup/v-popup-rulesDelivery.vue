<template lang="pug">
  #rules
    .v-delivery__table__overlay(v-if="showRules" @click="showRules=!showRules")

    .v-delivery__rules(v-if="showRules" )
      .wrapper__closeIcon(@click="showRules=!showRules")
        img.v-closeIcon-rules-delivery(
        :src="require('@/assets/images/icons/close_mark.svg')"
        title="Закрыть окно" alt="Закрыть"  )
      h2.v-delivery__rules__header.first При заказе доставки просим Вас предоставить следующую информацию:
      p.v-delivery__rules__text - номер дома (корпус, особенности или приметы); - подъезд к дому (с какой улицы, двор, арка, пропуск, место для разгрузки); - номер квартиры, код парадной, этаж, наличие лифта; - номер телефона (на адресе, контактный); - лицо, ответственное за прием материала, его координаты.
      h2.v-delivery__rules__header Стоимость:
      p.v-delivery__rules__text Стоимость доставки зависит от грузоподъемности ТС, адреса и вида доставки, количества точек разгрузки.
      p.v-delivery__rules__text Такие услуги как разгрузка, пронос свыше 50 метров и подъем товара оплачиваются отдельно от доставки.
      p.v-delivery__rules__text Если Вы оплатили заказ по безналичному расчёту, при доставке Вас попросят предъявить доверенность, заполненную в соответствии с законодательством РФ. Доставка возможна также при наличии на объекте круглой печати.
      p.v-delivery__rules__text Время доставки не распространяется на подъём. В случае если Вы оформляете несколько доставок на один адрес, время доставки на каждую следующую машину выставляется с интервалом в 1 час.
      h2.v-delivery__rules__header Общие правила:
      p.v-delivery__rules__text - водитель позвонит в момент выезда на Ваш адрес.
      p.v-delivery__rules__text - в день доставки Вам следует быть постоянно на связи по указанным в заказе контактным телефонам (доставка осуществляется только после того, как Вы подтвердите свою готовность принять машину).
      p.v-delivery__rules__text - позвонив в наш колл-центр до начала интервала, Вы можете бесплатно перенести время доставки, а также уточнить возможность корректировки заказа.
      p.v-delivery__rules__text - позаботьтесь о том, чтобы обеспечить машине беспрепятственный подъезд к месту разгрузки. В ином случае доставка будет осуществлена максимально близко к месту планируемой выгрузки без нарушения ПДД и вероятности повреждения автомобиля.

</template>

<script>
import {eventBus} from '@/store/index'

export default {

  data(){
        return {
          showRules: false
        }
  },
  methods:{
  },
  created(){
    eventBus.$on('changeLayout', ()=>{
      this.showRules = !this.showRules
    })
  }
}
</script>
<style lang="sass">
@import '../../layouts/mixins.sass'

.v-delivery__rules
  border: 2px solid #BAB4B4
  position: fixed
  background-color: white
  padding: 10px
  width: 50%
  height: 420px
  overflow: auto
  left: 23%
  right: 0
  top: 25%
  bottom: 0
  margin: 3%
  z-index: 120
  @include phones
    width: 94%
    left: 0
  // @media screen and(max-width: 380px)
.v-delivery__rules__header
  margin: 0
  font-size: 16px
  font-weight: bold
  margin-top: 20px
  position: relative
  @include phones
    font-size: 16px
.v-delivery__rules__header.first
  margin-top: 0
.v-delivery__table__overlay
  background: rgba(0, 0, 0, 0.46)
  height: 500vh
  width: 500vh
  z-index: 100
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
.v-closeIcon-rules-delivery
  position: absolute
  top: 8px
  right: 8px
  z-index: 10
  cursor: pointer
.v-delivery__rules__text
  font-size: 14px
</style>
