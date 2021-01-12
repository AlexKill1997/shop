<template lang="pug">
  #v-popup-login
    VueRecaptcha(
      ref="recaptcha"
      :loadRecaptchaScript="true"
      size="invisible"
      badge=""
      :sitekey="siteKey"
      @verify="recaptchaCheck($event, formMethodProvider)"
      @expired="$refs.recaptcha.reset()"
    )
    .v-popup-wrapper(ref="popupWrapper" :style="{ zIndex: 1001 }" @click="closePopup")
    .v-popup-login
      img.v-popup-login__closeIcon(
        :src="require('../../assets/images/icons/close_mark.svg')"
        title="Закрыть окно"
        alt="Закрыть"
        @click="closePopup")

      form.v-popup-login__body(v-if="loginState == 'login'" @submit.prevent="loginHandler")
        img.v-popup-login__account-icon(:src="require('@/assets/images/LOGO_RUS.png')")
        h5.v-popup-login__heading Войти в личный кабинет
        .v-popup-login__form
          .v-popup-login__inputGroup
            .v-popup-login__inputGroup__single
              input.v-popup-login__input(
                type="phone"
                placeholder="+7 (___) ___-__-__"
                ref="number"
                v-model="userNumber"
                v-maska="['+# ### ### ## ##', '+### ### ## ## ##']")
              .error(v-if="!$v.login.userNumber.required && $v.login.userNumber.$dirty")
                span введите номер телефона
            .v-popup-login__inputGroup__single
              input.v-popup-login__input(
                type="password"
                placeholder="Пароль"
                v-model="userPassword"
                ref="userPassword"
                autocomplete="off")
              .error(v-if="!$v.login.userPassword.required && $v.login.userPassword.$dirty")
                span введите правильный пароль
        .wrong(v-if="errorLogin")
          span Неверный логин или пароль!
        .v-popup-login__links
          span.v-popup-login__links-item(@click="changeLoginState('recover')") Забыли пароль?
          span.v-popup-login__links-item(@click="changeLoginState('register')") Регистрация

        .v-popup-login__submit
          button.v-popup-login__submit-item(type="submit" v-if="checkLogin" ) Войти

      .v-popup-login__body--registration(v-if="loginState == 'register'")
        .login-registration__header
          img(src='~@/assets/images/icons/pencil-writing-on-a-paper-sheet.svg')
          .login-registration__heading-wrapper
            h5.login-registration__heading Создать учетную запись
            p.login-registration__description Создав учётную запись на&nbsp;нашем сайте, Вы&nbsp;будете тратить меньше времени на оформление заказа, сможете хранить несколько адресов доставки, отслеживать историю заказов, а&nbsp;также активировать клубную карту
              span.fontBold &nbsp;ЦСК.
        .login-registration__body
          form.login-registration__form(@submit.prevent="registerSubmitHandler")
            .login-registration__input-group
              label(for="reg-phone") Номер телефона:
              input#reg-phone(
                type="phone"
                placeholder="+7 (___) ___-__-__"
                v-model="userNumber"
                ref="number"
                v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
              )
              .error(v-if="!$v.register.userNumber.required && $v.register.userNumber.$dirty")
                span введите номер телефона
            .wrongAuth(v-if="authError")
              span пользователь уже зарегистрирован
            .login-registration__checkbox-group
              input#reg-isAgree.active(type="checkbox" v-model="agree")
              label(for="reg-isAgree") Я&nbsp;даю свое
                span.fontBold &nbsp;согласие на&nbsp;обработку
                | &nbsp;моих персональных данных.
              .error(v-if="$v.register.agree.$invalid")
                span необходимо согласиться с условиями
            .login-registration__submit-wrapper
              button(type="submit").login-registration__submit Зарегистрироваться

          span.login-registration__back(@click="changeLoginState('login')") Назад

      .v-popup-login__body--remind(v-if="loginState == 'recover'")
        h5.login-remind__heading Восстановить пароль:
        p.login-remind__description Для получения инструкций по&nbsp;восстановлению пароля введите номер телефона, указанный при регистрации.
        form.login-remind__form(@submit.prevent="recoverPasswordHandler")
          .login-remind__input-group
            label(for="remind-phone") Номер телефона:
            input#remind-phone(type="phone"
              placeholder="+7 (___) ___-__-__"
              ref="number"
              v-model="userNumber"
              v-maska="['+# ### ### ## ##', '+### ### ## ## ##']"
            )
            .error(v-if="!$v.recovery.userNumber.required && $v.recovery.userNumber.$dirty")
              span введите номер телефона
          .login-remind__submit-wrapper
            button(type="submit").login-remind__submit Отправить
        span.login-remind__back(@click="changeLoginState('login')") Назад

