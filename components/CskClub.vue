<template lang="pug">
  #v-csk-club

    vPopup(
      v-if="isDiscountVisible"
      @close="closePopup"
      :popupSubmitButtonLabel="false"
      :popupTitle="'Условия дисконтной программы'"
      :popupWidth="1060")
      .v-csk-club__popup-container
        ol
          li
            h5.discount-conditions-title Условия получения Дисконтной карты &laquo;ЦСК&raquo;.
            ol
              li Покупателям компании ООО &laquo;Торговый дом ЦСК&raquo; при оформлении покупок через интернет-магазин www.td-csk.com
              li Обязательным условием получения Дисконтной карты &laquo;ЦСК&raquo; является прохождение регистрации на&nbsp;сайте компании www.td-csk.com перед совершением покупки или&nbsp;же заполнение анкеты в&nbsp;офисе компании.
              li Дисконтная карта &laquo;ЦСК&raquo; имеет индивидуальный номер и&nbsp;зарегестрирована на&nbsp;имя обладателя дисконтной карты. Передача дисконтной карты третьему лицу для совершения покупок с&nbsp;дисконтом согласовывается в&nbsp;индивидуальном порядке и&nbsp;остается на&nbsp;усмотрение представителей компании.
          li
            h5.discount-conditions-title Привилегии обладания дисконтной картой &laquo;ЦСК&raquo;.
            ol
              li Покупатели владеющие дисконтной картой &laquo;ЦСК&raquo; имеют право покупать товары по&nbsp;специальным ценам.
              li Покупатели владеющие дисконтной картой &laquo;ЦСК&raquo; имеют право участвовать в&nbsp;специальных промо-акциях и&nbsp;розыгрышах ценных призов компании ООО &laquo;Торговый дом ЦСК&raquo;.
          li
            h5.discount-conditions-title Условия использования Дисконтной карты &laquo;ЦСК&raquo;
            ol
              li Дисконтная карта &laquo;ЦСК&raquo; передается сотруднику службы доставки вместе с&nbsp;товаром и&nbsp;вручается при доставке заказа.
              li Дисконтная карта &laquo;ЦСК&raquo; активируется в&nbsp;день получения.
              li При утере или повреждении дисконтной карты &laquo;ЦСК&raquo; замена карты на&nbsp;новую осуществляется в&nbsp;офисе компании ООО &laquo;Торговый дом ЦСК&raquo;.
          li
            h5.discount-conditions-title Прочие условия
            ol
              li ООО &laquo;Торговый дом ЦСК&raquo; оставляет за&nbsp;собой право в&nbsp;одностороннем порядке изменять любой пункт настоящего Условия дисконтной программы. Все изменения регулярно обновляются и&nbsp;публикуются на&nbsp;сайте.

    .v-csk-club__title
      h2.v-csk-club__title-text Присоединяйтесь к клубным ценам ЦСК!
      img.v-csk-club__title-icon(src="~@/assets/images/icons/club.svg" alt="клуб")
    .v-csk-club__container
      //- .v-csk-club__container-receiveForm
      //-   .v-csk-club__container-wrapper
      //-     img.receiveForm__iconQuestion(
      //-       @click="showDiscount"
      //-       src="~@/assets/images/icons/question.svg"
      //-       )
      //-     img.receiveForm__iconCard(src="~@/assets/images/icons/clubcard-small.png")
      //-     h6.receiveForm__heading Получить клубную карту:
      //-   form.receiveForm__inputBlock
      //-     .receiveForm__inputBlock-item
      //-       label.receiveForm__inputBlock-label(for="receiveForm__name") Ваше имя
      //-         span.redAsterisk *
      //-       input.receiveForm__inputBlock-input#receiveForm__name(type="text" placeholder="Иванов Иван Иванович")
      //-     .receiveForm__inputBlock-item
      //-       label.receiveForm__inputBlock-label(for="receiveForm__email") Эл. почта
      //-         span.redAsterisk *
      //-       input.receiveForm__inputBlock-input#receiveForm__email(type="email" placeholder="example@mail.ru")
      //-     .receiveForm__inputBlock-item
      //-       label.receiveForm__inputBlock-label(for="receiveForm__email") Телефон
      //-         span.redAsterisk *
      //-       input.receiveForm__inputBlock-input#receiveForm__phone(type="phone" placeholder="+7 (999) 123-45-67")
      //-     .receiveForm__inputBlock-item
      //-       input.receiveForm__inputBlock#receiveForm__personals(type="checkbox")
      //-       label.receiveForm__inputBlock-labelCheck(for="receiveForm__personals") Я даю свое
      //-         span.accent &nbsp;согласие на обработку&nbsp;
      //-         | моих персональных данных
      //-     .receiveForm__inputBlock-item
      //-       button.receiveForm__inputBlock-submit(type="submit") Отправить
      .v-csk-club__container-clubCard__container
        .v-csk-club__container-clubCard
        //- nuxt-link.v-csk-club__container-clubCard_button(@click="yandexMetricClick" to="/account") Получить карту
        nuxt-link.v-csk-club__container-clubCard_button(to="/account") Получить карту

