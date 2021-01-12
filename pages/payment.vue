<template lang="pug">
  #v-payment
    .v-popup-layout(v-if="paymentCard" @click="paymentCard=!paymentCard")
    .v-popup-paymentCard(v-if="paymentCard")
      .v-catalog__popup__filters-close
        img.v-payment__closeIcon(
          :src="require('@/assets/images/icons/close_mark.svg')"
          title="Закрыть окно"
          alt="Закрыть"
          @click="paymentCard=!paymentCard")
      .v-popup-paymentCard__content
        .v-popup-paymentCard__header
          h5 Правила оплаты
        .v-popup-paymentCard__text
          p К оплате принимаются платежные карты: VISA Inc, MasterCard WorldWide, МИР.
          p При оплате заказа банковской картой, обработка платежа происходит на авторизационной странице банка, где Вам необходимо ввести данные Вашей банковской карты:
          ol.v-popup-paymentCard__text__listprop
            li.v-popup-paymentCard__text__itemprop
              p тип карты
            li.v-popup-paymentCard__text__itemprop
              p номер карты
            li.v-popup-paymentCard__text__itemprop
              p срок действия карты (указан на лицевой стороне карты)
            li.v-popup-paymentCard__text__itemprop
              p Имя держателя карты (латинскими буквами, точно также как указано на карте)
            li.v-popup-paymentCard__text__itemprop
              p CVC2/CVV2 код
        .v-popup-paymentCard__pic
          img(:src="require('../assets/images/payment/image_card.png')")
        .v-popup-paymentCard__text
          p Если Ваша карта подключена к услуге 3D-Secure, Вы будете автоматически переадресованы на страницу банка, выпустившего карту, для прохождения процедуры аутентификации. Информацию о правилах и методах дополнительной идентификации уточняйте в Банке, выдавшем Вам банковскую карту.
          p Безопасность обработки интернет-платежей через платежный шлюз банка гарантирована международным сертификатом безопасности PCI DSS. Передача информации происходит с применением технологии шифрования TLS. Эта информация недоступна посторонним лицам.
        .v-popup-paymentCard__footer
          h5  Реквизиты:
          p Наименование:
            span    ООО ТД «ЦСК»
          p ИНН:
            span  5047184546
          p КПП:
            span  503201001
          p Юридический адрес:
            span  143002, Московская область, Одинцовский район, город Одинцово, улица Молодежная, дом 46, офис 523
          p БИК:
            span  044525225
          p Расчетный счет:
            span  40702810140000039323
          p Банк:
            span  ПАО СБЕРБАНК Г. МОСКВА
    vBreadcrumbs(:breadcrumbs="breadcrumbs")
    .v-payment__main
      h2.v-payment__main-heading Способы оплаты:
      .v-payment__grid-wrapper
        .v-payment__legals
          .v-payment__content
            h3.v-payment__content-heading Для юридических лиц
              img.v-payment__content-heading-tooltip(
                :src="require('../assets/images/icons/tooltip.svg')"
                v-tooltip.right-start="{content: 'При получении товара обязательно наличие оригинала доверенности и&nbsp;паспорта лица, указанного в&nbsp;доверенности', offset: 8}")
            p При получении товара обязательно наличие оригинала доверенности и паспорта лица, указанного в доверенности

            .v-payment__legals-types
              .v-payment__legals-types-wrapper
                h4.v-payment__individuals-heading Оплата наличными:
                ul.v-payment__individuals-list
                 li.v-payment__individuals-list-item
                   span В центральном офисе
                 li.v-payment__individuals-list-item
                   span На складе
                 li.v-payment__individuals-list-item
                   span При доставке
                h4.v-payment__individuals-heading Оплата по безналичному расчету:
                ul.v-payment__individuals-list
                  li.v-payment__individuals-list-item
                    span Оплата по выставленному счёту в банке

          .v-payment__image
            img(:src="require('../assets/images/payment/legals.png')")

        .v-payment__individuals
          .v-payment__content
            h3.v-payment__content-heading.phys Для физических лиц
              img.v-payment__content-heading-tooltip(
                :src="require('../assets/images/icons/tooltip.svg')"
                v-tooltip.right-start="{content: 'В&nbsp;случае заказа товара с&nbsp;индивидуально заданными характеристиками (например, колеровка краски, нарезка линолеума и&nbsp;др.) требуется его предварительная оплата', offset: 8}")
            p В случае заказа товара с индивидуально заданными характеристиками (например, колеровка краски, нарезка линолеума и др.) требуется его предварительная оплата
            .v-payment__individuals-types
              .v-payment__individuals-types-wrapper
                h4.v-payment__individuals-heading Оплата наличными:
                ul.v-payment__individuals-list
                  li.v-payment__individuals-list-item
                    span В центральном офисе
                  li.v-payment__individuals-list-item
                    span На складе
                  li.v-payment__individuals-list-item
                    span При доставке
                h4.v-payment__individuals-heading Оплата банковской картой:
                ul.v-payment__individuals-list
                  li.v-payment__individuals-list-item
                    span Оплата онлайн банковской картой
                    img.v-payment__content-heading-tooltip-cartpayment(@click="paymentCard = !paymentCard"
                      :src="require('../assets/images/icons/tooltip.svg')")
                    span.star *
                  li.v-payment__individuals-list-item
                    span В центральном офисе
                  li.v-payment__individuals-list-item
                    span На складе
                  li.v-payment__individuals-list-item
                    span При доставке
          .v-payment__image
            img(:src="require('../assets/images/payment/individuals.png')")
      .footer__rules
        p(@click="paymentCard = !paymentCard") * Правила оплаты банковской картой
    vCta