</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import { maska } from 'maska'

import vPopup from '@/components/popup/v-popup'

import VueRecaptcha from 'vue-recaptcha'

import recaptchaMixin from '@/components/mixins/recaptchaMixin'

export default {
  name: 'LoginPopup',
  components: {
    vPopup,
    VueRecaptcha
  },
  props: {
    zIndex: {
      type: Number,
      default: 8000
    }
  },
  data: () => ({
    loginState: 'login',
    userData: {
      userNumber: '',
      userPassword: '',
      checkLogin: false,
      agree: false,
      news: false,
    },
    authError: false,
    errorLogin: false
  }),
  validations: {
    register: {
      userNumber: {required, minLength: minLength(12)},
      agree: {
        checked: v => v
      }
    },
    login: {
      userNumber: {required, minlength: minLength(12)},
      userPassword: {required}
    },
    recovery: {
      userNumber: {required, minlength: minLength(12)}
    }
  },

  directives: { maska },

  mixins: [ recaptchaMixin ],

  computed: {
    register() {
      return {
        userNumber: this.userData.userNumber,
        agree: this.userData.agree
      }
    },
    login() {
      return {
        userNumber: this.userData.userNumber,
        userPassword: this.userData.userPassword
      }
    },
    recovery() {
      return {
        userNumber: this.userData.userNumber,
      }
    },
    userNumber: {
      get() {
        return this.userData.userNumber
      },

      set(number) {
        this.$refs.number.value = number
        this.userData.userNumber = number
      }
    },
    userPassword: {
      get() {
        return this.userData.userPassword
      },

      set(password) {
        this.$refs.userPassword.value = password
        this.userData.userPassword = password
      }
    },
    agree: {
      get() {
        return this.userData.agree
      },
      set(value) {
        this.userData.agree = value
      }
    },
    news: {
      get() {
        return this.userData.news
      },
      set(value) {
        this.userData.news = value
      }
    }
  },

  mounted() {
    const vm = this
    document.addEventListener('click', function(item) {
      if (item.target === vm.$refs.popup_wrapper) {
        vm.closePopup()
      }
    })
  },

  methods: {
    ...mapActions({
      sendUserData: 'auth/getUserResponse',
      sendRecoverData: 'auth/getRecoverResponse',
      sendLoginData: 'auth/getLoginUser'
    }),

    closePopup() {
      this.$emit('close')
    },
    changeLoginState(prop) {
      this.loginState = prop
    },

    checkLogin() {
      this.userData.checkLogin = !this.userData.checkLogin
    },
    
    formMethodProvider() {
      this[`${this.loginState}Submit`]()
    },

    registerSubmitHandler() {
      if (this.$v.register.$invalid) {
        this.$v.$touch()
        return
      }

      this.recaptchaExecute()
    },

    registerSubmit() {
      const formData = {
        phone: this.userData.userNumber
      }
      
      this.sendUserData(formData)
      .then(success => {
        if(success) {
          this.closePopup()
          this.$router.push("/account")
        } else {
          this.authError = true
        }
      })
    },

    loginSubmit() {
      const userData = {
        phone: this.userData.userNumber,
        password: this.userData.userPassword
      }
      this.sendLoginData(userData)
      .then(success => {
        if(success) {
          this.errorLogin = false
          this.closePopup()
          this.$router.push("/account")
        } else {
          this.wrongPassword()
        }
      })
    },

    loginHandler() {
      if (this.$v.login.$invalid) {
        this.$v.$touch()
        return
      }

      this.recaptchaExecute()
    },

    wrongPassword() {
      this.errorLogin = true
    },

    recoverSubmit() {
      const phone = this.userData.userNumber
      this.sendRecoverData(phone)
      .then(success=> {
        if (success) {
          this.$emit('close')
          this.$emit("recovery")
        }
        else {
          this.$emit('close')
          this.$emit('recoverError')
        }
      })
    },

    recoverPasswordHandler() {
      if(this.$v.recovery.$invalid){
        this.$v.$touch()
        return
      }
      
      this.recaptchaExecute()
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../layouts/mixins.sass' 
#v-popup
  position: absolute
  z-index: -1
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  align-items: center
  justify-content: center
.v-popup-wrapper
  background-color: rgba(0, 0, 0, .46)
  position: fixed
  display: flex
  align-items: center
  justify-content: center
  left: 0
  right: 0
  top: 0
  bottom: 0
  width: 100vw
  height: 100vh

.v-popup-login
  padding: 10px
  position: fixed
  min-width: 315px
  background: #fff
  border: 10px solid #f6f6f6
  z-index: 10000
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  overflow: auto
  @media screen and (max-height: 736px) and (max-width: 400px)
    overflow: auto



  &__closeIcon
    position: absolute
    right: 8px
    top: 8px
    cursor: pointer

  &__account-icon
    align-self: center

  &__body
    display: flex
    flex-direction: column
    &--registration
      max-width: 560px
      @include phones
        padding-top: 10px
        flex-direction: column

        overflow: auto

    &--remind
      max-width: 454px

  &__heading
    align-self: center
    margin-top: 13px
    margin-bottom: 13px
    font-size: 18px
    line-height: 21px
    letter-spacing: .07em
    color: $text
    @include phones
      font-size: 14px
  &__inputGroup
    display: flex
    justify-content: center
    flex-direction: column
    height: 120px
    margin-bottom: 13px
  &__input
    background-color: $gray-1
    border: none
    padding: 10px 22px

  &__links
    display: flex
    justify-content: space-between
    margin-bottom: 36px
    &-item
      color: $red
      text-decoration: underline
      cursor: pointer
      font-weight: bold
      @include phones
        font-size: 14px
  &__submit
    display: flex
    justify-content: center
    text-decoration: none
  &__submit-item
    padding: 8px 74px
    max-width: 200px
    background-color: $yellow
    text-transform: uppercase
    font-size: 15px
    font-weight: 700
    line-height: 18px
    cursor: pointer
    color: black
    border: none

.login-registration
  &__header
    display: flex
    align-items: flex-start
    img
      @include phones
        display: none

  &__heading
    margin-top: 0px
    margin-bottom: 13px
    font-size: 18px
    font-weight: bold
    line-height: 21px
    letter-spacing: .07em
    text-align: center
    @include phones
      margin-bottom: 13px
  &__description
    margin: 0px
    padding-left: 24px
    font-size: 12px
    font-weight: 300
    letter-spacing: .07em
    @include phones
      font-size: 11px
      margin-bottom: 13px

  &__input-group
    display: flex
    justify-content: space-between
    margin-top: 13px
    align-items: center
    flex-wrap: wrap
    height: 53px
    @media screen and (max-width: 600px)
      flex-direction: column
      justify-content: center
      text-align: center
    @include phones
      flex-wrap: nowrap
      margin-top: 0
      height: 63px
    &:not(:last-child)
      margin-bottom: 13px
      @include phones
        margin-bottom: 20px
    .error
      display: flex
      justify-content: flex-end
      span
        padding-right: 66px
        @include phones
          padding-right: 100px

    label
      font-size: 16px
      font-weight: bold
      line-height: 19px
      letter-spacing: .07em
    input
      width: 230px
      padding: 10px 22px
      background-color: $gray-6
      border: none
      font-size: 14px
      line-height: 16px
      letter-spacing: .07em
      font-weight: 300
      font-size: 16px
      font-weight: bold
      // outline-color: $red
      @include phones
        margin: 5px auto 1px auto
        padding: 5px 10px
    input::placeholder
      font-size: 14px
      font-weight: bold
  &__checkbox-group
    display: flex
    align-items: center
    margin-bottom: 9px
    flex-wrap: wrap

    input
      margin-right: 8px
      position: absolute
      left: -9999px
    label
      margin-top: -2px
      font-size: 12px
      font-weight: bold
      letter-spacing: .07em
      cursor: pointer
      padding-top: 1px
    .error
      span
        padding-left: 27px
  &::first-of-type
    height: 32px
  &__submit
    padding: 8px 24px
    border: none
    background-color: $yellow
    color: $text
    text-transform: uppercase
    font-weight: 700
    font-size: 15px
    line-height: 18px
    cursor: pointer
    &:active
      background-color: darken($yellow, 3%)
    &:active, &:focus
      outline: none
    &-wrapper
      display: flex
      justify-content: center
      margin-top: 20px
  &__field-is-requared
    font-size: 14px
    letter-spacing: 0.07em
    @include phones
      margin-top: 20px

.login-remind
  &__heading
    margin-top: 2px
    margin-bottom: 13px
    text-align: center
    font-size: 18px
    font-weight: bold
    line-height: 21px
    letter-spacing: .07em

  &__description
    font-size: 12px
    font-weight: 300

    letter-spacing: .07em
    margin-bottom: 13px

  &__input-group
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 13px
    height: 50px
    flex-wrap: wrap
    @include phones
      height: 56px

    div
      width: 100%
      display: flex
      justify-content: flex-end
      @include phones
        justify-content: start
      span
        padding-right: 42px
        @include phones
          padding-left: 10px
    input
      padding: 10px 22px
      border: none
      background-color: $gray-6
      font-size: 14px
      letter-spacing: .07em
      line-height: 16px
      @include phones
        padding: 5px 10px
        width: 100%
    input:placeholder
      font-weight: bold
    label
      font-size: 16px
      font-weight: bold
      letter-spacing: .07em
      line-height: 19px
      @include phones
        width: 100%
        text-align: center
  &__submit-wrapper
    display: flex
    justify-content: center

  &__submit
    border: none
    background-color: $yellow
    text-transform: uppercase
    font-weight: 700
    font-size: 15px
    line-height: 18px
    cursor: pointer
    width: 200px
    height: 35px
    &:active
      background-color: darken($yellow, 4%)
  &__field-is-requared
    font-size: 14px
    letter-spacing: 0.07em
    margin: 10px 0 10px

.login-registration__back, .login-remind__back
  display: block
  margin-top: 13px
  text-align: center
  font-weight: bold
  font-size: 14px
  color: $gray-4
  letter-spacing: .07em
  transition: all .1s ease-out
  cursor: pointer
  &:hover
    color: $text
.star
  color: $red
  font-weight: 900
.fontBold
  font-weight: 700


input[type="checkbox"]:checked + label,
input[type="checkbox"]:not(:checked) + label,
    display: inline-block
    position: relative
    padding-left: 28px
    line-height: 20px
    cursor: pointer
    @media screen and( max-width: 480px)
      padding-left: 28px



input[type="checkbox"]:checked + label:before,
input[type="checkbox"]:not(:checked) + label:before,
    content: ""
    position: absolute
    left: 0px
    top: 0px
    width: 20px
    height: 20px
    border: 2px solid #BAB4B4
    background-color: #ffffff


input[type="checkbox"]:checked + label:before,
input[type="checkbox"]:not(:checked) + label:before
    border-radius: 2px

input[type="checkbox"]:checked + label:after,
input[type="checkbox"]:not(:checked) + label:after,
    content: ""
    position: absolute
    -webkit-transition: all 0.2s ease
    -moz-transition: all 0.2s ease
    -o-transition: all 0.2s ease
    transition: all 0.2s ease


input[type="checkbox"]:checked + label:after,
input[type="checkbox"]:not(:checked) + label:after
    left: 3px
    top: 4px
    width: 12px
    height: 7px
    border-radius: 1px
    border-left: 4px solid #FF0202
    border-bottom: 4px solid #FF0202
    -webkit-transform: rotate(-45deg)
    -moz-transform: rotate(-45deg)
    -o-transform: rotate(-45deg)
    -ms-transform: rotate(-45deg)
    transform: rotate(-45deg)

input[type="checkbox"]:not(:checked) + label:after,
    opacity: 0

input[type="checkbox"]:checked + label:after,
    opacity: 1


.v-popup-login__input::placeholder
  font-weight: bold
  font-size: 14px

#remind-email::placeholder
  font-weight: bold
  font-size: 14px

.v-popup-login__inputGroup__single
  margin-bottom: 13px
  input
    width: 100%
  .error
    padding-left: 22px

.error
  font-size: 12px
  color: #757575
  width: 100%
  span
    font-weight: 300 !important
#v-popup-login > div.v-popup-login > div > div.login-registration__body > form > div:nth-child(2)
  height: 32px
  display: flex
  align-items: flex-start
  @include phones
    height: 73px

.wrong
  text-align: center
  margin-bottom: 13px
  color: $red
  font-weight: 900
.wrongAuth
  justify-content: flex-end
  color: $red
  font-weight: 900
</style>
