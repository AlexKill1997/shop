<template lang="pug">
  .v-delivery__table
    //- nuxt-link.arrow_wrapper(:to="{name: `/itemcard`}")
    //-   img.arrow_icon(:src="require('@/assets/images/icons/arrow-right-menu_checkout.svg')")
    //-   span Назад
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
    p.special_super
    .v-delivery__table--group
      label.v-delivery__table--label Адрес доставки:
      input.v-delivery__table--input
    .v-delivery__table--group
      label.v-delivery__table--label Дата и время доставки:
      input.v-delivery__table--input(type="datetime-local" :value="new Date().toLocaleDateString()")
    .v-delivery__table--items
      p.v-delivery__table--label Сколько нужно доставить
      .v-delivery__table--items-container
        DeliveryItem(v-for="currentItem in items" :item="currentItem" :key="currentItem.id")
        .v-delivery__table--items-container-rules(@click="showRules")
          svg(width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M20.0005 31.7401C19.3437 31.7401 18.751 31.4021 18.4142 30.8365L18.3384 30.708H2.10578C1.08999 30.708 0.263672 29.8978 0.263672 28.9018V7.74368C0.263672 6.7477 1.08999 5.9375 2.10578 5.9375H37.8953C38.911 5.9375 39.7374 6.7477 39.7374 7.74368V28.9018C39.7374 29.8978 38.911 30.708 37.8953 30.708H21.6626L21.5863 30.8365C21.25 31.4021 20.6574 31.7401 20.0005 31.7401Z" fill="#dc0606")
            path(d="M37.8947 6.19769C38.7653 6.19769 39.4737 6.8923 39.4737 7.74585V28.904C39.4737 29.7575 38.7653 30.4521 37.8947 30.4521H21.8132H21.5105L21.3584 30.7086C21.07 31.1942 20.5621 31.4842 20 31.4842C19.4379 31.4842 18.93 31.1942 18.6416 30.7086L18.4895 30.4521H18.1868H2.10526C1.23474 30.4521 0.526316 29.7575 0.526316 28.904V7.74585C0.526316 6.8923 1.23474 6.19769 2.10526 6.19769H37.8947ZM37.8947 5.68164H2.10526C0.942632 5.68164 0 6.60589 0 7.74585V28.904C0 30.0439 0.942632 30.9682 2.10526 30.9682H18.1868C18.5516 31.5828 19.2226 32.0003 20 32.0003C20.7774 32.0003 21.4484 31.5828 21.8132 30.9682H37.8947C39.0574 30.9682 40 30.0439 40 28.904V7.74585C40 6.60589 39.0574 5.68164 37.8947 5.68164Z" fill="#FFE600")
            path(d="M20.0055 28.5492C19.2565 27.8742 16.2923 25.5463 11.0534 25.5463C6.30388 25.5463 3.42388 27.4598 2.36914 28.3201V3.20952C2.85704 2.75797 5.79493 0.259766 11.0534 0.259766C16.8055 0.259766 19.7807 3.24874 19.8102 3.27918L19.9997 3.47374L20.1902 3.2797C20.2202 3.24925 23.2207 0.259766 28.9481 0.259766C34.1828 0.259766 37.1397 2.75797 37.6323 3.21003V28.3371C36.556 27.4897 33.5818 25.5463 28.9481 25.5463C23.8676 25.5463 20.7818 27.8825 20.0055 28.5492Z" fill="white")
            path(d="M28.9476 0.516052C33.8502 0.516052 36.7118 2.74591 37.3686 3.32182V27.8167C36.0102 26.8584 33.1428 25.2865 28.9476 25.2865C24.1097 25.2865 21.037 27.3771 20.0086 28.2064C19.0113 27.3673 16.0355 25.2865 11.0528 25.2865C6.76705 25.2865 3.96652 26.8259 2.63178 27.7904V3.31976C3.28073 2.74281 6.106 0.516052 11.0528 0.516052C16.6792 0.516052 19.5907 3.42607 19.6186 3.45445L19.9976 3.84407L20.3792 3.45703C20.4086 3.42761 23.3455 0.516052 28.9476 0.516052ZM28.9476 0C23.0276 0 20.0002 3.09941 20.0002 3.09941C20.0002 3.09941 16.9986 0 11.0528 0C5.10705 0 2.10547 3.09941 2.10547 3.09941V28.902C2.10547 28.902 5.10073 25.8026 11.0528 25.8026C17.0049 25.8026 20.0002 28.902 20.0002 28.902C20.0002 28.902 23.1897 25.8026 28.9476 25.8026C34.7055 25.8026 37.8949 28.902 37.8949 28.902V3.09941C37.8949 3.09941 34.8676 0 28.9476 0Z" fill="#FFE600")
            path(d="M37.3684 27.8722C36.0232 26.917 33.1537 25.292 28.9474 25.292C24.0837 25.292 21.0068 27.4026 20.0079 28.2154C20.0079 28.2154 20 9.6169 20 3.87582C20.2137 3.48878 23.24 0.521484 28.9474 0.521484C33.8053 0.521484 36.6637 2.62078 37.3684 3.23076V27.8722Z" fill="white")
            path(d="M28.9471 8.26458C29.8191 8.26458 30.5261 7.57138 30.5261 6.71627C30.5261 5.86117 29.8191 5.16797 28.9471 5.16797C28.0751 5.16797 27.3682 5.86117 27.3682 6.71627C27.3682 7.57138 28.0751 8.26458 28.9471 8.26458Z" fill="#ADADAD")
            path(d="M30.526 19.6171V10.3281H26.3154V11.3602H27.3681V19.6171H26.3154V20.6492H31.5786V19.6171H30.526Z" fill="#ADADAD")
          p Правила доставки

</template>
<script>
import DeliveryItem from '@/components/delivery/item.vue'
import vPopupRulesDelivery from '@/components/popup/v-popup-rulesDelivery'
import {eventBus} from '@/store/index'


export default {
    name: "DeliveryTable",
    components: { DeliveryItem},
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    data(){
        return {
            items: [
                {
                    id: 1,
                    maxWeight: 50,
                    minPrice: 550,
                    img: 'car.svg'
                },
                {
                    id: 2,
                    maxWeight: 300,
                    minPrice: 1100,
                    img: 'bigcar.svg'
                },
                {
                    id: 3,
                    maxWeight: 1500,
                    minPrice: 2090,
                    img: 'largecar.svg'
                },
                {
                    id: 4,
                    maxWeight: 3500,
                    minPrice: 3520,
                    img: 'truck.svg'
                },
                {
                    id: 5,
                    maxWeight: 5000,
                    minPrice: 4620,
                    img: 'bigtruck.svg'
                },
                {
                    id: 6,
                    maxWeight: 10000,
                    minPrice: 4620,
                    img: 'largetruck.svg'
                },
                {
                    id: 7,
                    maxWeight: 15000,
                    minPrice: 8800,
                    img: 'wagon.svg'
                },
                {
                    id: 8,
                    maxWeight: 20000,
                    minPrice: 13200,
                    img: 'largewagon.svg'
                },
            ]
        }
    },
  methods:{
    showRules(){
      eventBus.$emit('changeLayout')
    }
  }
}
</script>

<style lang="sass">
@import '../../layouts/mixins.sass'
.v-delivery__table
  max-width: 465px
  width: 465px
  min-height: 550px
  max-height: 550px
  padding: 10px 15px
  background: #FFFFFF
  border: 5px solid #FFE600
  display: flex
  flex-direction: column
  position: absolute
  top: calc(50% - 550px / 2)
  left: 10%
  @include phones
    position: relative
    left: 0
    width: 100%
    border: 2px solid $red
    max-height: initial
  @media screen and (max-width: 350px)
    padding: 20px 1%
  .arrow_wrapper
    display: none
    display: flex
    align-items: center
    margin-bottom: 10px
    @include phones
      display: flex
      align-items: center
      margin-bottom: 10px
    span
      margin-left: 10px

  h2, br, p
    display: none
    @include phones
      display: block
  &--group
      display: flex
      flex-direction: column
      margin-bottom: 10px
      @include phones
        display: none
      &:last-child
        margin-bottom: unset
  &--label
      font-weight: bold
      font-size: 18px
      line-height: 16px
      letter-spacing: 0.07em
      margin-bottom: 5px
      &:last-child
          margin-top: 10px
  &--input
      border: 2px solid $red
      font-size: 12px
      padding: 13px 12px
      font-size: 16px
      cursor: pointer
  &--items
    @include phones
      display: none
    &-container
      display: grid
      grid-template-columns: 1fr 1fr 1fr
      grid-gap: 20px
      grid-template-rows: 100px 100px 100px

.v-delivery__table--items-container-rules
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  cursor: pointer
  p
    font-size: 10px
    text-align: center
  p.special_super
    content: 'U20BD'
// input
//   -webkit-appearance: none
//   border-radius: 0


.v-delivery__rules__header
  margin: 0
  color: $red
  margin-bottom: 15px
  margin-top: 15px

.v-delivery__rules__header::first-child
  margin-top: 15px
</style>