</template>

<script>
import vPopup from '../components/popup/v-popup.vue'

export default {
  name: 'ClubCard',
  components: {
    vPopup
  },
  data() {
    return {
      isDiscountVisible: false
    }
  },
  methods: {
    closePopup() {
      this.isDiscountVisible = false
    },
    showDiscount() {
      this.isDiscountVisible = true
    },
    // yandexMetricClick(){
    //   this.$yandexMetrika.reachGoal(69922249,'reachGoal','get a card')
    // }
  }
}
</script>

<style lang="sass">
@import '../layouts/mixins.sass'
#v-csk-club
  margin-top: 25px
  @include tablets
    display: none
.v-csk-club__title
  // transform: matrix(-1, 0, 0, 1, 0, 0)
  margin: 0 20px
  background-image: url('~@/assets/images/divider.png')
  background-position: 0% 50%
  background-repeat: no-repeat
  margin-bottom: 25px
  display: flex
  justify-content: center
  background-size: contain
  @media screen and(max-width: 1200px)
    background-image: url('~@/assets/images/divider3.png')
  @media screen and(max-width: 1000px)
    background-position: 25% 50%
  &-text
    // transform: matrix(-1, 0, 0, 1, 0, 0)

    font-weight: 700
    font-size: calc(14px + (24 - 14) * ((100vw - 320px) / (1920 - 320)))
    letter-spacing: .07em
    text-transform: uppercase
    text-align: center
    color: white
  &-icon
    margin-left: 15px
    align-self: center
.v-csk-club__container
  position: relative
  width: 100%
  height: 570px
  background-image: url('~@/assets/images/csk-club--bg1.jpg')
  background-size: cover
  background-position: center
  background-repeat: no-repeat
  &-wrapper
    display: flex
    align-items: center
  &-clubCard

    width: 500px
    height: 323.27px
    background-image: url('~@/assets/images/csk-club--card.png')
    background-repeat: no-repeat
  &-receiveForm
    position: relative
    align-items: center
    left: 1170px
    top: 137px
    width: 486px
    height: auto
    background-color: white
    border: 3px solid $yellow
    .receiveForm
      &__heading
        text-align: center
        font-weight: bold
        font-size: 18px
        letter-spacing: .07em
        margin-top: 20px
        margin-bottom: 25px
        margin-left: 13px
      &__iconQuestion
        margin-left: 55px
      &__iconCard
        margin-left: 10px
      &__inputBlock
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        &-item
          display: flex
          flex-direction: row
          align-items: center
          justify-content: center
          width: 100%
          margin-bottom: 20px
        &-label
          display: inline-block
          margin-right: 10px
          margin-left: 25px
          width: 90px
          font-weight: 700
        &-labelCheck
          font-size: 12px
          letter-spacing: .07em
          cursor: pointer
        &-input
          width: 68.9%
          border: none
          background-color: $gray-1
          padding: 5px 10px
          margin-right: 25px
          font-weight: 400
          font-size: 14px
        &#receiveForm__personals
          margin-left: -6px
          margin-right: 7px
          width: 15px
          height: 15px
        &-submit
          font-size: 15px
          font-weight: 700
          border: none
          background-color: $yellow
          padding: 10px 67px
          text-transform: uppercase
          cursor: pointer
          transition: box-shadow .15s ease
          &:hover
            box-shadow: 0px 4px 8px rgba(lighten($text, 80%), .55)
            transition: box-shadow .15s ease

  .redAsterisk
    color: $red
    font-weight: 900

  .accent
    color: $text
    font-weight: 700

.v-csk-club__popup-container
  padding: 0px 16px 32px 16px
  ol
    list-style: none
    padding-left: 0px
    counter-reset: li
  li
    font-size: 14px
    letter-spacing: .07em
  li:before
    counter-increment: li
    content: counters(li,".") ". "

  .discount-conditions-heading
    margin-top: 0px
    margin-bottom: 14px
    font-size: 18px
    text-align: center
    letter-spacing: .07em

  .discount-conditions-title
    display: inline-block
    margin-top: 0px
    margin-bottom: 0px
    font-size: 14px
    letter-spacing: .07em
    font-weight: 700
    &:not(:last-child)
      margin-top: 12px

.v-csk-club__container-clubCard__container
  position: absolute
  top: 63px
  right: 280px
  display: flex
  flex-direction: column
  align-items: center
.v-csk-club__container-clubCard_button
  padding: 18px 52px
  background-color: $red
  margin-top: 20px
  color: white
  font-size: 16px
  width: fit-content
  position: absolute
  bottom: 28px
  left: 50px
</style>
