<template lang="pug">
  form.v-account__container__form(@submit.prevent="saveAccount")
    //- PercentBar(:percent="fillPercent")    
    h2.v-account__container__form__header Редактировать учётную запись:
    .v-account__container__form__content
      .v-account__container__form__content__block.first_block
        //- h3.v-account__container__form__content__block__header.data Данные учётной записи:
        .v-account__container__form__content__block__row
          .v-account__container__form__content__block__row__def Имя:
            span *
          input.v-account__container__form__content__block__row__put(
            type="text"
            v-model="accountName"
            ref="accountname"
            placeholder="Иван"
            required)
        .v-account__container__form__content__block__row
          .v-account__container__form__content__block__row__def Фамилия:
            span *
          input.v-account__container__form__content__block__row__put(
            type="text"
            v-model="accoutLastname"
            ref="accountlastname"
            placeholder="Иванов"
            required)
        //- .v-account__container__form__content__block__row
        //-   .v-account__container__form__content__block__row__def Электронная почта
        //-     span *
        //-   input.v-account__container__form__content__block__row__put(placeholder="example@mail.ru")
        .v-account__container__form__content__block__row
          .v-account__container__form__content__block__row__def Номер телефона:
            span *
          input.v-account__container__form__content__block__row__put(
            type="phone"
            placeholder="+7 (___) ___-__-__"
            v-model="accountPhone"
            ref="accountphone"
            v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
            required
          )
        h3.v-account__container__form__content__block__header Изменить пароль:
        .v-account__container__form__content__block__row
          .v-account__container__form__content__block__row__def Текущий пароль:
          input.v-account__container__form__content__block__row__put(
            type="password"
            v-model="accountPassword"
            ref="accountpassword"
          )
        .v-account__container__form__content__block__row
          .v-account__container__form__content__block__row__def Новый пароль:
          input.v-account__container__form__content__block__row__put(
            type="password"
            v-model="accountNewPassword"
            ref="accountnewpassword"
            minlength="8"
          )
        .v-account__container__form__content__block__row
          .v-account__container__form__content__block__row__def Подтвердите пароль:
          input.v-account__container__form__content__block__row__put(
            type="password"
            v-model="accountConfirmPassword"
            ref="accountconfirmpassword"
            minlength="8"
          )
          .verifyPassword(v-if="verifyPassword")
            span Пароли должны совпадать
        .v-account__container__form__content__block__row
          span.v-account__container__form__content__block__row__star *
            span.v-account__container__form__content__block__row__text  - поля обязательные для заполнения
        
      .v-account__container__form__content__block
        h3.v-account__container__form__content__block__header Активировать клубную карту
          img.v-account__container__form__content__block__header-tooltip(
            :src="require('../assets/images/icons/tooltip.svg')"
            v-tooltip.right-start="{content: 'После активации клубной карты покупки на сайте будут доступны по клубной цене', offset: 8}")
        .v-account__container__form__content__block__row__special-for-stan
          .v-account__container__form__content__block__row__def__other Введите номер карты:
          input.v-account__container__form__content__block__row__put(
            type="text"
            v-model="accountcard"
            ref="accountcard"
            :disabled="!getCardAccess"
            placeholder="номер карты"
            maxlength="4")
        .v-account__container__form__content__block__row-withpic
          .v-account__container__form__content__block__row-withpic__pic
            img(:src="require('@/assets/images/csk-club--card.png')")
        .v-account__container__form__content__block__row-activate
          span.v-account__container__form__content__block__row-activate-add После активации клубной карты покупки на сайте будут доступны по клубной цене
          button.v-account__container__form__content__block__row-activate-btn(:disabled="!getCardAccess") Активировать карту
      DiagramCircle(:percent="fillPercent")
    .v-account__container__form__footer
      .v-account__container__form__footer__btn
        img.v-account__container__form__footer__btn-icon(:src="require('@/assets/images/icons/continue-check.svg')")
        button(type="submit").v-account__container__form__footer__btn-title Сохранить
