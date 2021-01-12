<template lang="pug">
  .v-wholesalers
    vBreadcrumbs(:breadcrumbs="breadcrumbs")
    h1.v-wholesalers__heading Оптовикам
    .v-wholesalers__first-screen
      form.v-wholesalers__form
        .v-wholesalers__form-heading Выгодное предложение
        .v-wholesalers__form-description Оставьте Ваши данные и наши менеджеры свяжутся с Вами.

        .v-wholesalers__form-input-wrapper
          .v-wholesalers__form-input-group
            label.v-wholesalers__form-input-label(for="input-name")
              | Ваше имя#[span.form-asterisk *]
            input.v-wholesalers__form-input#input-name(type="text" placeholder="Иванов Иван Иванович")

          .v-wholesalers__form-input-group
            label.v-wholesalers__form-input-label(for="input-email")
              | Эл. почта#[span.form-asterisk *]
            input.v-wholesalers__form-input#input-email(type="email" placeholder="mail@example.com")

          .v-wholesalers__form-input-group
            label.v-wholesalers__form-input-label(for="input-phone")
              | Телефон#[span.form-asterisk *]
            input.v-wholesalers__form-input#input-phone(type="phone" placeholder="+7 (999) 123-45-67")
          .v-wholesalers__form-input-group
            label.v-wholesalers__form-input-label(for="Payment_File") Прикрепить файл
            input.v-wholesalers__form-input#Payment_File(type="file")
            span.v-header__clip-container
              img(src="~@/assets/images/icons/clip.png" title="Логотип")
          .v-wholesalers__form-input-group
            button.v-wholesalers__form-submit(type="submit") Отправить

      .v-wholesalers__offer
        h2.v-wholesalers__offer-heading Профессиональным #[br] потребителям
        ul.v-wholesalers__offer-list
          li.v-wholesalers__offer-list-item
            img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
            span Самые низкие цены от прямого дистрибьютера
          li.v-wholesalers__offer-list-item
            img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
            span Широкий ассортимент &ndash; более 50,000 SKU
          li.v-wholesalers__offer-list-item
            img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
            span Доставка день в день собственным парком А/М
          li.v-wholesalers__offer-list-item
            img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
            span Индивидуальный подход к комплектации объектов строительства
          li.v-wholesalers__offer-list-item
            img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
            span Складские помещения более 10,000 м
              sup 2
              | &nbsp;в черте города Москва

    .v-wholesalers__workwith
      h3.v-wholesalers__workwith-heading Мы успешно работаем с самыми требовательными заказчиками
      .v-wholesalers__workwith-container
        .v-wholesalers__workwith-container-item
          img.v-wholesalers__workwith-container-image(:src="require('../assets/images/wholesalers/workwith-1.jpg')")
          .v-wholesalers__workwith-container-description
            span Государственные организации
        .v-wholesalers__workwith-container-item
          img.v-wholesalers__workwith-container-image(:src="require('../assets/images/wholesalers/workwith-2.jpg')")
          .v-wholesalers__workwith-container-description
            span Строительные организации
        .v-wholesalers__workwith-container-item
          img.v-wholesalers__workwith-container-image(:src="require('../assets/images/wholesalers/workwith-3.jpg')")
          .v-wholesalers__workwith-container-description
            span Компании, комплектующие строительные объекты
        .v-wholesalers__workwith-container-item
          img.v-wholesalers__workwith-container-image(:src="require('../assets/images/wholesalers/workwith-4.jpg')")
          .v-wholesalers__workwith-container-description
            span Дизайнеры и архитекторы
        .v-wholesalers__workwith-container-item
          img.v-wholesalers__workwith-container-image(:src="require('../assets/images/wholesalers/workwith-5.jpg')")
          .v-wholesalers__workwith-container-description
            span Бригадиры

    .v-wholesalers__advantages
      .v-wholesalers__advantages-righty
        img(:src="require('../assets/images/wholesalers/advantages-image-1.jpg')")
        .v-wholesalers__advantages-content
          .v-wholesalers__advantages-righty-heading Государственные организации
          .v-wholesalers__advantages-righty-wrapper
            ul.v-wholesalers__advantages-list.advantages-righty-list
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Работаем по&nbsp;44&nbsp;и&nbsp;223&nbsp;ФЗ
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Зарегистрированы на&nbsp;площадках ЕАСУЗ, Портал поставщиков, Сбербанк-АСТ, Стройторги, ЭТП ММВБ, ГУП &laquo;Мосгортранс&raquo; торговая площадка,
                  | Единая электронная торговая площадка, &laquo;Оборонторг&raquo;, Универсальная электронная торговая платформа, Портал закупок
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span В&nbsp;наличии специализированные материалы для больниц, школ и&nbsp;режимных объектов
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Помощь в&nbsp;подборе, персональный менеджер
            .v-wholesalers__advantages-takeOrder
              img(:src="require('../assets/images/wholesalers/arrow_right_next.png')")
              .v-wholesalers__advantages-takeOrder-button(@click="showOrderForm")
                span Отправить заявку

      .v-wholesalers__advantages-lefty
        .v-wholesalers__advantages-content
          .v-wholesalers__advantages-lefty-heading Строительные организации
          .v-wholesalers__advantages-lefty-wrapper
            .v-wholesalers__advantages-takeOrder.advantages-takeOrder-lefty
              img(:src="require('../assets/images/wholesalers/arrow_right_next.png')")
              .v-wholesalers__advantages-takeOrder-button.advantages-takeOrder-lefty-button(@click="showOrderForm")
                span Отправить заявку
            ul.v-wholesalers__advantages-list.advantages-lefty-list
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Уникальное ценовое предложение
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Оперативная доставка
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Широкий ассортимент строительных и&nbsp;отделочных материалов в&nbsp;наличии на&nbsp;складах
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Персональный менеджер
        img(:src="require('../assets/images/wholesalers/advantages-image-2.jpg')")

      .v-wholesalers__advantages-righty
        img(:src="require('../assets/images/wholesalers/advantages-image-3.jpg')")
        .v-wholesalers__advantages-content
          .v-wholesalers__advantages-righty-heading Компании, комплектующие строительные объекты
          .v-wholesalers__advantages-righty-wrapper
            ul.v-wholesalers__advantages-list.advantages-righty-list
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Широкий ассортимент строительных и&nbsp;отделочных материалов в&nbsp;наличии на&nbsp;складах
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Оперативная доставка
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Уникальное ценовое предложение, прямые договора с&nbsp;поставщиками
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Персональный менеджер
            .v-wholesalers__advantages-takeOrder
              img(:src="require('../assets/images/wholesalers/arrow_right_next.png')")
              .v-wholesalers__advantages-takeOrder-button(@click="showOrderForm")
                span Отправить заявку

      .v-wholesalers__advantages-lefty
        .v-wholesalers__advantages-content
          .v-wholesalers__advantages-lefty-heading Дизайнеры и архитекторы
          .v-wholesalers__advantages-lefty-wrapper
            .v-wholesalers__advantages-takeOrder.advantages-takeOrder-lefty
              img(:src="require('../assets/images/wholesalers/arrow_right_next.png')")
              .v-wholesalers__advantages-takeOrder-button.advantages-takeOrder-lefty-button(@click="showOrderForm")
                span Отправить заявку
            ul.v-wholesalers__advantages-list.advantages-lefty-list
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Шоурум
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Отдельная зона для работы с&nbsp;клиентом
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Широкий ассортимент строительных и&nbsp;отделочных материалов в&nbsp;наличии на&nbsp;складах
        img(:src="require('../assets/images/wholesalers/advantages-image-4.jpg')")

      .v-wholesalers__advantages-righty
        img(:src="require('../assets/images/wholesalers/advantages-image-5.jpg')")
        .v-wholesalers__advantages-content
          .v-wholesalers__advantages-righty-heading Бригадиры
          .v-wholesalers__advantages-righty-wrapper
            ul.v-wholesalers__advantages-list.advantages-righty-list
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Оперативная доставка
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Накопительная система скидок
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Широкий ассортимент строительных и&nbsp;отделочных материалов в&nbsp;наличии на&nbsp;складах
              li.v-wholesalers__advantages-list-item
                img(:src="require('../assets/images/wholesalers/checkmark-circle.png')")
                span Возможность участия в&nbsp;программах обучения ведущих производителей
            .v-wholesalers__advantages-takeOrder
              img(:src="require('../assets/images/wholesalers/arrow_right_next.png')")
              .v-wholesalers__advantages-takeOrder-button(@click="showOrderForm")
                span Отправить заявку

    .v-wholesalers__cta
      h4.v-wholesalers__cta-heading Все еще думаете?
      span.v-wholesalers__cta-description
        | Отправьте нам заявку и&nbsp;мы&nbsp;сделаем вам лучшее предложение
      .v-wholesalers__cta-button(@click="showOrderForm")
        span.v-wholesalers__cta-button-title Отправить заявку
    vCta

    vPopup(
      v-if="isOrderFormVisible"
      @close="closeOrderForm"
      :popupTitle="'Форма заявки:'")
      .v-wholesalers__orderform
        form.orderform__form
          .orderform__input-group
            label(for="order-name") Ваше имя
              span.form-asterisk *
            input#order-name(type="text" placeholder="Иванов Иван Иванович")
          .orderform__input-group
            label(for="order-email") Эл. почта
              span.form-asterisk *
            input#order-email(type="email" placeholder="ivan@example.com")
          .orderform__input-group
            label(for="order-phone") Телефон
              span.form-asterisk *
            input#order-phone(type="tel" placeholder="+7 (999) 123-45-67")
          .orderform__input-group
            label(for="order-comment") Комментарий
            textarea#order-comment(rows="5" placeholder="Здесь вы можете описать свои комментарии к заявке")
          .orderform__input-group--checkbox
            input#isAgree(type="checkbox")
            label(for="isAgree") Я даю свое
              span.textBold &nbsp;согласие на обработку
              | &nbsp;моих персональных данных.