</template>

<script>
import vBreadcrumbs from '@/components/breadcrumbs.vue'
import vCta from '@/components/cta.vue'

export default {
  name: 'Payment',
  components: {
    vBreadcrumbs,
    vCta
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Главная',
          link: "/"
        },
        {
          text: 'Оплата',
        }
      ],
      paymentCard: false
    }
  }
}
</script>

<style lang="sass">
@import "~@/assets/sass/tooltip"
@import '../layouts/mixins.sass'
.v-payment__main
  padding: 0px 45px
  @include mediumlaptop
    padding: 20px
  @include phones

  &-heading
    margin-bottom: 30px
    font-size: 24px
    font-weight: 700
    letter-spacing: .07em
    @include phones
      display: none
.v-payment__grid-wrapper
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 1fr
  grid-template-areas: ". ."
  grid-column-gap: 30px
  margin-bottom: 30px
  @include mediumlaptop
    display: flex
    flex-direction: column
  @include phones
    margin-bottom: 20px
.v-payment__legals,
.v-payment__individuals
  display: flex
  justify-content: space-between
  align-items: flex-start
  border: 2px solid $gray-4
  background-color: $gray-1
  position: relative
  z-index: 1
  @include tablets
    align-items: center
    flex-direction: column-reverse
    padding: 0 20px
  @include phones
    padding: 0 10px

.v-payment__legals
  @include mediumlaptop
    margin-bottom: 30px
  @include phones
    margin-bottom: 15px