</template>

<script>
import { maska } from 'maska'
import {requried} from 'vuelidate/lib/validators'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import DiagramCircle from '@/components/partials/diagramCircle'
import PercentBar from '@/components/partials/percent-bar.vue'

export default {

  name: "formAccount",
  data: () => ({
    // fillKeys: ['name', 'lastname', 'phone', 'email', 'birthday'],
    account: {
      name: '',
      lastname: '',
      phone: '',
      password: '',
      newpassword: '',
      confirmpassword: '',
      card: ''
    },
    verifyPassword: false
  }),

  validation: {
    account: {
      name: {requried}
    }
  },

  directives: { maska },
  components: {
    PercentBar,
    DiagramCircle
  },
  computed: {
    ...mapGetters({
      USER: 'user/GET_USER',
      fillPercent: 'user/GET_FILL_PERCENT',
      getCardAccess: 'user/GET_CARD_ACCESS'
    }),
    accountName: {
      get() {
        return this.USER.name
      },

      set(name) {
        name = name.replace(/\d/g, '')
        this.$refs.accountname.value = name
        this.updateField('name', name)
      }
    },
    accoutLastname: {
      get() {
        return this.USER.lastname
      },
      set(lastname) {
        lastname = lastname.replace(/\d/g, '')
        this.$refs.accountlastname.value = lastname
        this.updateField('lastname', lastname)
      }
    },
    accountPhone: {
      get() {
        return this.USER.phone
      },
      set(phone) {
        this.$refs.accountphone.value = phone
        this.account.phone = phone
      }
    },

    accountPassword: {
      get() {
        return this.account.password
      },
      set(password) {
        this.$refs.accountpassword.value = password
        this.account.password = password
      }
    },
    accountNewPassword: {
      get() {
        return this.account.newpassword
      },
      set(password) {
        this.$refs.accountnewpassword.value = password
        this.account.newpassword = password
      }
    },
    accountConfirmPassword: {
      get() {
        return this.account.confirmpassword
      },
      set(password) {
        let confirm = this.$refs.accountconfirmpassword.value = password
        this.account.confirmpassword = password
      }
    },
    accountcard: {
      get() {
        return this.account.card
      },
      set(card) {
        card = card.replace(/\D/g, '')
        this.$refs.accountcard.value = card
        this.account.card = card
      }
    },
  },
  methods: {
    ...mapMutations({
      updateUserField: "user/UPDATE_USER_FIELD"
    }),
    ...mapActions({
      updateUserRequest: "user/updateUserRequest"
    }),
    updateField(key, value) {
      this.updateUserField({ key, value })
    },
    passwordVerify(bool) {
      this.verifyPassword = bool
    },
    saveAccount() {
      let userAccoutData = {
        ...this.USER,
        oldPassword: this.account.password,
        newPassword: this.account.newpassword,
        confirm: this.account.confirmpassword,
        card: this.account.card
      }
      if (this.account.confirmpassword === this.account.newpassword) {
        this.passwordVerify(false)
        this.updateField('password', this.account.confirmpassword)
        this.updateUserRequest(userAccoutData)
        .then(status => {
          if(status) {
            this.$vToastify.success('',"Данные успешно обновленны")
            this.account.password = ''
            this.account.newpassword = ''
            this.account.confirmpassword = ''
          }
          else this.$vToastify.error('', 'При сохранении произошла ошибка')
        })
      }
      else this.passwordVerify(true)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '@/layouts/mixins.sass'

.v-account__container__form
  padding: 17px
  // width: 1067px
  box-sizing: border-box
  @include phones
    width: inherit
    padding: 15px
  &__header
    margin: 0
    margin-bottom: 20px
    font-size: 20px
    @include phones
      text-align: center
  &__content
    display: flex
    justify-content: space-between
    @include phones
      flex-direction: column
    &__block
      display: flex
      flex-direction: column
      @include phones
        width: inherit
      &__header.data
        @include phones
          display: none
      &__header
        margin: 0
        margin-bottom: 15px
        font-size: 16px
        @include phones
          text-align: center
        &-tooltip
          margin-left: 4px
          margin-top: -5px
          cursor: help
          height: 20px
          @include tablets
            display: none
      &__row:last-child
        margin-bottom: 0
      &__row
        margin-bottom: 15px
        display: flex
        justify-content: space-between
        align-items: center

        &__star
          color: $red
          font-size: 12px
          font-weight: bold
          @include phones
            display: none
          span

            color: black
        &__def__other
          font-size: 14px
        &__def
          font-size: 14px
          span
            color: $red
        &__put
          text-align: center
          height: 46px
          border: 2px solid #DADADA
          border-radius: 0
          -webkit-appearance: none
          @include phones
            height: 25px
          @media screen and(max-width: 363px)
            width: 143px
        &__put
          @include phones
            line-height: 25px
      &__row-withpic
        display: flex
        margin-bottom: 15px
        margin-top: 15px
        @include phones
          margin-bottom: 15px
        &__pic
          max-width: 300px

          display: flex
          @include phones
            max-width: 211px
            height: 131px
          img
            width: 100%
            height: 100%
            display: block
      &__row-activate
        display: flex
        @include phones
          flex-direction: column
          align-items: center
          margin-bottom: 15px
        &-add
          display: none
          @include phones
            display: block
            text-align: center
            font-size: 12px
            margin-bottom: 15px
        &-btn
          background: $red
          border: 3px solid #FFFFFF
          color: white
          padding: 10px 13px
          cursor: pointer
          @include phones
            text-align: center
            width: fit-content
          &:disabled
            opacity: 0.8
            background-color: $gray-4
            cursor: default

  &__footer
    display: flex
    @include phones
      justify-content: center
    &__btn
      background-color: $red
      color: white
      align-items: center
      display: flex
      border: 3px solid #FFFFFF
      cursor: pointer
      margin-left: 148px
      @include phones
        margin-left: 0
        justify-content: center
      img
        padding: 11px 7px
        border-right: 3px solid white
      button
        padding: 11px 36px
        font-size: 16px
        font-weight: 700
        text-transform: uppercase
        outline: none
        border: none
        color: #fff
        cursor: pointer
        background: $red


.first_block
  margin-top: 33px
  @include phones
    margin-top: 0


.v-account__container__form__content__block__row__def__other
  margin-bottom: 15px
  .v-account__container__form__content__block__row__put
    margin-bottom: 15px

.diagram 
    width: 250px
    height: 250px
    border-radius: 50%
    background: #990
    position: relative
    overflow: hidden

.diagram::before 
    content: ''
    display: block
    position: absolute
    top: 20px
    left: 20px
    right: 20px
    bottom: 20px
    border-radius: 50%
    background: #ccc
    z-index: 3
    opacity: 1

.diagram .piece 
    width: 100%
    height: 100%
    left: 0
    right: 0
    overflow: hidden
    position: absolute

.diagram .piece::before 
    content: ''
    display: block
    position: absolute
    width: 50%
    height: 100%

.diagram .piece.left 
    transform: rotate(360deg)
    z-index: 2
    border-radius: 50% 

.diagram.over_50 .piece.left 
    transform: rotate(180deg)

.diagram .piece.right 
    transform: rotate(180deg)
    z-index: 1
    border-radius: 50%

.diagram.over_50 .piece.right 
    transform: rotate(360deg)

.diagram .left::before 
    background: #059

.diagram.over_50 .left::before 
    background: #990

.diagram .right::before 
    background: #059

.diagram .text 
    position: absolute
    z-index: 3
    top: 0
    bottom: 0
    left: 0
    right: 0
    text-align: center
    display: flex
    align-items: center
    justify-content: center

.diagram .text b 
    font-size: 72px

.diagram .text span 
    font-size: 16px
    display: block

</style>