</template>

<script>
import vBreadcrumbs from '@/components/breadcrumbs.vue'
import vCta from '@/components/cta.vue'
import vPopup from '@/components/popup/v-popup'

export default {
  name: 'Wholesalers',
  components: {
    vBreadcrumbs,
    vCta,
    vPopup
  },
  data() {
    return {
      breadcrumbs: ['Главная', 'Оптовикам'],
      isOrderFormVisible: false
    }
  },
  methods: {
    showOrderForm() {
      this.isOrderFormVisible = true
    },
    closeOrderForm() {
      this.isOrderFormVisible = false
    }
  }
}
</script>

<style lang="sass">
.v-wholesalers
  &__heading
    margin: 15px 0px 15px 45px
    font-size: 24px
    color: $text
    letter-spacing: .07em

  &__first-screen
    position: relative
    height: 532px
    background-image: url('~@/assets/images/wholesalers/first-screen-bg.jpg')

  &__form
    position: relative
    top: 109px
    left: 116px
    border: 10px solid $gray-1
    max-width: 486px
    background-color: white
    &-heading,
    &-description
      text-align: center
    &-heading
      margin-top: 6px
      font-size: 18px
      font-weight: bold
      color: $text
      letter-spacing: .07em
      text-transform: uppercase
    &-description
      font-size: 12px
      font-weight: 300
      color: $text
      padding: 0px 133px
      margin-top: 6px
    &-input-wrapper
      margin-top: 20px
    &-input-group
      display: flex
      flex-direction: row
      justify-content: space-between
      padding: 0px 15px
      &:not(:last-child)
        margin-bottom: 20px
      &:last-child
        justify-content: center
    &-input-label
      font-weight: bold
      letter-spacing: .07em
      color: $text
    &-input
      width: 13.347vw
      background-color: $gray-1
      border: none
      padding: 5px 10px
      font-size: 14px
      &:active, &:focus
        outline-color: $red
    &-submit
      margin-bottom: 15px
      padding: 10px 67px
      background-color: $yellow
      border: none
      font-size: 15px
      font-weight: 700
      text-transform: uppercase
      letter-spacing: .07em
      cursor: pointer
      transition: all .15s ease
      &:hover
        background-color: darken($yellow, 3%)
        box-shadow: 0px 4px 8px rgba($text, .1)

  &__offer
    position: absolute
    top: 84px
    right: 116px
    &-heading
      margin-bottom: 34px
      margin-top: 0
      font-size: 42px
      text-align: center
      text-transform: uppercase
      letter-spacing: .07em
      color: white
    &-list
      padding-left: 0
      &-item
        display: flex
        align-items: center
        align-self: center
        &:not(:last-child)
          margin-bottom: 13px
        span
          margin-left: 8px
          color: white
          font-size: 24px
          font-weight: 700
          text-transform: uppercase
          letter-spacing: .07em

  &__workwith
    &-heading
      margin-top: 30px
      margin-bottom: 30px
      text-align: center
      text-transform: uppercase
      letter-spacing: .07em
      font-weight: 700
      color: $text
    &-container
      display: grid
      position: relative
      grid-template-columns: repeat(5, 1fr)
      column-gap: 30px
      padding: 0px 150px
      &-image
        border: 2px solid $red
      &-description
        position: relative
        display: flex
        justify-content: center
        align-items: center
        min-height: 40px
        background-image: url('~@/assets/images/wholesalers/stripe.png')
        background-position: center center
        bottom: 56px
        width: 100%
        text-align: center
        color: white
        font-size: 16px
        font-weight: 700

  &__advantages
    &-righty, &-lefty
      display: flex
      background-color: $gray-1
      border: 2px solid $red
      box-shadow: 10px 10px 7px rgba(0, 0, 0, .2)
      margin: 30px 45px 30px 45px
      &-wrapper
        display: flex
    &-list
      padding-left: 0
      list-style: none
      &-item
        display: flex
        align-items: flex-start
        align-self: center
        margin-bottom: 25px
        &:last-child
          margin-bottom: 0px
        span
          margin-top: 7px
          margin-left: 12px
          font-size: 16px
          line-height: 19px
          letter-spacing: .07em
    &-takeOrder
      display: flex
      align-self: center
      flex-direction: column
      align-items: center
      &-button
        margin-top: 54px
        padding: 10px 32px
        background-color: $red
        font-weight: 900
        color: white
        text-transform: uppercase
        cursor: pointer

    &-righty
      &-heading
        margin-top: 40px
        margin-left: 225px
        margin-bottom: 30px
        font-size: 18px
        font-weight: 700
        text-transform: uppercase
        letter-spacing: .07em
        color: $text

    &-lefty
      &-heading
        margin-top: 40px
        margin-left: 377px
        margin-bottom: 47px
        font-size: 18px
        font-weight: 700
        text-transform: uppercase
        letter-spacing: .07em
        color: $text

  &__cta
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    margin-top: 60px
    margin-bottom: 70px
    &-heading
      margin-top: 0px
      margin-bottom: 0px
      font-size: 24px
      font-weight: 700
      text-transform: uppercase
      letter-spacing: .07em
      color: $text
    &-description
      margin-top: 15px
      font-size: 18px
      text-transform: uppercase
      letter-spacing: .07em
    &-button
      margin-top: 15px
      background-color: $red
      padding: 10px 32px
      cursor: pointer
      &-title
        color: white
        text-transform: uppercase
        font-weight: 900

.advantages-righty-list
  margin: 18px 65px 0px 68px
  max-width: 608px

.advantages-lefty-list
  margin: 14px 83px 0px 185px
  max-width: 486px

.advantages-takeOrder-lefty
  margin-left: 78px
  &-button
    min-width: 158px

.form-asterisk
  color: $red
  font-weight: bold

.v-wholesalers__orderform
  padding: 0px 5px

  .orderform__input-group,
    display: flex
    justify-content: space-between
    &:not(:last-child)
      margin-bottom: 20px

    input, textarea
      padding: 5px 10px
      border: none
      background-color: $gray-1
      font-size: 14px
      font-weight: 300
      line-height: 16px
      letter-spacing: .07em
      width: 255px
    textarea
      resize: none
    label
      letter-spacing: .07em
      font-weight: bold
      cursor: pointer

  .orderform__input-group--checkbox
    display: flex
    align-items: center
    input
      margin-right: 8px
    label
      margin-bottom: -1px
      font-size: 12px
      font-weight: 300
      letter-spacing: .07em
      cursor: pointer
.textBold
  font-weight: 700

// input
//   -webkit-appearance: none
//   border-radius: 0
</style>