.v-payment
  &__content
    z-index: 3
    p
      font-size: 12px
      text-align: center
      font-weight: normal
      display: none
      @include tablets
        display: block
  &__content-heading
    display: flex
    justify-content: center
    margin-top: 25px
    margin-left: 84px
    font-size: 22px
    font-weight: 700
    letter-spacing: .07em
    @include mediumlaptop
      text-align: center
      margin: 20px auto
    @include tablets
      margin-bottom: 0
    @include phones
      font-size: 14px
    &-tooltip
      margin-left: 4px
      margin-top: -5px
      cursor: help
      height: 20px
      @include tablets
        display: none
  &__image
    margin: 40px 20px 40px 0px
    @include mediumlaptop
      display: flex
      justify-content: center
      object-fit: cover
      margin: 20px 0
      width: 100%
      img
        @include tablets
          height: 200px
  &__legals-types-wrapper
    margin-left: 65px
    @include tablets
      margin: 20px 0
  &__legals-heading
    text-align: center
    max-width: 248px
    margin-bottom: 0px
    margin-top: 0px
    font-size: 20px
    font-weight: 700
    text
    letter-spacing: .07em
    @include tablets
      max-width: unset
    @include phones
      font-size: 14px
    &:first-child
      margin-top: 68px
      margin-bottom: 44px
      @include phones
        margin-top: 20px
        margin-bottom: 20px
    &:nth-child(2)
      margin-bottom: 8px

  &__legals-list, &__individuals-list
    margin-top: 0px
    padding-left: 32px
    @include phones
      padding-left: 20px

    &-item
      font-size: 14px
      font-weight: 300
      letter-spacing: .07em
      color: $text
      @include phones
        font-size: 12px
      &:not(:last-child)
        margin-bottom: 7px
    &-item::marker
      color: $red
  &__individuals
    &-types-wrapper
      padding-left: 63px
      @include phones
        padding-left: 20px
    &-heading
      max-width: 450px
      font-size: 20px
      font-weight: 700
      margin-bottom: 8px
      @include phones
        font-size: 14px
        text-align: center
.v-payment__content-heading-tooltip-cartpayment
  margin-left: 4px
  margin-top: -5px
  cursor: pointer
  height: 20px
  @media screen and(max-width: 1418px)
    margin-left: 1px
    margin-top: 0
  @include phones
    display: none


.v-payment__individuals-list-item
  .star
    display: none
    @include phones
      display: inline
      margin-left: 4px
      margin-top: -5px

.v-popup-layout
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.46)
  position: fixed
  z-index: 100
  top: 0
  bottom: 0
.v-popup-paymentCard
  width: 842px
  position: fixed
  z-index: 110
  background-color: white
  border: 10px solid #f6f6f6
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  padding: 20px
  @media screen and(max-width: 1100px)
    width: 70%
  @media screen and(max-width: 650px)
    width: 90%
  @include phones
    width: auto
    min-width: 315px
    height: auto
    overflow: auto
    padding: 10px
    height: 82vh
  &__header h5
    margin: 0
    text-align: center
    font-size: 20px
    margin-bottom: 15px
    @include phones
      font-size: 16px
      margin-bottom: 5px
    @media screen and(max-width: 350px)
      font-size: 14px
      padding: 5px
  &__text p
    font-size: 14px
    font-weight: bold
    @media screen and(max-width: 350px)
      font-size: 12px
  &__text ol
    margin: 5px
    padding-left: 29px
    font-size: 14px
    @media screen and(max-width: 350px)
      font-size: 12px
  &__text li p
    color: $red
  &__pic
    display: flex
    width: 100%
    justify-content: center
    align-items: center
    margin-bottom: 5px
  &__footer h5
    margin: 0
    margin-top: 10px
    font-size: 16px
    @include phones
      font-size: 14px
  &__footer p
    font-size: 14px
    font-weight: bold
    @media screen and(max-width: 350px)
      font-size: 12px
    span
      color: $red
.footer__rules
  display: none
  @include phones
    display: flex
    justify-content: flex-end
    color: $red
    font-size: 14px
    cursor: pointer





.v-catalog__popup__filters-close
  position: absolute
  width: 15px
  right: 8px
  top: 8px
  img
    width: 100%

#v-payment > div.v-payment__main > div.v-payment__grid-wrapper > div.v-payment__individuals > div.v-payment__content > div > .v-payment__individuals-heading
  margin-left: 84px
  @include phones
    margin: 0

.v-payment__legals-list
  @include phones
    padding-left: 40px

.phys
  margin-left: 0 !important
</style>
